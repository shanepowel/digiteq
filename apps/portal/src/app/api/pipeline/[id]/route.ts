import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth";
import { prisma, hasDatabase } from "@/lib/db";

const patchSchema = z.object({
  stage: z.enum(["NEW", "REVIEWING", "DILIGENCE", "PASSED", "ACQUIRED"]),
});

type Props = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Props) {
  const gate = await requireRole(["INTERNAL"]);
  if (!gate.ok) {
    return NextResponse.json({ error: "Forbidden" }, { status: gate.reason === "unauthenticated" ? 401 : 403 });
  }

  if (!hasDatabase()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = await params;
  const body = patchSchema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const deal = await prisma.pipelineDeal.update({
    where: { id },
    data: { stage: body.data.stage },
  });

  return NextResponse.json({ deal });
}
