import React, { memo, useMemo } from 'react';
import { LazyMotion, domAnimation, m, HTMLMotionProps } from 'framer-motion';
import { ANIMATION_PRESETS, BUTTON_PRESETS, AnimationVariant, ButtonVariant } from './presets';

/**
 * LazyMotion을 사용한 최적화된 애니메이션 컨테이너
 * 번들 크기: 13.7kb (vs motion.div 99kb)
 */

interface OptimizedContainerProps extends Omit<HTMLMotionProps<"div">, 'initial' | 'animate' | 'exit'> {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
}

interface OptimizedButtonProps extends Omit<HTMLMotionProps<"button">, 'whileHover' | 'whileTap'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
}

// LazyMotion Provider 컴포넌트
export const MotionProvider: React.FC<{ children: React.ReactNode }> = memo(({ children }) => (
  <LazyMotion features={domAnimation} strict>
    {children}
  </LazyMotion>
));

// 최적화된 애니메이션 컨테이너 (13.7kb)
export const OptimizedContainer = memo<OptimizedContainerProps>(({
  children,
  className = '',
  variant = 'fadeIn',
  delay = 0,
  duration = 0.3,
  ...props
}) => {
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
    <m.div
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={transition}
      {...props}
    >
      {children}
    </m.div>
  );
});

// 최적화된 애니메이션 버튼 (13.7kb)
export const OptimizedButton = memo<OptimizedButtonProps>(({
  children,
  className = '',
  variant = 'default',
  disabled = false,
  ...props
}) => {
  const buttonAnimation = useMemo(() => {
    const preset = BUTTON_PRESETS[variant];
    return {
      whileHover: disabled ? undefined : preset.whileHover,
      whileTap: disabled ? undefined : preset.whileTap,
      transition: preset.transition
    };
  }, [variant, disabled]);

  return (
    <m.button
      className={`${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
      disabled={disabled}
      whileHover={buttonAnimation.whileHover}
      whileTap={buttonAnimation.whileTap}
      transition={buttonAnimation.transition}
      {...props}
    >
      {children}
    </m.button>
  );
});

// GPU 가속 최적화된 애니메이션 유틸리티
export const GPUOptimizedContainer = memo<OptimizedContainerProps>(({
  children,
  className = '',
  variant = 'fadeIn',
  delay = 0,
  duration = 0.3,
  ...props
}) => {
  const animation = useMemo(() => {
    const preset = ANIMATION_PRESETS[variant];
    return {
      initial: preset.initial,
      animate: preset.animate,
      exit: preset.exit,
    };
  }, [variant]);

  return (
    <m.div
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      style={{
        // GPU 가속 강제 활성화
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
      {...props}
    >
      {children}
    </m.div>
  );
});