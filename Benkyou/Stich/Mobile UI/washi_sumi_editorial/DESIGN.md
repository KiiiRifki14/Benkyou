---
name: Washi & Sumi Editorial
colors:
  surface: '#fff8f5'
  surface-dim: '#e1d8d4'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2ed'
  surface-container: '#f5ece7'
  surface-container-high: '#efe6e2'
  surface-container-highest: '#e9e1dc'
  on-surface: '#1e1b18'
  on-surface-variant: '#59413f'
  inverse-surface: '#34302c'
  inverse-on-surface: '#f8efea'
  outline: '#8d706e'
  outline-variant: '#e1bfbb'
  surface-tint: '#b02d2b'
  primary: '#a52525'
  on-primary: '#ffffff'
  primary-container: '#c73e3a'
  on-primary-container: '#fff0ef'
  inverse-primary: '#ffb3ad'
  secondary: '#944654'
  on-secondary: '#ffffff'
  secondary-container: '#fe9dac'
  on-secondary-container: '#79313f'
  tertiary: '#326040'
  on-tertiary: '#ffffff'
  tertiary-container: '#4b7957'
  on-tertiary-container: '#d0ffd8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb3ad'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#8e1217'
  secondary-fixed: '#ffd9dd'
  secondary-fixed-dim: '#ffb2bc'
  on-secondary-fixed: '#3e0313'
  on-secondary-fixed-variant: '#762f3d'
  tertiary-fixed: '#bcefc6'
  tertiary-fixed-dim: '#a0d2ab'
  on-tertiary-fixed: '#00210d'
  on-tertiary-fixed-variant: '#225031'
  background: '#fff8f5'
  on-background: '#1e1b18'
  surface-variant: '#e9e1dc'
typography:
  display-lg:
    fontFamily: Noto Serif
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 68px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Noto Serif
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  headline-sm:
    fontFamily: Noto Serif
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
This design system pairs the contemplative restraint of Japanese traditional craftsmanship (*wabi-sabi*, *ma* negative space) with high-precision contemporary digital utility. Designed for deep cultural immersion and language study, the aesthetic captures the organic tactility of handmade fibrous paper (*washi*), the deliberate permanence of carbon black calligraphic ink (*sumi*), and decisive architectural accents of vermilion shrines (*torii*).

The emotional tone is serene, patient, scholarly, and uncompromisingly refined. The system avoids noisy gamification, juvenile cartoon accents, or high-saturation alerts in favor of intentional pacing, editorial asymmetry, and quiet visual dignity.

## Colors
The palette evokes natural pigments and hand-milled minerals:

- **Primary Accent (`#C73E3A` / Torii Crimson):** Used sparingly for intentional action points, active flashcard indicators, stamps, and focal keyframes. Never flooded over large background surfaces.
- **Secondary Accent (`#D47A88` / Sakura Blush):** A softened botanical rose used for secondary progress states, auxiliary badges, and seasonal cultural study tags.
- **Tertiary Accent (`#5B8A67` / Matcha Green):** An earthy, powdered green dedicated to mastery verification, correct stroke recognition, and positive streak indicators.
- **Neutral Primary (`#2C2825` / Sumi Ink):** Deep charcoal brown-black, offering softer optical contrast than harsh `#000000` against warm paper backgrounds.
- **Canvas (`#FBF9F4` / Washi Canvas):** The tactile foundation—unbleached, organic warmth that reduces eye strain during prolonged reading.
- **Muted Stone (`#79716B`):** Derived from ground slate; used for furigana, secondary commentary, stroke-order numbering, and metadata.
- **Surface Elevation:** Translucent pure white (`rgba(255, 255, 255, 0.85)`) layered over paper to simulate pressed parchment or frosted shoji screens.

## Typography
Typographic rhythm relies on the tension between classical brushwork and crisp modern geometric forms:

- **Noto Serif** provides the editorial authority for kanji presentation, thematic titles, chapter headings, and reflective quotes. Generous line heights are required to accommodate ruby characters (*furigana*) without layout clipping.
- **Plus Jakarta Sans** delivers unhindered legibility for linguistic analysis, romanized transcripts, navigation bars, and system controls.
- Japanese text setting must preserve traditional vertical punctuation spacing (`zenkaku`) when rendering mixed-script contexts.

## Layout & Spacing
The layout model embodies *Ma* (the deliberate presence of void). Content breathes through generous margins and deliberate asymmetrical positioning rather than edge-to-edge density.

