import logging
import time
from datetime import datetime, timezone

import requests
from django.conf import settings
from django.utils.text import slugify

from apps.artists.models import ArtistGroup
from apps.events.models import Event

logger = logging.getLogger(__name__)

BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json"
KEYWORDS = ["kpop", "k-pop", "korean pop"]
COUNTRY_CODES = ["US", "CA"]
PAGE_SIZE = 50
MAX_PAGES = 5


def _fetch_page(keyword: str, country: str, page: int = 0) -> dict:
    params = {
        "apikey": settings.TICKETMASTER_API_KEY,
        "keyword": keyword,
        "classificationName": "music",
        "countryCode": country,
        "size": PAGE_SIZE,
        "page": page,
        "sort": "date,asc",
    }
    resp = requests.get(BASE_URL, params=params, timeout=30)
    if resp.status_code == 429:
        retry_after = int(resp.headers.get("Retry-After", "5"))
        logger.warning("Rate limited, sleeping %ds", retry_after)
        time.sleep(retry_after)
        resp = requests.get(BASE_URL, params=params, timeout=30)
    resp.raise_for_status()
    return resp.json()


def _parse_event(raw: dict) -> dict | None:
    tm_id = raw.get("id")
    if not tm_id:
        return None

    name = raw.get("name", "")
    dates = raw.get("dates", {}).get("start", {})
    date_str = dates.get("dateTime") or dates.get("localDate")
    if not date_str:
        return None

    if "T" in str(date_str):
        dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
    else:
        dt = datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)

    venues = raw.get("_embedded", {}).get("venues", [])
    venue = venues[0] if venues else {}
    venue_name = venue.get("name", "TBA")
    city_info = venue.get("city", {})
    city_name = city_info.get("name", "")
    state = venue.get("state", {}).get("name", "")
    country_code = venue.get("country", {}).get("countryCode", "US")

    images = raw.get("images", [])
    image_url = images[0]["url"] if images else None

    ticket_url = raw.get("url", "")

    return {
        "ticketmaster_id": tm_id,
        "title": name,
        "date_time": dt,
        "venue": venue_name,
        "city": city_name,
        "state_province": state,
        "country": country_code,
        "ticket_url": ticket_url,
        "image_url": image_url,
        "source": "ticketmaster",
    }


def _match_group(title: str) -> ArtistGroup | None:
    title_lower = title.lower()
    for group in ArtistGroup.objects.filter(is_active=True):
        if group.name.lower() in title_lower:
            return group
    return None


def sync_events() -> dict:
    if not settings.TICKETMASTER_API_KEY:
        logger.error("TICKETMASTER_API_KEY not set")
        return {"created": 0, "updated": 0, "errors": 0}

    seen_ids: set[str] = set()
    created = 0
    updated = 0
    errors = 0

    for keyword in KEYWORDS:
        for country in COUNTRY_CODES:
            for page in range(MAX_PAGES):
                try:
                    data = _fetch_page(keyword, country, page)
                except requests.RequestException as e:
                    logger.error("Fetch error: %s (keyword=%s, country=%s, page=%d)", e, keyword, country, page)
                    errors += 1
                    break

                events = data.get("_embedded", {}).get("events", [])
                if not events:
                    break

                for raw in events:
                    parsed = _parse_event(raw)
                    if not parsed or parsed["ticketmaster_id"] in seen_ids:
                        continue

                    seen_ids.add(parsed["ticketmaster_id"])
                    tm_id = parsed.pop("ticketmaster_id")
                    parsed["group"] = _match_group(parsed["title"])

                    slug = slugify(f"{parsed['title']}-{parsed['date_time']:%Y%m%d}")[:550]

                    obj, was_created = Event.objects.update_or_create(
                        ticketmaster_id=tm_id,
                        defaults={**parsed, "slug": slug},
                    )
                    if was_created:
                        created += 1
                    else:
                        updated += 1

                page_info = data.get("page", {})
                total_pages = page_info.get("totalPages", 1)
                if page + 1 >= total_pages:
                    break

                time.sleep(0.25)

    result = {"created": created, "updated": updated, "errors": errors}
    logger.info("Sync complete: %s", result)
    return result
