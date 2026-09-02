# Design System — CVS Charan Portfolio v5

> **Last updated:** 2026-09-03 (Home-aligned redesign, Phase 1–3)  
> **Source of truth for:** color, typography, layout patterns, page structure, component tokens

---

## Aesthetic Direction

**Inspired by:** Sarvam AI — clean, editorial, monochromatic, typographic.  
**Design language:** "The same book" — every page reads as a chapter of the same publication. Ghost section numbers (`01`–`06`), meta bars, clip-reveal headlines, and thin `h-px` rules create a consistent editorial DNA.

**What it is NOT:** colorful, card-heavy, gradient-saturated. Visual richness comes from typography scale, whitespace, motion, and structure — not color quantity.

---

## Color System

Exactly **3 design colors + 1 status exception**. No others may be introduced without a documented decision.

| Token | Light | Dark | Usage rule |
|---|---|---|---|
| `--foreground` | `#09090b` | `#fafafa` | All headings, primary text |
| `--muted-foreground` | `#71717a` | `#a1a1aa` | Body copy, labels, dates, secondary text |
| `--secondary` | `#2563eb` | `#39ff14` | **ONE accent word per section** — headline highlight, hover states, active links. Never backgrounds. |
| `--border` | `#e4e4e7` | `#27272a` | All dividers, card borders, `h-px` rules |
| `bg-muted/20–25` | `~f4f4f5 @22%` | — | Alternating section backgrounds only |
| **Status green** | `#22c55e` | `#4ade80` | **Exception: pulsing availability dot only.** Never text, never backgrounds, never decorative use. |

### The "one blue word" principle
Each page gets exactly one accent moment in its hero headline:
- Home `01` → `"that think."` in blue
- About `02` → `"CVS Charan."` — the period is blue
- Projects `03` → `"I Build."` in blue  
- Experience `04` → `"Journey."` in blue
- Skills `05` → `"Arsenal."` in blue
- Contact `06` → `"something."` in blue

---

## Typography

**2 fonts only. No others.**

| Font | Variable | Role |
|---|---|---|
| `Bricolage Grotesque` | `var(--font-bricolage)` | All display/heading text — `h1`, `h2`, `h3`, ghost numbers |
| `Plus Jakarta Sans` | `var(--font-plus-jakarta)` | All UI text — body, labels, buttons, badges |
| `Geist Mono` | `var(--font-geist-mono)` | Code, monospaced dates/periods only |

### Type scale (defined in `globals.css`)

| Class | Size | Line Height | Letter Spacing | Use |
|---|---|---|---|---|
| `.text-hero` | `clamp(3rem, 10vw, 9rem)` | `0.9` | `-0.035em` | Home page hero only |
| `.text-page-title` | `clamp(2.5rem, 7vw, 5.5rem)` | `0.95` | `-0.03em` | Inner page heroes (`/about`, `/experience`, etc.) |
| `.text-display` | `clamp(2.75rem, 6vw+0.5rem, 5.5rem)` | `1.05` | `-0.03em` | Legacy display size |
| `.text-headline` | `clamp(1.875rem, 3.5vw, 2.75rem)` | `1.15` | `-0.025em` | Section headings ("The Journey.", "What I Know.") |
| `.text-label` | `0.6875rem` | — | `0.1em` | ALL section labels — uppercase tracked, muted |
| Body | `16px / 1rem` | `1.65` | — | Default — set on `body` |

---

## Layout Architecture

### Layout container (`app/(public)/layout.tsx`)
```
<main className="flex-1 w-full max-w-6xl mx-auto px-5 md:px-10 pt-28 pb-20">
  {children}
</main>
```
- `max-w-6xl` constrains content width
- `px-5 md:px-10` is the horizontal padding
- `pt-28` offsets the floating nav

### Full-bleed page pattern
All public pages (home, about, experience, skills, contact) break out of the layout's horizontal padding using:
```tsx
<div className="-mx-5 md:-mx-10 bg-background overflow-x-hidden">
```
Then each section re-applies `px-5 sm:px-10 xl:px-16`.  
Home also adds `-mt-28` to remove the top offset (hero fills viewport edge-to-edge).  
Inner pages do NOT use `-mt-28` — content sits naturally below the nav.

### Section alternation pattern
```
Section 1: white bg      (hero)
Section 2: muted/20 bg   (first content section)  
Section 3: white bg      (second content section)
Section 4: white bg      (CTA — same across all pages)
Each separated by: border-t border-border
```

---

## Page Structure Template

Every public page follows this skeleton:

```
[Full-bleed wrapper: -mx-5 md:-mx-10]

  [HERO — white bg, relative, px-5 sm:px-10 xl:px-16]
    → Ghost chapter number (absolute, top-right, 4% opacity, 22vw Bricolage)
    → Meta bar (label left · chapter right, border-b)
    → .text-page-title headline (black + ONE blue word)
    → Role/description line (muted-foreground)
    → Animated h-px rule (scaleX 0→1)
    → Body text (max-w-2xl, muted-foreground, 1.65 line-height)
    → Animated h-px rule
    → CTAs / connect buttons

  [SECTION 2 — bg-muted/20, border-t border-border, px-5 sm:px-10 xl:px-16, py-16 md:py-24]
    → Section header: text-label grey + text-headline black
    → Content (whileInView animated)

  [SECTION 3 — white, border-t border-border, same padding]
    → Section header + content

  [CTA — white, border-t border-border, same padding]
    → IDENTICAL across all pages:
       "Let's Collaborate" label
       "Have a project in mind?" headline
       Bio text
       [Get in Touch] [View Work] buttons
```

