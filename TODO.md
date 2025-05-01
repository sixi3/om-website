# TODO: Build OneMoney Inspired React Website

This document outlines the steps to create a React website similar in structure and style to `https://onemoney.webflow.io/`.

**Tech Stack:**

*   **Framework:** Next.js
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn/ui
*   **Animations:** Framer Motion
*   **Deployment:** Vercel

**Steps:**

1.  **Project Setup:**
    *   [x] Initialize Next.js project (`npx create-next-app@latest`).
    *   [x] Integrate Tailwind CSS.
    *   [x] Set up Shadcn/ui.
    *   [x] Install Framer Motion (`npm install framer-motion`).
    *   [x] Set up project structure (e.g., `components/`, `sections/`, `lib/`, `styles/`, `public/`).
    *   [x] Initialize Git repository.

2.  **Global Layout & Styles:**
    *   [x] Define global layout component (`components/Layout.tsx`).
    *   [x] Implement Header component (`components/Header.tsx`) with navigation.
        *   Applied inset, glassmorphic styling (scroll-dependent).
        *   Added SVG logo and adjusted size/header height.
        *   Styled nav links (spacing, case, letter-spacing, hover effect).
        *   Added chevrons to specific nav links.
        *   Added styled button (metallic/shine) to actions section.
    *   [x] Implement Footer component (`components/Footer.tsx`) with links and copyright.
    *   [x] Define global styles and typography (using `globals.css` and Tailwind configuration `tailwind.config.js`).
    *   [x] Configure theme using Shadcn/ui theming.

3.  **Component Development:**
    *   [x] Create `TiltCard` component (`src/components/ui/tilt-card.tsx`).
    *   [ ] Create reusable Button component (or customize Shadcn/ui Button).
        *   Note: `src/components/ui/glowing-button.tsx` currently implements the metallic/shine button used in header/hero.
    *   [ ] Create Card component (for features, leadership, solutions). // Note: Might use TiltCard instead
    *   [x] Create Animated Counter component (`src/components/ui/animated-counter.tsx`).
    *   [ ] Create Stat Display component. // Maybe merge with Animated Counter or use it within Stats section
    *   [ ] Create Image/Icon components (consider using `next/image` for optimization).
    *   [ ] (Cleanup Later) Review and remove unused dependencies (e.g., three, @react-three/fiber).

4.  **Implement Global Aurora Background:**
    *   [x] Create `src/components/ui/aurora-background.tsx` (based on Aceternity UI).
    *   [x] Copy Aceternity UI Aurora Background source code into the file.
    *   [x] Update `src/app/globals.css` with Tailwind v4 keyframes/variables for Aurora effect.
    *   [x] Integrate `AuroraBackground` component into `src/app/layout.tsx` to wrap all page content.

5.  **Page Sections Implementation (on `app/page.tsx` or similar):**
    *   [x] Implement Hero section (`sections/Hero.tsx`).
        *   Styled highlight for "Consent-Driven".
        *   Added styled badge/tag with icon (glassmorphic).
        *   Implemented metallic/shine button style (from component).
        *   Adjusted padding, alignment, and line height.
        *   Added infinite scroll client logo banner (`react-fast-marquee`).
        *   Added styled label above marquee (with flanking lines).
    *   [ ] Implement "What is OneMoney?" section (`sections/WhatIsOneMoney.tsx`).
    *   [x] Implement "Security and Compliance" section (`sections/SecurityCompliance.tsx`).
    *   [x] Implement Stats section (`sections/Stats.tsx`).
        *   Used Animated Counter for numbers.
        *   Styled title and numbers with metallic effect.
        *   Centered grid layout.
    *   [ ] Implement Leadership section (`sections/Leadership.tsx`) using Cards.
    *   [ ] Implement "Privacy is Your Right" (DPDP Act) section (`sections/Privacy.tsx`).
    *   [ ] Implement "Solutions for Businesses" section (`sections/Solutions.tsx`) using Cards/Tabs.
    *   [ ] Integrate all sections into the main page.

6.  **Styling & Responsiveness:**
    *   [ ] Apply Tailwind CSS utility classes to all components and sections.
    *   [ ] Ensure responsiveness across different screen sizes (mobile, tablet, desktop) using Tailwind's responsive modifiers.
    *   [ ] Refine spacing, alignment, and visual details to match the reference site.

7.  **Content Integration:**
    *   [ ] Replace placeholder text with actual content.
    *   [ ] Source and optimize images/icons (ensure proper licensing). Place static assets in the `public` directory.
    *   [ ] Update navigation links and footer links.

8.  **Animations (Optional):**
    *   [ ] Add subtle entrance animations to sections using Framer Motion.
    *   [ ] Add hover effects or micro-interactions where appropriate.

9.  **Testing:**
    *   [ ] Test responsiveness thoroughly on different devices/browsers.
    *   [ ] Check for accessibility issues (using browser dev tools or linters).
    *   [ ] Verify all links and interactions work correctly.
    *   [ ] Perform basic performance checks (Lighthouse).

10. **Deployment:**
    *   [ ] Set up a Vercel account.
    *   [ ] Connect Git repository to Vercel.
    *   [ ] Configure deployment settings.
    *   [ ] Deploy the site.
    *   [ ] Set up custom domain (if applicable).

11. **Post-Launch:**
    *   [ ] Monitor performance and uptime.
    *   [ ] Gather feedback and iterate. 