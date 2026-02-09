# Spec: K-Pop Fan Portal

**Branch**: `001-kpop-fan-portal` | **Status**: Draft
**Goal**: Centralized K-pop news portal with merch links for fans.

## User Stories

### US1 - Browse and Read K-Pop News (MVP)

A fan visits the portal, sees a feed of Soompi articles with thumbnails/headlines, and taps to read.

**Acceptance**:
1. Homepage shows 10+ articles with thumbnails, headlines, source, timestamps, sorted by recency.
2. Tapping article shows full content with images.
3. Related articles appear below.
4. Fresh articles appear within scraper cycle (4 hours).

### US2 - Follow Groups & Filter Feed (MVP - localStorage)

Fan taps "Follow" on groups (e.g., BTS), toggles between "All News" and "Following" feed. Persists in localStorage.

### US3 - Browse Shopify Merch Links (MVP - redirect only)

Article pages show 3 Shopify products. "Buy Now" redirects to Shopify checkout.

### Post-MVP (deferred)

- Individual idol profiles, search, directory browsing
- User accounts, OAuth, cross-device follow sync
- Full cart, checkout flow, order management

## Functional Requirements (MVP)

- **FR-01**: Scrape Soompi articles with source_url deduplication.
- **FR-02**: Display article thumbnails, headlines, source, and timestamps.
- **FR-03**: Categorize articles by group (single FK).
- **FR-04**: ~20 group profiles with name and photo.
- **FR-05**: localStorage follow/unfollow, persisted across sessions.
- **FR-06**: "Following" / "All News" feed toggle.
- **FR-07**: Show 3 Shopify products on articles via Storefront API.
- **FR-08**: "Buy Now" → Shopify checkout redirect (no stored payment data).
- **FR-09**: Mobile-first responsive layout (320px–2560px), lazy loading images.

## Key Entities

- **Article**: headline, body, published_at, source_url, thumbnail, group FK, is_featured
- **Group**: name, image_url, description, is_active

## Success Criteria

- Page load < 2s on 4G.
- Duplicate article rate < 5%.
- 70% of first-time visitors view 3+ articles.

## Assumptions

- Modern browsers, English only.
- Soompi has scrapable public pages.
- Shopify handles all payment processing.
- localStorage for follow persistence (no accounts).
