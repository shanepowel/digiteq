type EcoIconProps = {
  variant?: number;
  size?: number;
};

const configs = [
  { c1: "#00D4FF", c2: "#8B5CF6" },
  { c1: "#8B5CF6", c2: "#D946EF" },
  { c1: "#D946EF", c2: "#FF2D7B" },
];

export function EcoIcon({ variant = 0, size = 44 }: EcoIconProps) {
  const { c1, c2 } = configs[variant % 3];
  const gradId = `ei${variant}`;

  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect x="8" y="4" width="14" height="14" rx="3" fill={`url(#${gradId})`} opacity="0.85" />
      <rect x="24" y="4" width="14" height="14" rx="3" fill={`url(#${gradId})`} opacity="0.55" />
      <rect x="8" y="26" width="14" height="14" rx="3" fill={`url(#${gradId})`} opacity="0.55" />
      <rect x="24" y="26" width="14" height="14" rx="3" fill={`url(#${gradId})`} opacity="0.35" />
      <rect x="1" y="10" width="5" height="5" fill={c1} opacity="0.4" />
      <rect x="3" y="32" width="4" height="4" fill={c2} opacity="0.3" />
    </svg>
  );
}
