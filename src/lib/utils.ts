import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDashboardLink(authToken?: string) {
  if (!authToken) {
    return "/login";
  }

  if (authToken.includes('participant')) {
      return '/dashboard/participant';
  } else if (authToken.includes('artist')) {
      return '/dashboard/artist';
  } else if (authToken.includes('volunteer')) {
      return '/dashboard/volunteer';
  } else if (authToken.includes('jury')) {
      return '/dashboard/jury';
  } else if (authToken.includes('vendor')) {
      return '/dashboard/vendor';
  } else if (authToken.includes('audience')) {
      return '/dashboard/audience';
  }

  return "/login";
}
