import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "K-Pop Event Hub",
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
    <div className="bg-purple-600 text-white px-4 py-2">
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
      <body className={`${geistSans.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <AnnouncementBar />

        <header className="border-b border-gray-200 bg-white">
          <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-bold text-purple-600">
              K-Pop Event Hub
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-purple-600">
                Events
              </Link>
              <Link href="/about" className="hover:text-purple-600">
                About
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} K-Pop Event Hub
          </div>
        </footer>
      </body>
    </html>
  );
}
