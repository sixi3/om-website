# Todo: Profile Card Component with Smooth Hover Animation

## Overview
Create a profile card component that displays a person's information with a smooth hover animation where the bottom white section slides up to reveal additional content (logos/icons).

## Component Structure Analysis
Based on the reference image, the card has:
- **Top Section**: Green background with profile photo
- **Bottom Section**: White background with name, title, and description
- **Hidden Section**: Icons/logos that appear on hover

## Technical Requirements

### 1. Component Architecture
```
ProfileCard/
├── index.tsx (main component)
├── ProfileCard.types.ts (TypeScript interfaces)
└── ProfileCard.module.css (optional, if not using Tailwind)
```

### 2. Props Interface
```typescript
interface ProfileCardProps {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  logos?: Array<{
    id: string;
    src: string;
    alt: string;
  }>;
  backgroundColor?: string;
  className?: string;
}
```

### 3. Animation Strategy
- Use `framer-motion` for smooth animations
- Implement `layoutId` for shared layout animations
- Use `translateY` transforms for the sliding effect
- Add smooth opacity transitions for content reveal

### 4. Layout Structure
```
Container (fixed height, overflow hidden)
├── Profile Image Section (green bg, top portion)
├── Content Section (white bg, slides up on hover)
│   ├── Name & Title (always visible)
│   ├── Description (always visible)
│   └── Logos Section (revealed on hover)
└── Hidden Logos Container (positioned below, slides into view)
```

### 5. Hover States & Animations
- **Default State**: Bottom white section at normal position
- **Hover State**: 
  - White section slides up by ~40-60px
  - Logos fade in with stagger animation
  - Smooth easing curve (ease-out)
  - Duration: ~300-400ms

### 6. Technical Implementation Details

#### Animation Variants
```typescript
const cardVariants = {
  default: {
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: {
    y: -50, // Adjust based on design
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

const logoVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { staggerChildren: 0.1 }
  }
}
```

#### Responsive Considerations
- Card dimensions: ~300px width, ~400px height (desktop)
- Mobile: Adjust sizing and hover behavior
- Touch devices: Consider tap states instead of hover

### 7. Styling Requirements
- **Colors**: 
  - Gradient background: `#00b140` to '#baff29' linear-b
  - White content area: `#ffffff`
  - Text: Dark gray/black for contrast
- **Typography**: 
  - Name: Bold, larger font
  - Title: Medium weight, green color
  - Description: Regular weight, gray color
- **Shadows**: Subtle drop shadow for depth
- **Border Radius**: Consistent rounded corners

### 8. Accessibility Considerations
- Proper ARIA labels
- Keyboard navigation support
- Focus states for interactive elements
- Reduced motion support for users with motion sensitivity

### 9. Performance Optimizations
- Use `transform` instead of changing `top/bottom` for animations
- Implement `will-change: transform` for smooth animations
- Optimize images with proper sizing and lazy loading

### 10. Usage Example
```tsx
<ProfileCard
  id="keshav-reddy"
  name="Keshav Reddy"
  title="FOUNDER"
  description="Keshav Reddy is a visionary entrepreneur and founder, with a strong commitment to excellence, he has successfully led multiple startups to achieve remarkable growth."
  imageUrl="/team/keshav-reddy.jpg"
  logos={[
    { id: "1", src: "/logos/logo1.svg", alt: "Company 1" },
    { id: "2", src: "/logos/logo2.svg", alt: "Company 2" },
    { id: "3", src: "/logos/logo3.svg", alt: "Company 3" }
  ]}
  backgroundColor="#4ade80"
/>
```

### 11. Next Steps
1. Create the base component structure
2. Implement the layout with proper positioning
3. Add framer-motion animations
4. Style with Tailwind CSS
5. Test hover interactions and responsiveness
6. Add accessibility features
7. Optimize for performance
