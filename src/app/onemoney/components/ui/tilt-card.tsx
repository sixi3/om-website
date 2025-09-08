"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  rotationFactor?: number;
  initialRotationX?: number;
  initialRotationY?: number;
}

export function TiltCard({
  children,
  className,
  rotationFactor = 15,
  initialRotationX = 20,
  initialRotationY = 10
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const hoverRotateX = useTransform(
    mouseY,
    [-dimensions.height / 2, dimensions.height / 2],
    [rotationFactor, -rotationFactor]
  );
  const hoverRotateY = useTransform(
    mouseX,
    [-dimensions.width / 2, dimensions.width / 2],
    [-rotationFactor, rotationFactor]
  );

  const springConfig = { stiffness: 150, damping: 20, mass: 1 };
  const springRotateX = useSpring(hoverRotateX, springConfig);
  const springRotateY = useSpring(hoverRotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    if (dimensions.width !== rect.width || dimensions.height !== rect.height) {
      setDimensions({ width: rect.width, height: rect.height });
    }

    const mouseXRelative = event.clientX - rect.left;
    const mouseYRelative = event.clientY - rect.top;

    const mouseXCentered = mouseXRelative - rect.width / 2;
    const mouseYCentered = mouseYRelative - rect.height / 2;

    mouseX.set(mouseXCentered);
    mouseY.set(mouseYCentered);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const cardVariants = {
    initial: {
      rotateX: initialRotationX,
      rotateY: initialRotationY,
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      rotateX: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        width: '100%',
      }}
      className={cn(
        "relative",
        className
      )}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
} 