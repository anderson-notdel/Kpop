# Data Model: K-Pop Event Hub

**Feature**: 001-kpop-fan-portal | **Date**: 2026-02-09

## Relationships

```
ArtistGroup 1──N Event
Subscriber (standalone)
```

## ArtistGroup

| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK |
| name | VARCHAR(100) | NOT NULL, UNIQUE |
| slug | VARCHAR(110) | NOT NULL, UNIQUE, auto |
| image_url | VARCHAR(500) | NULL |
| description | TEXT | NULL |
| is_active | BOOLEAN | DEFAULT TRUE |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

## Event

| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK |
| title | VARCHAR(500) | NOT NULL |
| slug | VARCHAR(550) | NOT NULL, UNIQUE, auto |
| description | TEXT | NULL |
| date_time | TIMESTAMPTZ | NOT NULL |
| venue | VARCHAR(300) | NOT NULL |
| city | VARCHAR(100) | NOT NULL |
| state_province | VARCHAR(100) | NULL |
| country | VARCHAR(2) | DEFAULT 'US' |
| ticket_url | VARCHAR(500) | NULL |
| image_url | VARCHAR(500) | NULL |
| group_id | UUID | FK → ArtistGroup, NULL |
| source | VARCHAR(20) | DEFAULT 'manual' |
| ticketmaster_id | VARCHAR(100) | NULL, UNIQUE |
| is_featured | BOOLEAN | DEFAULT FALSE |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |

**Indexes**: `date_time` ASC, `city`, `ticketmaster_id` UNIQUE WHERE NOT NULL

## Subscriber

| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK |
| email | VARCHAR(254) | NOT NULL, UNIQUE |
| is_active | BOOLEAN | DEFAULT TRUE |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
