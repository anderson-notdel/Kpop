"use client";

import { useState } from "react";
import type { EventSummary } from "@/lib/types";
import Calendar from "./Calendar";
import CityFilter from "./CityFilter";
import EventCard from "./EventCard";

interface HomeContentProps {
  initialEvents: EventSummary[];
  cities: string[];
}

export default function HomeContent({ initialEvents, cities }: HomeContentProps) {
  const [selectedCity, setSelectedCity] = useState("");

  const filtered = selectedCity
    ? initialEvents.filter((e) => e.city.toLowerCase() === selectedCity.toLowerCase())
    : initialEvents;

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center py-6 animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-4">
          🎪 Discover <span className="text-rainbow">K-Pop Events</span>
        </h1>
        <p className="text-foreground/50 text-lg max-w-xl mx-auto leading-relaxed">
          Your one-stop destination for K-Pop concerts, fan meets, and live events across North America ✨
        </p>
      </section>

      {/* Calendar section */}
      <section className="animate-slide-up-1">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-heading font-semibold">📅 Calendar</h2>
          <CityFilter
            cities={cities}
            selected={selectedCity}
            onChange={setSelectedCity}
          />
        </div>
        <Calendar events={filtered} />
      </section>

      {/* Events grid */}
      <section className="animate-slide-up-2">
        <h2 className="mb-4 text-xl font-heading font-semibold">🎤 Upcoming Events</h2>
        {filtered.length === 0 ? (
          <p className="text-foreground/40">
            No events found{selectedCity ? ` in ${selectedCity}` : ""} 😢
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
