---
name: Anderson Kaiti Portfolio
description: The Engineering Ledger — a precise, border-drawn portfolio with monospace annotations and a single live emerald signal.
colors:
  signal-emerald: "oklch(69.6% 0.17 162.48)"
  graphite-ink: "oklch(0.21 0.006 285.885)"
  near-black: "oklch(0.141 0.005 285.823)"
  paper-white: "oklch(1 0 0)"
  cool-ash: "oklch(0.552 0.016 285.938)"
  ash-line: "oklch(0.92 0.004 286.32)"
  mist: "oklch(0.967 0.001 286.375)"
  available-green: "#22c55e"
  destructive: "oklch(0.577 0.245 27.325)"
typography:
  display:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  metric:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.01em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "32px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.graphite-ink}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.near-black}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "32px"
  cta-pill:
    backgroundColor: "transparent"
    textColor: "{colors.near-black}"
    rounded: "{rounded.full}"
    padding: "0 28px"
    height: "44px"
  card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.near-black}"
    rounded: "{rounded.xl}"
    padding: "24px"
  project-card:
    backgroundColor: "transparent"
    textColor: "{colors.near-black}"
    rounded: "0px"
    padding: "24px"
  stat-cell:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.cool-ash}"
    rounded: "0px"
    padding: "20px"
  tech-badge:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.near-black}"
    rounded: "{rounded.full}"
    padding: "8px 12px"
  input-search:
    backgroundColor: "transparent"
    textColor: "{colors.near-black}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
---

# Design System: Anderson Kaiti Portfolio

## Overview

**Creative North Star: "The Engineering Ledger"**

The portfolio reads like a precise, well-kept engineering ledger. Content sits inside ruled cells and hairline-bordered grids; monospace annotations label everything the way a spec sheet labels its rows; and the whole surface stays near-monochrome so a single live emerald signal can mean something when it appears. The personality is **precise and confident** — restraint that reads as competence, not timidity. Nothing shouts; the density, alignment, and typographic discipline do the persuading.

Two shape languages coexist on purpose. **Structural content is rectilinear and border-drawn** — the 2×2 stats ledger, the sharp-cornered project cards, the divider rules between sections. **Interactive chrome is fully rounded** — the floating navigation pill, the contact CTA, the technology badges, the social icon buttons. The tension between ruled rectangles and soft pills is the signature; keep it.

Depth is flat by doctrine: surfaces rest on the page and are separated by borders, not shadows. Shadow is reserved for things that genuinely float (the scroll-condensed navbar) or respond to a pointer. Motion is quiet and earned — content fades and rises into place once on scroll, the navbar springs into a condensed pill, and transitions ease rather than snap. The explicit anti-reference is the **generic gradient SaaS template**: no purple-to-blue hero washes, no glassmorphism everywhere, no interchangeable marketing polish.

**Key Characteristics:**

- Near-monochrome zinc canvas; emerald is the one live signal, and it is rare.
- Monospace (JetBrains Mono) for labels, metrics, and annotations; Montserrat for everything read as prose.
- Border-drawn grids and cells instead of shadowed panels.
- Sharp corners for content, full-round pills for controls.
- Motion is a single, calm reveal — never decorative churn.

## Colors

A cool, zinc-based neutral field holds the whole system; color is spent deliberately, never sprinkled.

### Primary

- **Signal Emerald** (`oklch(69.6% 0.17 162.48)`): The live accent. It carries the eyebrow labels, accent words in headings, stat values, the 52px section bar, and links. **It appears only in dark mode** — in light mode the same `primary` role renders as Graphite Ink. Emerald is the "ledger is live" signal; its scarcity is the point.
- **Graphite Ink** (`oklch(0.21 0.006 285.885)`): The light-mode primary and the dark-mode card/surface color. In light mode it does the accent job that emerald does in dark mode, reading as authoritative near-black rather than color.

### Neutral

- **Near Black** (`oklch(0.141 0.005 285.823)`): Primary text in light mode; the page background in dark mode.
- **Paper White** (`oklch(1 0 0)`): Page and card background in light mode.
- **Cool Ash** (`oklch(0.552 0.016 285.938)`): Secondary and muted text — descriptions, timestamps, subtitles. The workhorse for anything that isn't a heading.
- **Mist** (`oklch(0.967 0.001 286.375)`): Muted/secondary/accent surface fills and hover washes (used at low opacity, e.g. `accent/20`–`accent/40`).
- **Ash Line** (`oklch(0.92 0.004 286.32)`): The hairline border that draws every grid, cell, and divider. In dark mode borders drop to `white / 10%`.

### Tertiary

- **Available Green** (`#22c55e`, Tailwind green-500/700/400): A separate, always-green channel used *only* for the pulsing "Available for work" status dot and label. It is independent of the `primary` token and stays green in both themes.
- **Destructive** (`oklch(0.577 0.245 27.325)`): Error and invalid states only.

