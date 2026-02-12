"use client";

import { useEffect, useState } from "react";

const EMOJIS = [
  "🎵", "🎤", "💜", "🎶", "✨", "🎪", "💫", "🌟", "🎭", "🎧",
  "🎉", "🪩", "💃", "🎸", "🎹", "🎺", "👑", "🦋", "🌈", "🔥",
  "💖", "🎊", "🪄", "⚡", "🍭", "💎", "🫧", "🎀", "🌸", "🎬",
];

/* Animation tuning — adjust these to change the floating behavior */
const COUNT = 30;
const RISE_DURATION = { min: 8, range: 7 };     // 8–15s per rise cycle
const SWAY_DURATION = { min: 2, range: 2 };     // 2–4s per sway cycle
const DELAY_RANGE = 12;                          // 0–12s staggered start
const SIZE = { min: 1.2, range: 1.5 };          // 1.2–2.7rem
const SPREAD_JITTER = 6;                         // ±3% horizontal jitter

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  riseDuration: number;
  swayDuration: number;
  size: number;
}

export default function FloatingEmojis() {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const items: FloatingEmoji[] = Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: (i / COUNT) * 100 + (Math.random() * SPREAD_JITTER - SPREAD_JITTER / 2),
      delay: Math.random() * DELAY_RANGE,
      riseDuration: RISE_DURATION.min + Math.random() * RISE_DURATION.range,
      swayDuration: SWAY_DURATION.min + Math.random() * SWAY_DURATION.range,
      size: SIZE.min + Math.random() * SIZE.range,
    }));
    setEmojis(items);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {emojis.map((e) => (
        <span
          key={e.id}
          className="absolute select-none"
          style={{
            left: `${e.left}%`,
            bottom: "-40px",
            fontSize: `${e.size}rem`,
            opacity: 0,
            willChange: "transform",
            animation: `rise ${e.riseDuration}s linear ${e.delay}s infinite backwards, sway ${e.swayDuration}s ease-in-out ${e.delay}s infinite alternate backwards`,
          }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
}
