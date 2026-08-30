# Design System

## Color Palette
- Primary: `tailwindColor.navy` (or `#0f172a`)
- Secondary: `tailwindColor.teal` (or `#14b8a6`)
- Accent: `tailwindColor.amber` (or `#f59e0b`)
- Neutral gray: `tailwindColor.zinc` (or `#718096`)
- Use `tailwindcss` `theme.extend.colors` to expose these.

## Typography
- UI font: `Inter` (or `DM Sans`)
- Heading font: `Merriweather` or `Playfair Display`
- Base size: `1rem` (16px)
- Line height: `1.5`
- Use `tailwindcss` `typography` plugin for blog posts (`prose` class).

## Components
| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `variant`, `size`, `onClick` | Primary/secondary buttons, loading state |
| `Card` | `title`, `description`, `imageUrl`, `children` | Project/about card with consistent padding |
| `Navbar` | `links`, `onSearch` | Fixed top nav, mobile hamburger |
| `ProjectCard` | `project`, `onHover` | Card with image, tech stack tags, CTA links |
| `SkillTag` | `name`, `level` | Colored pill with progress fill |
| `Modal` | `open`, `onClose`, `children` | Focus-trapped dialog |

## Accessibility
- All interactive elements have `aria-label` or accessible text.
- Color contrast ≥ 4.5:1 (use `tailwindcss` `contrast` plugin).
- Keyboard navigation: `Tab` order, `Escape` to close modals.
- Image `alt` text descriptive, decorative images `alt=""`.

## Responsive Breakpoints (mobile-first)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- Use `tailwindcss` `@screen` directives.

## Animations
- Powered by `framer-motion`:
  - Subtle fade-in/out on page transition
  - Hover scale lift on buttons/cards
  - Staggered list entrance
- Duration: 150-300ms, ease `easeOutQuart`.

## Icon System
- `@heroicons/react` or `lucide-react`
- Import individual icons: `import { ArrowRight from "@heroicons/react/24/outline" }`
- SVGs are accessible with `aria-hidden="true"` and decorative context.