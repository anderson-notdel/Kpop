# Kpop Development Guidelines

**Scope**: Lean MVP — Event calendar + email subscriptions, English only
**Last updated**: 2026-02-09

## Active Technologies

- **Backend**: Python 3.11, Django 5.x, Django REST Framework
- **Frontend**: TypeScript 5.x, Next.js 14, Tailwind CSS 3.x
- **Database**: PostgreSQL 15+
- **Event Data**: Ticketmaster Discovery API
- **Email**: SendGrid

## Project Structure

```text
backend/
├── kpop/              # Django project (settings, urls, wsgi)
├── apps/
│   ├── events/        # Event model, views, serializers, admin
│   ├── artists/       # ArtistGroup model, views, serializers, admin
│   └── subscribers/   # Subscriber model, views, serializers, admin
├── services/          # ticketmaster.py, notifications.py
├── fixtures/          # initial_groups.json
├── tests/
├── requirements.txt
├── Dockerfile
└── manage.py

frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage (calendar)
│   │   ├── layout.tsx            # Root layout + announcement bar
│   │   ├── events/[slug]/page.tsx
│   │   └── about/page.tsx
│   ├── components/    # Calendar, EventCard, CityFilter, SubscribeForm
│   ├── lib/           # api.ts, types.ts
│   └── styles/
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## Commands

```bash
# Backend
cd backend
source venv/bin/activate
python manage.py runserver            # Dev server
python manage.py migrate              # Run migrations
python manage.py sync_ticketmaster    # Sync events from Ticketmaster
python manage.py send_notifications   # Send email notifications
pytest                                # Run tests
ruff check .                          # Lint

# Frontend
cd frontend
npm run dev                           # Dev server
npm run build                         # Production build
npm run lint                          # Lint
```

## Code Style

- **Python**: Ruff, type hints
- **TypeScript**: ESLint, strict mode

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
