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
      className="input-field w-auto"
      aria-label="Filter by city"
    >
      <option value="">🏙️ All Cities</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}
