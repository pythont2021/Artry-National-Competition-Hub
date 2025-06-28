
# Application Structure

This document provides an overview of the key directories and files in this Next.js application.

## `src/`

This is the main source directory for the application.

### `src/app/`

This directory contains all the application's routes, following the Next.js App Router convention.

- **`src/app/layout.tsx`**: The root layout for the entire application. It includes the `<html>` and `<body>` tags.
- **`src/app/globals.css`**: Global CSS styles and Tailwind CSS configuration, including the color theme for ShadCN UI.
- **`src/app/page.tsx`**: The main landing page for the Sajre Foundation.

#### `src/app/(main)/`

This is a route group that shares a common layout for the main user-facing sections of the site.

- **`src/app/(main)/layout.tsx`**: A shared layout that includes the `<Header>` and `<Footer>` components. It also manages the authentication state for all pages within this group.

- **`src/app/(main)/competition/`**: Contains pages related to the art competition.
  - `page.tsx`: The competition hub page.
  - `about-art/page.tsx`: About the competition page.
  - `events/`: Pages for current, upcoming, and future events.
  - `gallery/page.tsx`: The public art gallery.
  - `testimonials/page.tsx`: Participant testimonials.
  - `vote/page.tsx`: The protected voting page.

- **`src/app/(main)/dashboard/`**: Contains protected pages for logged-in users.
  - `participant/page.tsx`: The dashboard for registered participants.

- **`src/app/(main)/login/`**: The user login page and its associated server actions.
  - `page.tsx`: The login form component.
  - `actions.ts`: The server action for handling login/logout logic.

- **`src/app/(main)/register/`**: The user registration flow.
  - `page.tsx`: The main registration type selection page.
  - `participant/page.tsx`: The registration form for participants.
  - `teacher/page.tsx`: The registration form for teachers/volunteers.
  - `jury/page.tsx`: The registration form for the jury.

### `src/components/`

This directory holds all reusable React components.

- **`src/components/ui/`**: Contains the pre-built UI components from the ShadCN library (e.g., `Button`, `Card`, `Input`).
- **`footer.tsx`, `header.tsx`, `logo.tsx`**: Core site navigation and branding components.
- **`motivational-message.tsx`**: A component displayed on the participant dashboard.
- **`vote-client-page.tsx`**: The interactive client component for the voting page.

### `src/ai/`

This directory is for all Generative AI functionality, powered by Genkit.

- **`genkit.ts`**: The core Genkit configuration file, initializing the AI plugin.
- **`dev.ts`**: Used for running Genkit flows in development.

### `src/hooks/`

Contains custom React hooks.

- **`use-toast.ts`**: A hook for managing and displaying toast notifications.
- **`use-mobile.ts`**: A hook to detect if the user is on a mobile device.

### `src/lib/`

Holds utility functions and libraries.

- **`utils.ts`**: General utility functions, such as `cn` for merging Tailwind CSS classes.

## Root Directory

- **`next.config.ts`**: The configuration file for the Next.js framework.
- **`tailwind.config.ts`**: The configuration file for Tailwind CSS.
- **`package.json`**: Lists the project dependencies and scripts.
- **`tsconfig.json`**: The TypeScript configuration file.
- **`components.json`**: The configuration file for ShadCN UI.
