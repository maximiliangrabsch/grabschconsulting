"use client";

import { useEffect, useRef } from "react";

// 4K nur für Bildschirme, die es auch darstellen können – alle anderen
// bekommen 1080p und laden damit deutlich schneller.
function pickSource() {
  const pixels = window.screen.width * window.devicePixelRatio;
  return pixels > 2200 ? "/hero-2160.mp4" : "/hero-1080.mp4";
}

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.src = pickSource();
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full origin-bottom scale-[1.15] object-cover object-bottom"
      poster="/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
