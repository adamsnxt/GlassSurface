# GlassSurface

A React component that replicates Apple's liquid glass effect using SVG barrel-lens distortion and `backdrop-filter`. Zero heavy libraries — just a canvas-generated displacement map, an SVG filter, and CSS.

## How it works

1. **Canvas barrel map** — at mount, a `ResizeObserver` measures the element and generates a radial displacement map: `dispX = strength × nx × r²`. Value is `0` at the center (no distortion) and grows quadratically towards the edges (fish-eye / magnifying-glass effect).
2. **SVG `feDisplacementMap`** — the map is loaded into a hidden `<feImage>` and applied via `feDisplacementMap`. The filter is injected into a `0×0` fixed SVG outside the component.
3. **`backdrop-filter: url(#id)`** — applied directly on the wrapper div so the browser correctly clips distortion to the `border-radius`. A `0.5px` blur smooths displacement aliasing.
4. **Specular layers** — a `linear-gradient` rim light + border + `box-shadow` simulate the way light reflects off thick curved glass.

## Tuning distortion

Open `app/GlassSurface.tsx` and edit the two constants at the top:

```ts
// Intensity of the barrel warp (0 = none, 1 = maximum)
const BARREL_STRENGTH = 0.85;

// Max pixel displacement at the edges
// Higher → more distortion / Lower → less distortion
const BARREL_SCALE = 110;
```

## Usage

Copy `app/GlassSurface.tsx` into your project. Use it like any `div` — it sizes to its content and accepts `className` for full layout control.

```tsx
import { GlassSurface } from "@/app/GlassSurface";

// Basic
<GlassSurface>
  <p>Hello</p>
</GlassSurface>

// With Tailwind sizing and flex layout
<GlassSurface className="w-80 flex flex-col gap-2">
  <h2>Title</h2>
  <p>Body text</p>
</GlassSurface>

// Pill icon button
<GlassSurface className="rounded-full cursor-pointer" onClick={() => {}}>
  <HomeIcon />
</GlassSurface>

// Full width card
<GlassSurface className="w-full max-w-md">
  <p>Card content</p>
</GlassSurface>
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content rendered inside the glass |
| `className` | `string` | `""` | Tailwind classes or custom CSS class applied to the wrapper. Controls size, layout, shape, cursor, etc. |
| `onClick` | `() => void` | — | Click handler. `pointer-events: auto` is always set internally so it works even inside `pointer-events: none` parents. |

> **Note:** `p-4` and `rounded-3xl` are applied by default. Override with `className` if needed (e.g. `rounded-full`).

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [Tailwind CSS](https://tailwindcss.com) v4
- TypeScript

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
