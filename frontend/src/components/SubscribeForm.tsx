"use client";

import { useState } from "react";
import { subscribe } from "@/lib/api";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await subscribe(email);
      setStatus("success");
      setMessage("You're subscribed! We'll notify you about new events.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="email" className="mb-1 block text-sm font-heading font-medium text-foreground/60">
          ✉️ Email address
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="input-field"
          disabled={status === "loading"}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary"
      >
        {status === "loading" ? "Subscribing... ⏳" : "Subscribe 🎉"}
      </button>
      {message && (
        <p className={`text-sm ${status === "success" ? "text-green-600" : "text-coral-500"}`}>
          {status === "success" ? "🎉 " : "😥 "}{message}
        </p>
      )}
    </form>
  );
}
