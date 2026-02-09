# Plan: K-Pop Fan Portal (Lean MVP)

**Branch**: `001-kpop-fan-portal` | **Spec**: [spec.md](./spec.md)

Solo dev, ship fast: Soompi scraper → Django API → Next.js feed. localStorage follows, Shopify links.

## Stack

- **Backend**: Python 3.11, Django 5.x + DRF, Scrapy 2.x, PostgreSQL 15+
- **Frontend**: TypeScript 5.x, Next.js 14, Tailwind CSS
- **Commerce**: Shopify Storefront API (redirect only, no cart)
- **Deploy**: Vercel (frontend) + VPS ~$6/mo (backend)

## Phases & Tasks

### Phase 1: Backend + Models + Admin
- [ ] Django project with single settings.py + PostgreSQL
- [ ] IdolGroup model (name, image_url, description, is_active)
- [ ] NewsArticle model (title, slug, content, thumbnail, source_url, group FK, is_featured)
- [ ] Django Admin with featured flag
- [ ] Seed ~20 sample groups (fixture)

### Phase 2: Scraper
- [ ] Scrapy project + Pydantic schema for articles
- [ ] Soompi spider
- [ ] Ingestion pipeline with source_url dedup
- [ ] Unit test for parsing logic

### Phase 3: API (4 endpoints per api.yaml)
- [ ] DRF config + pagination + CORS
- [ ] GET /articles (paginated, filter by group_id/featured)
- [ ] GET /articles/{slug}
- [ ] GET /groups (paginated) + GET /groups/{id}

### Phase 4: Frontend
- [ ] Next.js project + Tailwind + API client + types
- [ ] ArticleCard component + homepage feed (ISR 60s)
- [ ] Article detail page (ISR 300s) + OpenGraph meta tags
- [ ] Loading/error states

### Phase 5: Shopify + Follows + Deploy
- [ ] Shopify BFF route → 3 featured products on articles
- [ ] "Buy Now" → Shopify checkout redirect
- [ ] localStorage follow + FollowButton + feed toggle
- [ ] Deploy: Vercel + VPS + cron (4h scraper)

## Project Structure

```text
backend/
├── kpop/settings.py, urls.py, wsgi.py
├── apps/{news,artists}/{models,serializers,views,admin}.py
├── scrapers/kpop_scrapers/spiders/soompi.py
├── tests/test_scraper.py
├── requirements.txt
└── manage.py

frontend/
├── src/app/{page,layout}.tsx, news/[slug]/page.tsx
├── src/components/{ArticleCard,ProductCard,FollowButton}.tsx
├── src/lib/{api,localStorage}.ts
├── next.config.js
└── package.json
```
