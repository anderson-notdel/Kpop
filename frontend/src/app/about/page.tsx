import type { Metadata } from "next";
import SubscribeForm from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "About - CRAFTERS K-Pop Events",
  description: "Learn about CRAFTERS and subscribe for K-Pop event notifications",
};

export default function AboutPage() {
  return (
    <div className="space-y-10 animate-slide-up">
      <section>
        <h1 className="text-3xl font-heading font-bold">
          About <span className="text-rainbow">CRAFTERS</span> 🎪
        </h1>
        <p className="mt-4 max-w-2xl text-foreground/50 leading-relaxed">
          CRAFTERS is your go-to source for K-pop concerts, fan meetings,
          and events across North America. We aggregate event listings from
          Ticketmaster and other sources so you never miss a show 🎵
        </p>
      </section>

      <section className="rounded-card border-card p-8">
        <h2 className="mb-2 text-xl font-heading font-semibold">📬 Stay Updated</h2>
        <p className="mb-4 text-sm text-foreground/50">
          Subscribe to get notified when new events are added ✨
        </p>
        <SubscribeForm />
      </section>
    </div>
  );
}
