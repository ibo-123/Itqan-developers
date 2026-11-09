import { cn } from "@/lib/utils";

type OrnamentProps = {
  className?: string;
  tone?: "gold" | "emerald";
};

/** Slim Islamic-style divider used between section moments. */
export function Ornament({ className, tone = "gold" }: OrnamentProps) {
  const color = tone === "gold" ? "text-gold" : "text-emerald";

  return (
    <div
      className={cn("flex items-center justify-center gap-3", color, className)}
      aria-hidden="true"
    >
      <span className="h-px w-10 bg-current/40 sm:w-16" />
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
        <path
          d="M12 2 L14.2 8.2 L21 8.2 L15.5 12 L17.5 18.5 L12 14.5 L6.5 18.5 L8.5 12 L3 8.2 L9.8 8.2 Z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>
      <span className="h-px w-10 bg-current/40 sm:w-16" />
    </div>
  );
}
