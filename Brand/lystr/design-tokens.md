# Lystr — design tokens (extracted from lystr.se)

Extracted from the live site at lystr.se on 2026-04-24. These are the tokens in use on the **current Framer build** — not a defined brand system. Use them as the *starting point* for a proper palette and type system in the new engagement.

## Color palette

### Neutrals (grayscale ramp)

| Hex | RGB | Role (inferred) |
|---|---|---|
| `#FFFFFF` | rgb(255, 255, 255) | Background / surface 0 |
| `#F6F6F6` | rgb(246, 246, 246) | Surface 1 |
| `#F2F2F2` | rgb(242, 242, 242) | Surface 2 |
| `#DEDFE3` | rgb(222, 223, 227) | Border / divider |
| `#D2D2D4` | rgb(210, 210, 212) | Border |
| `#A1A1A8` | rgb(161, 161, 168) | Muted text |
| `#8B8B92` | rgb(139, 139, 146) | Secondary text |
| `#696A6D` | rgb(105, 106, 109) | Body text (light-mode alt) |
| `#3A3A40` | rgb(58, 58, 64) | Body text |
| `#232324` | rgb(35, 35, 36) | Heading / dark surface |
| `#1C1C1C` | rgb(28, 28, 28) | Near-black / brand black |

### Accents

| Hex | RGB | Role (inferred) |
|---|---|---|
| `#E6414F` | rgb(230, 65, 79) | Primary accent — red/coral (CTAs, highlights) |
| `#CCE4BF` | rgb(204, 228, 191) | Secondary accent — soft green (success / eco signal) |

### Notes

- The grayscale ramp is extensive (11 stops) but accent use is minimal (just two colors).
- Accent red `#E6414F` is the strongest color signal on the site — used for the primary CTA and attention markers.
- Soft green `#CCE4BF` is present in the token set but rare on-page; likely reserved for "eco" callouts.
- **No primary brand hue beyond the accent red.** The brand currently reads as mostly-neutral with one accent. This is either intentional minimalism or an unfinished system — worth confirming in the brand phase.

## Typography

| Role | Family | Weights in use |
|---|---|---|
| Primary / display | **Schibsted Grotesk** | 400, 500, 600, 700, 900 — normal and italic for each |
| Monospace | **Fragment Mono** | 400 |

Both are served from Google Fonts / Framer's CDN. `Schibsted Grotesk Variable` is also referenced, suggesting the variable-font version is preferred where supported.

### Notes

- **Schibsted Grotesk** is a Swedish-origin display grotesque, used widely in editorial work (it's the typeface of Aftonbladet / Schibsted Media Group). It's free and open-source (SIL OFL).
- **Fragment Mono** is an experimental monospace from Weiweihuanghuang, also OFL-licensed and free to use.
- Framer also references `Inter` as a fallback — this is Framer's default and is unlikely to be intentional brand typography.

## Logo variants in use

| File (in `logos/`) | Description | Status |
|---|---|---|
| `lystr-wordmark-white-on-black-favicon.png` | Small square favicon with white "Lystr®" wordmark on black | Active (favicon) |
| `lystr-wordmark-white-transparent.png` | White wordmark on transparent — full-resolution | Active (primary) |
| `lystr-wordmark-gradient-DEPRECATED.png` | Wordmark with pink→purple→blue gradient fill | **Deprecated direction** |

The gradient variant was spotted on t-shirts and early collateral, but Alex explicitly rejected this direction in the April 2026 meeting: *"Jag hatar de här gradienten. Det är så utkört. Det är en signal om att vi leker. Vi leker inte. Vi ska vara solida, robusta, trovärdiga."* — so treat it as a negative reference for the new brand.

## Imagery style (current site)

The photography on lystr.se falls into two buckets:

**Product/installation shots** — solar panels, modern Nordic houses with panels installed. Neutral/documentary tone, natural light.

**Nature/lifestyle stock** — Swedish archipelago, Nordic sunsets over water, autumn leaves, forest rivers, father-and-child with toy solar model. Warm golden-hour lighting is a recurring pattern.

**Observation:** The lifestyle imagery leans heavily on stock photography conventions (golden-hour sunsets, happy family with eco product). The target audience defined in the meeting (family in Grimslöv outside Växjö, thin margins, motivated by savings not climate) may respond better to more grounded, less-idealised imagery. Flag for the brand discovery phase.
