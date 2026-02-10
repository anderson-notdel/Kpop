# K-Pop Event Hub Constitution

## Core Principles

### I. Ship Lean
MVP only. No feature without proven user need. Cut scope before adding complexity.

### II. Single Responsibility
Each service does one thing. Django serves API. Next.js renders pages. Shopify handles payments. Ticketmaster provides events.

### III. No Accounts Until Proven
No user auth in MVP. Subscriptions are email-only, no login required.

### IV. External Services Over DIY
Use managed services (SendGrid, Ticketmaster API, Shopify) instead of building in-house. Minimize ops burden.

### V. English First
MVP ships English only. i18n deferred until traffic justifies it.

## Constraints

- Solo dev or 2-person team
- Budget: VPS ~$6/mo + free tiers (SendGrid, Ticketmaster, Vercel)
- No custom payment processing — Shopify handles all commerce
- PostgreSQL only, no Redis/cache layer for MVP

## Development Workflow

- Commit per task or logical group
- Validate at each phase checkpoint before proceeding
- No tests unless explicitly requested

## Governance

Constitution overrides ad-hoc decisions. Amendments require documented justification.

**Version**: 1.0 | **Ratified**: 2026-02-09 | **Last Amended**: 2026-02-09
