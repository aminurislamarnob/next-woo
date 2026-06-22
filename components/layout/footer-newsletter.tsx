"use client";

import * as React from "react";
import { Send } from "lucide-react";

export function FooterNewsletter() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // No backend wired up yet — acknowledge locally.
    setSubmitted(true);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="not-prose">
      <div className="flex items-stretch overflow-hidden rounded-md border bg-background">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email*"
          aria-label="Email address"
          className="flex-1 min-w-0 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="flex w-12 flex-shrink-0 items-center justify-center bg-brand text-brand-foreground transition-colors hover:bg-brand-hover"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      {submitted && (
        <p className="mt-2 text-xs text-brand">Thanks for subscribing!</p>
      )}
    </form>
  );
}
