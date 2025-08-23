import React, { useState } from 'react';
import { AnimatedContainer, AnimatedButton, AnimatedList } from './index';

export const TestAnimation: React.FC = () => {
  const [items, setItems] = useState(['아이템 1', '아이템 2', '아이템 3']);
  
  const addItem = () => {
    setItems(prev => [...prev, `아이템 ${prev.length + 1}`]);
  };
  
  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
      <AnimatedContainer variant="slideDown" className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🎬 애니메이션 컴포넌트 테스트</h2>
        <p className="text-gray-600">공통 애니메이션 컴포넌트가 정상 작동합니다!</p>
      </AnimatedContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AnimatedContainer 테스트 */}
        <AnimatedContainer variant="slideLeft" delay={0.1} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-600 mb-2">📦 AnimatedContainer</h3>
          <p className="text-sm text-gray-600 mb-4">다양한 variant로 애니메이션</p>
          
          <div className="space-y-2">
            {['fadeIn', 'slideUp', 'scale'].map((variant, index) => (
              <AnimatedContainer
                key={variant}
                // @ts-ignore - variant 타입 이슈 임시 해결
                variant={variant}
                delay={index * 0.1}
                className="p-2 bg-gray-100 rounded text-sm"
              >
                {variant} 애니메이션
              </AnimatedContainer>
            ))}
          </div>
        </AnimatedContainer>

        {/* AnimatedButton 테스트 */}
        <AnimatedContainer variant="slideRight" delay={0.2} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">🎯 AnimatedButton</h3>
          <p className="text-sm text-gray-600 mb-4">다양한 hover/click 효과</p>
          
          <div className="space-y-3">
            {[
              { variant: 'default', label: 'Default' },
              { variant: 'subtle', label: 'Subtle' },
              { variant: 'strong', label: 'Strong' },
              { variant: 'bounce', label: 'Bounce' }
            ].map(({ variant, label }) => (
              <AnimatedButton
                key={variant}
                // @ts-ignore - variant 타입 이슈 임시 해결
                variant={variant}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {label} Button
              </AnimatedButton>
            ))}
          </div>
        </AnimatedContainer>
      </div>

      {/* AnimatedList 테스트 */}
      <AnimatedContainer variant="slideUp" delay={0.3} className="mt-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-purple-600 mb-2">📋 AnimatedList</h3>
        <p className="text-sm text-gray-600 mb-4">리스트 아이템 추가/삭제 애니메이션</p>
        
        <div className="flex gap-2 mb-4">
          <AnimatedButton
            variant="strong"
            onClick={addItem}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            아이템 추가
          </AnimatedButton>
          
          <AnimatedButton
            variant="default"
            onClick={() => removeItem(items.length - 1)}
            disabled={items.length === 0}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            아이템 제거
          </AnimatedButton>
        </div>

        <AnimatedList variant="slideUp" stagger={0.1} className="space-y-2">
          {items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="p-3 bg-gray-100 rounded flex justify-between items-center"
            >
              <span>{item}</span>
              <AnimatedButton
                variant="subtle"
                onClick={() => removeItem(index)}
                className="px-2 py-1 text-red-600 hover:bg-red-100 rounded"
              >
                삭제
              </AnimatedButton>
            </div>
          ))}
        </AnimatedList>
        
        {items.length === 0 && (
          <AnimatedContainer variant="fadeIn" className="p-4 text-center text-gray-500">
            아이템이 없습니다.
          </AnimatedContainer>
        )}
      </AnimatedContainer>

    </div>
  );
};