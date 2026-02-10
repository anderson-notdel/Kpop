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
    <div className="space-y-8">
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">K-Pop Events</h1>
          <CityFilter
            cities={cities}
            selected={selectedCity}
            onChange={setSelectedCity}
          />
        </div>
        <Calendar events={filtered} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Upcoming Events</h2>
        {filtered.length === 0 ? (
          <p className="text-gray-500">No events found{selectedCity ? ` in ${selectedCity}` : ""}.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
