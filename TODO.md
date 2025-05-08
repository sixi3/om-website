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
        *   [x] Adjusted hamburger menu breakpoint to `lg` (visible on mobile/tablet).
        *   [x] Ensured logo size is consistent across breakpoints (`flex-shrink-0`).
        *   [x] Updated "Use Cases" link to `href="#solutions"`.
        *   [x] Updated "Contact Us" link to `href="#contact-us"`.
    *   [x] Implement Footer component (`components/Footer.tsx`).
        *   [x] Structure with top (logo, links, newsletter/contact) and bottom (copyright, social) sections.
        *   [x] Add logo (`public/om-logo.svg`) to top-left.
        *   [x] Implement 6-column layout for top section (Logo:1, Links:1x3, Reach Out:2).
        *   [x] Add column headings (Solutions, Governance, About, Reach Out to Us).
        *   [x] Add links under Solutions, Governance, About columns.
        *   [/] Implement Reach Out section (Input, Button, Background glow).
            *   (Needs Fix) Resolve Shadcn/ui Input/Button component import/addition.
            *   [x] Styled Input/Button group with background glow (colors: `#00b140` to `#baff29`).
            *   [x] Updated button text to "Send" and color.
        *   [x] Add CALL US / EMAIL US details structure.
            *   [x] Updated contact info (Phone, Email).
            *   [x] Added Copy icons next to contact details.
        *   [x] Add horizontal divider.
        *   [x] Add copyright text structure (bottom-left).
        *   (Planned) Add social media icons (Lucide: Twitter, Facebook, Instagram, Github) (bottom-right).
        *   (Planned) Apply final Tailwind CSS for typography, styling refinements.
        *   (Planned) Ensure responsiveness.
    *   [x] Define global styles and typography (using `globals.css` and Tailwind configuration `tailwind.config.js`).
    *   [x] Configure theme using Shadcn/ui theming.
    *   [x] Enabled smooth scrolling via `scroll-behavior: smooth` in `globals.css`.

