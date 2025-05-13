"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

// Define interface for Battery API - REMOVING AS LOW POWER MODE IS REMOVED
// interface BatteryManager {
//   charging: boolean;
//   level: number;
//   addEventListener: (type: string, listener: EventListener) => void;
//   removeEventListener: (type: string, listener: EventListener) => void;
// }

// interface NavigatorWithBattery extends Navigator {
//   getBattery?: () => Promise<BatteryManager>;
// }

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  className?: string;
  // lowPowerMode?: boolean; // REMOVED
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  // lowPowerMode = false, // REMOVED
  ...props
}: AuroraBackgroundProps) => {
  // const [isLowPower, setIsLowPower] = useState(lowPowerMode); // REMOVED

  // useEffect(() => { // REMOVED
  //   const checkLowPowerDevice = () => {
  //     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  //     const nav = navigator as NavigatorWithBattery;
      
  //     if (nav.getBattery) {
  //       nav.getBattery().then((battery) => {
  //         if (battery.charging === false && battery.level < 0.3) {
  //           setIsLowPower(true);
  //         }
  //       }).catch(() => {
  //         setIsLowPower(isMobile);
  //       });
  //     } else {
  //       setIsLowPower(isMobile || lowPowerMode);
  //     }
  //   };

  //   checkLowPowerDevice();
  // }, [lowPowerMode]);

  return (
    <div
      className={cn(
        "relative min-h-screen bg-transparent", 
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={
          {
            "--primary-green": "#00b140",
            "--intermediate-green": "#5cd67d",
            "--lime-green": "#baff29",
            "--white": "#fff", // Renamed from --black for clarity if needed, or keep as --black if css vars are fixed
            "--transparent": "transparent",
            // Removed --black as we don't need a separate dark gradient definition
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "pointer-events-none absolute -inset-[10px]",
            // CSS variable definitions for gradients
            "[--aurora:repeating-linear-gradient(100deg,var(--primary-green)_10%,var(--intermediate-green)_15%,var(--lime-green)_20%,var(--intermediate-green)_25%,var(--primary-green)_30%)]",
            // No --dark-gradient needed
            "[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]",
            
            // Main background layers (single mode)
            "[background-image:var(--white-gradient),var(--aurora)]",
            
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            "opacity-50",
            "blur-[5px] xl:blur-none",
            "invert", // Added invert class for light mode interaction with mix-blend-difference
            
            // After pseudo-element for mix-blend-difference effect (single mode)
            "after:content-['']",
            "after:absolute after:inset-0",
            "after:[background-image:var(--white-gradient),var(--aurora)]", 
            // No dark mode for after pseudo-element
            "after:[background-size:200%,_100%]", 
            "after:mix-blend-difference",
            
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
          )}
        >
          {/* No style jsx needed as animations are removed */}
        </div>
      </div>
      {children}
    </div>
  );
}; 