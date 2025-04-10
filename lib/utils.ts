import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BASE_URL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToAbsoluteUrl(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `${BASE_URL}/${url.replace(/\\/g, "/")}`;
  }
  return url;
}
