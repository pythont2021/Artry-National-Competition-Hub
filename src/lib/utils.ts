
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDashboardLink(userType?: string) {
  if (!userType) {
    return "/login";
  }

  // Special case for new participants. They need to enroll.
  // Redirect them to the audience dashboard for now.
  if (userType === 'participant') {
    return '/dashboard/audience';
  }

  const validRoles = ['artist', 'volunteer', 'jury', 'vendor', 'audience'];

  if (validRoles.includes(userType)) {
      return `/dashboard/${userType}`;
  }

  // Fallback for any other case
  return "/login";
}
