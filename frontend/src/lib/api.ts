import type {
  EventDetail,
  EventSummary,
  GroupDetail,
  GroupSummary,
  PaginatedResponse,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function getEvents(params?: {
  city?: string;
  month?: number;
  year?: number;
  featured?: boolean;
  page?: number;
}): Promise<PaginatedResponse<EventSummary>> {
  const sp = new URLSearchParams();
  if (params?.city) sp.set("city", params.city);
  if (params?.month) sp.set("month", String(params.month));
  if (params?.year) sp.set("year", String(params.year));
  if (params?.featured) sp.set("featured", "true");
  if (params?.page) sp.set("page", String(params.page));
  const qs = sp.toString();
  return fetchJSON(`/events/${qs ? `?${qs}` : ""}`);
}

export async function getEvent(slug: string): Promise<EventDetail> {
  return fetchJSON(`/events/${slug}/`);
}

export async function getGroups(
  page?: number,
): Promise<PaginatedResponse<GroupSummary>> {
  const qs = page ? `?page=${page}` : "";
  return fetchJSON(`/groups/${qs}`);
}

export async function getGroup(slug: string): Promise<GroupDetail> {
  return fetchJSON(`/groups/${slug}/`);
}

export async function getCities(): Promise<string[]> {
  return fetchJSON("/cities/");
}

export async function subscribe(email: string): Promise<{ id: string; email: string; created_at: string }> {
  const res = await fetch(`${API_URL}/subscribers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.email?.[0] ?? data.detail ?? "Subscription failed");
  }
  return res.json();
}
