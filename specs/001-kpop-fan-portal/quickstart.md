# Quickstart: K-Pop Fan Portal (Lean MVP)

**Feature**: 001-kpop-fan-portal
**Date**: 2026-01-28

Quick setup guide for the minimal MVP.

## Prerequisites

- Python 3.11+
- Node.js 20+
- PostgreSQL 15+

## Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install django djangorestframework psycopg2-binary scrapy pydantic

# Configure database
export DATABASE_URL="postgres://user:pass@localhost:5432/kpop"

# Run migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Seed sample groups
python manage.py loaddata initial_groups.json

# Start server
python manage.py runserver
```

## Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure API URL
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local

# Start dev server
npm run dev
```

## Run Scraper

```bash
cd backend
python manage.py run_scraper  # or: scrapy crawl soompi
```

## Verify Setup

1. Backend API: http://localhost:8000/api/v1/articles
2. Django Admin: http://localhost:8000/admin
3. Frontend: http://localhost:3000

## Environment Variables

**Backend (.env)**:
```
DATABASE_URL=postgres://user:pass@localhost:5432/kpop
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

**Frontend (.env.local)**:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
SHOPIFY_STOREFRONT_TOKEN=your-token
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
```

## Deploy (MVP)

**Frontend (Vercel)**:
```bash
cd frontend
vercel
```

**Backend (VPS)**:
```bash
# On VPS
git clone <repo>
cd backend
pip install -r requirements.txt
gunicorn kpop.wsgi:application

# Add cron for scraper (every 4 hours)
0 */4 * * * cd /path/to/backend && python manage.py run_scraper
```
