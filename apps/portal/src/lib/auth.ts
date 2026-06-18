import { auth, currentUser } from "@clerk/nextjs/server";
import type { UserRole } from "@prisma/client";

export type PortalRole = UserRole;

export async function getSessionUser() {
  const user = await currentUser();
  if (!user) return null;

  const role = (user.publicMetadata?.role as PortalRole | undefined) ?? "INTERNAL";
  const companySlug = user.publicMetadata?.companySlug as string | undefined;

  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress ?? "",
    name: user.fullName ?? user.firstName ?? "User",
    role,
    companySlug,
  };
}

export async function requireRole(allowed: PortalRole[]) {
  const session = await getSessionUser();
  if (!session) return { ok: false as const, reason: "unauthenticated" as const };
  if (!allowed.includes(session.role)) {
    return { ok: false as const, reason: "forbidden" as const, session };
  }
  return { ok: true as const, session };
}

export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) return null;
  return getSessionUser();
}

export const roleLabels: Record<PortalRole, string> = {
  INTERNAL: "internal",
  FOUNDER: "founder",
  INVESTOR: "investor",
};

export function routesForRole(role: PortalRole) {
  switch (role) {
    case "INTERNAL":
      return [
        { href: "/pipeline", label: "acquisition pipeline" },
        { href: "/ventures", label: "venture directory" },
        { href: "/search", label: "portfolio search" },
        { href: "/founder", label: "founder view" },
        { href: "/investor", label: "investor view" },
      ];
    case "FOUNDER":
      return [{ href: "/founder", label: "founder dashboard" }];
    case "INVESTOR":
      return [{ href: "/investor", label: "investor portal" }];
    default: {
      const _exhaustive: never = role;
      return _exhaustive;
    }
  }
}

export function defaultRouteForRole(role: PortalRole) {
  switch (role) {
    case "INTERNAL":
      return "/pipeline";
    case "FOUNDER":
      return "/founder";
    case "INVESTOR":
      return "/investor";
    default: {
      const _exhaustive: never = role;
      return _exhaustive;
    }
  }
}
