import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDashboardLink(userType?: string) {
  if (!userType) {
    return "/login";
  }

  const validRoles = ['participant', 'artist', 'volunteer', 'jury', 'vendor', 'audience'];

  if (validRoles.includes(userType)) {
      return `/dashboard/${userType}`;
  }

  return "/login";
}
