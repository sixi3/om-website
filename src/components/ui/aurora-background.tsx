"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";

// Define interface for Battery API
interface BatteryManager {
  charging: boolean;
  level: number;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  className?: string;
  lowPowerMode?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  lowPowerMode = false,
  ...props
}: AuroraBackgroundProps) => {
  const [isLowPower, setIsLowPower] = useState(lowPowerMode);

  useEffect(() => {
    const checkLowPowerDevice = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const nav = navigator as NavigatorWithBattery;
      
      if (nav.getBattery) {
        nav.getBattery().then((battery) => {
          if (battery.charging === false && battery.level < 0.3) {
            setIsLowPower(true);
          }
        }).catch(() => {
          setIsLowPower(isMobile);
        });
      } else {
        setIsLowPower(isMobile || lowPowerMode);
      }
    };

    checkLowPowerDevice();
  }, [lowPowerMode]);

  return (
    <div
      className={cn(
        "relative transition-bg min-h-screen bg-transparent",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={
          {
            "--aurora":
              "repeating-linear-gradient(100deg,var(--primary-green)_10%,var(--intermediate-green)_15%,var(--lime-green)_20%,var(--intermediate-green)_25%,var(--primary-green)_30%)",
            "--dark-gradient":
              "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
            "--primary-green": "#00b140",
            "--intermediate-green": "#5cd67d",
            "--lime-green": "#baff29",
            "--black": "#000",
            "--white": "#fff",
            "--transparent": "transparent",
          } as React.CSSProperties
        }
      >
        {isLowPower ? (
          <div 
            className={cn(
              "pointer-events-none absolute -inset-[10px] opacity-30 filter will-change-transform",
              showRadialGradient && 
                "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
            )}
            style={{
              backgroundImage: "linear-gradient(100deg, var(--primary-green), var(--lime-green), var(--primary-green))",
              backgroundSize: "300% 100%",
              backgroundPosition: "0% 50%",
              animation: "simplifiedAurora 20s ease infinite",
            }}
          >
            <style jsx>{`
              @keyframes simplifiedAurora {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>
          </div>
        ) : (
          <div
            className={cn(
              `max-[449px]:after:animate-none after:animate-aurora-slow xl:after:animate-none pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[5px] xl:blur-none invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--primary-green)_10%,var(--intermediate-green)_15%,var(--lime-green)_20%,var(--intermediate-green)_25%,var(--primary-green)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,#000_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          >
            <style jsx>{`
              @keyframes aurora-slow {
                0% { background-position: 50% 50%, 50% 50%; }
                50% { background-position: 91% 50%, 10% 50%; }
                100% { background-position: 50% 50%, 50% 50%; }
              }
            `}</style>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}; 