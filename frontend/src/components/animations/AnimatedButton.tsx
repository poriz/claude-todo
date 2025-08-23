import React, { memo, useMemo } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { BUTTON_PRESETS, ButtonVariant } from './presets';

// HTMLMotionProps<"button">을 확장하여 타입 안전성 확보
interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, 'whileHover' | 'whileTap'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
}

export const AnimatedButton = memo<AnimatedButtonProps>(({
  children,
  className = '',
  variant = 'default',
  disabled = false,
  ...props
}) => {
  // 버튼 애니메이션 설정을 메모이제이션
  const buttonAnimation = useMemo(() => {
    const preset = BUTTON_PRESETS[variant];
    return {
      whileHover: disabled ? undefined : preset.whileHover,
      whileTap: disabled ? undefined : preset.whileTap,
      transition: preset.transition
    };
  }, [variant, disabled]);

  return (
    <motion.button
      className={`${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
      disabled={disabled}
      whileHover={buttonAnimation.whileHover}
      whileTap={buttonAnimation.whileTap}
      transition={buttonAnimation.transition}
      {...props}
    >
      {children}
    </motion.button>
  );
});