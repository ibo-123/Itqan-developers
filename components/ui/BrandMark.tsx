import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
};

const pixels = { sm: 36, md: 44, lg: 56 };

export function BrandMark({ className, size = "sm" }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-lg border border-gold/25 bg-emerald-deep shadow-sm",
        sizes[size],
        className,
      )}
    >
      <Image
        src="/itqan-logo.jpg"
        alt="ITQAN DEVELOPERS"
        width={pixels[size]}
        height={pixels[size]}
        className="h-full w-full object-cover"
        priority
      />
    </span>
  );
}
