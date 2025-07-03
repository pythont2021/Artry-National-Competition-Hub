
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDashboardLink(userType?: string) {
  // Participants should be redirected to the audience dashboard as their specific dashboard is not yet ready.
  if (userType === 'participant') {
    return "/dashboard/audience";
  }

  const validRoles = ['artist', 'volunteer', 'jury', 'vendor'];

  if (userType && validRoles.includes(userType)) {
      return `/dashboard/${userType}`;
  }
  
  // Default to the audience dashboard for users with the 'audience' role,
  // no role, or any other unrecognized role. This is a safe fallback.
  return "/dashboard/audience";
}
