# GlassSurface

Un componente de React que replica el efecto de vidrio líquido de Apple usando distorsión de lente barril con SVG y `backdrop-filter`. Sin librerías pesadas — solo un mapa de desplazamiento generado en canvas, un filtro SVG y CSS.

## Cómo funciona

1. **Mapa barril en Canvas** — al montarse, un `ResizeObserver` mide el elemento y genera un mapa de desplazamiento radial: `dispX = strength × nx × r²`. El valor es `0` en el centro (sin distorsión) y crece cuadráticamente hacia los bordes (efecto ojo de pez / lupa).
2. **SVG `feDisplacementMap`** — el mapa se carga en un `<feImage>` oculto y se aplica mediante `feDisplacementMap`. El filtro se inyecta en un SVG fijo de `0×0` fuera del componente.
3. **`backdrop-filter: url(#id)`** — se aplica directamente en el div contenedor para que el navegador recorte la distorsión al `border-radius` correctamente. Un desenfoque de `0.5px` suaviza el aliasing del desplazamiento.
4. **Capas especulares** — un `linear-gradient` de luz de borde + borde + `box-shadow` simulan cómo la luz se refleja en un vidrio curvo y grueso.

## Ajustar la distorsión

Abre `app/GlassSurface.tsx` y edita las dos constantes al inicio del archivo:

```ts
// Intensidad del efecto barril (0 = ninguno, 1 = máximo)
const BARREL_STRENGTH = 0.85;

// Desplazamiento máximo en píxeles en los bordes
// Mayor → más distorsión / Menor → menos distorsión
const BARREL_SCALE = 110;
```

## Uso

Copia `app/GlassSurface.tsx` en tu proyecto. Úsalo como cualquier `div` — se adapta a su contenido y acepta `className` para control total del layout.

```tsx
import { GlassSurface } from "@/app/GlassSurface";

// Básico
<GlassSurface>
  <p>Hola</p>
</GlassSurface>

// Con tamaño Tailwind y layout flex
<GlassSurface className="w-80 flex flex-col gap-2">
  <h2>Título</h2>
  <p>Texto del cuerpo</p>
</GlassSurface>

// Botón píldora con ícono
<GlassSurface className="rounded-full cursor-pointer" onClick={() => {}}>
  <HomeIcon />
</GlassSurface>

// Tarjeta de ancho completo
<GlassSurface className="w-full max-w-md">
  <p>Contenido de la tarjeta</p>
</GlassSurface>
```

### Props

| Prop        | Tipo         | Por defecto | Descripción                                                                                                                                           |
| ----------- | ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`  | `ReactNode`  | —           | Contenido renderizado dentro del vidrio                                                                                                               |
| `className` | `string`     | `""`        | Clases de Tailwind o CSS personalizadas aplicadas al contenedor. Controla tamaño, layout, forma, cursor, etc.                                         |
| `onClick`   | `() => void` | —           | Manejador de clic. `pointer-events: auto` siempre se establece internamente, por lo que funciona incluso dentro de padres con `pointer-events: none`. |

> **Nota:** `p-4` y `rounded-3xl` se aplican por defecto. Sobreescríbelos con `className` si es necesario (p. ej. `rounded-full`).

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [Tailwind CSS](https://tailwindcss.com) v4
- TypeScript

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

Puedes comenzar a editar la página modificando `app/page.tsx`. La página se actualiza automáticamente al guardar los cambios.

Este proyecto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar automáticamente [Geist](https://vercel.com/font), una nueva familia tipográfica de Vercel.

## Más recursos

Para aprender más sobre Next.js, consulta los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre las características y la API de Next.js.
- [Aprende Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.

También puedes revisar [el repositorio de Next.js en GitHub](https://github.com/vercel/next.js) — ¡tus comentarios y contribuciones son bienvenidos!

## Desplegar en Vercel

La forma más sencilla de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
