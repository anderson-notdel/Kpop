"use client";

import { useMemo, useState } from "react";
import type { EventSummary } from "@/lib/types";

interface CalendarProps {
  events: EventSummary[];
  onDateClick?: (date: string) => void;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({ events, onDateClick }: CalendarProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventSummary[]>();
    for (const event of events) {
      const d = new Date(event.date_time);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const arr = map.get(key) ?? [];
      arr.push(event);
      map.set(key, arr);
    }
    return map;
  }, [events]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="rounded-card border-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded-pill px-4 py-1.5 text-sm font-medium hover:bg-coral-50 transition-colors"
          aria-label="Previous month"
        >
          &larr;
        </button>
        <h2 className="text-lg font-heading font-semibold">
          {MONTH_NAMES[month]} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="rounded-pill px-4 py-1.5 text-sm font-medium hover:bg-coral-50 transition-colors"
          aria-label="Next month"
        >
          &rarr;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-foreground/40">
        {DAY_NAMES.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="h-12" />;
          }

          const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayEvents = eventsByDate.get(dateKey) ?? [];
          const isPast = dateKey < today;
          const isToday = dateKey === today;

          return (
            <button
              key={dateKey}
              onClick={() => dayEvents.length > 0 && onDateClick?.(dateKey)}
              className={`relative flex h-12 flex-col items-center justify-start rounded-inner-btn p-1 text-sm transition-all ${
                isPast ? "text-foreground/25" : "text-foreground/80"
              } ${isToday ? "ring-2 ring-coral-400" : ""} ${
                dayEvents.length > 0 ? "cursor-pointer hover:bg-coral-50" : "cursor-default"
              }`}
            >
              <span>{day}</span>
              {dayEvents.length > 0 && (
                <span
                  className={`mt-0.5 h-1.5 w-1.5 rounded-full ${
                    isPast ? "bg-foreground/20" : "bg-coral-500"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
