# Design Brief

## Direction

Divine Cosmic Spirituality — A mystical, immersive 3D experience inspired by Lord Krishna's Vishwaroopam, combining deep cosmic space aesthetics with golden sacred geometry.

## Tone

Maximalist cosmic spirituality with refined restraint. Bold golden accents dominate deep navy-purple backgrounds; immersive 3D atmosphere balanced by clean UI hierarchy. Sacred without being clichéd.

## Differentiation

Glowing golden text and celestial particle animations respond to user interaction, creating a living spiritual interface where every element feels divinely animated and participant-responsive.

## Color Palette

| Token         | OKLCH              | Role                                    |
|---------------|--------------------|-----------------------------------------|
| background    | 0.13 0.02 260      | Deep cosmic navy-purple space           |
| foreground    | 0.92 0.01 260      | Luminous text on dark                   |
| card          | 0.17 0.025 260     | Lifted card surfaces with depth         |
| primary       | 0.68 0.18 60       | Golden-amber divine accents             |
| accent        | 0.72 0.16 270      | Luminous lavender highlights            |
| muted         | 0.22 0.02 260      | Subtle secondary surfaces               |
| destructive   | 0.6 0.2 25         | Warning red (minimal use)               |

## Typography

- Display: Fraunces — Elegant serif for Sanskrit slokas and headings; conveys sacred, timeless quality
- Body: DM Sans — Clean geometric sans-serif for UI labels and descriptions; readable at all sizes
- Mono: JetBrains Mono — Technical text; used sparingly for chapter numbers or metadata
- Scale: Hero `text-4xl/5xl display`, h2 `text-2xl/3xl display`, body `text-base body`, label `text-sm body`

## Elevation & Depth

Three-tier surface hierarchy: background (void), card (lifted with 0.17L), elevated popup (0.19L). Shadows use luminous glow effects with accent colors rather than dark shadows, reinforcing the divine light metaphor. Cards employ backdrop blur for ethereal layering.

## Structural Zones

| Zone    | Background           | Border              | Notes                                  |
|---------|----------------------|---------------------|----------------------------------------|
| Header  | card (0.17L)         | accent glow (30%)   | Floating nav with golden accent        |
| Hero    | background + 3D      | none                | Full-bleed 3D canvas with parallax    |
| Content | background           | muted (subtle)      | Sections with cosmic breathing rhythm |
| Cards   | cosmic-card class    | accent glow         | Floating effects, particle backdrop   |
| Footer  | muted (0.22L)        | border subtle       | Grounded secondary content            |

## Spacing & Rhythm

Large sections (hero, chapters) use 6rem+ gaps; content cards breathe with 2rem internal padding and 1.5rem gaps. Micro-spacing (buttons, labels) uses 0.5rem increments. Rhythm follows 6px grid system scaled by type tier.

## Component Patterns

- Buttons: Primary (golden bg, navy text), secondary (border-accent), no fill on hover — use glow instead
- Cards: 6px rounded corners, cosmic-card class (blur + border), glow-accent on hover
- Text: Golden glow for headings via `glow-golden` class; white text on dark backgrounds
- Icons: Accent color for active states; subtle animation on interaction

## Motion

- Entrance: Fade in + float animation (6s ease-in-out) for cards and elements
- Hover: Glow-pulse (3s) on interactive elements, subtle scale (1.02x) on cards
- Decorative: Continuous parallax depth shift (10s), particle floating loops, slow aura pulsing
- 3D: Mouse-responsive parallax, scroll-triggered transitions between sections

## Constraints

- No harsh shadows — only luminous glows (glow-golden, glow-accent)
- No opaque overlays — use backdrop-filter blur or rgba with transparency
- Golden accent used only for highlights, CTAs, sacred text; never for UI chrome
- All text maintains AA+ contrast against backgrounds; hover states use glow, not color-only changes
- 3D elements (Three.js) integrate seamlessly; no jarring transitions between canvas and DOM

## Signature Detail

Glowing Sanskrit text (ॐ) floats and pulses in the hero background, creating a meditative anchor point and reinforcing the spiritual essence without overwhelming the interface — a subtle reminder of divine presence.

