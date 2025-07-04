
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDashboardLink(userType?: string) {
  // Add 'participant' to the list of roles with a dedicated dashboard.
  const validRoles = ['artist', 'volunteer', 'jury', 'vendor', 'participant'];

  if (userType && validRoles.includes(userType)) {
      return `/dashboard/${userType}`;
  }
  
  // Default to the audience dashboard for users with the 'audience' role,
  // no role, or any other unrecognized role. This is a safe fallback.
  return "/dashboard/audience";
}
