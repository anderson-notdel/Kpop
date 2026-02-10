import Link from "next/link";
import type { EventSummary } from "@/lib/types";

interface EventCardProps {
  event: EventSummary;
}

export default function EventCard({ event }: EventCardProps) {
  const date = new Date(event.date_time);
  const isPast = date < new Date();

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`block rounded-lg border border-gray-200 bg-white transition hover:shadow-md ${
        isPast ? "opacity-50" : ""
      }`}
    >
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="h-40 w-full rounded-t-lg object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <div className="mb-1 flex items-center gap-2">
          {event.is_featured && (
            <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
              Featured
            </span>
          )}
          {isPast && (
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
              Past
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-2">{event.title}</h3>
        <p className="mt-1 text-sm text-gray-600">
          {date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-sm text-gray-500">
          {event.venue} &middot; {event.city}
        </p>
        {event.group && (
          <p className="mt-1 text-xs text-purple-600">{event.group.name}</p>
        )}
      </div>
    </Link>
  );
}
