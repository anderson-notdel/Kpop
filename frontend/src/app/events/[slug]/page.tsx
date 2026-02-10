import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent } from "@/lib/api";

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
    <article className="space-y-6">
      <Link href="/" className="text-sm text-purple-600 hover:underline">
        &larr; Back to events
      </Link>

      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="h-64 w-full rounded-lg object-cover sm:h-80"
        />
      )}

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {event.is_featured && (
            <span className="rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
              Featured
            </span>
          )}
          {isPast && (
            <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
              Past Event
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold">{event.title}</h1>

        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
            <dd className="text-gray-900">
              {date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              at{" "}
              {date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Venue</dt>
            <dd className="text-gray-900">{event.venue}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="text-gray-900">
              {event.city}
              {event.state_province ? `, ${event.state_province}` : ""},{" "}
              {event.country}
            </dd>
          </div>
          {event.group && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Artist</dt>
              <dd className="text-gray-900">{event.group.name}</dd>
            </div>
          )}
        </dl>

        {event.description && (
          <div>
            <h2 className="mb-2 text-lg font-semibold">About</h2>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
        )}

        {event.ticket_url && !isPast && (
          <a
            href={event.ticket_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            Buy Tickets
          </a>
        )}
      </div>
    </article>
  );
}
