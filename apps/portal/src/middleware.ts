import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublic = createRouteMatcher([
  "/login(.*)",
  "/api/webhooks/investment-inbound(.*)",
  "/ventures-site(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!process.env.CLERK_SECRET_KEY) return;
  if (!isPublic(request)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