- **Desktop (12 Columns):** 1200px max reading container, centered with 3rem (`48px`) margins and 1.5rem (`24px`) gutters. Editorial headers frequently sit offset to 8 or 10 columns to preserve white space.
- **Tablet (8 Columns):** Fluid columns with 2rem (`32px`) margins and 1rem (`16px`) gutters.
- **Mobile (4 Columns):** Single primary thread with 1.25rem (`20px`) margins to maintain reading comfort without edge claustrophobia.
- Vertical cadence follows an 8px relative baseline rhythm, expanding to `space-xl` between thematic reading sections.

## Elevation & Depth
Depth is physical and planar—akin to sheets of parchment, vellum, and silk layered upon a low cedar desk. The design rejects artificial drop shadows and glowing neon effects.

- **Surface 0 (Canvas):** Base background `#FBF9F4` carrying an optional microscopic grain/noise mask (opacity 0.02) simulating paper grain.
- **Surface 1 (Panels & Cards):** Pure `#FFFFFF` with an 85%–95% fill, backed by `backdrop-filter: blur(8px)`, framed by a hairline border (`rgba(121, 113, 107, 0.18)`). Shadow is minimal: `0 2px 8px rgba(44, 40, 37, 0.04)`.
- **Surface 2 (Floating Modals & Character Brushes):** `#FFFFFF` with `0 8px 24px rgba(44, 40, 37, 0.08)`, edged with a delicate `#E7E2D8` stone stroke.
- **Overlay (Zen Modals):** Semi-opaque Sumi wash (`rgba(44, 40, 37, 0.4)`) with subtle paper-warmth tint.

## Shapes
Shapes are grounded, rectilinear, and architectural, referencing traditional timber framing and folded stationery:

- Standard elements (cards, input frames, module tiles) utilize `0.25rem` (`4px`) corner radii (`roundedness: 1`), keeping silhouettes crisp and disciplined without feeling sharp or harsh.
- Tags, status indicators, and calligraphic seals may utilize `0.5rem` (`8px`) radii to invoke stone chops (*hanko*).
- Complete circular geometry is strictly reserved for user avatars, progress dials, and circular stamp seals.

## Components

### Buttons
- **Primary (Torii Stamp):** Solid `#C73E3A` background, pure white text, 4px border radius. Padding: `10px 24px`. Hover triggers a subtle ink absorption effect (darkens to `#B03431`). Focus ring: 2px Torii with 2px offset.
- **Secondary (Washi Inset):** Surface `#FFFFFF` with a 1px border of `rgba(121, 113, 107, 0.3)`. Text in Sumi Ink (`#2C2825`). Hover shifts background to `#F5F2EB`.
- **Ghost:** Text-only in Sumi Ink with an animated crimson underline on focus/hover that draws in from left to right like an ink stroke.

### Cards & Study Panels
- Clean white backdrop (`#FFFFFF`) with 1px hairline border (`#E5E0D8`).
- Inner content padding uses `space-lg` (`1.5rem`).
- Character cards feature an oversized display character in Noto Serif at center, flanked by subtle grey stroke-order count indicators in the top right.

### Chips & Seals (*Hanko*)
- Compact badges with `0.25rem` corner radius.
- Grammar categories and JLPT levels use subtle muted stone fills (`#F0EDE6`) with `#79716B` text.
- Verified or Mastered tags use Matcha green tint (`rgba(91, 138, 103, 0.12)`) with `#5B8A67` text.

### Form Inputs
- Washi-toned inset backgrounds (`#F5F2EB` in default state, shifting to `#FFFFFF` on active focus).
- Border: 1px `rgba(121, 113, 107, 0.25)` transitioning to a crisp 1.5px `#C73E3A` on focus.
- Labels utilize `label-md` uppercase stone text with generous line spacing.

### Checkboxes & Progress Markers
- Unchecked boxes feature a 1.5px `#79716B` slate border.
- Checked state fills with Matcha Green (`#5B8A67`) displaying a balanced white checkmark.
- Daily streak modules present continuous bamboo-joint or brush-stroke segment connectors rather than rounded plastic pills.

### Calligraphic Canvas Component
- Interactive stroke-order canvas framed with fine sumi guidelines at 25% opacity, simulating traditional rice-paper practice grids (*genkouyoushi*).