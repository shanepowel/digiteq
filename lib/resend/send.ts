import { Resend } from "resend";

let resend: Resend | null = null;

export function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendContactNotification(payload: {
  name?: string;
  email: string;
  company?: string;
  website?: string;
  interest?: string;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) return;

  const client = getResend();
  await client.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Digiteq <hello@digiteq.com>",
    to: process.env.CONTACT_TO_EMAIL,
    subject: `Digiteq enquiry: ${payload.interest || "General Contact"}`,
    text: [
      `Name: ${payload.name || "Unknown"}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company || "Not provided"}`,
      `Website: ${payload.website || "Not provided"}`,
      `Interest: ${payload.interest || "General Contact"}`,
      "",
      payload.message,
    ].join("\n"),
  });
}

export async function subscribeNewsletter(email: string) {
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) return;

  const client = getResend();
  await client.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Digiteq <hello@digiteq.com>",
    to: process.env.CONTACT_TO_EMAIL,
    subject: "Digiteq newsletter signup",
    text: `New newsletter subscriber: ${email}`,
  });
}
