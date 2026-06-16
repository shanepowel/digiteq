export function BarChart() {
  const bars = [40, 58, 48, 72, 62, 88, 78, 68, 55, 82, 100, 74];

  return (
    <svg width="340" height="200" viewBox="0 0 340 200" fill="none" className="max-w-full" aria-hidden="true">
      <defs>
        <linearGradient id="bg1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D946EF" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {bars.map((h, i) => {
        const height = h * 1.8;
        return (
          <rect
            key={i}
            x={i * 27 + 6}
            y={200 - height}
            width="18"
            height={height}
            rx="3"
            fill="url(#bg1)"
            opacity={0.45 + (i / bars.length) * 0.55}
          />
        );
      })}
    </svg>
  );
}
