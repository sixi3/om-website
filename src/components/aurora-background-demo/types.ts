export type EasingLike = [number, number, number, number] | ((t: number) => number) | string;

export interface AnimationConfig {
  duration: number;
  ease: EasingLike;
} 