import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent } from "@/lib/api";
import { formatDateLong, formatTime } from "@/lib/format";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  let event;
  try {
    event = await getEvent(slug);
  } catch {
    notFound();
  }

  const date = new Date(event.date_time);
  const isPast = date < new Date();

  return (
    <article className="space-y-6 animate-slide-up">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-coral-500 hover:underline"
      >
        &larr; Back to events
      </Link>

      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="h-64 w-full rounded-card object-cover sm:h-80"
        />
      )}

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {event.is_featured && (
            <span className="badge bg-coral-50 text-coral-500">
              ✨ Featured
            </span>
          )}
          {isPast && (
            <span className="badge-muted">Past Event</span>
          )}
        </div>

        <h1 className="text-3xl font-heading font-bold">{event.title}</h1>

        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-heading font-medium text-foreground/40">📅 Date & Time</dt>
            <dd className="text-foreground">
              {formatDateLong(date)} at {formatTime(date)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-heading font-medium text-foreground/40">🏟️ Venue</dt>
            <dd className="text-foreground">{event.venue}</dd>
          </div>
          <div>
            <dt className="text-sm font-heading font-medium text-foreground/40">📍 Location</dt>
            <dd className="text-foreground">
              {event.city}
              {event.state_province ? `, ${event.state_province}` : ""},{" "}
              {event.country}
            </dd>
          </div>
          {event.group && (
            <div>
              <dt className="text-sm font-heading font-medium text-foreground/40">🎤 Artist</dt>
              <dd className="text-foreground">{event.group.name}</dd>
            </div>
          )}
        </dl>

        {event.description && (
          <div>
            <h2 className="mb-2 text-lg font-heading font-semibold">About</h2>
            <p className="text-foreground/70 whitespace-pre-line">{event.description}</p>
          </div>
        )}

        {event.ticket_url && !isPast && (
          <a
            href={event.ticket_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block btn-primary py-3.5"
          >
            🎟️ Buy Tickets
          </a>
        )}
      </div>
    </article>
  );
}
