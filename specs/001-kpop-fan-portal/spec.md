# Spec: K-Pop Event Hub

**Branch**: `001-kpop-fan-portal` | **Status**: Draft | **Created**: 2026-02-09
**Goal**: North America K-pop event calendar under a unified domain, driving traffic via concert/fan-meet info. Email subscriptions for engagement.

## Clarifications

### Session 2026-02-09

- Q: How to handle past events on calendar? → A: Past events stay visible but grayed out; calendar is rolling (defaults to current month, scrolls forward). Data retained in DB permanently.
- Q: Ticketmaster search scope? → A: Multiple keywords ("kpop", "k-pop", "korean pop") + classificationName "music" + countryCode US,CA.
- Q: CAN-SPAM email compliance? → A: Has physical address; include in SendGrid email template footer along with unsubscribe link.

## User Scenarios & Testing

### US1 - Browse K-Pop Events on Calendar (P1)

A fan visits the portal, sees a monthly calendar of upcoming K-pop events in North America, filters by city, clicks to see details and ticket link.

**Why this priority**: Core value prop — without events there's nothing to show.

**Independent Test**: Run `sync_ticketmaster` → visit homepage → calendar shows events → filter city → click event → detail with ticket link.

**Acceptance Scenarios**:
1. **Given** homepage loads, **When** fan views calendar, **Then** events appear as date markers; past events shown grayed out.
2. **Given** events from multiple cities, **When** fan selects city filter, **Then** only that city's events show.
3. **Given** fan clicks an event, **When** detail loads, **Then** date/time, venue, city, "Buy Tickets" button visible.
4. **Given** Ticketmaster has new events, **When** sync runs, **Then** events appear within 2 h.
5. **Given** admin adds event manually, **When** homepage reloads, **Then** event appears on calendar.
6. **Given** calendar loads, **When** default view renders, **Then** current month is shown with forward scrolling (rolling calendar).

---

### US2 - Subscribe for Email Notifications (P2)

A fan enters their email on the About Us page. They receive emails when new events are added.

**Why this priority**: Captures leads for re-engagement. Needs US1 content first.

**Independent Test**: Visit About Us → enter email → submit → admin runs `send_notifications` → email received.

**Acceptance Scenarios**:
1. **Given** fan on About Us page, **When** valid email submitted, **Then** success message shown.
2. **Given** new event added, **When** admin runs `send_notifications`, **Then** subscribers receive email.
3. **Given** subscriber clicks unsubscribe link, **When** followed, **Then** no more emails.

---

### Edge Cases

- Ticketmaster API rate limit → retry with backoff, no crash.
- Duplicate email subscription → return success (idempotent), no duplicate row.
- Event with no ticket_url → hide "Buy Tickets" button.
- Ticketmaster event cancelled → next sync updates or soft-deletes.
- City filter with zero results → "No events" message.

### Post-MVP

- i18n (ZH / KO), SMS (Twilio), Shopify headless products, user accounts, IG scraping.

## Requirements

- **FR-001**: System MUST sync events from Ticketmaster Discovery API every 2 h, dedup by `ticketmaster_id`. Search: keywords ("kpop", "k-pop", "korean pop"), classification "music", countries US+CA.
- **FR-002**: System MUST display rolling monthly calendar (default: current month, scrollable forward), filterable by city. Past events grayed out.
- **FR-003**: System MUST show event detail with ticket link.
- **FR-004**: Admin MUST be able to CRUD events via Django Admin.
- **FR-005**: System MUST collect email subscriptions without accounts.
- **FR-006**: System MUST send new-event emails via SendGrid. Emails MUST include company physical address and unsubscribe link (CAN-SPAM).
- **FR-007**: System SHOULD display static announcement bar (env var).
- **FR-008**: System MUST be mobile-first responsive (320–2560 px).

## Key Entities

See [data-model.md](./data-model.md). Core: **Event**, **ArtistGroup**, **Subscriber**.

## Pages

1. **Homepage**: Announcement bar → Rolling monthly calendar (past events grayed) → Upcoming events
2. **Event Detail** (`/events/{slug}`): Event info + ticket link
3. **About Us** (`/about`): Company intro + email subscription form

## Success Criteria

- **SC-001**: Page load < 2 s on 4G.
- **SC-002**: Ticketmaster sync within 2 h of event publish.
- **SC-003**: Zero duplicate events from repeated syncs.
