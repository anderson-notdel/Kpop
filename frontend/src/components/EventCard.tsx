import Link from "next/link";
import type { EventSummary } from "@/lib/types";
import { formatDateShort } from "@/lib/format";
import { CARD_THEMES } from "@/lib/themes";

interface EventCardProps {
  event: EventSummary;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const date = new Date(event.date_time);
  const isPast = date < new Date();
  const theme = CARD_THEMES[index % CARD_THEMES.length];

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`block rounded-card border-card overflow-hidden card-hover ${
        isPast ? "opacity-60" : ""
      }`}
    >
      {/* Gradient header */}
      <div className={`relative ${theme.gradient} p-5 overflow-hidden`}>
        <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-white/15" />
        <div className="absolute -bottom-3 right-10 w-12 h-12 rounded-full bg-white/10" />
        <span className="text-3xl mb-2 block">{theme.emoji}</span>
        <h3 className="font-heading font-semibold text-white line-clamp-2 relative z-10 text-lg">
          {event.title}
        </h3>
      </div>

      {/* Card body */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          {event.is_featured && (
            <span className={`badge ${theme.badge}`}>
              ✨ Featured
            </span>
          )}
          {isPast && (
            <span className="badge-muted">Past</span>
          )}
        </div>
        <p className="text-sm text-foreground/60">
          📅 {formatDateShort(date)}
        </p>
        <p className="text-sm text-foreground/50">
          📍 {event.venue} &middot; {event.city}
        </p>
        {event.group && (
          <p className={`text-xs font-medium ${theme.accent}`}>
            🎤 {event.group.name}
          </p>
        )}
      </div>
    </Link>
  );
}
