"use client";

import { useEffect, useRef } from "react";

interface TechNetworkBgProps {
  variant?: "hero" | "section";
  tone?: "dark" | "light";
  className?: string;
}

const HORIZONTAL_PATHS = [
  "M -10 18 Q 25 13 50 18 T 110 18",
  "M -10 38 Q 25 43 50 38 T 110 38",
  "M -10 62 Q 25 57 50 62 T 110 62",
  "M -10 82 Q 25 87 50 82 T 110 82",
];

const DIAGONAL_PATHS = [
  "M -5 105 L 35 65 L 55 70 L 95 25 L 110 -5",
  "M 20 105 L 52 72 L 72 72 L 110 35",
];

const NODES = [
  { x: 18, y: 18, r: 0.7, delay: "0s" },
  { x: 50, y: 38, r: 0.85, delay: "1.1s" },
  { x: 78, y: 26, r: 0.7, delay: "2.2s" },
  { x: 35, y: 65, r: 0.85, delay: "0.7s" },
  { x: 72, y: 72, r: 0.7, delay: "1.8s" },
  { x: 88, y: 62, r: 0.75, delay: "2.9s" },
];

export const TechNetworkBg = ({
  variant = "section",
  tone = "light",
  className = "",
}: TechNetworkBgProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerARef = useRef<SVGSVGElement>(null);
  const layerBRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    let rafId = 0;

    const updateParallax = () => {
      rafId = 0;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, 1 - (rect.top + rect.height) / (viewportH + rect.height))
      );
      const offset = progress * 18;

      if (layerARef.current) {
        layerARef.current.style.transform = `translate3d(0, ${offset * 0.4}px, 0)`;
      }
      if (layerBRef.current) {
        layerBRef.current.style.transform = `translate3d(0, ${offset * 0.75}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateParallax();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const strokeColor = tone === "dark" ? "#61bdb2" : "#208295";
  const baseOpacity =
    variant === "hero"
      ? tone === "dark"
        ? "opacity-25"
        : "opacity-15"
      : "opacity-15";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        ref={layerARef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full transition-transform duration-150 ease-out ${baseOpacity}`}
      >
        {HORIZONTAL_PATHS.map((d, idx) => (
          <g key={d}>
            <path
              d={d}
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.18"
              strokeOpacity="0.45"
            />
            <path
              d={d}
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.32"
              className="animate-tech-line"
              style={{
                animationDelay: `${idx * 2.5}s`,
                animationDuration: `${22 + idx * 3}s`,
              }}
            />
          </g>
        ))}
      </svg>

      <svg
        ref={layerBRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full transition-transform duration-150 ease-out ${baseOpacity}`}
      >
        {DIAGONAL_PATHS.map((d, idx) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke={strokeColor}
            strokeWidth="0.2"
            strokeOpacity="0.4"
            className="animate-tech-line"
            style={{
              animationDelay: `${1.5 + idx * 4}s`,
              animationDuration: `${26 + idx * 4}s`,
            }}
          />
        ))}
        {NODES.map((node) => (
          <circle
            key={`${node.x}-${node.y}`}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={strokeColor}
            className="animate-node-pulse"
            style={{ animationDelay: node.delay }}
          />
        ))}
      </svg>
    </div>
  );
};

