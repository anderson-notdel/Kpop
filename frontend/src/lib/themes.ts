/** Card color themes — cycled via `index % CARD_THEMES.length` */
export interface CardTheme {
  gradient: string;
  emoji: string;
  accent: string;
  badge: string;
}

export const CARD_THEMES: CardTheme[] = [
  { gradient: "gradient-coral", emoji: "🎤", accent: "text-coral-500", badge: "bg-coral-50 text-coral-500" },
  { gradient: "gradient-lavender", emoji: "💜", accent: "text-lavender-500", badge: "bg-lavender-50 text-lavender-500" },
  { gradient: "gradient-mint", emoji: "🌿", accent: "text-mint-400", badge: "bg-mint-50 text-mint-400" },
  { gradient: "gradient-indigo", emoji: "🎵", accent: "text-indigo-500", badge: "bg-indigo-50 text-indigo-500" },
  { gradient: "gradient-amber", emoji: "⭐", accent: "text-amber-500", badge: "bg-amber-50 text-amber-500" },
  { gradient: "gradient-sky", emoji: "🎶", accent: "text-sky-400", badge: "bg-sky-50 text-sky-400" },
];
