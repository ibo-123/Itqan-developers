import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
};

const sizes = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
};

/** Islamic star emblem with Arabic إ for ITQAN branding. */
export function BrandMark({
  className,
  size = "sm",
  tone = "dark",
}: BrandMarkProps) {
  const stroke = tone === "dark" ? "#D5B66A" : "#D5B66A";
  const fill = tone === "dark" ? "#0C2A23" : "#0C2A23";

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-[0_0_0_1px_rgba(213,182,106,0.25)]",
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" fill={fill} />
        <path
          d="M32 5 L38 19.5 L53.5 19.5 L41 29 L46 44 L32 34.5 L18 44 L23 29 L10.5 19.5 L26 19.5 Z"
          fill="none"
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <path
          d="M32 13 L35.5 22.5 L45.5 22.5 L37.5 28.5 L40.5 38 L32 32.2 L23.5 38 L26.5 28.5 L18.5 22.5 L28.5 22.5 Z"
          fill={stroke}
          opacity="0.95"
        />
        <circle cx="32" cy="27.5" r="8" fill={fill} />
        <text
          x="32"
          y="32"
          textAnchor="middle"
          fill={stroke}
          fontSize="13"
          fontFamily="Georgia, serif"
          fontWeight="700"
        >
          إ
        </text>
      </svg>
    </span>
  );
}
