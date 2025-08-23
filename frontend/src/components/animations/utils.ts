import { ANIMATION_PRESETS, BUTTON_PRESETS, LIST_PRESETS, STAGGER_PRESETS, DURATION_PRESETS, EASE_PRESETS, AnimationPreset } from './presets';

export interface AnimationConfig {
  preset?: keyof typeof ANIMATION_PRESETS;
  duration?: keyof typeof DURATION_PRESETS | number;
  delay?: number;
  ease?: keyof typeof EASE_PRESETS | string | number[];
  stagger?: keyof typeof STAGGER_PRESETS | number;
}

export const createAnimationVariant = (config: AnimationConfig = {}) => {
  const preset = config.preset ? ANIMATION_PRESETS[config.preset] : ANIMATION_PRESETS.fadeIn;
  
  const duration = typeof config.duration === 'string' 
    ? DURATION_PRESETS[config.duration] 
    : config.duration || DURATION_PRESETS.normal;
    
  const ease = typeof config.ease === 'string' && config.ease in EASE_PRESETS
    ? EASE_PRESETS[config.ease as keyof typeof EASE_PRESETS]
    : config.ease || EASE_PRESETS.easeOut;

  return {
    initial: preset.initial,
    animate: preset.animate,
    exit: preset.exit,
    transition: {
      ...preset.transition,
      duration,
      delay: config.delay || 0,
      ease
    }
  };
};

export const createButtonVariant = (presetName: keyof typeof BUTTON_PRESETS = 'default') => {
  return BUTTON_PRESETS[presetName];
};

export const createListVariant = (presetName: keyof typeof LIST_PRESETS = 'slideUp') => {
  return LIST_PRESETS[presetName];
};

export const createStaggeredList = (
  items: any[],
  config: {
    preset?: keyof typeof LIST_PRESETS;
    stagger?: keyof typeof STAGGER_PRESETS | number;
    duration?: keyof typeof DURATION_PRESETS | number;
  } = {}
) => {
  const stagger = typeof config.stagger === 'string' 
    ? STAGGER_PRESETS[config.stagger] 
    : config.stagger || STAGGER_PRESETS.normal;
    
  const duration = typeof config.duration === 'string'
    ? DURATION_PRESETS[config.duration]
    : config.duration || DURATION_PRESETS.normal;

  const variant = createListVariant(config.preset);

  return {
    variant,
    stagger,
    duration,
    items
  };
};

export const TODO_ANIMATION_PRESETS = {
  cardEnter: createAnimationVariant({ preset: 'slideUp', duration: 'fast' }),
  cardExit: createAnimationVariant({ preset: 'slideUp', duration: 'fast' }),
  modalEnter: createAnimationVariant({ preset: 'scale', duration: 'normal' }),
  modalExit: createAnimationVariant({ preset: 'scale', duration: 'fast' }),
  dragging: {
    scale: 1.05,
    rotate: 5,
    zIndex: 1000,
    transition: { duration: 0.2 }
  },
  dragEnd: {
    scale: 1,
    rotate: 0,
    zIndex: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const PAGE_ANIMATION_PRESETS = {
  pageEnter: createAnimationVariant({ preset: 'fadeIn', duration: 'slow', delay: 0.1 }),
  pageExit: createAnimationVariant({ preset: 'fadeIn', duration: 'fast' }),
  sectionEnter: createAnimationVariant({ preset: 'slideUp', duration: 'normal' }),
  sectionExit: createAnimationVariant({ preset: 'slideUp', duration: 'fast' })
};

export const NOTIFICATION_ANIMATION_PRESETS = {
  success: createAnimationVariant({ preset: 'slideRight', duration: 'fast' }),
  error: createAnimationVariant({ preset: 'bounce', duration: 'normal' }),
  warning: createAnimationVariant({ preset: 'slideDown', duration: 'normal' }),
  info: createAnimationVariant({ preset: 'fadeIn', duration: 'normal' })
};