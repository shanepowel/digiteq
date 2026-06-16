import { NextResponse } from "next/server";
import { submitContactToHubspot, type ContactPayload } from "@/lib/hubspot/submit";
import { sendContactNotification } from "@/lib/resend/send";

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;

  if (!payload.email || !payload.message) {
    return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
  }

  try {
    await submitContactToHubspot(payload);
    await sendContactNotification({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      website: payload.website,
      interest: payload.interest,
      message: payload.message,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit enquiry." }, { status: 500 });
  }
}
