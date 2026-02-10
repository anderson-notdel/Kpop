# Quickstart: K-Pop Event Hub

## Prerequisites

- Python 3.11+, Node.js 20+, PostgreSQL 15+
- Ticketmaster API key (free: https://developer.ticketmaster.com/)
- SendGrid API key (free tier: https://sendgrid.com/)

## Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                               # edit credentials
python manage.py migrate
python manage.py createsuperuser
python manage.py loaddata initial_groups.json
python manage.py sync_ticketmaster
python manage.py runserver
```

## Frontend

```bash
cd frontend
npm install
cp .env.example .env.local                         # edit credentials
npm run dev
```

## Verify

- Backend API: http://localhost:8000/api/v1/events
- Django Admin: http://localhost:8000/admin
- Frontend: http://localhost:3000

## Environment Variables

**Backend (.env)**:
```
DATABASE_URL=postgres://user:pass@localhost:5432/kpop
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
TICKETMASTER_API_KEY=
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

**Frontend (.env.local)**:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_ANNOUNCEMENT_TEXT=Welcome to K-Pop Event Hub!
NEXT_PUBLIC_ANNOUNCEMENT_LINK=
```
