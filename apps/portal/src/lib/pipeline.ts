import type { UserRole } from "@prisma/client";
import { prisma, hasDatabase } from "@/lib/db";

export async function upsertUserFromClerk(input: {
  id: string;
  email: string;
  name?: string;
  role?: UserRole;
  companySlug?: string;
}) {
  if (!hasDatabase()) return null;

  return prisma.user.upsert({
    where: { id: input.id },
    create: {
      id: input.id,
      email: input.email,
      name: input.name,
      role: input.role ?? "INTERNAL",
      companySlug: input.companySlug,
    },
    update: {
      email: input.email,
      name: input.name,
      role: input.role,
      companySlug: input.companySlug,
    },
  });
}

export async function createDealFromInvestment(payload: {
  name: string;
  email: string;
  businessName?: string;
  businessUrl?: string;
  businessType?: string;
  revenueRange?: string;
  yearsOperating?: string;
  trafficSource?: string;
  reason?: string;
  message?: string;
}) {
  if (!hasDatabase()) return null;

  const summary = [
    payload.businessType && `type: ${payload.businessType}`,
    payload.revenueRange && `revenue: ${payload.revenueRange}`,
    payload.yearsOperating && `years: ${payload.yearsOperating}`,
    payload.trafficSource && `traffic: ${payload.trafficSource}`,
    payload.reason && `reason: ${payload.reason}`,
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  return prisma.pipelineDeal.create({
    data: {
      name: payload.businessName || payload.name,
      website: payload.businessUrl,
      industry: payload.businessType,
      revenueRange: payload.revenueRange,
      contactName: payload.name,
      contactEmail: payload.email,
      summary,
      source: "investment-form",
      stage: "NEW",
    },
  });
}
