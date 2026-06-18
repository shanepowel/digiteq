import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export const marketingUrl = process.env.NEXT_PUBLIC_MARKETING_URL ?? "https://digiteq.io";
export const venturesUrl = process.env.NEXT_PUBLIC_VENTURES_URL ?? "https://ventures.digiteq.io";
