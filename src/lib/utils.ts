
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns the dashboard link for a given user role.
 * This function provides a stable and predictable routing mechanism.
 * 
 * @param userType The role of the user (e.g., 'artist', 'jury').
 * @returns The absolute path to the user's dashboard.
 */
export function getDashboardLink(userType?: string | null): string {
  // Define a map of roles to their specific dashboard paths.
  const dedicatedDashboards: { [key: string]: string } = {
    'artist': '/dashboard/artist',
    'jury': '/dashboard/jury',
    'volunteer': '/dashboard/volunteer',
    'vendor': '/dashboard/vendor',
    'participant': '/dashboard/participant',
  };

  // If the userType exists and has a dedicated dashboard, return its path.
  if (userType && dedicatedDashboards[userType]) {
    return dedicatedDashboards[userType];
  }
  
  // For all other cases (e.g., 'audience', null, undefined, or any other role),
  // return the safe, default audience dashboard.
  return "/dashboard/audience";
}
