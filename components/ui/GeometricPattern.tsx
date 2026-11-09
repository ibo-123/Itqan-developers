"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type GeometricPatternProps = {
  className?: string;
  opacity?: number;
  variant?: "star" | "lattice";
};

/** Subtle Islamic-inspired geometric lattice / 8-point star atmosphere. */
export function GeometricPattern({
  className,
  opacity = 0.12,
  variant = "star",
}: GeometricPatternProps) {
  const reactId = useId().replace(/:/g, "");
  const id = `${variant}-${reactId}`;

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {variant === "star" ? (
          <pattern id={id} width="84" height="84" patternUnits="userSpaceOnUse">
            <path
              d="M42 8 L47.5 24.5 L65 24.5 L51 35 L56 52 L42 41.5 L28 52 L33 35 L19 24.5 L36.5 24.5 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
            />
            <path
              d="M42 18 L45.2 27.5 L55.5 27.5 L47.2 33.5 L50.2 43.5 L42 37.8 L33.8 43.5 L36.8 33.5 L28.5 27.5 L38.8 27.5 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
              opacity="0.7"
            />
            <circle cx="42" cy="42" r="1.8" fill="currentColor" opacity="0.5" />
            <path
              d="M0 42 H12 M72 42 H84 M42 0 V12 M42 72 V84"
              stroke="currentColor"
              strokeWidth="0.45"
              opacity="0.4"
            />
          </pattern>
        ) : (
          <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse">
            <path
              d="M32 2 L62 32 L32 62 L2 32 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
            />
            <path
              d="M32 14 L50 32 L32 50 L14 32 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.55"
            />
            <circle cx="32" cy="32" r="2.2" fill="currentColor" opacity="0.4" />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
