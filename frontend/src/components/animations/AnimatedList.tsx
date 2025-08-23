import React, { memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LIST_PRESETS, ListVariant, STAGGER_PRESETS } from './presets';

interface AnimatedListProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  stagger?: keyof typeof STAGGER_PRESETS | number;
  variant?: ListVariant;
  layout?: boolean;
}

export const AnimatedList = memo<AnimatedListProps>(({
  children,
  className = '',
  itemClassName = '',
  stagger = 'normal',
  variant = 'slideUp',
  layout = true
}) => {
  // 리스트 애니메이션 설정 메모이제이션
  const listAnimation = useMemo(() => {
    const preset = LIST_PRESETS[variant];
    const staggerDelay = typeof stagger === 'number' 
      ? stagger 
      : STAGGER_PRESETS[stagger];
    
    return {
      initial: preset.initial,
      animate: preset.animate,
      exit: preset.exit,
      staggerDelay
    };
  }, [variant, stagger]);

  return (
    <div className={className}>
      <AnimatePresence mode="popLayout">
        {React.Children.map(children, (child, index) => {
          // React.isValidElement로 안전성 체크
          if (!React.isValidElement(child)) return null;
          
          return (
            <motion.div
              key={child.key || index}
              className={itemClassName}
              initial={listAnimation.initial}
              animate={listAnimation.animate}
              exit={listAnimation.exit}
              transition={{
                duration: 0.3,
                delay: index * listAnimation.staggerDelay,
                ease: "easeOut"
              }}
              layout={layout}
            >
              {child}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
});