3.  **Component Development:**
    *   [x] Create `TiltCard` component (`src/components/ui/tilt-card.tsx`).
    *   [x] Create reusable GlowingButton component with size variants (`src/components/ui/glowing-button.tsx`).
        *   Used in header (small) and hero (default).
    *   [ ] Create Card component (for features, leadership, solutions). // Note: Might use TiltCard instead
    *   [x] Create Animated Counter component (`src/components/ui/animated-counter.tsx`).
    *   [ ] Create Stat Display component. // Maybe merge with Animated Counter or use it within Stats section
    *   [ ] Create Image/Icon components (consider using `next/image` for optimization).
    *   [x] Create GridBackground component (`src/components/ui/grid-background.tsx`).
        *   Used in Leadership, SecurityCompliance, Stats, and Solutions sections.
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
    *   [x] Implement "What is OneMoney?" section (`sections/WhatIsOneMoney.tsx`).
        *   Added standard title/subtitle.
        *   Used Aceternity UI `StickyScroll` component.
        *   Defined 3 steps (title/description, startTime, endTime).
        *   Added video element (local source) to sticky right panel.
        *   Implemented video-driven playback:
            *   Removed scroll-driven logic (`useScroll`, etc.).
            *   Added `timeupdate` listener to determine `activeCard` based on video time.
            *   Removed text container auto-scrolling.
            *   Enabled autoplay (muted, no controls).
            *   Added visual progress bar with gradient under each text block, synced to video time within step.
            *   Added card styling (border, bg, blur) to active text block.
            *   Added live dot indicator to active card title.
            *   Increased component height (`h-[50rem]`) and removed internal scroll (`overflow-y-auto`).
        *   [x] Integrated into `src/app/page.tsx`.
        *   [x] **Responsive Design for Smaller Screens (implemented for `<769px`):**
            *   [x] **State Detection:** Added `isSmallScreen` state to `StickyScroll` component, updates on window resize (breakpoint `<769px`).
            *   [x] **Layout Change:**
                *   [x] Conditionally applied a stacked layout (`flex-col`) for screens `<769px`.
                *   [x] Displayed only the active text card at the top (`order-1`).
                *   [x] Positioned the video player below the active text card (`order-2`), with adjusted width and aspect ratio for mobile.
            *   [x] **Carousel Effect for Active Card:**
                *   [x] Used `AnimatePresence` and `motion.div` from Framer Motion.
                *   [x] When `activeCard` changes, the new active card slides in from the right, and the old one slides out to the left.
                *   [x] Ensured only the active card is rendered and animated at a time on small screens.
            *   [x] **Styling and Refinements:**
                *   [x] Adjusted main container classes for padding and alignment on small screens.
                *   [x] Adjusted text card font sizes for better readability on small screens.
                *   [x] Ensured video player uses an appropriate aspect ratio (`aspect-[9/16]`) on small screens.
    *   [x] Implement "UI Features Showcase" section (`sections/UIFeatures.tsx`).
        *   [x] Add standard title/subtitle.
        *   [x] Implement 2-column layout (Left: 4 text points, Right: Video).
        *   [x] Add placeholder text points for features (updated titles).
        *   [x] Added Lucide icons next to feature titles.
        *   [x] Add video player using `public/2025-05-01 22-21-31 (1).mp4` (controls, muted).
        *   [x] Integrated into `src/app/page.tsx`.
    *   [x] Implement "Security and Compliance" section (`sections/SecurityCompliance.tsx`).
        *   [x] Title: End-to-End Security and Compliance (with highlight styles).
        *   [x] Uses TiltCard for animated cards.
        *   [x] Added GridBackground.
        *   [x] **Responsive Layout Adjustments:**
            *   [x] **Main Cards:** Stacked vertically on mobile (`<lg`) and 3-column on large screens (`lg:`).
            *   [x] **Sub-points within Cards:** 
                *   Stacked vertically on mobile (`<sm`).
                *   Arranged horizontally on small tablets (`sm:` to `<md`).
                *   Stacked vertically again on medium tablets and desktops (`md:` onwards).
            *   [x] **Dividers:** Visibility of dividers between sub-points adjusted accordingly (visible when stacked, hidden when horizontal).
    *   [x] Implement Stats section (`sections/Stats.tsx`).
        *   Used Animated Counter for numbers.
        *   Styled title and numbers with metallic effect.
        *   Centered grid layout.
        *   Added "Unlock access to diverse data sets" label with flanking lines (moved outside container).
        *   Added 7 static pills below stats (4/3 layout).
        *   Styled pills with live dot indicator and Lucide icons.
        *   Added GridBackground.
    *   [x] Implement Leadership section (`sections/Leadership.tsx`) using TiltCards.
        *   Title: Guided By Leadership (with highlight styles).
        *   Uses TiltCard for animated cards with image backgrounds.
        *   Added GridBackground.
        *   Improved title formatting and line breaks for advisor titles.
    *   [x] Implement "Privacy is Your Right" (DPDP Act) section (`sections/Privacy.tsx`).
    *   [x] Create `ContactUs.tsx` Section:
        *   [x] Add standard Title and Subtitle.
        *   [x] Implement 2-column layout.
        *   [x] Left Column: Add text content and image placeholder.
        *   [x] Right Column: Embed `TalkToUsForm` component directly.
        *   [x] Apply styling.
        *   [ ] Ensure responsiveness.
        *   [x] Added `id="contact-us"` for linking.
        *   [x] Integrate into `app/page.tsx`.
    *   [x] Implement "Solutions for Businesses" section (`sections/Solutions.tsx`).
        *   [x] Used Aceternity UI Bento Grid (3 items, third spans full width).
        *   [x] Added Lucide icons (`Landmark`, `ShieldCheck`, `TrendingUp`) with custom color.
        *   [x] Populated with content for Banking, Insurance, Wealth Management.
        *   [x] Added centered Plus icon below grid.
        *   [x] Added two `react-fast-marquee` banners (full-width, opposite directions, second reversed content).
        *   [x] Populated banners with 17 use-case text pills.
        *   [x] Enabled `GridBackground` component.
        *   [x] Added `id="solutions"` for linking.
        *   [x] **Video Headers & Performance Optimizations:**
            *   [x] Replaced header image with video for the first Bento item (`/b&l.mp4`).
            *   [x] Extended to all three Bento items with respective videos.
            *   [x] Implemented hover-to-play and smooth-rewind functionality for videos in `BentoGridItem`.
            *   [x] Resolved "use client" directive error for `BentoGridItem` due to `useRef`.
            *   [x] Removed `loop` attribute from videos to prevent auto-restart on hover.
            *   [x] Removed upward `translate-y` hover effect from video header area in `BentoGridItem`.
            *   [x] **Refactored video control logic:** Moved `videoRef`, `rewindAnimationRef`, and hover handlers (`handleMouseEnter`/`handleMouseLeave` for smooth rewind) from `BentoGrid` to be correctly scoped within each `BentoGridItem`.
            *   [x] **Mobile Performance - Video Hovers:** Added mobile detection (`window.innerWidth < 768`) in `BentoGridItem` to conditionally disable video hover/rewind handlers on smaller screens.
            *   [x] **Mobile Performance - CSS Hovers:** Conditionally disabled CSS hover animations (`hover:shadow-xl` for the item and `group-hover/bento:translate-x-2` for the text block) in `BentoGridItem` on smaller screens.
        *   [x] **Bento Grid Item Layout Adjustments (Post-Video Implementation):**
            *   [x] Ensured header content (video/image) in `BentoGridItem` maintains a consistent aspect ratio (e.g., `aspect-video`) and does not stretch vertically, by adjusting flex properties and adding `aspect-video` to relevant containers.
            *   [x] Changed `justify-between` to `justify-start` in `BentoGridItem` to reduce the vertical gap between the header content and the text content below it.
            *   [x] Removed fixed row height (`md:auto-rows-[28rem]`) from `BentoGrid` in `Solutions.tsx` to allow grid items to hug their content vertically, eliminating excess space at the bottom of items.
    *   [x] Integrate all sections into the main page.

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

