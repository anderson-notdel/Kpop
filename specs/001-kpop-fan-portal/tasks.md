# Tasks: K-Pop Event Hub (Lean MVP)

**Refs**: [spec.md](./spec.md) | [data-model.md](./data-model.md) | [api.yaml](./contracts/api.yaml) | [quickstart.md](./quickstart.md)

Format: `[ID] [P?] [Story] Description` — **[P]** = parallelizable

---

## Phase 1: Setup

- [x] T001 Scaffold Django project + directory structure per CLAUDE.md + `requirements.txt`
- [x] T002 [P] Init Next.js 14 in `frontend/` with TypeScript + Tailwind
- [x] T003 [P] Create `.env.example` files per quickstart.md

---

## Phase 2: Foundation (blocks US1 & US2)

- [x] T004 Configure PostgreSQL + INSTALLED_APPS + CORS + DRF defaults in `settings.py`
- [x] T005 Create all models (ArtistGroup, Event, Subscriber) per data-model.md + run migrations
- [x] T006 Register all models in Django Admin + create seed fixture (~20 groups)
- [x] T007 Create serializers + URL routes per api.yaml
- [x] T008 Implement API views per api.yaml: GET `/events`, `/events/{slug}`, `/groups`, `/groups/{slug}`, `/cities`
- [x] T009 [P] Create frontend TS types + API client (`lib/types.ts`, `lib/api.ts`) per api.yaml
- [x] T010 Create root layout (`app/layout.tsx`) — header, nav, announcement bar from env var

**Checkpoint**: Backend API returns data, frontend shell renders.

---

## Phase 3: US1 — Calendar & Events

**Goal**: Fan sees monthly calendar, filters by city, clicks event for details + ticket link.

**Independent Test**: Run `sync_ticketmaster` → homepage → calendar with events → filter city → click → detail with "Buy Tickets".

- [x] T011 [US1] Ticketmaster API client + sync service + management command `sync_ticketmaster`
- [x] T012 [US1] Calendar component — monthly view, event markers, prev/next month
- [x] T013 [US1] EventCard + CityFilter components
- [x] T014 [US1] Homepage (`app/page.tsx`) — announcement bar + calendar + events + city filter (ISR 60s)
- [x] T015 [US1] Event detail page (`app/events/[slug]/page.tsx`) — full info + "Buy Tickets" (ISR 300s)
- [x] T016 [US1] Loading + error states

**Checkpoint**: Calendar shows Ticketmaster events, city filter works, detail pages link to tickets.

---

## Phase 4: US2 — Email Subscription

**Goal**: Fan subscribes with email, receives new-event notifications.

**Independent Test**: About Us → enter email → submit → admin runs `send_notifications` → email received.

- [x] T017 [US2] POST `/subscribers` + POST `/subscribers/unsubscribe` + URL routes
- [x] T018 [US2] SendGrid email service + management command `send_notifications`
- [x] T019 [US2] SubscribeForm component + About Us page (`app/about/page.tsx`)

**Checkpoint**: Users subscribe, admin sends email notifications.

---

## Phase 5: Deploy

- [x] T020 Mobile responsive pass (Tailwind breakpoints)
- [x] T021 `next.config.js` image domains + lazy loading
- [x] T022 Backend Dockerfile + Vercel config + cron (Ticketmaster sync every 2h)
