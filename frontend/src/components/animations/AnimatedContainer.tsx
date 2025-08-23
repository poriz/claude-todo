import React, { memo, useMemo } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ANIMATION_PRESETS, AnimationVariant } from './presets';

// HTMLMotionProps를 확장하여 타입 안전성 확보
interface AnimatedContainerProps extends Omit<HTMLMotionProps<"div">, 'initial' | 'animate' | 'exit'> {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
}

export const AnimatedContainer = memo<AnimatedContainerProps>(({
  children,
  className = '',
  variant = 'fadeIn',
  delay = 0,
  duration = 0.3,
  ...props
}) => {
  // 애니메이션 설정을 메모이제이션하여 성능 최적화
  const animation = useMemo(() => {
    const preset = ANIMATION_PRESETS[variant];
    return {
      initial: preset.initial,
      animate: preset.animate,
      exit: preset.exit,
    };
  }, [variant]);

  const transition = useMemo(() => ({
    duration,
    delay,
    ease: "easeOut" as const
  }), [duration, delay]);

  return (
    <motion.div
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
});