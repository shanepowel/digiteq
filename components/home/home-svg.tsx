export function HomeSvgDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="dh-eq-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e5c46" stopOpacity="0.22" />
          <stop offset="1" stopColor="#1e5c46" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dh-gb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1e5c46" />
          <stop offset="1" stopColor="#a8823f" />
        </linearGradient>
        <g id="dh-rosette">
          <g fill="none" stroke="url(#dh-gb)" strokeWidth="0.6">
            {Array.from({ length: 18 }, (_, i) => (
              <ellipse
                key={i}
                cx="100"
                cy="100"
                rx="96"
                ry="34"
                transform={`rotate(${i * 10} 100 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="97" strokeWidth="0.4" />
            <circle cx="100" cy="100" r="64" strokeWidth="0.4" />
          </g>
        </g>
        <g id="dh-corner">
          <path d="M2 24 L2 8 Q2 2 8 2 L24 2 M2 14 Q2 6 10 6 L14 6" />
        </g>
      </defs>
    </svg>
  );
}

import type { CSSProperties } from "react";

export function Rosette({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
      <use href="#dh-rosette" />
    </svg>
  );
}

export function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 26" className={className} aria-hidden="true">
      <use href="#dh-corner" />
    </svg>
  );
}
