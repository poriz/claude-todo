import { Variants, Target, Transition } from 'framer-motion';

export interface AnimationPreset {
  initial: Target;
  animate: Target;
  exit: Target;
  transition?: Transition;
}

// 타입 안전성을 위한 애니메이션 variant 타입 정의
export type AnimationVariant = keyof typeof ANIMATION_PRESETS;
export type ButtonVariant = keyof typeof BUTTON_PRESETS;
export type ListVariant = keyof typeof LIST_PRESETS;

export const ANIMATION_PRESETS: Record<string, AnimationPreset> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  
  bounce: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.3 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  
  zoom: {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  
  none: {
    initial: {},
    animate: {},
    exit: {}
  }
};

export const BUTTON_PRESETS = {
  default: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 25 }
  },
  
  subtle: {
    whileHover: { scale: 1.01, brightness: 1.1 },
    whileTap: { scale: 0.99 },
    transition: { type: "spring", stiffness: 500, damping: 30 }
  },
  
  strong: {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95, y: 0 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  
  bounce: {
    whileHover: { 
      scale: 1.1,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    whileTap: { scale: 0.9 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  
  pulse: {
    whileHover: { 
      scale: [1, 1.05, 1],
      transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" }
    },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};

export const LIST_PRESETS = {
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  },
  
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  },
  
  slideLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  }
};

export const STAGGER_PRESETS = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
  very_slow: 0.3
};

export const DURATION_PRESETS = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  very_slow: 0.8
};

export const EASE_PRESETS = {
  easeOut: "easeOut" as const,
  easeIn: "easeIn" as const,
  easeInOut: "easeInOut" as const,
  circOut: [0, 0.55, 0.45, 1] as const,
  backOut: [0.175, 0.885, 0.32, 1.275] as const
};