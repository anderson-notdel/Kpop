# Data Model: K-Pop Fan Portal (Lean MVP)

**Feature**: 001-kpop-fan-portal
**Date**: 2026-01-28

## Entity Relationship (Simplified)

```
┌─────────────┐         ┌─────────────────┐
│  IdolGroup  │◄────────│   NewsArticle   │
├─────────────┤  1:N    ├─────────────────┤
│ id          │         │ id              │
│ name        │         │ title           │
│ image_url   │         │ slug            │
│ description │         │ content         │
│ is_active   │         │ thumbnail_url   │
└─────────────┘         │ source_url      │
                        │ published_at    │
                        │ group_id (FK)   │
                        │ is_featured     │
                        └─────────────────┘
```

> **MVP Limitation**: `group_id` is a single FK (1:N). An article can only be associated with one group.
> Post-MVP will introduce an `ArticleTag` junction table for many-to-many (e.g., "BTS x BLACKPINK" collaboration articles).

## Entities

### IdolGroup

K-Pop group (not individual idols for MVP).

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK | Unique identifier |
| name | VARCHAR(100) | NOT NULL, UNIQUE | Group name (e.g., "BTS") |
| image_url | VARCHAR(500) | NULLABLE | Profile image URL |
| description | TEXT | NULLABLE | Short bio |
| is_active | BOOLEAN | DEFAULT TRUE | Still promoting |
| created_at | TIMESTAMP | NOT NULL | Record creation |

**Validation**:
- `name` must be unique (case-insensitive)

---

### NewsArticle

A news article from Soompi.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK | Unique identifier |
| title | VARCHAR(500) | NOT NULL | Article headline |
| slug | VARCHAR(550) | NOT NULL, UNIQUE | URL-safe identifier |
| content | TEXT | NOT NULL | Full article body |
| summary | VARCHAR(500) | NULLABLE | Auto-generated excerpt |
| thumbnail_url | VARCHAR(500) | NULLABLE | Featured image |
| source_url | VARCHAR(500) | NOT NULL, UNIQUE | Original Soompi URL |
| published_at | TIMESTAMP | NOT NULL | Publication time |
| group_id | UUID | FK → IdolGroup, NULLABLE | Associated group |
| is_featured | BOOLEAN | DEFAULT FALSE | Show on homepage hero |
| created_at | TIMESTAMP | NOT NULL | When scraped |

**Validation**:
- `source_url` must be unique (prevents duplicates)
- `slug` auto-generated from title

**Indexes**:
- `idx_article_published` on `published_at DESC`
- `idx_article_featured` on `is_featured` WHERE `is_featured = TRUE`

---

## Deferred Entities (Post-MVP)

Idol, Source, ArticleTag (M2M), Product cache, User/Follow (accounts), Cart/Order (full commerce).
