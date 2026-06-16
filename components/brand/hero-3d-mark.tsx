export function Hero3DMark({ className }: { className?: string }) {
  const depth = 22;
  const fFront = "M 60,20 L 60,280 L 150,280 C 230,280 270,230 270,150 C 270,70 230,20 150,20 Z";
  const fBack = `M ${60 + depth},${20 - depth} L ${60 + depth},${280 - depth} L ${150 + depth},${280 - depth} C ${230 + depth},${280 - depth} ${270 + depth},${230 - depth} ${270 + depth},${150 - depth} C ${270 + depth},${70 - depth} ${230 + depth},${20 - depth} ${150 + depth},${20 - depth} Z`;

  const pixels: [number, number, number, string, number][] = [
    [18, 10, 14, "#00D4FF", 0.9],
    [6, 30, 10, "#00D4FF", 0.55],
    [30, 40, 11, "#6366F1", 0.75],
    [14, 60, 15, "#8B5CF6", 0.7],
    [0, 82, 10, "#8B5CF6", 0.45],
    [36, 88, 8, "#8B5CF6", 0.55],
    [8, 110, 12, "#8B5CF6", 0.5],
    [24, 132, 9, "#D946EF", 0.45],
    [2, 150, 13, "#D946EF", 0.6],
    [18, 172, 11, "#D946EF", 0.65],
    [6, 198, 14, "#EC4899", 0.7],
    [28, 215, 10, "#EC4899", 0.55],
    [12, 240, 16, "#FF2D7B", 0.75],
    [0, 260, 9, "#FF2D7B", 0.45],
    [32, 265, 7, "#FF2D7B", 0.4],
    [44, 55, 5, "#080A11", 0.7],
    [50, 130, 5, "#080A11", 0.6],
    [42, 210, 6, "#080A11", 0.5],
  ];

  return (
    <div
      className={`relative h-[240px] w-[240px] shrink-0 sm:h-[320px] sm:w-[320px] lg:h-[380px] lg:w-[380px] ${className ?? ""}`}
    >
      <div
        className="pointer-events-none absolute left-[15%] top-[10%] h-[70%] w-[70%] blur-[50px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, rgba(217,70,239,0.1) 40%, transparent 70%)",
        }}
      />
      <svg
        className="relative z-10 h-full w-full"
        viewBox="-20 -30 340 340"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="35%" stopColor="#5B8DEF" />
            <stop offset="60%" stopColor="#8B5CF6" />
            <stop offset="85%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#FF2D7B" />
          </linearGradient>
          <linearGradient id="gTop" x1="0" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9AEAFF" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="gSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5B8DEF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D946EF" stopOpacity="0.2" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {Array.from({ length: 12 }, (_, r) =>
          Array.from({ length: 12 }, (_, c) => (
            <circle key={`d${r}${c}`} cx={c * 26} cy={r * 26} r="0.8" fill="white" opacity="0.06" />
          )),
        )}
        <path d={fBack} fill="#0E1020" opacity="0.6" />
        <polygon
          points={`60,20 ${60 + depth},${20 - depth} ${150 + depth},${20 - depth} 150,20`}
          fill="url(#gTop)"
        />
        <polygon
          points={`${270},${150} ${270 + depth},${150 - depth} ${270 + depth},${70 - depth} ${270},${70} ${260},${40} ${260 + depth},${40 - depth} ${150 + depth},${20 - depth} ${150},${20} ${230},${40} ${260},${70}`}
          fill="url(#gSide)"
        />
        <path d={fFront} fill="url(#gFront)" />
        <rect x="55" y="102" width="150" height="5" fill="#080A11" opacity="0.85" />
        <rect x="55" y="192" width="150" height="5" fill="#080A11" opacity="0.85" />
        <path
          d="M 150,20 C 230,20 270,70 270,150"
          stroke="#00D4FF"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
          filter="url(#softGlow)"
        />
        {pixels.map(([x, y, s, color, op], i) => (
          <rect key={i} x={x} y={y} width={s} height={s} fill={color} opacity={op} rx={s > 10 ? 1 : 0} />
        ))}
      </svg>
    </div>
  );
}
