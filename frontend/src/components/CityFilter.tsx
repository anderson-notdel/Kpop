"use client";

interface CityFilterProps {
  cities: string[];
  selected: string;
  onChange: (city: string) => void;
}

export default function CityFilter({ cities, selected, onChange }: CityFilterProps) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
      aria-label="Filter by city"
    >
      <option value="">All Cities</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}