### Named Rules

**The Split-Primary Rule.** `primary` is Graphite Ink in light mode and Signal Emerald in dark mode. Never hardcode green for accents in light mode, and never assume the accent is green regardless of theme — bind to the `primary` token and let the theme decide.

**The One Signal Rule.** Emerald (and the availability green) together occupy a tiny fraction of any screen. If accent color starts appearing on more than a handful of elements per viewport, it has stopped being a signal.

## Typography

**Display / Body Font:** Montserrat (with `ui-sans-serif, system-ui, sans-serif` fallback)
**Label / Metric / Mono Font:** JetBrains Mono (with `ui-monospace, monospace` fallback)

**Character:** A confident geometric sans for names, headings, and prose, paired with a technical monospace that annotates the system — eyebrows, metrics, status, and the "AK" mark. The monospace is what makes the ledger feel engineered rather than merely minimal.

### Hierarchy

- **Display** (Montserrat 700, `clamp(3rem, 8vw, 6rem)`, line-height 1.05, tracking -0.02em): The hero name only. One per page.
- **Headline** (Montserrat 600, `clamp(2.25rem, 5vw, 3.75rem)`, tracking -0.02em): Section titles (`<h2>`). Accent words wrap in `primary`.
- **Title** (Montserrat 600, ~1rem, line-height 1.3): Card and project titles.
- **Body** (Montserrat 400, `clamp(1rem, 1.2vw, 1.125rem)`, line-height 1.75): Paragraphs, in Cool Ash; emphasized spans shift to foreground weight 500–600.
- **Label** (JetBrains Mono 600, 0.875rem, tracking 0.08em, UPPERCASE): Section eyebrows in `primary`, and — at ~10–11.5px with tracking up to 0.22em — the tiny stat captions.
- **Metric** (JetBrains Mono 500, `clamp(2.25rem, 4vw, 3rem)`, line-height 1): Large stat numerals, in `primary`.

### Named Rules

**The Monospace-Annotation Rule.** Anything that labels, measures, or timestamps is JetBrains Mono, uppercase where it's an eyebrow or caption. Prose and headings are never monospace.

## Layout

A centered single-column reading measure with full-width structural grids. Sections use `px-6` horizontal padding, a vertical rhythm of `space-y-8` (32px) rising to `space-y-12` (48px) on `md`, and `scroll-mt-[150px]` so anchored navigation clears the floating navbar. The footer and the `/projects` route cap at `max-w-7xl`.

Structural blocks are **grids ruled by borders**: the About stats render as a 2×2 grid whose cells are separated by `border-border` hairlines (not gaps), and project cards are bordered rectangles laid on the page. Density is comfortable, not cramped — generous line-height and cell padding keep the ledger legible. Responsive behavior collapses multi-column grids to single column below `md` (768px) and swaps the desktop navbar for a condensed mobile pill below `lg` (1024px).

## Elevation & Depth

Flat by doctrine. Surfaces are separated by **hairline borders and tonal fills**, not drop shadows. The stats grid and project cards use borders to define edges; shadows are shallow (`shadow-xs` on buttons/inputs, `shadow-sm` on shadcn cards) and mostly incidental. The one deliberately elevated element is the **scroll-condensed navbar**, which floats with a layered ambient shadow and a backdrop blur once the page scrolls past 100px.

### Shadow Vocabulary

- **Hairline** (`box-shadow: none; border: 1px solid var(--border)`): The default separator for all structural content.
- **Rest lift** (`shadow-xs` → `0 1px 2px rgba(0,0,0,0.05)`): Buttons and inputs at rest, barely there.
- **Floating chrome** (`0 0 24px rgba(34,42,53,0.06), 0 1px 1px rgba(0,0,0,0.05), 0 0 0 1px rgba(34,42,53,0.04), 0 0 4px rgba(34,42,53,0.08), 0 16px 68px rgba(47,48,55,0.05), 0 1px 0 rgba(255,255,255,0.1) inset`): The condensed navbar and mobile menu only.

### Named Rules

**The Flat-By-Default Rule.** Structural surfaces are flat and bordered at rest. Elevation is earned by floating (the navbar) or by a pointer (hover), never applied decoratively to a static card.

## Shapes

Two corner languages, applied by role. **Content is rectilinear**: stat cells and project cards use sharp 0px corners drawn by borders; shadcn cards use the `xl` radius (14px). **Controls are pill-shaped**: the navbar, CTA, technology badges, and social buttons are `rounded-full`. Between them, standard controls (buttons, inputs) sit at the `md` radius (8px). The base radius token is `0.625rem` (10px), with `sm` 6px / `md` 8px / `lg` 10px / `xl` 14px derived from it. A recurring accent silhouette is the **52px × 2px emerald section bar** and the thin `primary/40` rules that flank the hero role label.

