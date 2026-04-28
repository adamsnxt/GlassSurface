"use client";
import { useId, useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";

// ─── Ajusta la distorsión aquí ────────────────────────────────────────────────
// strength: intensidad del barrel (0 = sin distorsión, 1 = máxima)
const BARREL_STRENGTH = 0.85;
// scale: píxeles de desplazamiento máximo en los bordes
// Subirlo → más distorsión / Bajarlo → menos distorsión
const BARREL_SCALE = 110;
// ─────────────────────────────────────────────────────────────────────────────

function makeBarrelMap(w: number, h: number, strength: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  const d = img.data;
  const cx = w / 2;
  const cy = h / 2;
  const norm = Math.max(cx, cy);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const nx = (x - cx) / norm;
      const ny = (y - cy) / norm;
      const r2 = nx * nx + ny * ny;
      const ri = Math.round(128 + strength * nx * r2 * 127);
      const gi = Math.round(128 + strength * ny * r2 * 127);
      const i = (y * w + x) * 4;
      d[i] = Math.max(0, Math.min(255, ri));
      d[i + 1] = Math.max(0, Math.min(255, gi));
      d[i + 2] = 128;
      d[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

interface GlassSurfaceProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassSurface({
  children,
  className = "",
  onClick,
}: GlassSurfaceProps) {
  const filterId = useId().replace(/:/g, "");
  const [dmUrl, setDmUrl] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      // Use borderBoxSize (full element incl. padding) — backdrop-filter applies to border box,
      // not contentRect. Mismatch causes a visible rectangle in the padding area.
      const box = entry.borderBoxSize?.[0];
      const w = Math.round(box ? box.inlineSize : entry.contentRect.width);
      const h = Math.round(box ? box.blockSize : entry.contentRect.height);
      if (w > 0 && h > 0) {
        setSize({ w, h });
        setDmUrl(makeBarrelMap(w, h, BARREL_STRENGTH));
      }
    });
    ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {dmUrl && (
        <svg
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "fixed",
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            overflow: "hidden",
          }}
        >
          <defs>
            <filter
              id={filterId}
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                result="dm"
                href={dmUrl}
                preserveAspectRatio="none"
                x="0"
                y="0"
                width={String(size.w)}
                height={String(size.h)}
              />
              {/* scale: Subirlo → más distorsión en bordes / Bajarlo → menos distorsión */}
              <feDisplacementMap
                in="SourceGraphic"
                in2="dm"
                scale={String(BARREL_SCALE)}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      <div
        ref={wrapperRef}
        className={`relative z-0 rounded-3xl overflow-hidden p-4 ${className}`}
        style={{
          pointerEvents: "auto",
          backdropFilter: dmUrl ? `url(#${filterId}) blur(0.5px)` : undefined,
          WebkitBackdropFilter: dmUrl
            ? `url(#${filterId}) blur(0.5px)`
            : undefined,
          background: "rgba(255,255,255,0.04)",
        }}
        onClick={onClick}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.05) 32%, transparent 52%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            border: "1px solid rgba(255,255,255,0.36)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.52), inset 0 -1px 0 rgba(0,0,0,0.08), 0 8px 64px rgba(0,0,0,0.4), 0 2px 16px rgba(0,0,0,0.22)",
            zIndex: 11,
            pointerEvents: "none",
          }}
        />
        {children}
      </div>
    </>
  );
}
