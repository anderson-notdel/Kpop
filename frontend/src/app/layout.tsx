import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import Link from "next/link";
import FloatingEmojis from "@/components/FloatingEmojis";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CRAFTERS - K-Pop Events",
  description: "Discover K-Pop concerts and events across North America",
};

function AnnouncementBar() {
  const text = process.env.NEXT_PUBLIC_ANNOUNCEMENT_TEXT;
  const link = process.env.NEXT_PUBLIC_ANNOUNCEMENT_LINK;
  if (!text) return null;

  const content = (
    <p className="text-sm font-medium text-center">{text}</p>
  );

  return (
    <div className="bg-rainbow text-white px-4 py-2">
      {link ? (
        <a href={link} className="hover:underline">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${dmSans.variable} font-body antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <FloatingEmojis />

        <header className="fixed top-0 left-0 right-0 z-50">
          <AnnouncementBar />
          <nav className="glass border-b border-black/5">
            <div className="mx-auto max-w-6xl flex items-center justify-between px-8 py-3">
              <Link href="/" className="text-xl font-heading font-extrabold tracking-tight">
                <span className="mr-1">🎪</span>
                <span className="text-rainbow">CRAFTERS</span>
              </Link>
              <div className="flex items-center gap-6 text-sm font-medium text-foreground/60">
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  🎤 Events
                </Link>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors duration-200"
                >
                  ✨ About
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="relative z-10 flex-1 mx-auto w-full max-w-6xl px-8 pt-28 pb-8">
          {children}
        </main>

        <footer className="relative z-10 border-t border-black/5 bg-white/50">
          <div className="mx-auto max-w-6xl px-8 py-8 text-center">
            <p className="text-sm font-heading font-bold mb-2">
              <span className="mr-1">🎪</span>
              <span className="text-rainbow">CRAFTERS</span>
            </p>
            <p className="text-xs text-foreground/40">
              &copy; {new Date().getFullYear()} CRAFTERS &middot; K-Pop Events
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
