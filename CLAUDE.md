# Kpop Development Guidelines

**Scope**: Lean MVP — single scraper, groups only, localStorage follows, Shopify redirect
**Last updated**: 2026-02-05

## Active Technologies

- **Backend**: Python 3.11, Django 5.x, Django REST Framework, Scrapy 2.x, Pydantic
- **Frontend**: TypeScript 5.x, Next.js 14, Tailwind CSS 3.x
- **Database**: PostgreSQL 15+
- **Commerce**: Shopify Storefront API (external checkout links only)

## Project Structure

```text
backend/
├── kpop/           # Django project settings
├── apps/
│   ├── news/       # NewsArticle model, views, serializers
│   └── artists/    # IdolGroup model, views, serializers
├── scrapers/       # Scrapy spiders (Soompi)
├── tests/
├── requirements.txt
├── Dockerfile
└── manage.py

frontend/
├── src/
│   ├── app/        # Next.js pages (feed, article detail)
│   ├── components/ # ArticleCard, ProductCard, FollowButton
│   ├── lib/        # API client, localStorage utils
│   └── styles/     # Tailwind design tokens
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## Commands

```bash
# Backend
cd backend
source venv/bin/activate
python manage.py runserver          # Dev server
python manage.py migrate            # Run migrations
python manage.py run_scraper        # Run Soompi scraper
pytest                              # Run tests
ruff check .                        # Lint

# Frontend
cd frontend
npm run dev                         # Dev server
npm run build                       # Production build
npm run lint                        # Lint
```

## Code Style

- **Python**: Ruff, type hints
- **TypeScript**: ESLint, strict mode

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
