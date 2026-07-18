import { SkillListing } from '../skills-data'
 
export const awwwardsMotion: SkillListing = {
  id: 'awwwards-motion',
  author: 'Yu-369',
  slug: 'awwwards-motion',
  name: "Awwwards motion",
  tagline: "Before touching any code, internalize these.",
  description: "Before touching any code, internalize these. They override every aesthetic preference. The quality bar is Apple keynote presentations, Linear app, Stripe homepage, Vercel dashboard, Raycast. If your animation would look out of place on apple.com, it is not good enough.",
  readme: `name: awwwards-motion-design
description: Motion design pipeline for building Awwwards/Apple-tier animations, micro-interactions, scroll sequences, page transitions, and kinetic typography. Enforces the principles that separate award-winning motion from generic CSS transitions — intentional easing, scroll-linked choreography, staggered reveals, magnetic interactions, text splitting, parallax depth, morphing state transitions, and the invisible micro-animations that make interfaces feel alive. Every animation must justify its existence, respect reduced-motion, and run at 60fps. Motion is choreography, not decoration.
---

# Awwwards-Tier Motion Design

> This skill fires when the user asks for animations, transitions, micro-interactions, scroll effects, page transitions, kinetic typography, parallax, hover physics, loading sequences, or anything that involves making a web interface feel alive and premium. Motion is the language of quality — the difference between a static page and an experience that feels like it was hand-crafted by a studio charging $200k per project.

---

## The Pipeline

\`\`\`
┌───────────────────────────────────────────────────────────────────────┐
│                                                                       │
│   BRIEF IN ──→ Phase 1: Motion Audit ──→ Phase 2: Choreography      │
│                  (classify, extract        (sequence map, timing      │
│                   motion intent)            sheet, easing palette)    │
│                                                                       │
│                              ──→ Phase 3: Build                       │
│                                   (implement layer by layer:          │
│                                    entry → scroll → hover →          │
│                                    transitions → ambient)            │
│                                                                       │
│                              ──→ Phase 4: Motion Diff                 │
│                                   (60fps check, feel check,          │
│                                    reduced-motion audit)             │
│                                                                       │
│   Each phase has a ✓ Quality Gate. Failing a gate blocks the next.    │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## The Core Doctrine

Before touching any code, internalize these. They override every aesthetic preference. The quality bar is **Apple keynote presentations, Linear app, Stripe homepage, Vercel dashboard, Raycast.** If your animation would look out of place on apple.com, it is not good enough.

> **The Apple Standard.** Apple does not use generic CSS transitions. Apple uses spring physics — animations that overshoot, settle, and breathe like physical objects. Every interaction on iOS feels like touching a real thing: buttons compress, sheets slide with momentum, elements settle with a gentle bounce. Your animations must achieve this same physical, tangible quality. If an element moves and it feels "digital" or "computed" rather than "physical" or "alive," the easing is wrong.

> **Every animation must have a reason.** If you cannot answer "why does this move?" with a functional answer (guides attention, communicates state change, provides feedback, establishes spatial relationship), remove the animation. Motion without purpose is noise.

> **The best animations are invisible.** The user should not think "that's a nice animation." They should think "this feels good." If the animation draws attention to ITSELF rather than to the CONTENT, it is too much. Apple never makes you wait for an animation to finish. The animation serves the interaction, not the other way around.

> **Spring physics over cubic-bezier.** The era of \`cubic-bezier(0.25, 0.1, 0.25, 1)\` as the pinnacle of easing is over. Material Design 3 Expressive has moved to spring-based motion. Apple has used spring animations since iOS 7. The web has caught up: CSS \`linear()\` enables true spring physics with overshoot and settle. Use spring-derived easing for EVERY primary animation. Reserve cubic-bezier only for ambient/background motion where spring overshoot would be inappropriate.

> **Easing IS the animation.** A 300ms linear transition and a 300ms spring transition have the same duration but completely different character. The curve is what separates a $200k studio site from a template. There is no such thing as a "default" ease. Every curve is a deliberate, conscious choice with a specific emotional character.

> **Stagger creates hierarchy.** When multiple elements animate, they cannot all move at once. Stagger is the motion equivalent of visual hierarchy — it tells the eye where to look first, second, third. Apple staggers with millisecond precision. So do you.

> **Motion respects the user.** Every animation gates behind \`prefers-reduced-motion\`. No exceptions. Users who set this flag have vestibular disorders, motion sensitivity, or simply prefer stillness. Reduced motion does not mean no animation — it means no translation, no parallax, no scale, no spring overshoot. Opacity-only fades at reduced duration are acceptable.

> **ZERO static elements.** Every single visible element on the page MUST have at least one form of motion — an entry animation, a scroll reveal, a hover state, or an ambient effect. If an element exists on the page and has no animation whatsoever, the implementation is incomplete. A static element in an animated page is a dead pixel in a living display.

---

## The Animation Coverage Mandate

This is the non-negotiable rule: **every visible element gets motion.** Not "most elements." Not "the important ones." Every element. Walk through the page element by element and assign motion from this table. If an element does not appear in this table, it still gets at minimum a scroll-triggered fade-in.

### → Mandatory Element Animation Map

Fill this table for EVERY element on the page. Every row must have at least one ✓. Any empty row = incomplete implementation.

| Element | Entry Animation | Scroll Reveal | Hover/Focus State | Ambient/Micro | Assigned |
|---|---|---|---|---|---|
| **Navigation bar** | Slide down + fade from top | — | Link underline slide, spring-scale menu items | — | ✓ |
| **Logo** | Fade in (first element, 0ms delay) | — | Subtle scale(1.05) on hover | — | ✓ |
| **Nav links** | Stagger fade-in left-to-right | — | Sliding underline + color shift | — | ✓ |
| **Hero heading** | Word-by-word masked reveal OR char split | — | — | — | ✓ |
| **Hero subtext** | Fade-up-deblur (stagger after heading) | — | — | — | ✓ |
| **Hero CTA button** | Scale-in + fade (last hero element) | — | Pressure depth (compress + inner shadow) + lift + ripple on click | Subtle glow pulse | ✓ |
| **Hero background** | Scale(1.05→1) + fade (Ken Burns settle) | Parallax slow | — | Gradient shift OR grain movement | ✓ |
| **Section headings** | — | Word-by-word masked reveal OR fade-up-deblur | — | — | ✓ |
| **Section subtext** | — | Fade-up (stagger 80ms after heading) | — | — | ✓ |
| **Body paragraphs** | — | Line-by-line reveal OR fade-up | — | — | ✓ |
| **Cards** | — | Stagger fade-up (80ms increment per card) | Lift(-4px) + shadow expand + border glow + 3D tilt | — | ✓ |
| **Card icons/images** | — | Scale-in (after card reveals) | Subtle rotate or color shift on card hover | — | ✓ |
| **Card titles** | — | Part of card reveal | Color shift on card hover | — | ✓ |
| **Card descriptions** | — | Part of card reveal | Opacity increase on card hover | — | ✓ |
| **Images** | — | Clip-path wipe reveal OR scale-in | Ken Burns zoom on hover | — | ✓ |
| **Buttons (all)** | — | Fade-up with parent | Pressure depth + lift + shadow + ripple click | — | ✓ |
| **Links (inline)** | — | Part of parent reveal | Sliding underline + color shift | — | ✓ |
| **Input fields** | — | Fade-up with parent | Border glow on focus + label float | — | ✓ |
| **Badges/pills** | — | Scale-in + fade | Background color shift on hover | Subtle bounce float | ✓ |
| **Dividers/lines** | — | Width expand from center (scaleX 0→1) | — | — | ✓ |
| **Testimonial quotes** | — | Fade-up-deblur + slide | — | — | ✓ |
| **Avatars** | — | Scale-in with border ring animation | Ring pulse on hover | — | ✓ |
| **Stats/numbers** | — | Counter animation (count up from 0) | — | — | ✓ |
| **Footer** | — | Fade-up (last section) | Link underline slides | — | ✓ |
| **Footer links** | — | Stagger reveal | Underline slide + color shift | — | ✓ |
| **Social icons** | — | Stagger scale-in | Lift + color shift to brand color | — | ✓ |
| **Background shapes** | — | — | — | Floating animation + parallax | ✓ |
| **Decorative elements** | — | Rotate-in or scale-in | — | Slow spin or float | ✓ |
| **Scroll indicator** | Fade-in after hero loads | — | — | Gentle bounce loop | ✓ |
| **Progress bars** | — | Width expand (scaleX 0→1) with easing | — | — | ✓ |
| **Tooltips** | — | — | Float up + fade from trigger | — | ✓ |
| **Accordions** | — | Fade-up with parent | Border/bg shift on hover | Smooth height expand | ✓ |
| **Tabs** | — | Fade-up with parent | Background shift | Sliding indicator + content crossfade | ✓ |
| **Modals** | — | — | — | Backdrop fade + content scale-in | ✓ |
| **Toast/notifications** | — | — | — | Slide-in from edge + auto-dismiss | ✓ |

⚠ **Drift Warning:** The #1 failure is animating the hero and first section, then leaving everything below the fold completely static. EVERY section must have scroll-triggered reveals. EVERY interactive element must have hover feedback. Walk the page top-to-bottom and verify coverage. If you scroll and find a section that just "sits there" without animating in, the implementation is broken.

### → Coverage Verification Sweep

After building all animations, perform this sweep. Open the page and scroll top to bottom at a natural reading pace. For EVERY element that enters the viewport:

1. **Does it animate into view?** If no → add a scroll reveal
2. **Can you hover it?** If yes → does it have hover feedback? If no → add hover state
3. **Is it interactive (clickable, focusable)?** If yes → does it have active/focus states? If no → add them
4. **Is it decorative?** If yes → does it have ambient motion (float, rotate, pulse)? If no → add it
5. **Is it a text element?** If yes → does it have at minimum a fade-up reveal? If no → add it

A page with 100% animation coverage feels alive. A page with 80% coverage has dead spots that the eye catches immediately.

---

## Phase 1: Motion Audit

Before writing any code, classify the motion requirements.

### → Classify the Motion Context

| Field | Your answer |
|---|---|
| **Page type** | Marketing landing page / Product app / Portfolio / E-commerce / Editorial / Dashboard |
| **Motion density** | Minimal (Apple-style restraint) / Moderate (Stripe-level) / Rich (Awwwards experimental) |
| **Primary motion purpose** | Guide attention / Communicate state / Create atmosphere / Reveal content / Delight |
| **Scroll behavior** | Standard scroll / Scroll-linked animations / Scroll-jacked sections / Sticky reveals |
| **Page transitions** | None (SPA with instant swap) / Crossfade / Slide / Morph / Custom sequence |
| **Framework** | Vanilla CSS/JS / Framer Motion (React) / GSAP / Motion One / CSS-only |

### → Identify Motion Layers

Walk through the page and tag every element that should move. Classify each into one of these layers:

| Motion Layer | What it covers | Priority |
|---|---|---|
| **Entry** | First-paint reveals, above-the-fold load animation | P0 — must have |
| **Scroll** | Elements revealing as user scrolls, parallax, sticky sequences | P0 — must have |
| **Hover/Focus** | Button lifts, card tilts, link underlines, pressure depth effects | P0 — must have |
| **State** | Page transitions, tab switches, modal open/close, accordion, menu | P1 — should have |
| **Ambient** | Floating elements, gradient shifts, particle systems, cursor glow | P2 — polish layer |
| **Kinetic** | Text splitting, character-by-character reveals, word rotators | P2 — polish layer |

### → Output the Motion Brief

State in 2-3 lines the motion strategy:

> *"Motion Brief: Apple-restraint motion density. Staggered fade-up-deblur entries on all sections. Scroll-triggered reveals with 20% viewport threshold. Magnetic hover on CTA buttons. Smooth text split reveals on section headings. Crossfade page transitions. No ambient particles. Easing palette: snappy decel for entries, spring for hovers, smooth for scrolls."*

### ✓ Quality Gate: Audit

Before moving to Phase 2, confirm:
- Motion context is classified (page type, density, purpose)
- Every moving element is tagged to a motion layer
- The Element Animation Map is filled for EVERY element on the page — no empty rows
- Motion Brief is written
- Framework is selected

---

## Phase 2: Choreography

Motion is choreography. Every element has an entrance cue, a duration, an easing curve, and a relationship to the elements around it. This phase creates the timing sheet — the musical score of the page.

### → The Easing Palette

This is the single most important section in the entire skill. The easing palette defines the emotional language of every animation on the page. Using the wrong curve is like playing a wrong note in a symphony — even non-musicians can feel it.

The palette has THREE tiers, ordered by quality. Use the highest tier your browser support allows.

---

**TIER 1: Spring Physics via CSS \`linear()\` — THE GOLD STANDARD**

This is what Apple uses. This is what Material Design 3 Expressive uses. This is what separates $200k studio sites from templates. CSS \`linear()\` enables true spring physics with overshoot and settle — something \`cubic-bezier()\` fundamentally cannot achieve.

\`\`\`css
/* BLUEPRINT: Spring-based easing palette via CSS linear()
   WHY: Real spring physics create motion that feels PHYSICAL.
   Objects in the real world don't follow cubic-bezier curves —
   they have mass, momentum, and elasticity. Springs overshoot
   their target and settle back, which reads as "alive" to the
   human eye. This is why every iOS animation feels tangible.

   These curves were generated from spring physics simulations
   with specific mass/stiffness/damping parameters. The linear()
   function plots the spring's position at discrete time steps,
   which the browser interpolates smoothly between. */

:root {
  /* 1. APPLE SNAPPY SPRING — Primary entrance/reveal easing
     Physics: mass=1, stiffness=400, damping=30
     Character: Explosive start, tiny overshoot (~2%), soft settle.
     This is the iOS sheet-present / notification-arrive curve.
     Use on: hero entries, scroll reveals, modal opens, everything
     that "arrives" on screen. This is your DEFAULT curve. */
  --spring-snappy: linear(
    0, 0.009, 0.035 2.1%, 0.141 4.4%, 0.723 12.9%,
    0.938 16.7%, 1.017 19.4%, 1.067 22.5%, 1.089 26.0%,
    1.079 30.3%, 1.049 36.0%, 1.024 42.6%, 1.011 50.3%,
    1.004 59.2%, 1.001 69.3%, 1
  );
  --spring-snappy-duration: 0.55s;

  /* 2. APPLE SMOOTH SPRING — State changes, position shifts
     Physics: mass=1, stiffness=200, damping=24
     Character: Gentle acceleration, visible overshoot (~5%),
     two-phase settle. Feels like a precision instrument.
     This is the iOS page-transition / tab-switch curve.
     Use on: page transitions, tab switches, carousel slides,
     anything moving from position A to position B. */
  --spring-smooth: linear(
    0, 0.004, 0.016 2.3%, 0.063 4.7%, 0.141 7.2%,
    0.25 9.9%, 0.601 16.5%, 0.815 21.0%, 0.929 25.2%,
    0.987 29.0%, 1.025 33.5%, 1.042 38.0%, 1.04 43.5%,
    1.027 50.0%, 1.013 57.5%, 1.005 67.0%, 1.001 79.0%, 1
  );
  --spring-smooth-duration: 0.7s;

  /* 3. APPLE BOUNCY SPRING — Playful micro-interactions
     Physics: mass=1, stiffness=500, damping=18
     Character: Very fast, pronounced overshoot (~12%), visible
     bounce-settle. Feels playful, energetic, delightful.
     Use SPARINGLY on: toggles, like buttons, notification pops,
     small badges, emoji reactions. NEVER on large elements. */
  --spring-bouncy: linear(
    0, 0.014, 0.055 1.8%, 0.218 3.7%, 0.867 8.5%,
    1.085 10.7%, 1.212 12.9%, 1.264 15.0%, 1.262 17.0%,
    1.217 19.5%, 1.098 24.0%, 1.035 28.5%, 0.993 33.0%,
    0.981 38.0%, 0.988 45.0%, 0.998 55.0%, 1.001 68.0%, 1
  );
  --spring-bouncy-duration: 0.5s;

  /* 4. MATERIAL 3 EMPHASIZED — Google's expressive motion standard
     Source: Material Design 3 motion spec (legacy cubic-bezier fallback)
     Character: Very slow start, dramatic acceleration, gentle decelerate.
     This is the M3 "emphasized" transition for container transforms,
     shared element transitions, and FAB expansions.
     Use on: container morphs, expand/collapse, shared transitions. */
  --m3-emphasized: cubic-bezier(0.05, 0.7, 0.1, 1.0);
  --m3-emphasized-duration: 0.5s;

  /* 5. MATERIAL 3 EMPHASIZED as SPRING — for spring-capable contexts
     Physics: mass=1, stiffness=300, damping=22
     The spring equivalent of M3 Emphasized — with the overshoot
     that Google's spec now recommends via their spring system. */
  --m3-spring: linear(
    0, 0.007, 0.029 2.0%, 0.118 4.2%, 0.508 10.9%,
    0.797 15.4%, 0.951 19.2%, 1.029 22.2%, 1.074 25.6%,
    1.088 29.2%, 1.075 33.6%, 1.045 39.5%, 1.02 46.5%,
    1.007 55.0%, 1.001 66.0%, 1
  );
  --m3-spring-duration: 0.6s;
}
\`\`\`

---

**TIER 2: Premium Cubic-Bezier Curves — STRONG FALLBACK**

For browsers that don't support \`linear()\`, or for secondary animations where spring overshoot would be inappropriate (ambient motion, background transitions, color shifts).

\`\`\`css
:root {
  /* 6. SNAPPY DECEL — Tier 2 fallback for spring-snappy
     The best cubic-bezier approximation of the Apple snappy spring,
     minus the overshoot. Still far better than CSS keyword easings.
     Use when linear() is unavailable, or for secondary reveals. */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  /* 7. SMOOTH IN-OUT — for ambient position shifts
     Neither Material 3 nor Apple style — this is the Awwwards
     agency standard for smooth lateral movements, carousel
     auto-play, and background panning. */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  /* 8. ENERGETIC SNAP — for hover responses, interactive feedback
     Faster than --ease-out, designed for immediate tactile response.
     The curve front-loads 80% of the motion into the first 30% of
     the duration, creating a "snap" sensation. */
  --ease-snap: cubic-bezier(0.22, 1, 0.36, 1);

  /* 9. DRAMATIC IN-OUT — for hero reveals, cinematic entrances
     Extremely slow start ("winding up"), explosive middle,
     graceful deceleration. Use for the ONE theatrical moment
     per page — the hero heading reveal, a page transition wipe. */
  --ease-dramatic: cubic-bezier(0.77, 0, 0.175, 1);

  /* 10. CUBIC SPRING APPROXIMATION — bouncy without linear()
      The y2 value exceeds 1.0, causing overshoot. This is the
      closest cubic-bezier can get to a spring. Less natural than
      linear() springs but works everywhere. */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
\`\`\`

---

**TIER 3: CSS Keyword Easings — BANNED**

\`ease\`, \`ease-in\`, \`ease-out\`, \`ease-in-out\`, \`linear\` — these CSS keywords are the typographic equivalent of Comic Sans. They have zero character, zero intentionality, zero soul. They exist because browsers needed a default, not because any designer chose them.

| CSS Keyword | Why it's banned | What to use instead |
|---|---|---|
| \`ease\` | Generic curve that matches nothing. The "I didn't think about this" easing. | \`--spring-snappy\` or \`--ease-out\` |
| \`ease-in\` | Slow start, fast end — objects accelerating into a wall. Almost never what you want. | \`--ease-dramatic\` (if you need a slow start) |
| \`ease-out\` | Better than \`ease\`, but still a bland, characterless deceleration. | \`--spring-snappy\` or \`--ease-out\` (the custom one) |
| \`ease-in-out\` | The "I want this to look smooth" default that looks like nothing. | \`--spring-smooth\` or \`--ease-in-out\` (the custom one) |
| \`linear\` | Objects don't move at constant speed in nature. Feels robotic and dead. | Only acceptable for \`animation-timing-function\` on infinite loops (marquees, spinners) |

⚠ **Drift Warning:** If you write \`transition: all 0.3s ease\` ANYWHERE in the codebase, the implementation has failed the quality bar. Every transition must use a named curve from the palette. No exceptions. No shortcuts. The easing palette is the DNA of the entire motion experience.

---

**→ How to choose between Tier 1 and Tier 2:**

| Animation type | Use this tier | Why |
|---|---|---|
| **Hero entry, page load reveals** | Tier 1 (\`--spring-snappy\`) | First impression. Must feel physical and premium. |
| **Scroll reveals** | Tier 1 (\`--spring-snappy\`) | User sees dozens of these. Each one must feel alive. |
| **Button/card hover** | Tier 2 (\`--ease-snap\`) | Hover is fast and functional. Spring overshoot on hover feels jittery. |
| **Button click/active** | Tier 1 (\`--spring-bouncy\`) | Click feedback benefits from the satisfying "pop" of a spring bounce. |
| **Modal/dialog open** | Tier 1 (\`--spring-smooth\`) | Modals are spatial — they arrive from somewhere. Springs make this feel real. |
| **Tab switch/carousel** | Tier 1 (\`--spring-smooth\`) | Position changes need momentum and settle. |
| **Background color shift** | Tier 2 (\`--ease-in-out\`) | Color doesn't have mass. Springs on color feel wrong. |
| **Gradient animation** | Tier 2 (\`--ease-in-out\`) or \`linear\` | Ambient motion. No spring needed. |
| **Page transition** | Tier 1 (\`--spring-smooth\`) | Page navigation is a major spatial event. Must feel physical. |
| **Tooltip appear** | Tier 2 (\`--ease-snap\`) | Fast, functional, non-theatrical. |
| **Accordion expand** | Tier 1 (\`--spring-snappy\`) or Tier 1 (\`--m3-spring\`) | Height changes with spring settle feel premium. |
| **Floating/ambient** | CSS \`linear\` keyword | Continuous loops don't need easing — constant speed IS correct. |

---

**→ Framer Motion / Motion spring equivalents:**

\`\`\`tsx
/* BLUEPRINT: Framer Motion spring presets matching the CSS palette
   WHY: When using Framer Motion (React), use these spring configs
   instead of the CSS linear() values. Framer Motion's spring()
   computes physics natively, giving even smoother results than
   the CSS approximation. These match the FEEL of the CSS palette. */

const springs = {
  // Matches --spring-snappy: fast, minimal overshoot
  snappy: { type: "spring", stiffness: 400, damping: 30, mass: 1 },

  // Matches --spring-smooth: gentle, visible settle
  smooth: { type: "spring", stiffness: 200, damping: 24, mass: 1 },

  // Matches --spring-bouncy: playful pop
  bouncy: { type: "spring", stiffness: 500, damping: 18, mass: 1 },

  // Matches --m3-spring: Material 3 emphasized
  emphasized: { type: "spring", stiffness: 300, damping: 22, mass: 1 },

  // For hover responses (no spring, just fast decel)
  snap: { type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

// Usage:
// <motion.div transition={springs.snappy} />
// <motion.div transition={springs.smooth} />
\`\`\`

---

**→ GSAP spring equivalents:**

\`\`\`javascript
/* BLUEPRINT: GSAP spring-like easing
   WHY: GSAP doesn't use spring physics natively, but its
   CustomEase plugin can replicate the feel. For standard use,
   these "power" easings are the closest GSAP equivalents. */

// snappy: "power3.out" or CustomEase
// smooth: "power2.inOut"
// bouncy: "back.out(1.7)"  — the 1.7 controls overshoot amount
// dramatic: "expo.inOut"
// snap: "power4.out"

// For true springs in GSAP, use the gsap-spring plugin:
// gsap.to(".element", { x: 100, ease: "spring({stiffness: 400, damping: 30})" });
\`\`\`

### → The Timing Sheet

Map every animation in sequence. This is the score.

| Element | Trigger | Delay | Duration | Easing | Transform | Notes |
|---|---|---|---|---|---|---|
| Nav | Page load | 0ms | 600ms | --ease-out | opacity 0→1, y -20→0 | First element to appear |
| Hero eyebrow | Page load | 100ms | 700ms | --ease-out | opacity 0→1, y 20→0, blur 8→0 | Stagger start |
| Hero heading | Page load | 200ms | 800ms | --ease-out | opacity 0→1, y 30→0, blur 8→0 | Core focal point |
| Hero subtext | Page load | 320ms | 700ms | --ease-out | opacity 0→1, y 20→0 | After heading lands |
| Hero CTA | Page load | 440ms | 600ms | --ease-out | opacity 0→1, y 20→0, scale 0.95→1 | Last hero element |
| Section heading | Scroll (20% visible) | 0ms | 800ms | --ease-out | opacity 0→1, y 40→0 | Per section |
| Cards | Scroll (15% visible) | 0/80/160ms | 700ms | --ease-out | opacity 0→1, y 30→0 | Stagger per card |
| CTA buttons | Hover | 0ms | 500ms | --ease-snap | y 0→-2px, shadow increase | Immediate response |
| Cards | Hover | 0ms | 400ms | --ease-snap | y 0→-4px, shadow increase | Lift effect |

**Timing Rules:**

| Rule | Value | Why |
|---|---|---|
| Maximum total entry sequence | 800ms | Beyond 800ms, the page feels slow to load |
| Stagger increment | 80-150ms | Below 80ms feels simultaneous. Above 150ms feels sluggish |
| Hover response | ≤ 150ms perceived start | The user must feel instant feedback |
| Scroll reveal duration | 600-900ms | Long enough to notice, short enough to not obstruct |
| Page transition | 300-500ms | Fast enough to not break flow, slow enough to register |
| Micro-interaction (toggle, checkbox) | 200-350ms | Functional feedback, not theatrical |

⚠ **Drift Warning:** The #1 AI animation failure is making everything too slow. A 1.5-second fade-in on every section makes the page feel like it's loading, not revealing. Keep scroll reveals under 900ms. Keep hover responses under 500ms. Keep total page entry under 800ms.

### → Stagger Choreography

Stagger is not "delay each item by 100ms." Stagger follows visual hierarchy.

**Correct stagger order (top to bottom = first to last):**
\`\`\`
1. Container/background (instant or 0ms)
2. Primary content (heading, hero image) — 100ms
3. Supporting content (subtext, description) — 220ms  
4. Interactive elements (CTAs, buttons) — 340ms
5. Decorative elements (badges, accents) — 440ms
\`\`\`

**Stagger within grids (cards, features):**
\`\`\`
For a 3-column grid, stagger left-to-right:
  Card 1: 0ms
  Card 2: 80ms
  Card 3: 160ms

For a 2x3 grid, stagger top-left to bottom-right:
  Row 1: 0ms, 80ms, 160ms
  Row 2: 120ms, 200ms, 280ms
\`\`\`

⚠ **Drift Warning:** Never stagger more than 6-8 items. If you have 12 cards, stagger the first 4-6, then bring the rest in together. A 12-item stagger takes 1.2+ seconds and the user loses patience watching items appear one by one.

### ✓ Quality Gate: Choreography

Before moving to Phase 3, confirm:
- Easing palette is defined (not using CSS keyword easings)
- Timing sheet covers every moving element
- No animation exceeds 900ms duration
- Total page entry sequence is under 800ms
- Stagger increments are 80-150ms
- Stagger follows visual hierarchy, not DOM order
- No more than 6-8 items are individually staggered

---

## Phase 3: Build the Motion

Implement layer by layer. Each layer builds on the previous one. Do not skip layers.

---

### Layer 1: Entry Animations (Page Load)

The first impression. Every above-the-fold element needs a choreographed entrance.

**CSS-Only Entry System:**

\`\`\`css
/* BLUEPRINT: CSS entry animation system
   WHY: Using CSS custom properties for delay values lets you
   stagger from HTML with data attributes. No JS required for
   basic entries. The blur-to-sharp adds perceived quality —
   elements feel like they're "focusing" into existence, not
   just fading in. */

@keyframes enter-up {
  from {
    opacity: 0;
    transform: translateY(var(--enter-y, 24px));
    filter: blur(var(--enter-blur, 6px));
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes enter-scale {
  from {
    opacity: 0;
    transform: scale(var(--enter-scale, 0.95));
    filter: blur(var(--enter-blur, 4px));
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

@keyframes enter-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.enter-up {
  animation: enter-up 0.7s var(--ease-out) both;
  animation-delay: var(--stagger, 0ms);
}

.enter-scale {
  animation: enter-scale 0.6s var(--ease-out) both;
  animation-delay: var(--stagger, 0ms);
}

.enter-fade {
  animation: enter-fade 0.5s var(--ease-out) both;
  animation-delay: var(--stagger, 0ms);
}

/* Stagger via inline custom properties in HTML:
   <h1 class="enter-up" style="--stagger: 100ms">
   <p class="enter-up" style="--stagger: 220ms">
   <a class="enter-up" style="--stagger: 340ms">
*/

@media (prefers-reduced-motion: reduce) {
  .enter-up,
  .enter-scale {
    animation: enter-fade 0.3s ease both;
    animation-delay: 0ms;
  }
}
\`\`\`

**Framer Motion Entry System (React):**

\`\`\`tsx
/* BLUEPRINT: Framer Motion staggered entry
   WHY: variants + staggerChildren is the cleanest way to
   orchestrate multi-element entrances. The parent controls
   timing, children just declare their start/end states.
   This keeps animation logic declarative, not imperative. */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpBlur = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeUpSubtle = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Usage:
// <motion.div variants={containerVariants} initial="hidden" animate="visible">
//   <motion.span variants={fadeUpBlur}>EYEBROW</motion.span>
//   <motion.h1 variants={fadeUpBlur}>Heading</motion.h1>
//   <motion.p variants={fadeUpSubtle}>Subtext</motion.p>
//   <motion.a variants={scaleIn}>CTA</motion.a>
// </motion.div>
\`\`\`

**GSAP Entry System:**

\`\`\`javascript
/* BLUEPRINT: GSAP staggered entry with ScrollTrigger
   WHY: GSAP's timeline gives frame-perfect control over
   complex sequences. The "from" tween is cleaner than
   "to" for entries because you define the hidden state
   and GSAP animates TO the element's natural CSS state. */

// Hero entry (fires on page load)
const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTl
  .from(".hero-eyebrow", {
    y: 20, opacity: 0, duration: 0.7, filter: "blur(8px)"
  })
  .from(".hero-heading", {
    y: 30, opacity: 0, duration: 0.8, filter: "blur(8px)"
  }, "-=0.55")  // overlap with previous
  .from(".hero-subtext", {
    y: 20, opacity: 0, duration: 0.6
  }, "-=0.5")
  .from(".hero-cta", {
    y: 20, opacity: 0, scale: 0.95, duration: 0.5
  }, "-=0.4");
\`\`\`

---

### Layer 2: Scroll-Triggered Reveals

Elements below the fold reveal as the user scrolls them into view.

**Intersection Observer (Vanilla JS):**

\`\`\`javascript
/* BLUEPRINT: Scroll reveal with IntersectionObserver
   WHY: IntersectionObserver is GPU-friendly — it doesn't fire
   on every scroll event. The threshold (0.15) means the element
   starts animating when 15% is visible, which feels natural.
   rootMargin "-50px" prevents elements at the very edge of the
   viewport from triggering prematurely. The "once" pattern
   (unobserve after first trigger) prevents re-animation on
   scroll-up, which looks janky. */

class ScrollReveal {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "-50px 0px",
      }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => {
      this.observer.observe(el);
    });
  }
}

// Initialize after DOM ready
new ScrollReveal();
\`\`\`

\`\`\`css
/* BLUEPRINT: Scroll reveal CSS states
   WHY: The element starts in its hidden state via CSS.
   When JS adds .is-visible, the CSS transition takes over.
   This means elements are hidden by default (no flash of
   unstyled content), and the transition uses the easing
   palette for consistency. */

[data-reveal] {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.8s var(--ease-out),
    transform 0.8s var(--ease-out),
    filter 0.8s var(--ease-out);
  will-change: transform, opacity;
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Variant: reveal with blur */
[data-reveal="blur"] {
  filter: blur(8px);
}
[data-reveal="blur"].is-visible {
  filter: blur(0);
}

/* Variant: reveal with scale */
[data-reveal="scale"] {
  transform: scale(0.92);
}
[data-reveal="scale"].is-visible {
  transform: scale(1);
}

/* Stagger children within a revealed container */
[data-reveal-stagger] > * {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s var(--ease-out),
    transform 0.7s var(--ease-out);
}
[data-reveal-stagger].is-visible > *:nth-child(1) { transition-delay: 0ms; opacity: 1; transform: translateY(0); }
[data-reveal-stagger].is-visible > *:nth-child(2) { transition-delay: 80ms; opacity: 1; transform: translateY(0); }
[data-reveal-stagger].is-visible > *:nth-child(3) { transition-delay: 160ms; opacity: 1; transform: translateY(0); }
[data-reveal-stagger].is-visible > *:nth-child(4) { transition-delay: 240ms; opacity: 1; transform: translateY(0); }
[data-reveal-stagger].is-visible > *:nth-child(5) { transition-delay: 320ms; opacity: 1; transform: translateY(0); }
[data-reveal-stagger].is-visible > *:nth-child(6) { transition-delay: 400ms; opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    transform: none !important;
    filter: none !important;
    transition: opacity 0.3s ease;
  }
  [data-reveal-stagger] > * {
    transform: none !important;
    transition: opacity 0.3s ease;
    transition-delay: 0ms !important;
  }
}
\`\`\`

\`\`\`html
<!-- Usage in HTML -->
<section data-reveal>
  <h2>Section heading</h2>
</section>

<div data-reveal="blur">
  <p>Blurs into focus</p>
</div>

<div data-reveal-stagger>
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
\`\`\`

**Scroll-Linked Progress Animations (GSAP ScrollTrigger):**

\`\`\`javascript
/* BLUEPRINT: Scroll-pinned reveal sequence
   WHY: "pin: true" locks the section in place while the user
   scrolls through the animation. scrub: 1 ties the animation
   progress 1:1 to scroll position with a 1-second smoot`,
  whenToUse: "Use when you need to automate awwwards motion processes.",
  price: "Free",
  priceUsdc: 0,
  category: "skill",
  tags: ["Yu-369-skills","awwwards-motion"],
  stars: 223,
  weeklyInstalls: 70,
  totalPurchases: 848,
  featured: false,
  createdAt: '2026-07-18',
  creatorWallet: '6i2cZMm9LLZ2Z8n3reK7FV3ePQiQh1KGJvkMg82sJRj8',
  fileUrl: 'https://github.com/Yu-369/VibeCurb/blob/main/skills/awwwards-motion/SKILL.md',
  useCases: ["Does it animate into view? If no → add a scroll reveal.","Can you hover it? If yes → does it have hover feedback? If no → add hover state.","Is it decorative? If yes → does it have ambient motion (float, rotate, pulse)? If no → add it."],
  exampleUsage: "Apply awwwards motion for my project",
  overviewHtml: `<div class="skill-enrichment" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="enrich-hero" style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 196, 129, 0.14); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);">
        <div style="width: 100%; aspect-ratio: 16/6; background: linear-gradient(135deg, #13110f 0%, #17181c 100%); display: flex; align-items: center; justify-content: center; color: var(--color-accent-warm-light);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 30%, #0a0806 95%);"></div>
        <div style="position: absolute; bottom: 20px; left: 24px; right: 24px;">
          <h2 style="font-family: var(--font-display); color: var(--color-accent-warm-light); margin: 0; font-size: 28px; font-weight: 500; letter-spacing: 0.02em;">Awwwards motion</h2>
          <p style="margin: 6px 0 0; color: var(--color-text-secondary); font-size: 14px; max-width: 600px;">Before touching any code, internalize these.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.2fr 1.0fr; gap: 32px; align-items: start;">
        <div>
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">SKILL CAPABILITIES</h3>
          <p style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.65; color: var(--color-text-secondary);">Before touching any code, internalize these. They override every aesthetic preference. The quality bar is Apple keynote presentations, Linear app, Stripe homepage, Vercel dashboard, Raycast. If your animation would look out of place on apple.com, it is not good enough.</p>
          
          <h3 style="color: var(--color-text-primary); margin-bottom: 16px; font-size: 16px; font-weight: 600; letter-spacing: 0.03em;">KEY FEATURES</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>End-to-end workflow execution automation</span>
  </li>
<li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>Preset parameters optimized for production use</span>
  </li>
<li style="margin-bottom: 12px; font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: flex-start; gap: 8px;">
    <span style="color: var(--color-accent); font-weight: bold; margin-top: 2px;">•</span>
    <span>Self-documenting routines and validation parameters</span>
  </li>
          </ul>
        </div>
        
        <div style="background: rgba(255, 196, 129, 0.03); border: 1px solid rgba(255, 196, 129, 0.08); border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);">
          <h4 style="color: var(--color-accent-warm-light); margin-top: 0; margin-bottom: 16px; font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">AUTOMATION STACKS</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;">
              <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;">1. PARSE & STRUCTURE</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Analyze context inputs and map constraints recursively.</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;">
              <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;">2. AGENT EVALUATION</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Validate logic flows against preset specifications.</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.2); border-radius: 8px; border: 1px solid rgba(255, 196, 129, 0.08); padding: 12px;">
              <div style="font-size: 11px; color: var(--color-accent-warm-light); margin-bottom: 4px; font-weight: 600;">3. DEPLOY & EXPORT</div>
              <div style="font-size: 12px; color: var(--color-text-secondary);">Write standardized outputs to target environments.</div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  previewHtml: `<div style="background: #050c12; border: 1px solid rgba(255, 196, 129, 0.16); border-radius: 12px; font-family: var(--font-mono); color: #ffe8d1; overflow: hidden; max-width: 100%; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);">
      <div style="background: rgba(255, 196, 129, 0.06); border-bottom: 1px solid rgba(255, 196, 129, 0.1); padding: 12px 20px; font-size: 11px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; letter-spacing: 0.08em;">
        <span>CODE EDITOR & COMPILER</span>
        <span style="color: var(--color-accent-warm-light);">ONLINE</span>
      </div>
      <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 11px; color: rgba(255, 232, 209, 0.4);">INPUT CONTEXT</div>
          <pre style="margin: 0; font-size: 11px; background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: rgba(255, 232, 209, 0.7); overflow-x: auto;">{
  "status": "pending",
  "file": "SKILL.md"
}</pre>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="font-size: 11px; color: rgba(255, 232, 209, 0.4);">PROCESS OUTPUT</div>
          <pre style="margin: 0; font-size: 11px; background: rgba(255, 196, 129, 0.02); padding: 10px; border-radius: 6px; border: 1px solid rgba(255, 196, 129, 0.08); color: var(--color-accent-warm-light); overflow-x: auto;">{
  "status": "success",
  "processed": true
}</pre>
        </div>
      </div>
    </div>`
}
