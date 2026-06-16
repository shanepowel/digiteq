type LogoMarkProps = {
  size?: number;
  gradientId?: string;
};

export function LogoMark({ size = 26, gradientId = "nm" }: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#FF2D7B" />
        </linearGradient>
      </defs>
      <path
        d="M 28,10 L 28,90 L 55,90 C 80,90 92,72 92,50 C 92,28 80,10 55,10 Z"
        fill={`url(#${gradientId})`}
      />
      <rect x="26" y="34" width="42" height="3" fill="#080A11" />
      <rect x="26" y="62" width="42" height="3" fill="#080A11" />
      <rect x="12" y="8" width="7" height="7" fill="#00D4FF" opacity="0.8" />
      <rect x="6" y="20" width="5" height="5" fill="#8B5CF6" opacity="0.6" />
      <rect x="16" y="28" width="6" height="6" fill="#8B5CF6" opacity="0.5" />
      <rect x="8" y="44" width="5" height="5" fill="#D946EF" opacity="0.5" />
      <rect x="14" y="60" width="7" height="7" fill="#EC4899" opacity="0.6" />
      <rect x="6" y="74" width="6" height="6" fill="#FF2D7B" opacity="0.5" />
      <rect x="18" y="80" width="4" height="4" fill="#FF2D7B" opacity="0.35" />
    </svg>
  );
}
