# Tasks: K-Pop Fan Portal (Lean MVP)

**Input**: Design documents from `/specs/001-kpop-fan-portal/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/api.yaml, quickstart.md

**Tests**: Not requested — test tasks are omitted.

**Organization**: Tasks are grouped by user story (US1, US2, US3) to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Backend**: `backend/` (Django + DRF + Scrapy)
- **Frontend**: `frontend/` (Next.js 14 + Tailwind)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize both Django backend and Next.js frontend project scaffolding

- [ ] T001 Create project directory structure per plan.md (`backend/`, `backend/kpop/`, `backend/apps/news/`, `backend/apps/artists/`, `backend/scrapers/`, `backend/tests/`, `frontend/src/app/`, `frontend/src/components/`, `frontend/src/lib/`, `frontend/src/styles/`)
- [ ] T002 Initialize Django project in `backend/kpop/` with `settings.py`, `urls.py`, `wsgi.py`, and `asgi.py`
- [ ] T003 [P] Create `backend/requirements.txt` with Django 5.x, djangorestframework, psycopg2-binary, scrapy, pydantic, django-cors-headers, gunicorn
- [ ] T004 [P] Initialize Next.js 14 project in `frontend/` with TypeScript, Tailwind CSS, and `frontend/package.json`
- [ ] T005 [P] Create `backend/.env.example` with DATABASE_URL, SECRET_KEY, DEBUG, ALLOWED_HOSTS per quickstart.md
- [ ] T006 [P] Create `frontend/.env.example` with NEXT_PUBLIC_API_URL, SHOPIFY_STOREFRONT_TOKEN, SHOPIFY_STORE_DOMAIN per quickstart.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Database models, migrations, admin, and API scaffolding that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Configure PostgreSQL database connection in `backend/kpop/settings.py` using DATABASE_URL env var, register `apps.news` and `apps.artists` in INSTALLED_APPS
- [ ] T008 Create IdolGroup model in `backend/apps/artists/models.py` with fields: id (UUID PK), name (VARCHAR 100, unique), image_url (VARCHAR 500, nullable), description (TEXT, nullable), is_active (BOOLEAN, default True), created_at (TIMESTAMP) per data-model.md
- [ ] T009 Create NewsArticle model in `backend/apps/news/models.py` with fields: id (UUID PK), title (VARCHAR 500), slug (VARCHAR 550, unique, auto-generated), content (TEXT), summary (VARCHAR 500, nullable), thumbnail_url (VARCHAR 500, nullable), source_url (VARCHAR 500, unique), published_at (TIMESTAMP), group_id (FK to IdolGroup, nullable), is_featured (BOOLEAN, default False), created_at (TIMESTAMP); add indexes on published_at DESC and is_featured per data-model.md
- [ ] T010 Generate and run initial migrations for both apps via `python manage.py makemigrations` and `python manage.py migrate`
- [ ] T011 [P] Register IdolGroup in Django Admin in `backend/apps/artists/admin.py` with list display, search
- [ ] T012 [P] Register NewsArticle in Django Admin in `backend/apps/news/admin.py` with list display, search, featured flag filter
- [ ] T013 Create seed fixture `backend/fixtures/initial_groups.json` with ~20 K-pop groups (BTS, BLACKPINK, TWICE, Stray Kids, etc.)
- [ ] T014 Configure DRF defaults (pagination class, default renderer) and django-cors-headers in `backend/kpop/settings.py`
- [ ] T015 Create root URL configuration in `backend/kpop/urls.py` with `/admin/` and `/api/v1/` prefix routing to app URLs
- [ ] T016 [P] Create shared TypeScript API types in `frontend/src/lib/types.ts` matching api.yaml schemas: ArticleSummary, ArticleDetail, ArticleListResponse, GroupSummary, GroupDetail, GroupListResponse
- [ ] T017 [P] Create API client module in `frontend/src/lib/api.ts` with fetch wrapper for NEXT_PUBLIC_API_URL base, functions: fetchArticles(params), fetchArticle(slug), fetchGroups(), fetchGroup(id)
- [ ] T018 Create root layout in `frontend/src/app/layout.tsx` with Tailwind setup, mobile-first responsive shell, site header/nav

**Checkpoint**: Foundation ready — models migrated, admin working, API scaffold + frontend shell in place

---

## Phase 3: User Story 1 — Browse and Read K-Pop News (Priority: P1) MVP

**Goal**: Fan visits portal, sees a feed of Soompi articles with thumbnails/headlines, taps to read full content. Fresh articles appear within 4-hour scraper cycle.

**Independent Test**: Visit homepage → see 10+ articles with thumbnails, headlines, timestamps → tap an article → see full content with images → related articles appear below.

### Scraper (data pipeline for US1)

- [ ] T019 [US1] Create Scrapy project structure in `backend/scrapers/kpop_scrapers/` with `settings.py`, `items.py`, `pipelines.py`
- [ ] T020 [US1] Define Pydantic article schema in `backend/scrapers/kpop_scrapers/items.py` for scraped article validation (title, content, thumbnail_url, source_url, published_at)
- [ ] T021 [US1] Implement Soompi spider in `backend/scrapers/kpop_scrapers/spiders/soompi.py` that scrapes article list pages and extracts article data
- [ ] T022 [US1] Implement ingestion pipeline in `backend/scrapers/kpop_scrapers/pipelines.py` with source_url deduplication, group FK matching by name, and Django ORM save
- [ ] T023 [US1] Create Django management command `run_scraper` in `backend/apps/news/management/commands/run_scraper.py` to invoke the Soompi spider

### Backend API (US1 endpoints)

- [ ] T024 [P] [US1] Create ArticleSummarySerializer and ArticleDetailSerializer in `backend/apps/news/serializers.py` per api.yaml schemas (nested GroupSummary)
- [ ] T025 [P] [US1] Create GroupSummarySerializer and GroupDetailSerializer in `backend/apps/artists/serializers.py` per api.yaml schemas
- [ ] T026 [US1] Implement GET /articles endpoint in `backend/apps/news/views.py` with pagination, group_id filter, featured filter per api.yaml
- [ ] T027 [US1] Implement GET /articles/{slug} endpoint in `backend/apps/news/views.py` returning ArticleDetail or 404
- [ ] T028 [US1] Implement GET /groups and GET /groups/{id} endpoints in `backend/apps/artists/views.py` per api.yaml
- [ ] T029 [P] [US1] Create URL routes in `backend/apps/news/urls.py` mapping to article views
- [ ] T030 [P] [US1] Create URL routes in `backend/apps/artists/urls.py` mapping to group views

### Frontend (US1 pages)

- [ ] T031 [US1] Create ArticleCard component in `frontend/src/components/ArticleCard.tsx` displaying thumbnail, headline, group name, timestamp; links to detail page
- [ ] T032 [US1] Implement homepage feed in `frontend/src/app/page.tsx` with ISR (60s revalidation), paginated article list using fetchArticles, lazy-loaded images
- [ ] T033 [US1] Implement article detail page in `frontend/src/app/news/[slug]/page.tsx` with ISR (300s), full content, images, source link, OpenGraph meta tags
- [ ] T034 [US1] Add related articles section to `frontend/src/app/news/[slug]/page.tsx` showing articles from the same group below the main content
- [ ] T035 [US1] Implement loading and error states for feed and article detail pages using Next.js `loading.tsx` and `error.tsx` in `frontend/src/app/` and `frontend/src/app/news/[slug]/`

**Checkpoint**: User Story 1 complete — homepage shows scraped articles, detail pages work, related articles visible. Independently testable.

---

## Phase 4: User Story 2 — Follow Groups & Filter Feed (Priority: P2)

**Goal**: Fan taps "Follow" on groups, toggles between "All News" and "Following" feed views. Follows persist in localStorage across sessions.

**Independent Test**: Visit site → tap Follow on BTS and TWICE → toggle to "Following" → only BTS/TWICE articles appear → refresh page → follows persist → unfollow BTS → only TWICE articles in "Following" feed.

- [ ] T036 [P] [US2] Create localStorage utility in `frontend/src/lib/localStorage.ts` with functions: getFollowedGroups(), followGroup(id), unfollowGroup(id), isFollowing(id)
- [ ] T037 [P] [US2] Create FollowButton component in `frontend/src/components/FollowButton.tsx` that toggles follow state for a group via localStorage, shows followed/unfollowed state
- [ ] T038 [US2] Add feed toggle ("All News" / "Following") to homepage in `frontend/src/app/page.tsx`; when "Following" is active, filter articles client-side by followed group IDs from localStorage
- [ ] T039 [US2] Add FollowButton to ArticleCard in `frontend/src/components/ArticleCard.tsx` (follow the article's group) and to any group display context

**Checkpoint**: User Story 2 complete — follow/unfollow works, feed toggle filters correctly, persists across sessions. Independently testable.

---

## Phase 5: User Story 3 — Browse Shopify Merch Links (Priority: P3)

**Goal**: Article pages show 3 featured Shopify products. "Buy Now" redirects to Shopify checkout page.

**Independent Test**: Visit an article detail page → see 3 product cards with images, names, prices → click "Buy Now" → redirected to Shopify checkout URL.

- [ ] T040 [P] [US3] Create Shopify BFF API route in `frontend/src/app/api/shopify/route.ts` that queries Shopify Storefront API for 3 featured products (using SHOPIFY_STOREFRONT_TOKEN and SHOPIFY_STORE_DOMAIN env vars)
- [ ] T041 [P] [US3] Create ProductCard component in `frontend/src/components/ProductCard.tsx` displaying product image, name, price, and "Buy Now" button linking to Shopify checkout URL
- [ ] T042 [US3] Integrate ProductCard section into article detail page `frontend/src/app/news/[slug]/page.tsx` calling the Shopify BFF route and rendering 3 products below article content

**Checkpoint**: User Story 3 complete — merch products appear on articles, "Buy Now" redirects to Shopify. Independently testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Mobile responsiveness, performance, deployment prep

- [ ] T043 [P] Apply mobile-first responsive styling across all components and pages using Tailwind breakpoints (320px–2560px) per FR-09
- [ ] T044 [P] Add lazy loading to all images (article thumbnails, product images) using Next.js Image component with priority on above-fold
- [ ] T045 [P] Configure `frontend/next.config.js` with image domains (Soompi, Shopify CDN) and any required rewrites
- [ ] T046 Create deployment configuration: `backend/Dockerfile` for Django + Gunicorn on VPS, and Vercel config for frontend
- [ ] T047 Add cron job documentation or script for 4-hour scraper cycle (`0 */4 * * * cd /path/to/backend && python manage.py run_scraper`)
- [ ] T048 Run quickstart.md validation — verify full setup from scratch using documented steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational phase completion
- **US2 (Phase 4)**: Depends on Foundational phase (frontend types/api client); benefits from US1 articles existing but is independently implementable
- **US3 (Phase 5)**: Depends on Foundational phase (frontend shell); benefits from US1 article detail page but product section is modular
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — No dependencies on other stories
- **US2 (P2)**: Can start after Phase 2 — Uses localStorage only, no backend changes; integrates with US1 feed page but FollowButton/localStorage are independent
- **US3 (P3)**: Can start after Phase 2 — Shopify BFF + ProductCard are fully independent; integration point is article detail page from US1

### Within Each User Story

- Scraper before API (US1 needs data)
- Serializers before views
- Models/services before endpoints
- Backend endpoints before frontend pages that consume them
- Core page before enhancement (e.g., related articles after detail page)

### Parallel Opportunities

**Phase 1**:
- T003, T004, T005, T006 can all run in parallel after T001+T002

**Phase 2**:
- T008 and T009 in parallel (different apps)
- T011 and T012 in parallel (different admin files)
- T016 and T017 in parallel (different frontend files)

**Phase 3 (US1)**:
- T024 and T025 in parallel (different serializer files)
- T029 and T030 in parallel (different URL files)
- Scraper tasks (T019–T023) can run in parallel with serializer tasks (T024–T025) since they're in different directories

**Phase 4 (US2)**:
- T036 and T037 in parallel (different files)

**Phase 5 (US3)**:
- T040 and T041 in parallel (different files)

**Phase 6**:
- T043, T044, T045 can all run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch serializers in parallel:
Task: "Create ArticleSummarySerializer in backend/apps/news/serializers.py"
Task: "Create GroupSummarySerializer in backend/apps/artists/serializers.py"

# Launch URL routes in parallel:
Task: "Create URL routes in backend/apps/news/urls.py"
Task: "Create URL routes in backend/apps/artists/urls.py"
```

## Parallel Example: User Story 2

```bash
# Launch localStorage and FollowButton in parallel:
Task: "Create localStorage utility in frontend/src/lib/localStorage.ts"
Task: "Create FollowButton component in frontend/src/components/FollowButton.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (scraper + API + frontend feed)
4. **STOP and VALIDATE**: Run scraper, verify homepage shows articles, verify detail pages work
5. Deploy/demo if ready — this is a shippable MVP

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (news feed + scraper) → Test independently → **Deploy (MVP!)**
3. Add US2 (follow/filter) → Test independently → Deploy
4. Add US3 (Shopify merch) → Test independently → Deploy
5. Polish → Final deployment

### Solo Dev Strategy (Recommended)

Since this is a solo dev project per plan.md:

1. Complete all phases sequentially: Phase 1 → 2 → 3 → 4 → 5 → 6
2. Prioritize US1 as the core MVP — get articles flowing end-to-end first
3. US2 and US3 add incremental value on top of a working news feed
4. Polish phase ensures deployment readiness

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No test tasks generated (tests not explicitly requested in spec)
