# Design System

## Overall Aesthetic
- **Classic Professional**: Clean, minimal, highly corporate structure.
- **NO Gradients**: Absolutely no heavy, flashy gradient backgrounds. Instead, we use solid colors with high contrast typography and extremely subtle radial grids or patterns.
- **3D Accents**: Subtle use of Three.js (via React Three Fiber) for WOW factors (e.g., interactive Icosahedron in the hero, GLSL shader black hole for the 404 page).

## Color Palette (Next-Themes)
- Primary text: `zinc-900` (Light) / `zinc-50` (Dark)
- Primary background: `zinc-50` (Light) / `zinc-950` (Dark)
- Accents: `emerald-500` / `emerald-600` for buttons and active states.
- Dark mode support using `next-themes` (system/light/dark).

## Typography
- Default font: `Geist` (Sans & Mono variants) via Next.js `next/font`.
- Heading hierarchy strictly followed (text-5xl for heroes, text-2xl for sections).

## Components
- We utilize **Shadcn UI** for core components (Buttons, Inputs, Cards).
- **Navbar**: Features a responsive "Dynamic Island" inspired top pill menu with a mobile Hamburger nav (`MobileNav.tsx`).
- **Interactive Resume**: Custom timeline and skill matrix components.

## Error Handling
- Next.js standard `error.tsx` and `global-error.tsx`.
- Strictly adheres to the "Classic Professional" aesthetic (centered layout, lucide alert icons, clear buttons). No abstract 3D elements here to maintain user trust during failures.

## Animations
- Powered by `framer-motion`:
  - Hover states on skill tags and buttons.
  - Page transitions and list entrances.
- Powered by `lucide-react`:
  - Consistent iconography across the application.