### Chapter numbers
| Route | Chapter | Ghost number |
|---|---|---|
| `/` | 01 | `01` |
| `/about` | 02 | `02` |
| `/projects` | 03 | `03` |
| `/experience` | 04 | `04` |
| `/skills` | 05 | `05` |
| `/contact` | 06 | `06` |

---

## Component Tokens (defined in `globals.css`)

### Cards
```css
.card          /* white bg, 1px border, radius-lg (14px) */
.card-hover    /* +translateY(-2px), blue box-shadow on hover */
```

### Buttons
```css
.btn           /* base — pill shape, Plus Jakarta Sans, 600 weight */
.btn-sm / .btn-md / .btn-lg   /* size variants */
.btn-primary   /* black bg, white text */
.btn-outline   /* transparent bg, border, → blue on hover */
.btn-ghost     /* transparent, muted text */
```

### Badges
```css
.badge         /* grey pill, 1px border, Plus Jakarta Sans */
.badge-accent  /* accent bg variant */
```

### Labels
```css
.text-label    /* 0.6875rem, 600w, 0.1em tracking, uppercase */
               /* Always text-muted-foreground color */
```

---

## Animation Rules

### Motion principles
- Entry: `fadeUp` (opacity 0→1, y 24→0, 0.6s easeOut) for most elements
- Headlines: `reveal` (clip from bottom, y 105%→0, 0.75s easeOut)
- Rules: `scaleX` (0→1, originX left, 0.7s easeOut)
- Scroll: `whileInView` with `viewport={{ once: true, margin: "-60px" }}` — fires once
- Stagger: delay increments of `0.06–0.1s` per item

### Accessibility
```css
/* globals.css — covers ALL CSS @keyframes (marquee, island-in, fade-up…) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Framer Motion v10+ additionally auto-respects `prefers-reduced-motion` on all `motion.*` components. No per-component guards needed.

---

## Structural Patterns (reuse exactly)

### Ghost chapter number
```tsx
<div
  aria-hidden="true"
  className="pointer-events-none select-none absolute top-0 right-4 sm:right-10 xl:right-16 font-bold text-foreground leading-none"
  style={{
    fontFamily: "var(--font-bricolage)",
    fontSize: "clamp(8rem, 22vw, 22rem)",
    opacity: 0.04,
    letterSpacing: "-0.05em",
  }}
>
  02
</div>
```

### Meta bar
```tsx
<motion.div
  {...fadeUp(0)}
  className="flex items-center justify-between pt-4 pb-6 border-b border-border"
>
  <span className="text-label text-muted-foreground">About</span>
  <span className="text-label text-muted-foreground">Chapter 02</span>
</motion.div>
```

### Animated h-px rule
```tsx
<motion.div
  initial={{ scaleX: 0, originX: 0 }}
  animate={{ scaleX: 1 }}
  transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
  className="mt-8 h-px bg-border"
/>
```

### Section header (reused in Experience, Projects, Skills, CTA)
```tsx
<div>
  <p className="text-label text-muted-foreground mb-2">Work History</p>
  <h2 className="text-headline text-foreground" style={{ fontFamily: "var(--font-bricolage)" }}>
    The Journey.
  </h2>
</div>
```

### Experience numbered list row
```tsx
<li className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-5 border-b border-border last:border-b-0">
  <span className="text-label text-muted-foreground/30 tabular-nums text-right select-none">01</span>
  <div>
    <span className="text-base sm:text-lg font-semibold text-foreground group-hover:text-secondary transition-colors"
      style={{ fontFamily: "var(--font-bricolage)" }}>
      Title
    </span>
    <span className="text-sm text-muted-foreground ml-2">· Company</span>
  </div>
  <span className="text-xs font-mono text-muted-foreground/50 shrink-0">Period</span>
</li>
```

---

## What's Intentionally Absent

| Element | Why removed |
|---|---|
| shadcn/ui components | Clashes with custom token system |
| react-icons | Build instability (missing export errors) |
| Three.js / R3F / WebGL | Heavy, slow, wrong aesthetic |
| Amber `#f59e0b` | Not in the system — rejected during design audit |
| Violet `#8b5cf6` | Not in the system — rejected during design audit |
| Full-bleed dark sections | Breaks the white-page editorial aesthetic |
| `border-l-4` accent blocks | Not part of the home page DNA |
| Colored icon cards | Too playful for the current direction |

---

## AI Chatbot (planned — not yet real)

Current `AIChatbot.tsx` is a **mock** (keyword if/else, no real AI).  
Planned upgrade: LangChain + Gemini + Pinecone RAG grounded on portfolio DB content.  
See `docs/rag-chatbot.md` for the full technical specification.  
**Rule:** The chatbot bento tile on the home page ships ONLY after the real RAG is implemented.