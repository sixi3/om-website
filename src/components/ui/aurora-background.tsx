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
        "relative transition-bg min-h-screen bg-transparent", // Note: transition-bg might not be relevant anymore
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={
          {
            // Gradient definitions like --aurora, --white-gradient, --dark-gradient are REMOVED from here.
            // Only color definitions remain.
            "--primary-green": "#00b140",
            "--intermediate-green": "#5cd67d",
            "--lime-green": "#baff29",
            "--black": "#000",
            "--white": "#fff",
            "--transparent": "transparent",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "pointer-events-none absolute -inset-[10px]",
            "[--aurora:repeating-linear-gradient(100deg,var(--primary-green)_10%,var(--intermediate-green)_15%,var(--lime-green)_20%,var(--intermediate-green)_25%,var(--primary-green)_30%)]",
            "[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,#000_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]",
            "[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]", // White gradient still defined if needed elsewhere, but not used for light mode background image
            // Light mode: Use only the aurora gradient for full color vibrancy
            "[background-image:var(--aurora)]",
            // Dark mode: Continue to use the dark gradient layered with aurora
            "dark:[background-image:var(--dark-gradient),var(--aurora)]",
            "[background-size:150%]", // This might need adjustment if only one gradient is used for light mode
            "[background-position:50%_50%,50%_50%]",
            "opacity-50",
            "blur-[5px] xl:blur-none",
            "dark:invert-0",
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