## Components

### Buttons

- **Shape:** `md` radius (8px); default height 36px, `sm` 32px, `lg` 40px.
- **Primary:** `bg-primary` (Graphite Ink / Signal Emerald by theme) with `primary-foreground` text, `shadow-xs`; hover drops to `primary/90`. Label typography, medium weight.
- **Ghost / Secondary:** used heavily for card actions ("Code", "Demo") — transparent, `hover:bg-accent hover:text-accent-foreground`. Ghost is the default in-card action style.
- **Hover / Focus:** `transition-all`; focus shows a 3px `ring-ring/50` ring and border shift.

### CTA Pill (signature)

- Fully rounded, `h-11`, `px-7`, `border-foreground/25`, transparent fill, foreground text. Hover **inverts** to `bg-foreground text-background` over 300ms; `active:scale-95`. Trailing arrow translates `+2px` on hover. This is the primary "Get in touch" action.

### Cards / Containers

- **Project card:** sharp-cornered bordered rectangle (`border-border`, 0px radius), `p-6`, `gap-6`, `overflow-hidden`. Hover shifts border to `primary/30` and fills `accent/20` over 500ms. Contains a preview image (bleeding to card edges via negative margin), title + `MMM YYYY` timestamp, topic logo row, and a `border-t` footer of ghost buttons.
- **shadcn Card:** `rounded-xl`, `border`, `bg-card`, `shadow-sm`, `py-6` — used for structured content blocks.
- **Stat cell:** flat bordered cell, `p-5` → `md:p-8`, `hover:bg-accent/40`; mono metric value in `primary`, tiny uppercase mono caption in Cool Ash.

### Chips / Badges

- **Technology badge:** `rounded-full`, `border-border`, `bg-background`, `px-3 py-2`, logo (20px, theme-swapped) + name in `xs`–`sm`. Pill-shaped, not rectangular.

### Inputs / Fields

- **Style:** `h-9`, `rounded-md`, `border-input`, `bg-transparent`, `shadow-xs`, `px-3`. Search variant adds a leading Search icon and a trailing clear (X) button.
- **Focus:** border shifts to `ring` and a 3px `ring-ring/50` glow appears; `transition-[color,box-shadow]`.
- **Selection:** selected text uses `bg-primary text-primary-foreground`.

### Navigation (signature)

- **Style:** floating, `sticky top-5`, full-width at rest. Past 100px scroll it springs (stiffness 200, damping 50) into a **40%-width rounded-full pill** with `backdrop-blur(10px)`, `bg-white/80` (dark `neutral-950/80`), and the floating-chrome shadow.
- **Items:** Cool Ash text, `hover:text-foreground`; the hovered item gets an animated `rounded-full` background pill (`bg-gray-100` / dark `neutral-800`) that slides between items via shared `layoutId`.
- **Mobile:** condenses to a small bar below `lg`; the menu opens as a shadowed sheet with staggered `fade-down` links.

### Motion

- **Scroll reveal:** `[data-aos]` elements fade in and rise 20px over 0.8s `cubic-bezier(0.215, 0.61, 0.355, 1)`, staggered 40–100ms per index (IntersectionObserver, fires once).
- **Ledger ease:** interactive/state transitions favor `cubic-bezier(0.25, 0, 0.35, 1)` at 200–500ms.
- **Smooth scroll:** Lenis drives anchored navigation.

## Do's and Don'ts

### Do

- **Do** bind accents to the `primary` token so the Split-Primary Rule holds (Graphite Ink in light, Signal Emerald in dark).
- **Do** draw structure with hairline `border-border` grids and cells; keep structural surfaces flat.
- **Do** use JetBrains Mono, uppercase, for eyebrows, metrics, timestamps, and status — and Montserrat for all prose and headings.
- **Do** keep the two shape languages honest: sharp corners for content, `rounded-full` for interactive chrome.
- **Do** reveal content with the single 0.8s fade-up on scroll, staggered — one calm reveal, not competing animations.
- **Do** reserve elevation for the floating navbar and pointer hover.

### Don't

- **Don't** hardcode green for accents in light mode, or assume the accent is green regardless of theme.
- **Don't** spend emerald (or the availability green) on more than a few elements per viewport — its rarity is the signal.
- **Don't** reach for gradient hero washes, glassmorphism, or generic SaaS-template polish; the bordered monospace precision is the identity.
- **Don't** add drop shadows to static cards to create depth — use borders and tonal fills.
- **Don't** round the sharp-cornered content cells (stats, project cards) or square off the pills (nav, CTA, badges).
- **Don't** set body copy or headings in the monospace font.
