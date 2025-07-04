
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDashboardLink(userType?: string) {
  if (userType === 'artist') {
    return '/dashboard/artist';
  }

  const validRoles = ['volunteer', 'jury', 'vendor'];
  if (userType && validRoles.includes(userType)) {
      return `/dashboard/${userType}`;
  }
  
  // Participant, audience, no role, or any other unrecognized role go to the audience dashboard.
  // This makes the audience dashboard the safe default landing spot.
  return "/dashboard/audience";
}
