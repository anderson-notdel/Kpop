export interface GroupSummary {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
}

export interface GroupDetail extends GroupSummary {
  description: string | null;
  is_active: boolean;
}

export interface EventSummary {
  id: string;
  title: string;
  slug: string;
  date_time: string;
  venue: string;
  city: string;
  image_url: string | null;
  group: GroupSummary | null;
  is_featured: boolean;
}

export interface EventDetail extends EventSummary {
  description: string | null;
  state_province: string | null;
  country: string;
  ticket_url: string | null;
  source: "manual" | "ticketmaster";
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