12. **Implement "Talk to Us" Modal:**
    *   [x] Locate/Add Trigger Button (Header & Hero `GlowingButton`).
    *   [x] Install Dependencies:
        *   [x] Add Shadcn `Dialog`: `npx shadcn@latest add dialog`.
        *   [x] Add Shadcn `Textarea`: `npx shadcn@latest add textarea`.
        *   [x] Verify Aceternity Input/Label deps (e.g., `@radix-ui/react-label` installed).
    *   [x] Add/Verify Aceternity UI Components:
        *   [x] Custom `Input` component (`src/components/ui/input.tsx`).
        *   [x] Custom `Label` component (`src/components/ui/label.tsx`).
        *   [x] `--shadow-input` variable in `globals.css`.
    *   [x] Create Form Component (`src/components/forms/TalkToUsForm.tsx`):
        *   [x] Fields: First Name, Last Name, Work Email, Phone Number (Aceternity Inputs), Comments (Shadcn Textarea).
        *   [x] Implement form state.
        *   [x] Implement submit handler (console.log).
        *   (Needs Styling) Style submit button like `GlowingButton` (rejected direct replacement).
    *   (Removed) Create Modal Component (`src/components/TalkToUsModal.tsx`).
    *   [x] Integrate Modal Logic into `Header.tsx` and `Hero.tsx`:
        *   [x] Wrapped `GlowingButton` trigger with `DialogTrigger`.
        *   [x] Added `DialogContent` containing `TalkToUsForm`.
        *   Deleted `TalkToUsModal.tsx`. 