import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/resend/send";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  try {
    await subscribeNewsletter(email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
  }
}
