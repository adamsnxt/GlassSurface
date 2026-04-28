"use client";
import { GlassSurface } from "../src/components/atoms/GlassSurface";
import { MdHome } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa6";
import { useState } from "react";

const PHOTOS = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=85",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1400&q=85",
];

export default function Home() {
  const [activeHeart, setActiveHeart] = useState(false);
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: `${PHOTOS.length * 100}vh`,
          background: "#000",
        }}
      >
        {PHOTOS.map((src, i) => (
          <div
            key={i}
            style={{
              position: "sticky",
              top: 0,
              width: "100%",
              height: "100vh",
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: i + 1,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          pointerEvents: "none",
        }}
      >
        <GlassSurface className="fixed! top-0 left-0 w-full rounded-none! p-6 flex items-center justify-center gap-4">
          Navbar
        </GlassSurface>
        <div className="flex flex-col items-center gap-8">
          <GlassSurface className=" flex! flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Esto es una prueba de uso</h1>
            <p>Si te gusta sigueme</p>
          </GlassSurface>
          <div className="flex items-center gap-4">
            <GlassSurface
              className="rounded-full cursor-pointer!"
              onClick={() => alert("Home")}
            >
              <MdHome size={24} />
            </GlassSurface>
            <GlassSurface
              className="rounded-full cursor-pointer! group"
              onClick={() => setActiveHeart(!activeHeart)}
            >
              <FaHeart
                size={24}
                className={`${activeHeart ? "text-red-500" : ""} 
                group-active:scale-90 transition-transform duration-150`}
              />
            </GlassSurface>
            <GlassSurface
              className="rounded-full cursor-pointer!"
              onClick={() => alert("List")}
            >
              <FaListUl size={24} />
            </GlassSurface>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 101,
          pointerEvents: "none",
          color: "rgba(255,255,255,0.35)",
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontFamily: "-apple-system, sans-serif",
        }}
      >
        scroll
      </div>
    </>
  );
}
