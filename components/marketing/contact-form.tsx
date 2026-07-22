"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.message.trim()) {
      setError("Fill in your name, a valid email, and a message before sending.");
      return;
    }
    setError("");
    setSubmitted(true);
    // Wired to /api/contact once the backend phase lands.
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <CheckCircle2 className="mb-3 h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        <h3 className="font-medium">Message sent</h3>
        <p className="mt-1 text-sm text-muted">We'll get back to you within a day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs text-muted">Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input-field"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-muted">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input-field"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-muted">Message</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
          className="input-field resize-none"
          placeholder="How can we help?"
        />
      </div>
      {error && <p className="text-xs text-accent-400">{error}</p>}
      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
      >
        Send message
      </button>
    </form>
  );
}
