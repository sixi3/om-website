"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex min-h-screen w-full flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--primary-green": "#00b140",
              "--intermediate-green": "#5cd67d",
              "--lime-green": "#baff29",
              "--white": "#fff",
              "--transparent": "transparent",
              "--aurora":
                "repeating-linear-gradient(100deg,var(--primary-green)_10%,var(--intermediate-green)_15%,var(--lime-green)_20%,var(--intermediate-green)_25%,var(--primary-green)_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              "pointer-events-none absolute -inset-[10px]",
              // CSS variable definitions for gradients
              "[--aurora:repeating-linear-gradient(100deg,var(--primary-green)_10%,var(--intermediate-green)_15%,var(--lime-green)_20%,var(--intermediate-green)_25%,var(--primary-green)_30%)]",
              "[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]",
              
              // Main background layers
              "[background-image:var(--white-gradient),var(--aurora)]",
              "[background-size:300%,_200%]",
              "[background-position:50%_50%,50%_50%]",
              "opacity-50",
              "blur-[5px] xl:blur-none",
              "invert",
              "will-change-transform",
              
              // After pseudo-element for mix-blend-difference effect
              "after:content-[''] after:absolute after:inset-0",
              "after:[background-image:var(--white-gradient),var(--aurora)]",
              "after:[background-size:200%,_100%]",
              "after:mix-blend-difference",
              "after:animate-aurora",
              
              showRadialGradient &&
                "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
}; 