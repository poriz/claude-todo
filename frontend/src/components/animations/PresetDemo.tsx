import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedContainer, AnimatedButton } from './index';
import { 
  createAnimationVariant, 
  createButtonVariant, 
  TODO_ANIMATION_PRESETS, 
  PAGE_ANIMATION_PRESETS,
  NOTIFICATION_ANIMATION_PRESETS 
} from './utils';
import { ANIMATION_PRESETS, BUTTON_PRESETS, DURATION_PRESETS, STAGGER_PRESETS } from './presets';

export const PresetDemo: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof ANIMATION_PRESETS>('fadeIn');
  const [selectedDuration, setSelectedDuration] = useState<keyof typeof DURATION_PRESETS>('normal');
  const [selectedStagger, setSelectedStagger] = useState<keyof typeof STAGGER_PRESETS>('normal');
  const [demoItems, setDemoItems] = useState(['아이템 1', '아이템 2', '아이템 3']);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const animationConfig = createAnimationVariant({
    preset: selectedPreset,
    duration: selectedDuration,
  });

  const addDemoItem = () => {
    setDemoItems(prev => [...prev, `아이템 ${prev.length + 1}`]);
  };

  const removeDemoItem = (index: number) => {
    setDemoItems(prev => prev.filter((_, i) => i !== index));
  };

  const showNotificationDemo = (type: keyof typeof NOTIFICATION_ANIMATION_PRESETS) => {
    setShowNotification(type);
    setTimeout(() => setShowNotification(null), 3000);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
      <AnimatedContainer variant="slideDown" className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🎨 애니메이션 프리셋 데모</h2>
        <p className="text-gray-600">다양한 애니메이션 프리셋을 테스트해보세요!</p>
      </AnimatedContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 컨트롤 패널 */}
        <AnimatedContainer variant="slideLeft" delay={0.1} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">🎛️ 애니메이션 컨트롤</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">프리셋</label>
              <select 
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value as keyof typeof ANIMATION_PRESETS)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Object.keys(ANIMATION_PRESETS).map(preset => (
                  <option key={preset} value={preset}>{preset}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">지속시간</label>
              <select 
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value as keyof typeof DURATION_PRESETS)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Object.keys(DURATION_PRESETS).map(duration => (
                  <option key={duration} value={duration}>
                    {duration} ({DURATION_PRESETS[duration as keyof typeof DURATION_PRESETS]}s)
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">스태거</label>
              <select 
                value={selectedStagger}
                onChange={(e) => setSelectedStagger(e.target.value as keyof typeof STAGGER_PRESETS)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Object.keys(STAGGER_PRESETS).map(stagger => (
                  <option key={stagger} value={stagger}>
                    {stagger} ({STAGGER_PRESETS[stagger as keyof typeof STAGGER_PRESETS]}s)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </AnimatedContainer>

        {/* 프리셋 테스트 영역 */}
        <AnimatedContainer variant="slideRight" delay={0.2} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-600 mb-4">🎬 테스트 영역</h3>
          
          <div className="space-y-4">
            {/* 동적 애니메이션 테스트 */}
            <div key={`${selectedPreset}-${selectedDuration}`}>
              <motion.div
                initial={animationConfig.initial}
                animate={animationConfig.animate}
                exit={animationConfig.exit}
                transition={animationConfig.transition}
                className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg"
              >
                <p className="font-medium">
                  현재 설정: {selectedPreset} ({selectedDuration})
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  이 박스가 설정에 따라 애니메이션됩니다.
                </p>
              </motion.div>
            </div>

            {/* 버튼 프리셋 테스트 */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">버튼 프리셋</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(BUTTON_PRESETS).map((preset) => (
                  <motion.button
                    key={preset}
                    {...createButtonVariant(preset as keyof typeof BUTTON_PRESETS)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {preset}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </AnimatedContainer>

        {/* 리스트 애니메이션 테스트 */}
        <AnimatedContainer variant="slideUp" delay={0.3} className="bg-white p-4 rounded-lg shadow lg:col-span-1">
          <h3 className="text-lg font-semibold text-purple-600 mb-4">📋 리스트 애니메이션</h3>
          
          <div className="flex gap-2 mb-4">
            <AnimatedButton
              variant="strong"
              onClick={addDemoItem}
              className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
            >
              추가
            </AnimatedButton>
            <AnimatedButton
              variant="default"
              onClick={() => removeDemoItem(demoItems.length - 1)}
              disabled={demoItems.length === 0}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              제거
            </AnimatedButton>
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {demoItems.map((item, index) => (
                <motion.div
                  key={`${item}-${index}`}
                  initial={animationConfig.initial}
                  animate={animationConfig.animate}
                  exit={animationConfig.exit}
                  transition={{
                    ...animationConfig.transition,
                    delay: index * STAGGER_PRESETS[selectedStagger]
                  }}
                  layout
                  className="p-2 bg-gray-100 rounded flex justify-between items-center"
                >
                  <span className="text-sm">{item}</span>
                  <button
                    onClick={() => removeDemoItem(index)}
                    className="px-2 py-1 text-xs text-red-600 hover:bg-red-100 rounded"
                  >
                    삭제
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </AnimatedContainer>

        {/* 특수 프리셋 테스트 */}
        <AnimatedContainer variant="scale" delay={0.4} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-orange-600 mb-4">🎯 특수 프리셋</h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Todo 전용 애니메이션</p>
              <div className="space-y-2">
                <motion.div
                  {...TODO_ANIMATION_PRESETS.cardEnter}
                  className="p-2 bg-blue-100 rounded text-sm"
                >
                  카드 진입 애니메이션
                </motion.div>
                <motion.div
                  whileHover={TODO_ANIMATION_PRESETS.dragging}
                  className="p-2 bg-yellow-100 rounded text-sm cursor-grab"
                >
                  드래그 호버 효과 (마우스 올려보세요)
                </motion.div>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">알림 애니메이션</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(NOTIFICATION_ANIMATION_PRESETS).map((type) => (
                  <button
                    key={type}
                    onClick={() => showNotificationDemo(type as keyof typeof NOTIFICATION_ANIMATION_PRESETS)}
                    className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>

      {/* 알림 데모 */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            {...NOTIFICATION_ANIMATION_PRESETS[showNotification as keyof typeof NOTIFICATION_ANIMATION_PRESETS]}
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
              showNotification === 'success' ? 'bg-green-500 text-white' :
              showNotification === 'error' ? 'bg-red-500 text-white' :
              showNotification === 'warning' ? 'bg-yellow-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            <p className="font-medium">{showNotification} 알림 데모</p>
            <p className="text-sm opacity-90">3초 후 자동으로 사라집니다.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};