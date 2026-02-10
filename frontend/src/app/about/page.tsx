import type { Metadata } from "next";
import SubscribeForm from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "About - K-Pop Event Hub",
  description: "Learn about K-Pop Event Hub and subscribe for event notifications",
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold">About K-Pop Event Hub</h1>
        <p className="mt-4 max-w-2xl text-gray-600">
          K-Pop Event Hub is your go-to source for K-pop concerts, fan meetings,
          and events across North America. We aggregate event listings from
          Ticketmaster and other sources so you never miss a show.
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="mb-2 text-xl font-semibold">Stay Updated</h2>
        <p className="mb-4 text-sm text-gray-600">
          Subscribe to get notified when new events are added.
        </p>
        <SubscribeForm />
      </section>
    </div>
  );
}
