# Design System

## Overall Aesthetic
- **Sarvam AI Inspired**: Clean, minimal, high-contrast, heavily typographic design system.
- **Color Palette**: Warm neutrals (zinc) with an indigo accent. Strict adherence to CSS variables (`--background`, `--foreground`, `--muted`, `--border`, `--primary`).
- **NO 3D/Gradients**: Removed heavy WebGL/Three.js 3D elements and complex gradients in favor of a stark, lightning-fast, and professional 2D typographic layout.

## Typography
- **Display/Headings**: `Bricolage Grotesque` (tight tracking, heavy weight for impact).
- **Body/UI**: `Plus Jakarta Sans` (highly legible, professional geometric sans).
- **Monospace**: `Geist Mono` (for code or tech details).

## UI Architecture (Custom Design System)
- **NO Shadcn UI**: We completely removed `shadcn/ui` components (like `Button`) to prevent clashes with our custom design tokens.
- **CSS Utilities**: We rely on a strict set of custom CSS utility classes defined in `globals.css`:
  - Containers: `.card`
  - Typography: `.text-display`, `.text-headline`, `.text-label`
  - Interactive: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`, `.badge`

## Core Components
- **Navbar**: Responsive "Dynamic Island" floating pill menu (`DynamicIslandNav.tsx`) powered by Framer Motion. Collapses to 200px on scroll, expands on hover.
- **PageHeader**: Unified standard header component (`PageHeader.tsx`) for consistent spacing and typography across all route pages.
- **Footer**: Massive typographic footer ("charan") perfectly clipped at the bottom edge, with a 4-column link grid.

## Animations
- Powered by `framer-motion`: Smooth spring transitions for layout changes, fade-up page entrances, and dynamic island expansion.
- Hover states using `transition-all duration-300 ease-out`.

## Error Handling
- Next.js standard `error.tsx` and `global-error.tsx`.
- Strictly adheres to the design system (centered layout, lucide alert icons, `.btn-primary`), ensuring the app looks professional even when it fails.