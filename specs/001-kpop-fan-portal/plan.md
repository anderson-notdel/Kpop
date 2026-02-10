# Plan: K-Pop Event Hub (Lean MVP)

**Branch**: `001-kpop-fan-portal` | **Date**: 2026-02-09 | **Spec**: [spec.md](./spec.md)

## Summary

Event calendar for North America K-pop concerts/fan meets. Ticketmaster Discovery API + manual admin entries. Email subscriptions via SendGrid. No auth, no Shopify, no i18n for MVP.

## Technical Context

| Field | Value |
|-------|-------|
| Language/Version | Python 3.11, TypeScript 5.x |
| Primary Dependencies | Django 5.x + DRF, Next.js 14, Tailwind CSS |
| Storage | PostgreSQL 15+ |
| Testing | pytest (on request only) |
| Target Platform | Web (Vercel + VPS) |
| Project Type | Web app (backend + frontend) |
| Performance Goals | < 2 s page load on 4G |
| Constraints | Solo dev, ~$6/mo VPS, free tier services |
| Scale/Scope | Hundreds of events, < 10k monthly visitors |

## Constitution Check

| Principle | Status |
|-----------|--------|
| I. Ship Lean | Pass — 2 stories, 22 tasks, 3 models |
| II. Single Responsibility | Pass — Django=API, Next.js=UI, Ticketmaster=events, SendGrid=email |
| III. No Accounts | Pass — email-only subscription |
| IV. External Services | Pass — Ticketmaster, SendGrid, Vercel |
| V. English First | Pass — no i18n |

## Delivery Order

1. **Phase 1–2**: Setup + Models + Admin + API
2. **Phase 3 (US1)**: Ticketmaster sync + Calendar + Events — **shippable MVP**
3. **Phase 4 (US2)**: Email subscription + notifications
4. **Phase 5**: Responsive polish + deploy

See [tasks.md](./tasks.md) for breakdown. Project structure in [CLAUDE.md](../../CLAUDE.md).
