"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { DhCard } from "@/components/layout/dh-primitives";
import { contactTypes } from "@/data/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" },
    });
    setStatus(response.ok ? "sent" : "error");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <DhCard className="max-w-[720px]">
      <form onSubmit={onSubmit} className="grid gap-5">
        <div>
          <label className="dh-label" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            placeholder="Your name"
            className="dh-input"
          />
        </div>
        <div>
          <label className="dh-label" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="dh-input"
          />
        </div>
        <div>
          <label className="dh-label" htmlFor="contact-company">
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            placeholder="Company or asset name"
            className="dh-input"
          />
        </div>
        <div>
          <label className="dh-label" htmlFor="contact-website">
            Website
          </label>
          <input
            id="contact-website"
            name="website"
            placeholder="https://example.com"
            className="dh-input"
          />
        </div>
        <div>
          <label className="dh-label" htmlFor="contact-interest">
            Interest
          </label>
          <select id="contact-interest" name="interest" defaultValue="Investment Enquiry" className="dh-input">
            {contactTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="dh-label" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Tell us what you are building, selling or exploring."
            className="dh-input resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="dh-btn dh-btn-fill inline-flex items-center gap-2"
        >
          {status === "sending" ? "Sending" : "Send Enquiry"} <ArrowRight className="h-4 w-4" />
        </button>
        {status === "sent" && (
          <p className="text-sm text-[var(--ledger)]">Thanks. Your enquiry has been routed.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-[var(--ink-dim)]">Something went wrong. Please try again.</p>
        )}
      </form>
    </DhCard>
  );
}
