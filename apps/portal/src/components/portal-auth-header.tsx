"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export function PortalAuthHeader() {
  return (
    <header className="mb-10 flex items-center justify-between gap-4 border-b border-border pb-6">
      <span className="text-sm font-semibold tracking-tight text-white">
        digiteq<span className="text-cyan">.</span>
      </span>
      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInButton mode="redirect" forceRedirectUrl="/login">
            <button
              type="button"
              className="rounded-[10px] border border-border px-4 py-2 text-[13px] font-medium text-white transition-colors hover:border-white/20"
            >
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="redirect" forceRedirectUrl="/login">
            <button
              type="button"
              className="rounded-[10px] bg-gradient-to-br from-[#00D4FF] to-[#8B5CF6] px-4 py-2 text-[13px] font-medium text-white"
            >
              Sign up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/login" />
        </SignedIn>
      </div>
    </header>
  );
}
