import logging

from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from apps.events.models import Event
from apps.subscribers.models import Subscriber

logger = logging.getLogger(__name__)

COMPANY_ADDRESS = "K-Pop Event Hub, 123 Main St, Suite 100, Los Angeles, CA 90001"


def _build_event_html(events: list[Event], subscriber_id: str) -> str:
    unsubscribe_url = f"{settings.SENDGRID_FROM_EMAIL}?unsub={subscriber_id}"
    rows = ""
    for e in events:
        date_str = e.date_time.strftime("%B %d, %Y at %I:%M %p")
        ticket = (
            f'<a href="{e.ticket_url}">Buy Tickets</a>' if e.ticket_url else "TBA"
        )
        rows += f"""
        <tr>
            <td style="padding:8px;border-bottom:1px solid #eee;">{e.title}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;">{date_str}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;">{e.venue}, {e.city}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;">{ticket}</td>
        </tr>"""

    return f"""
    <h2>New K-Pop Events!</h2>
    <table style="width:100%;border-collapse:collapse;">
        <thead>
            <tr style="background:#f3e8ff;">
                <th style="padding:8px;text-align:left;">Event</th>
                <th style="padding:8px;text-align:left;">Date</th>
                <th style="padding:8px;text-align:left;">Location</th>
                <th style="padding:8px;text-align:left;">Tickets</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    <br/>
    <p style="font-size:12px;color:#888;">
        {COMPANY_ADDRESS}<br/>
        <a href="{unsubscribe_url}">Unsubscribe</a>
    </p>
    """


def send_new_event_notifications() -> dict:
    if not settings.SENDGRID_API_KEY:
        logger.error("SENDGRID_API_KEY not set")
        return {"sent": 0, "errors": 0}

    from django.utils import timezone

    new_events = list(
        Event.objects.filter(
            created_at__gte=timezone.now() - timezone.timedelta(hours=2)
        ).order_by("date_time")[:20]
    )

    if not new_events:
        logger.info("No new events to notify about")
        return {"sent": 0, "errors": 0}

    subscribers = Subscriber.objects.filter(is_active=True)
    sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
    sent = 0
    errors = 0

    for sub in subscribers:
        html = _build_event_html(new_events, str(sub.id))
        message = Mail(
            from_email=settings.SENDGRID_FROM_EMAIL,
            to_emails=sub.email,
            subject=f"{len(new_events)} New K-Pop Events Added!",
            html_content=html,
        )
        try:
            sg.send(message)
            sent += 1
        except Exception as e:
            logger.error("Failed to send to %s: %s", sub.email, e)
            errors += 1

    result = {"sent": sent, "errors": errors}
    logger.info("Notifications sent: %s", result)
    return result
