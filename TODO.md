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
    *   [x] (Cleanup Later) Review and remove unused dependencies (e.g., three, @react-three/fiber).

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
    *   [ ] **Refactor "What is OneMoney?" to Automated Interactive User Journey Animation (`sections/WhatIsOneMoney.tsx`)**
        *   [ ] Add standard title/subtitle (if not already present from previous version).
        *   [x] **0. Refactor Reusable Phone Screen Header/Footer Components:**
            *   [x] **0.1. Create `PhoneScreenHeader.tsx` (`src/components/ui/PhoneScreenHeader.tsx`):**
                *   [x] Extract header structure from `AnimatedScreenContent.tsx`.
                *   [x] Props: `gradientClass?`, `logoSrc?`, `altText?`, `title`, `showBackButton?`, `showMoreButton?`, `activeKey?`, `animateTransition?` (new prop for conditional animation).
                *   [x] `AnimatedScreenContent.tsx` to use this new component (will use default `animateTransition=true`).
            *   [x] **0.2. Create `PhoneScreenFooter.tsx` (`src/components/ui/PhoneScreenFooter.tsx`):**
                *   [x] Extract footer structure from `BrandedConsentScreenBody`.
                *   [x] Props: `mode`, `infoText?`, `sliderText?`, `sliderAccentColor?`, `buttonText?`, `onButtonClick?`, `isButtonDisabled?`, `buttonAccentColor?`, `showPoweredBy?`, `isSliderProcessing?`, `onSlideAnimationComplete?` (new props for slide control).
                *   [x] `BrandedConsentScreenBody` to use this new component (conditionally, via `externalFooter={true}`).
        *   [x] **1. Remove Old StickyScroll and Video Player Implementation:**
            *   [x] Remove Aceternity UI `StickyScroll` component and its logic.
            *   [x] Remove the existing `<video>` element.
        *   [x] **2. Integrate ClayPhoneMockup into the Right Panel:**
            *   [x] Place `ClayPhoneMockup.tsx` in the right column of `WhatIsOneMoney.tsx`.
            *   [x] Create `UserJourneyAnimation.tsx` component (`src/components/UserJourneyAnimation.tsx`) as a child of `ClayPhoneMockup.tsx`.
        *   [x] **3. Design and Implement Screens within `UserJourneyAnimation.tsx` (using extracted Header/Footer):**
            *   [x] **3.1. Implement Common, Persistent Header and Footer Structure using extracted components:**
                *   [x] Use `<PhoneScreenHeader />` with:
                    *   [x] Static "MobilePe" logo (`/mobilepelogo.svg`) and "MobilePe" title.
                    *   [x] Static MobilePe gradient.
                    *   [x] `animateTransition={false}` to disable header animations between steps.
                    *   [x] `showMoreButton={false}` (Now `true` to match `AnimatedScreenContent.tsx`)
                *   [x] Use `<PhoneScreenFooter />` with props changing based on `currentSubStep`:
                    *   [x] **OTP Entry Screen:** `mode='button'`, `buttonText='Continue'`, `isButtonDisabled=true` (enables after OTP animation), `infoText` present. Auto-transitions 2s after button enables.
                    *   [x] **Consent Screen (Initial & Account Deselected steps):** `mode='slider'`, `sliderText='Slide to Approve Consent'`, `infoText` present ("By proceeding...").
                    *   [x] **Consent Sliding Action:** `mode='slider'`, `sliderText='Slide to Approve Consent'` (text remains, no "Processing..."), `infoText` present. `isSliderProcessing=true` triggers icon slide.
                    *   [x] **Success Screen:** `mode='none'` (or only `showPoweredBy=true`).
                *   [x] Central area for animated body content (flex-grow, overflow-y-auto, padding). `screenContentRef` added for scrolling.
            *   [x] **3.2. Design and Implement Animated Body Content for OTP Login Screen (`OtpEntryScreen.tsx`):**
                *   [x] Single screen showing static phone number and an OTP display field.
                *   [x] Animation types digits into the OTP field.
                *   [x] Footer "Continue" button enables after OTP animation.
                *   [x] Auto-transitions to `consent-initial` 2 seconds after "Continue" button enables (or if button is clicked).
            *   [x] **3.3. Design and Implement Animated Body Content for Consent Screen (`JourneyConsentScreen` within `UserJourneyAnimation.tsx`):**
                *   [x] Uses `BrandedConsentScreenBody` with `externalFooter={true}`.
                *   [x] **Bank Details:** Displays "HDFC Bank" and `/HDFC.svg` icon.
                *   [x] Sub-step `consent-initial`: Both accounts selected.
                *   [x] Sub-step `consent-account-deselected`:
                    *   [x] After 1s delay (internal to `JourneyConsentScreen`), second account (Current Account) animates to deselected state.
                    *   [x] `BrandedConsentScreenBody` updated to accept `isAccountADeselected`, `isAccountBDeselected` for this.
                *   [x] Updated accent color to MobilePe purple.
            *   [x] **3.4. Design and Implement Animated Body Content for Consent Action & Success Screen:**
                *   [x] Sub-step `consent-sliding`: `JourneyConsentScreen` remains visible (no "Processing..." text overlay). Footer icon slides.
                *   [x] Sub-step `success`: Header Title: "Confirmation". Body: `[x] Styled with image, title, description, and download button.`
            *   [x] **3.5. Animation Logic & State Management in `UserJourneyAnimation.tsx`:**
                *   [x] Uses Framer Motion for transitions between body content sub-steps.
                *   [x] `currentSubStep` state managed.
                *   [x] **OTP Flow:** `handleOtpAnimationComplete` enables "Continue", starts 2s timer to `consent-initial`.
                *   [x] **Consent Flow Timing & Scroll:**
                    *   `consent-initial` to `consent-account-deselected`: 2s timer.
                    *   `consent-account-deselected`: After ~1.7s (for deselection visual), scrolls to "VIEW CONSENT DETAILS" button (button in `BrandedConsentScreenBody` given `id="view-consent-details-trigger"`). Then, after 2s delay, transitions to `consent-sliding`.
                *   [x] **Slider Action:** `PhoneScreenFooter`'s `isSliderProcessing` prop (true when `currentSubStep === 'consent-sliding'`) triggers a one-way slide animation of the icon. `onSlideAnimationComplete` callback transitions to `success` step.
        *   [x] **4. Update Left Panel Text Cards:**
            *   [x] Retain three text cards.
            *   [x] Update card titles/descriptions to match: OTP Login, Consent Review, Action & Confirmation.
            *   [x] Remove `startTime`/`endTime` props from card content objects.
        *   [x] **5. Synchronize Left Panel Cards with `UserJourneyAnimation.tsx`:**
            *   [x] **5.1. State Management:** `WhatIsOneMoney.tsx` to manage `currentActiveCardIndex` (0, 1, or 2).
            *   [x] **5.2. Animation Orchestration:** `UserJourneyAnimation.tsx` manages its automated sequence. (Note: `async/await` not directly used for step timing, relies on `setTimeout` and callbacks).
            *   [x] **5.3. Callbacks:** `UserJourneyAnimation.tsx` uses `onStageChange(currentConfig.stageIndex)` to inform parent.
                *   Card 1 (Index 0) active during OTP Login sub-steps (`otp-entry`).
                *   Card 2 (Index 1) active during Consent Screen sub-steps (`consent-initial`, `consent-account-deselected`).
                *   Card 3 (Index 2) active during "Slide to Approve" (`consent-sliding`) and Success Screen (`success`).
            *   [x] `UserJourneyAnimation.tsx` updated to support `jumpToStage` prop to start from a specific stage.
            *   [x] `WhatIsOneMoney.tsx` updated to trigger `jumpToStage` on card click.
            *   [x] Made cards clickable to control animation stage and restart relevant animation sequence in `UserJourneyAnimation.tsx`.
            *   [x] **5.4. Active Card Styling:** Apply active styles (border, background, blur, live dot) to the left panel card corresponding to `currentActiveCardIndex`.
            *   [x] **5.5. Progress Bars:** Implement progress bars for left panel cards: Animate from 0% to 100% (e.g., using Framer Motion on width) over a short duration (now synced with card active duration) when the corresponding card becomes active. Progress bars also reset on click.
        *   [x] **6. Interactive Showcase of Animated Components:**
            *   [x] **6.1. Create `InteractiveShowcase.tsx`** (`src/components/InteractiveShowcase.tsx`): Manages the sequence of animated charts/cards.
                *   [x] Uses Framer Motion `AnimatePresence` and `onAnimationComplete` callbacks to transition between components.
            *   [x] **6.2. `AnimatedLineGraphCard.tsx` (`src/app/moneyone/components/AnimatedLineGraphCard.tsx`):**
                *   [x] Implemented with internal animations and `onAnimationComplete` callback.
                *   [x] Integrated into `InteractiveShowcase.tsx`.
            *   [x] **6.3. `AnimatedPieChartCard.tsx` (`src/app/moneyone/components/AnimatedPieChartCard.tsx`):**
                *   [x] Implemented with SVG-based donut chart.
                *   [x] Styled to match screenshot, including animations for segments and labels.
                *   [x] Header created to match style of `AnimatedLineGraphCard.tsx`.
                *   [x] Added duration tabs (Last Week, Last Month, Last 6 Months) - visual only.
                *   [x] Integrated into `InteractiveShowcase.tsx`.
            *   [x] **6.4. `AnimatedBarChartCard.tsx` (`src/app/moneyone/components/AnimatedBarChartCard.tsx`):** (Replaced Sankey Chart)
                *   [x] Display order: Line Graph -> Pie Chart -> Bar Chart.
                *   [x] Component created with MUI X Charts (`@mui/x-charts`).
                *   [x] **Header & Tabs:**
                    *   [x] Header "FIP Data Health" implemented, consistent with other cards.
                    *   [x] Tab filters (Last Week, Last Month, Last 6 Months) implemented for data switching.
                    *   [x] Tabs changed to 'Success Rate' and 'Failure Rate' with corresponding data.
                *   [x] **Chart Content & Data:**
                    *   [x] Displays data for different bank sets under "Success Rate" (SBI, HDFC, etc.) and "Failure Rate" (ABC Bank, XYZ Bank, etc.) tabs.
                    *   [x] "Data Requested" and "Data Delivered" bars for each bank.
                    *   [x] Placeholder data implemented, with different datasets for each tab (Success/Failure).
                    *   [x] Y-axis label formatting for K, L, Cr implemented.
                *   [x] **Styling:**
                    *   [x] Axis labels and legend styled (Inter font for legend, DM Sans for X-axis ticks; custom colors).
                    *   [x] Custom legend implemented below chart with hollow circle indicators.
                    *   [x] Custom bar component (`BarWithTopRadius`) for top-rounded corners.
                    *   [x] Solved React console warnings for unrecognized props on custom bar component.
                    *   [x] Adjusted chart margins and padding for better centering.
                    *   [x] Attempted to fix axis line/tick colors to slate-300 by moving styles to individual axis `sx` props. (Status: Issue persists, defaults on load, slate-300 on hot-reload edit).
                *   [x] **Card Animations (Framer Motion):**
                    *   [x] Card entrance animation.
                    *   [x] Header items animation.
                    *   [x] Custom legend animation.
                    *   [x] Footer ("Last Updated", "Growth Rate") text animation.
                *   [x] **Internal Chart/Tab Animations:**
                    *   [x] Automatic tab cycling ('Success Rate' -> 'Failure Rate' -> loop) implemented.
                    *   [x] Tab content transition: Implemented using `AnimatePresence` and `motion.div` with `key={activeTab}` for slide/fade effect. Variants refined.
                    *   [ ] Bar "rise from bottom" animation on tab switch/initial load:
                        *   Strategy simplified to rely on MUI BarChart's default entrance animation upon re-mount.
                        *   Status: **In progress - testing simplified MUI default entrance animation.**
                    *   [x] `onAnimationComplete` prop logic: Refined for `disableAutoRotate` (fires after first tab) and full cycle (fires after one loop). Logic updated for new tab structure, testing confirmed it works as expected when component is directly rendered.
                    *   [x] Addressed issue where tab switching didn't work after navigating to the graph via card click (useEffect refactor, mountedRef logic).
                    *   [x] Resolved "useEffect changed size" error via hard refresh/dev server restart.
                *   [x] **Integration:**
                    *   [x] `InteractiveShowcase` (with Line, Pie, Bar charts) integrated into `src/app/moneyone/sections/WhatIsMoneyOne.tsx`.
        *   [ ] **7. Layout and Styling:**
            *   [x] Ensure 2-column layout (left: text cards, right: phone mockup).
            *   [ ] Adjust overall section height, padding, and responsive behavior as needed.
            *   [x] **Responsive Design for Small Screens (e.g., <450px or `<sm` breakpoint):**
                *   [x] Modify layout: Active card stacked on top, phone mockup below (for `<md` screens). On `md+`, 2-column layout is used.
                *   [x] Implement carousel effect for text cards on small screens: Only the active card is visible at a time.
                *   [x] Use Framer Motion `AnimatePresence` for card transitions on small screens (new card slides in from right, old card slides out to left).
                *   [x] On larger screens (`md+`), all cards are displayed in a stack, with the active card highlighted (no slide animations between them, just style changes).
                *   [ ] Ensure `UserJourneyAnimation` (phone mockup) displays correctly and scales appropriately in this stacked layout (Needs Testing/Verification).
        *   [x] Integrate the refactored `WhatIsOneMoney.tsx` into `src/app/page.tsx`.
    *   [x] Implement "UI Features Showcase" section (`sections/UIFeatures.tsx`).
        *   [x] Add standard title/subtitle.
        *   [x] Implement 2-column layout (Left: 4 text points, Right: Video).
        *   [x] Add placeholder text points for features (updated titles).
        *   [x] Added Lucide icons next to feature titles.
        *   [x] Add video player using `public/2025-05-01 22-21-31 (1).mp4` (controls, muted).
        *   [x] **Replaced Video with Interactive Phone Mockup:**
            *   [x] Created `ClayPhoneMockup.tsx` component (`src/components/ui/ClayPhoneMockup.tsx`).
            *   [x] Created `AnimatedScreenContent.tsx` component (`src/components/AnimatedScreenContent.tsx`) to display dynamic content within the mockup.
            *   [x] **Initial Setup (MobilePe):**
                *   [x] Designed initial screen for "MobilePe" brand.
                *   [x] Structured header (logo, title, icons) and body (consent title, account selection, consent details, footer/slider).
            *   [x] **Multi-Brand & Dynamic Content Refactor:**
                *   [x] Updated `screenData` to hold configurations for multiple brands (MobilePe, Home Bank, WealthPro/Kred).
                *   [x] Each brand in `screenData` includes: main header logo/title, in-body logo/name, accent color definitions, and specific consent terms.
                *   [x] Refactored `AnimatedScreenContent` to use a single `BrandedConsentScreenBody` component that dynamically renders content based on props from `screenData`.
            *   [x] **Granular Animations for Brand Switching:**
                *   [x] Implemented `useEffect` to cycle through brands automatically.
                *   [x] Used `AnimatePresence` and `motion` components from Framer Motion.
                *   [x] Animated main header logo & title (opacity + y-axis movement).
                *   [x] Animated in-body logo & brand name (opacity + y-axis movement).
                *   [x] Animated consent term text values (Purpose, Duration, Date Range, Data Fetched) with opacity + y-axis movement.
                *   [x] Added smooth color transitions (`transition-colors duration-700 ease-in-out`) for accent color changes on buttons and the footer slider icon background.
            *   [x] **Styling and Layout Adjustments for Mockup Content:**
                *   [x] Adjusted font sizes, icon sizes, padding, and margins for a compact fit within the phone mockup.
                *   [x] Refined layout of consent details section (from divs to table, then back to flexbox divs for better styling control).
                *   [x] Styled the date range display with a background box and a line between dates.
                *   [x] Ensured footer ("Slide to Approve") is correctly positioned and constrained within the phone mockup.
                *   [x] Hid scrollbar in the scrollable content area.
                *   [x] Addressed minor visual issues like table border appearance with `overflow-hidden`.
            *   [x] **UI Updates for WealthPro (formerly Kred) variant:**
                *   [x] Renamed Kred to WealthPro.
                *   [x] Updated logo path (assuming `/kred.svg` is still used or replaced with a WealthPro specific one).
                *   [x] Updated consent terms for WealthPro.
        *   [x] Integrated into `src/app/page.tsx`.
    *   [x] Implement "Security and Compliance" section (`sections/SecurityCompliance.tsx`).
        *   [x] Title: End-to-End Security and Compliance (with highlight styles).
        *   [x] Uses TiltCard for animated cards.
        *   [x] Added GridBackground.
        *   [x] **Responsive Layout Adjustments:**
            *   [x] **Main Cards:** Stacked vertically on mobile (`<lg`) and 3-column on large screens (`lg:`).
            *   [x] **Sub-points within Cards:** 
                *   [x] Stacked vertically on mobile (`<sm`).
                *   [x] Arranged horizontally on small tablets (`

6.  **Performance Optimization:**
    *   [x] **Asset Cleanup:**
        *   [x] Identified and removed unused `public/vercel.svg`.
        *   [x] Consolidated favicon to `src/app/icon.svg` and removed `public/om-icon.svg`.
    *   [x] **Component Cleanup:**
        *   [x] Identified and removed unused `src/components/ui/sticky-scroll-reveal.tsx`.
        *   [x] Identified and removed unused `src/components/ImageSlideshow.tsx`.
    *   [x] **Dependency Cleanup:**
        *   [x] Identified and uninstalled unused `three`, `@react-three/fiber`, and `@types/three`.
    *   [x] **Image Optimization with `next/image`:**
        *   [x] Ensured all significant static images (`Bnl.png`, `Ins.png`, `WM.png`, `header-graphic.png`, `contact-us graphic.png`, `PH.png`, `KP.png`, `JC.png`, client logos, etc.) use the `next/image` component.
        *   [x] Refactored `Leadership.tsx` to use `next/image` instead of CSS background images.
        *   [x] Added/Verified `sizes` prop for images using `fill={true}` in `Leadership.tsx`, `Solutions.tsx`, and `Hero.tsx` to improve source selection.
    *   [x] **React Component-Level Optimizations (for `UserJourneyAnimation` and `AnimatedScreenContent`):**
        *   [x] **`UserJourneyAnimation.tsx` Optimizations:**
            *   [x] **Memoize Child Components:**
                *   [x] Wrap `OtpEntryScreen` with `React.memo`.
                *   [x] Wrap `JourneyConsentScreen` with `React.memo`.
            *   [x] **Refactor `scrollTimer` for Robustness:**
                *   [x] Create `scrollTimerRef` using `useRef` for the scroll `setTimeout`.
                *   [x] Ensure `scrollTimerRef.current` is cleared in `useEffect` cleanup.
            *   [x] **Review `useCallback` Dependencies:**
                *   [x] Verify dependency arrays for `useCallback` hooks.
        *   [x] **`AnimatedScreenContent.tsx` Optimizations:**
            *   [x] **Memoize Child Components:**
                *   [x] Wrap `BrandedConsentScreenBody` with `React.memo`.
                *   [x] *Consideration:* If `PhoneScreenHeader` is pure and not memoized, memoize it.
            *   [ ] **`BrandedConsentScreenBody` Internal Review (Lower Priority):**
                *   [ ] Assess `useMemo` for `accountAStyles`/`BStyles`.
        *   [x] **General Review (React Optimizations):**
            *   [x] Confirm stable and unique `key` props for `motion.*` components.
            *   [x] Double-check `useEffect` cleanup functions for timers/subscriptions.
    *   [ ] **Source Image Pre-optimization:**
        *   [ ] Compress large source PNGs (e.g., `Bnl.png`, `Ins.png`, `WM.png`, `header-graphic.png`, `PH.png`, `KP.png`, `JC.png`) using tools like TinyPNG or Squoosh.
        *   [ ] Consider converting to WebP format for better compression and serving them directly.
    *   [ ] **Review `next.config.mjs` for image quality settings.**
    *   [ ] **Further Profiling (if needed):**
        *   [ ] Use browser developer tools (Lighthouse, Performance tab) or Vercel Analytics to identify remaining bottlenecks.
        *   [ ] Investigate code splitting/dynamic imports for non-critical large sections/components.

7.  **Asset Hosting & Advanced Deployment:**
    *   **A. Host Static Assets on AWS S3:**
        *   [ ] **1. Create an S3 Bucket:**
            *   [ ] Sign in to AWS Management Console and navigate to S3.
            *   [ ] Create a new bucket (e.g., `onemoney-assets` or `assets.onemoney.in`), choose region.
            *   [ ] Decide on public access strategy (direct vs. CloudFront).
        *   [ ] **2. Upload Assets to S3:**
            *   [ ] Identify all static assets (images in `public/`, Lottie JSONs, etc.).
            *   [ ] Organize and upload assets to the S3 bucket (e.g., `images/`, `lottie/` folders).
        *   [ ] **3. Configure Asset Serving:**
            *   [ ] **Option 1 (Direct S3):** Configure bucket policies/ACLs for public read. Note S3 object URLs.
            *   [ ] **Option 2 (CloudFront - Recommended):** 
                *   [ ] Create CloudFront distribution with S3 bucket as origin (consider OAI).
                *   [ ] Configure cache behaviors, HTTPS.
                *   [ ] Optionally, set up a custom CNAME for assets (e.g., `assets.onemoney.in`). Note CloudFront/CNAME URL.
        *   [ ] **4. Update Website Code:**
            *   [ ] Replace local asset paths in components with S3/CloudFront URLs.
            *   [ ] Use `NEXT_PUBLIC_ASSET_PREFIX` environment variable for the base asset URL.
        *   [ ] **5. Testing:**
            *   [ ] Verify all assets load correctly from S3/CloudFront locally and on Vercel.

    *   **B. Deploy to Vercel with Custom Domain (`www.onemoney.in`):**
        *   [ ] **1. Vercel Project Configuration:**
            *   [ ] Log in to Vercel, navigate to `om-website-ten` project settings -> "Domains".
        *   [ ] **2. Add Custom Domain:**
            *   [ ] Add `www.onemoney.in`.
            *   [ ] Note DNS records provided by Vercel.
        *   [ ] **3. Configure Apex Domain (Recommended):**
            *   [ ] Add `onemoney.in` in Vercel domains.
            *   [ ] Set up recommended redirect (e.g., apex to `www` or vice-versa).
        *   [ ] **4. Update DNS Records at Registrar:**
            *   [ ] Log in to your domain registrar for `onemoney.in`.
            *   [ ] Add/update DNS records as per Vercel's instructions (CNAME for `www`, A record for apex, TXT for verification if needed).
        *   [ ] **5. Propagation and Verification:**
            *   [ ] Wait for DNS propagation.
            *   [ ] Vercel will verify and issue SSL.
        *   [ ] **6. Set Production Domain:**
            *   [ ] Ensure `www.onemoney.in` (or preferred version) is the production domain in Vercel.
        *   [ ] **7. Testing:**
            *   [ ] Access `https://www.onemoney.in` and test redirects.

7.  **Integrate Email Service for "Talk to Us" Form (using Resend):**
    *   [ ] **1. Resend Account Setup:**
        *   [ ] Sign up for a free Resend account at [resend.com](https://resend.com).
        *   [ ] Add and verify your domain(s) in Resend.
            *   Start with the domain you'll use for the `FROM` address (e.g., a personal domain if you own one, or the domain your company email will eventually use).
            *   Resend will provide DNS records (TXT, CNAME, etc.) to add to your domain's DNS settings.
        *   [ ] Obtain your Resend API Key.
    *   [ ] **2. Project Setup:**
        *   [ ] Install the Resend SDK: `npm install resend` (or `yarn add resend`).
        *   [ ] Create/update `.env.local` in your project root with:
            *   `RESEND_API_KEY=your_resend_api_key_here`
            *   `TO_EMAIL_ADDRESS=your_personal_test_email@example.com` (for initial testing)
            *   `FROM_EMAIL_ADDRESS=notifications@yourverifieddomain.com` (use a verified domain)
        *   [ ] Add these environment variables to your Vercel project settings for deployment.
        *   [ ] Ensure `.env.local` is in your `.gitignore`.
    *   [ ] **3. Create Next.js API Route (App Router):**
        *   [ ] Create the file `src/app/api/send-contact-email/route.ts`.
        *   [ ] Implement the API route logic:
            *   Import `Resend`.
            *   Initialize Resend with the API key from `process.env.RESEND_API_KEY`.
            *   Handle POST requests.
            *   Read form data (`firstName`, `lastName`, `email`, `phone`, `comments`) from the request body.
            *   Construct the email content (HTML or text).
            *   Use `resend.emails.send()` to send the email:
                *   `from`: `process.env.FROM_EMAIL_ADDRESS`
                *   `to`: `process.env.TO_EMAIL_ADDRESS`
                *   `subject`: "New Contact Form Submission from [Name]"
                *   `html`/`text`: Formatted user data.
            *   Return appropriate JSON responses (success or error).
    *   [ ] **4. Update `TalkToUsForm.tsx` Frontend:**
        *   [ ] Modify the `handleSubmit` function.
        *   [ ] On form submission, prevent default behavior.
        *   [ ] Make a `POST` request to `/api/send-contact-email` with the `formData`.
        *   [ ] Include `Content-Type: application/json` header.
        *   [ ] `JSON.stringify` the `formData` for the body.
        *   [ ] Handle the response:
            *   Display success message to the user.
            *   Clear the form on success.
            *   Display error message if sending fails.
        *   [ ] Add state for loading/submission status (e.g., to disable the button while sending).
    *   [ ] **5. Testing:**
        *   [ ] Test the form thoroughly on your local development environment.
        *   [ ] Check your personal email for incoming messages.
        *   [ ] Test error handling (e.g., try submitting without required fields if your API route has validation).
        *   [ ] Deploy to Vercel and test the live form.
    *   [ ] **6. Switch to Company Email (Later):**
        *   [ ] Once testing is successful, update the `TO_EMAIL_ADDRESS` environment variable (locally and on Vercel) to your company's email address.
        *   [ ] If your `FROM_EMAIL_ADDRESS` needs to change to an official company email (e.g., `contact@company.com`), ensure that new domain/email is also verified in Resend.
        *   [x] Retest.

## 8. Website Restructure: Multi-Product Landing Page

*   [x] **Objective:** Create a new main landing page and move the existing OneMoney site into its own section.
*   [x] **Router Type:** Confirmed App Router.

*   [x] **Step 1: Modify `src/app/page.tsx` (New Main Landing Page)**
    *   [x] Transform `src/app/page.tsx` into the new top-level landing page. This page will be relatively simple initially.
    *   [x] Add three buttons to this page:
        *   [x] "OneMoney" (linking to `/onemoney`)
        *   [x] "Moneyone" (linking to `/moneyone`)
        *   [x] "Equal" (linking to `/equal`)
    *   [x] Ensure this page uses a simplified layout, potentially by adjusting `src/app/layout.tsx` or ensuring it doesn't inherit `OneMoney`-specific navigation.

*   [x] **Step 2: Create and Populate `src/app/onemoney/` (Relocating the OneMoney Site)**
    *   [x] **2.1. Create `onemoney` Directory Structure:**
        *   [x] Create `src/app/onemoney/`.
        *   [x] Create `src/app/onemoney/components/`.
        *   [x] Create `src/app/onemoney/sections/`.
    *   [x] **2.2. Move `OneMoney` Homepage Content:**
        *   [x] Create `src/app/onemoney/page.tsx`.
        *   [x] Move the original content of `src/app/page.tsx` (the current OneMoney homepage) into `src/app/onemoney/page.tsx`.
    *   [x] **2.3. Move `OneMoney` Components and Sections:**
        *   [x] Move relevant components from `src/components/` (e.g., `Header.tsx`, `Footer.tsx`, specific UI elements) to `src/app/onemoney/components/`.
        *   [x] Move all sections from `src/sections/` (e.g., `Hero.tsx`, `WhatIsOneMoney.tsx`) to `src/app/onemoney/sections/`.
    *   [x] **2.4. Move `OneMoney` Sub-Pages:**
        *   [x] Move `src/app/compliance/` to `src/app/onemoney/compliance/`.
        *   [x] Move `src/app/leadership/` to `src/app/onemoney/leadership/`.
        *   [x] Move `src/app/policies/` to `src/app/onemoney/policies/`.
        *   [x] Move `src/app/timeline/` to `src/app/onemoney/timeline/`.
        *   [x] Move `src/app/vision-mission/` to `src/app/onemoney/vision-mission/`.
    *   [x] **2.5. Update Import Paths and Internal Links:**
        *   [x] Systematically review and update all `import` statements in `src/app/onemoney/page.tsx`, and within all moved components, sections, and sub-pages to reflect their new locations (e.g., from `../../components` to `./components` or adjusting `@/` aliases).
        *   [x] Update all internal navigation links (e.g., in `Header.tsx`, `Footer.tsx`, and page content) to include the `/onemoney` prefix (e.g., `/compliance` becomes `/onemoney/compliance`).

*   [x] **Step 3: Create Placeholder Pages for New Product Sections**
    *   [x] Create `src/app/moneyone/page.tsx` as a placeholder.
    *   [x] Create `src/app/equal/page.tsx` as a placeholder.
    *   [ ] Optionally, create `src/app/moneyone/layout.tsx` and `src/app/equal/layout.tsx` if they need distinct layouts from the main landing page.

*   [x] **Step 4: Review and Update Layouts (`layout.tsx`)**
    *   [x] **4.1. Root Layout (`src/app/layout.tsx`):**
        *   [x] Review `src/app/layout.tsx`. Simplify it if it contains `OneMoney`-specific elements (like the detailed `Header` or `Footer`). This layout will apply to the new main landing page, `/moneyone`, and `/equal`.
    *   [x] **4.2. `OneMoney` Layout (`src/app/onemoney/layout.tsx`):**
        *   [x] Create `src/app/onemoney/layout.tsx`.
        *   [x] This layout should import and use the `Header.tsx` and `Footer.tsx` that were moved to `src/app/onemoney/components/`.
        *   [x] Ensure this layout properly wraps all content under `/onemoney/*`.

## 9. Create Global Header Component

*   [x] **Objective:** Create a unified, adaptable header component that can be used across all product pages (OneMoney, MoneyOne, Equal) while maintaining visual consistency.

*   [x] **Step 1: Create Global Header Component Structure**
    *   [x] Create `src/components/global/GlobalHeader.tsx` as a client component (`"use client"`)
    *   [x] Create `src/components/global/GlobalHeader.types.ts` for type definitions
    *   [x] Move common styling and functionality from `src/app/onemoney/components/Header.tsx`
    *   [x] Add product-aware theming with configurable colors/gradients

*   [x] **Step 2: Make Header Configurable**
    *   [x] Add props for:
        *   [x] `productName`: To identify which product is active (e.g., "onemoney", "moneyone", "equal")
        *   [x] `logoSrc`: Path to the product logo
        *   [x] `accentColor`: Primary brand color (e.g., OneMoney green, etc.)
        *   [x] `navigationItems`: Array of navigation items specific to the product
        *   [x] `talkToUsFormComponent`: Optional component for the TalkToUs dialog
    *   [x] Create default themes for each product (color schemes, hover effects)

*   [x] **Step 3: Create Product-Specific Header Components**
    *   [x] Create `src/app/onemoney/components/ProductHeader.tsx` that imports GlobalHeader
        *   [x] Configure with OneMoney-specific navigation and styling
    *   [x] Create similar components for MoneyOne and Equal (directly in their layouts for now)

*   [x] **Step 4: Integrate TalkToUs Dialog**
    *   [x] Extract `TalkToUsForm.tsx` to a more global location if needed
    *   [x] Make form configurable for different product contexts
    *   [x] Allow product-specific email destinations

*   [x] **Step 5: Update OneMoney Layout**
    *   [x] Modify `src/app/onemoney/layout.tsx` to use the new ProductHeader
    *   [x] Ensure styling remains consistent with current implementation

*   [x] **Step 6: Create Layouts for Other Products**
    *   [x] Create/update `src/app/moneyone/layout.tsx` using the GlobalHeader
    *   [x] Create/update `src/app/equal/layout.tsx` using the GlobalHeader
    *   [x] Configure with appropriate navigation items

*   [ ] **Step 7: Mobile Responsiveness and Testing**
    *   [ ] Verify mobile menu behavior across all product headers
    *   [ ] Test dropdown navigation on all products
    *   [ ] Ensure consistent responsive behavior
    *   [ ] Test across different screen sizes

## 10. MoneyOne Page Development

*   [x] **Solutions Section Enhancements:**
    *   [x] Create tabbed interface for use cases/solutions
    *   [x] Implement tab navigation with 4 tabs: Wealth Management, Lending, Advisory, Brokerage
    *   [x] Design responsive tab content with text on left and image on right
    *   [x] Style tab buttons and content container with appropriate transitions
    *   [x] Implement tab switching animations using Framer Motion
    *   [x] Ensure responsive behavior across different screen sizes

*   [x] **Services Section Implementation:**
    *   [x] Create `src/app/moneyone/sections/Services.tsx` component
    *   [x] Design custom `src/app/moneyone/components/ui/ServiceBentoCard.tsx` component
    *   [x] Implement alternating 2x2 grid layout with wide and narrow cards
    *   [x] Add image positioning logic in cards:
        *   [x] Wide cards (col-span-2): Large images at bottom-right with overflow effect
        *   [x] Narrow cards (col-span-1): Smaller images in top-right position
    *   [x] Add service data with icons from Lucide library
    *   [x] Add decorative images for "Advanced Analytics" and "Nudges and Insights" services
    *   [x] Integrate responsive layout adjustments for different screen sizes
    *   [x] Add to `src/app/moneyone/page.tsx` in correct position before ContactUs section

## 11. MoneyOne Interactive Demo/Showcase Section (Card-Controlled)

*   **Objective:** Create an interactive section with clickable cards on the left that control which animated chart (Line, Pie, Bar) is displayed on the right, drawing inspiration from `WhatIsOneMoney.tsx`'s card interaction model.
*   **Layout:** 2-column layout (Left: Stack of 3 clickable cards, Right: Active animated chart). Responsive design for smaller screens.
*   **Animated Charts Involved:**
    1.  `AnimatedLineGraphCard.tsx`
    2.  `AnimatedPieChartCard.tsx`
    3.  `AnimatedBarChartCard.tsx`

*   **Implementation Steps:**
    *   [x] **1. Define Card Content & Structure:**
        *   [x] Define titles and descriptions for three cards, corresponding to Line Graph, Pie Chart, and Bar Chart.
        *   [x] Create a `showcaseCardsData` array (or similar) in `InteractiveShowcase.tsx` to hold this content (e.g., `{ id: 'line', title: 'Dynamic Line Graph', description: 'Visualize trends over time...' }`). (Note: Descriptions subsequently shortened and refined).
    *   [x] **2. Refactor `InteractiveShowcase.tsx` for Card Control:**
        *   [x] **2.1. Layout Update:**
            *   [x] Implement a 2-column grid layout (e.g., Tailwind CSS `grid grid-cols-3 gap-8`, with cards in `col-span-1` and chart in `col-span-2`). (Note: Current uses `md:w-1/2` for cards, `md:w-2/3` for chart which is not standard 1/3, 2/3 but achieves 2 columns).
            *   [x] Ensure responsive behavior:
                *   On medium screens and above: 2-column layout.
                *   On small screens: Cards stack above the chart, or use a carousel/tab-like view for cards if space is tight (similar to `WhatIsOneMoney.tsx`'s small screen behavior).
        *   [x] **2.2. State Management:**
            *   [x] Add state to manage `activeCardId` (e.g., 'line', 'pie', 'bar'), defaulting to 'line'.
            *   [x] Implement `handleCardClick(cardId: string)` function to update `activeCardId`.
        *   [x] **2.3. Clickable Cards Panel (Left Column / Top on Mobile):**
            *   [x] Map over `showcaseCardsData` to render clickable cards.
            *   [x] Style cards to be visually consistent with those in `WhatIsOneMoney.tsx` (title, description).
            *   [x] Implement active state highlighting for the selected card (border, background, "live dot").
            *   [x] Apply click handler (`handleCardClick`) to each card.
            *   [x] (Optional but Recommended) Implement progress bars on cards:
                *   [x] Animate from 0% to 100% when a card becomes active.
                *   [x] Duration could be fixed (e.g., 3-5 seconds) or attempt to sync with the active chart's internal animation cycle if feasible (more complex).
                *   [x] Reset progress bar on re-click or when another card is selected.
                *   [x] Removed progress bars from cards.
        *   [x] **2.4. Chart Display Area (Right Column / Bottom on Mobile):**
            *   [x] Use Framer Motion `AnimatePresence` with `mode="wait"` to smoothly transition between chart components.
            *   [x] Conditionally render the active chart based on `activeCardId`:
                *   [x] `{activeCardId === 'line' && <AnimatedLineGraphCard key="line" ... />}`
                *   [x] `{activeCardId === 'pie' && <AnimatedPieChartCard key="pie" ... />}`
                *   [x] `{activeCardId === 'bar' && <AnimatedBarChartCard key="bar" ... />}`
                *   [x] Ensure unique `key` props for `AnimatePresence` to work correctly.
        *   [x] **2.5. Chart Invocation & Control Logic:**
            *   [x] Remove the previous `onAnimationComplete` logic in `InteractiveShowcase.tsx` that automatically sequenced between *different chart types*.
            *   [x] For each displayed chart component (Line, Pie, Bar):
                *   [x] Pass `disableAutoRotate={false}` (or a new prop like `enableFullRotationCycle={true}`) to allow their internal tab/content cycling to run fully.
                *   [x] The `onAnimationComplete` prop on these child charts should now primarily signal the end of *their own complete internal cycle* (e.g., all tabs shown once in BarChart). This could be used by `InteractiveShowcase` to manage the progress bar on the corresponding card or for other UI feedback, but NOT to switch to a different chart type.
    *   [ ] **3. Adapt Individual Chart Components (Review & Refine):**
        *   [ ] **`AnimatedLineGraphCard.tsx`:**
            *   Ensure `onAnimationComplete` fires after its full animation sequence (if `disableAutoRotate` is false and it has internal cycles) or after initial draw (if `disableAutoRotate` is true).
        *   [ ] **`AnimatedPieChartCard.tsx`:**
            *   Ensure `onAnimationComplete` fires after its full animation sequence (e.g., drawing slices, legend appearing).
        *   [ ] **`AnimatedBarChartCard.tsx`:**
            *   Its existing `onAnimationComplete` (which fires after one full tab cycle if `disableAutoRotate` is false, or after first tab if true) should be suitable. When controlled by cards, `disableAutoRotate` would likely be `false` or managed by a new prop to let it cycle.
    *   [ ] **4. Styling and Polish:**
        *   [ ] Ensure visual consistency for the new cards, active states, and overall section layout.
        *   [ ] Refine Framer Motion `AnimatePresence` transitions for the chart display area (e.g., fade, slide) for a polished feel.
        *   [ ] Test responsiveness across various screen sizes (mobile, tablet, desktop).
    *   [x] **5. Integration within `WhatIsMoneyOne.tsx`:**
        *   [x] `InteractiveShowcase.tsx` is already placed within `src/app/moneyone/sections/WhatIsMoneyOne.tsx`.
        *   [ ] Review and adjust the parent `WhatIsOneMoney.tsx` section's layout (e.g., title, surrounding padding) if needed to accommodate the new 2-column `InteractiveShowcase`.

*   **(Old) Implementation Steps (Sequential Auto-Play - To Be Archived/Removed after refactor):**
    *   ~[x] **1. Create Skeleton Parent Orchestration Component (`src/app/moneyone/components/InteractiveShowcase.tsx`):**~
        *   ~[x] Basic state to manage the active component index/ID.~
        *   ~[x] Placeholder logic for switching components based on completion.~
        *   ~[x] Use Framer Motion's `AnimatePresence` for managing component mounting/unmounting.~
    *   ~[x] **2. Adapt Existing Animated Line Graph Card (`src/app/moneyone/components/AnimatedLineGraphCard.tsx`):**~
    *   ... (all old sub-items under point 2 to 10 can be considered superseded by the new plan above) ...
    *   ~[ ] **10. Key Considerations / Safety Nets for Smooth Implementation:**~

## 12. Equal Website Implementation

*   [ ] **Objective:** Create a comprehensive website for Equal, a digital identity verification platform, following a similar structure to OneMoney and MoneyOne.

*   [x] **Step 1: Create Basic Structure**
    *   [x] Create `src/app/equal/page.tsx` as the main page
    *   [x] Create `src/app/equal/layout.tsx` with appropriate header/footer
    *   [x] **Borrow:** Import and configure the shared `GlobalHeader` and `GlobalFooter` components already used by OneMoney & MoneyOne, passing Equal-specific theme props (logo, accentColor, nav items).
    *   [x] Create `src/app/equal/components/` directory for Equal-specific components (extend/reuse existing UI components where possible)
    *   [x] Create `src/app/equal/sections/` directory for page sections (mirror structure of OneMoney & MoneyOne)

*   [x] **Step 2: Implement Hero Section**
    *   [x] Create `src/app/equal/sections/Hero.tsx`
    *   [x] **Borrow:** Clone the Hero component pattern used in OneMoney (`sections/Hero.tsx`) and adapt copy, colors, CTA style, and background visuals to Equal branding.
    *   [x] Design hero with headline "India's Most Comprehensive Digital Identity Verification Platform"
    *   [x] Add subheading about transforming background checks into real-time trust infrastructure
    *   [x] Include testimonial quote from Fortune 500 CHRO
    *   [x] Add "Book a Demo" CTA button (reuse `GlowingButton` component)
    *   [x] Implement client logo marquee (reuse from OneMoney Hero)

*   [x] **Step 3: Implement "What Makes Equal Different" Section**
    *   [x] Create `src/app/equal/sections/WhatMakesEqualDifferent.tsx`
    *   [x] **Borrow:** Use MoneyOne's three-column features/pillars component as the base; replace icons/text for Equal's three pillars.
    *   [x] Design 3-pillar comparison layout with animations similar to MoneyOne feature cards
    *   [x] Add visual elements to illustrate each pillar (reuse `TiltCard` or `ServiceBentoCard` styles)

*   [x] **Step 4: Implement Use Case Grid**
    *   [x] Create `src/app/equal/sections/UseCaseGrid.tsx`
    *   [x] **Borrow:** Adapt MoneyOne's Services/UseCase grid (Bento style) for a 6-card layout; reuse `ServiceBentoCard` styles for consistency.
    *   [x] Design 6-use case grid layout (HRMS Integration, Gig Economy Hiring, BFSI, Staffing & Contract, Platform Trust & Safety, Tech-Forward Startups)
    *   [x] Create `src/app/equal/components/ui/UseCaseCard.tsx` for consistent card styling (extend `ServiceBentoCard` if possible)
    *   [x] Implement hover effects and animations similar to MoneyOne cards
    *   [x] Add "Schedule a Free Use Case Mapping Call" CTA (reuse `GlowingButton`)

*   [x] **Step 5: Implement Product Showcase Section**
    *   [x] Create `src/app/equal/sections/ProductShowcase.tsx`
    *   [x] **Borrow:** Repurpose MoneyOne's tabbed `InteractiveShowcase` pattern (cards left, content right) to switch between Identity Verification Gateway & Equal Console.
    *   [x] Design tabbed interface for two main products
    *   [x] Create `src/app/equal/components/ui/ProductTab.tsx` (extend existing `SolutionTab`/`ProductTab` components)
    *   [x] Implement content for each product tab (reuse icon/text block components, animated lists)
    *   [x] Add appropriate CTAs (reuse button styles)

*   [x] **Step 6: Implement Solutions Section**
    *   [x] Create `src/app/equal/sections/Solutions.tsx`
    *   [x] **Borrow:** Use MoneyOne's Solutions tabbed component (with horizontal tabs & animated indicator) for four solutions; adapt data.
    *   [x] Design tabbed interface for HRMS Integration, Gig Economy, Financial Services, Staffing
    *   [x] Create/extend `SolutionTab.tsx` for navigation
    *   [x] Implement content for each solution tab (reuse layout, images, animation patterns)

*   [x] **Step 7: Implement Trust & Security Section**
    *   [x] Create `src/app/equal/sections/TrustSecurity.tsx`
    *   [x] **Borrow:** Duplicate OneMoney's Security & Compliance section structure (title with highlight, TiltCards, GridBackground) and update content/badges.
    *   [x] Add architecture layer, audit & monitoring tools, industry compliance tabs, and CTA using existing card & grid components.

*   [ ] **Step 8: Implement Interactive Demo Section**
    *   [ ] Create `src/app/equal/sections/InteractiveDemo.tsx`
    *   [ ] **Borrow:** Reuse OneMoney's `UserJourneyAnimation` & `ClayPhoneMockup` components; swap screen data to show Equal's document upload & verification flow.
    *   [ ] Add explanatory text cards (clone pattern from OneMoney `WhatIsOneMoney` left-panel cards) and sync with animation stages.

*   [ ] **Step 9: Implement Contact Section**
    *   [ ] Create `src/app/equal/sections/ContactUs.tsx`
    *   [ ] **Borrow:** Clone MoneyOne's ContactUs/TalkToUs form section; adjust accent colors & email logic.
    *   [ ] Design contact form fields, validation, and Resend API integration (reuse existing API route).

*   [ ] **Step 10: Implement Footer**
    *   [ ] Create `src/app/equal/components/Footer.tsx`
    *   [ ] **Borrow:** Copy OneMoney global footer structure; update links & branding for Equal.
    *   [ ] Maintain social links component for consistency.

*   [ ] **Step 11: Performance Optimization**
    *   [ ] Optimize images and assets
    *   [ ] Implement lazy loading for sections
    *   [ ] Ensure smooth animations without performance impact
    *   [ ] Test and optimize for different devices and screen sizes

*   [ ] **Step 12: Testing and Deployment**
    *   [ ] Test all interactive elements
    *   [ ] Verify responsive behavior across devices
    *   [ ] Check accessibility compliance
    *   [ ] Deploy to production environment

## 13. Equal Sub-Pages Implementation

*   [ ] **Objective:** Create detailed sub-pages for Equal's products and solutions, providing in-depth information and interactive demos.

*   [ ] **Step 1: Product Sub-Pages**
    *   [x] **1.1. Identity Verification Gateway Page (`/equal/products/identity-gateway`)**
        *   [x] Create page layout with hero section
        *   [x] Add interactive demo of document upload flow
        *   [x] Implement feature breakdown with icons and descriptions
        *   [x] Add integration examples and API documentation preview
        *   [x] Include case studies and success metrics
        *   [x] Add "Get Started" CTA section

    *   [x] **1.2. Equal Console Page (`/equal/products/console`)**
        *   [x] Create page layout with hero section
        *   [x] Add interactive dashboard preview
        *   [x] Implement feature breakdown with screenshots
        *   [x] Add integration examples with HRMS platforms
        *   [x] Include reporting and analytics section
        *   [x] Add "Book Demo" CTA section

*   [ ] **Step 2: Solution Sub-Pages**
    *   [ ] **2.1. HRMS Integration Page (`/equal/solutions/hrms-integration`)**
        *   [ ] Create page layout with hero section
        *   [ ] Add integration flow diagram
        *   [ ] List supported HRMS platforms
        *   [ ] Include implementation guide
        *   [ ] Add case studies from enterprise customers
        *   [ ] Add "Contact Sales" CTA section

    *   [ ] **2.2. Gig Economy Page (`/equal/solutions/gig-economy`)**
        *   [ ] Create page layout with hero section
        *   [ ] Add mobile-first verification flow demo
        *   [ ] Include WhatsApp integration examples
        *   [ ] Add real-time verification metrics
        *   [ ] Include case studies from gig platforms
        *   [ ] Add "Start Free Trial" CTA section

    *   [ ] **2.3. Financial Services Page (`/equal/solutions/financial-services`)**
        *   [ ] Create page layout with hero section
        *   [ ] Add compliance framework overview
        *   [ ] Include RBI/PMLA requirements checklist
        *   [ ] Add risk scoring methodology
        *   [ ] Include case studies from banks/NBFCs
        *   [ ] Add "Schedule Compliance Review" CTA section

    *   [ ] **2.4. Staffing Page (`/equal/solutions/staffing`)**
        *   [ ] Create page layout with hero section
        *   [ ] Add bulk verification workflow demo
        *   [ ] Include vendor management features
        *   [ ] Add reporting and analytics section
        *   [ ] Include case studies from staffing firms
        *   [ ] Add "Request Pricing" CTA section

*   [ ] **Step 3: Shared Components & Features**
    *   [ ] Create reusable components for:
        *   [ ] Interactive demos
        *   [ ] Feature comparison tables
        *   [ ] Integration code snippets
        *   [ ] Case study cards
        *   [ ] CTA sections
    *   [ ] Implement consistent navigation between sub-pages
    *   [ ] Add breadcrumb navigation
    *   [ ] Ensure responsive design across all pages

*   [ ] **Step 4: Performance & SEO**
    *   [ ] Optimize images and assets
    *   [ ] Implement proper meta tags for each page
    *   [ ] Add structured data for better SEO
    *   [ ] Ensure fast loading times
    *   [ ] Implement proper caching strategies

*   [ ] **Step 5: Testing & Deployment**
    *   [ ] Test all interactive elements
    *   [ ] Verify responsive behavior
    *   [ ] Check accessibility compliance
    *   [ ] Test cross-browser compatibility
    *   [ ] Deploy to production environment
