import React, { useState, useEffect } from 'react';
import type { TodoFilters } from '../../types';

interface FilterPreset {
  id: string;
  name: string;
  filters: TodoFilters;
  createdAt: Date;
}

interface FilterPresetsProps {
  currentFilters: TodoFilters;
  onApplyPreset: (filters: TodoFilters) => void;
  categories: Array<{ id: string; name: string; color: string }>;
}

export const FilterPresets: React.FC<FilterPresetsProps> = ({
  currentFilters,
  onApplyPreset,
  categories
}) => {
  const [presets, setPresets] = useState<FilterPreset[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // 로컬스토리지에서 프리셋 로드
  useEffect(() => {
    const savedPresets = localStorage.getItem('todo-filter-presets');
    if (savedPresets) {
      try {
        const parsed = JSON.parse(savedPresets);
        setPresets(parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        })));
      } catch (error) {
        console.error('Failed to load filter presets:', error);
      }
    }
  }, []);

  // 프리셋 저장
  const savePresets = (newPresets: FilterPreset[]) => {
    setPresets(newPresets);
    localStorage.setItem('todo-filter-presets', JSON.stringify(newPresets));
  };

  // 새 프리셋 생성
  const createPreset = () => {
    if (!newPresetName.trim()) return;

    const newPreset: FilterPreset = {
      id: crypto.randomUUID(),
      name: newPresetName.trim(),
      filters: { ...currentFilters },
      createdAt: new Date()
    };

    savePresets([...presets, newPreset]);
    setNewPresetName('');
    setIsCreating(false);
  };

  // 프리셋 삭제
  const deletePreset = (id: string) => {
    savePresets(presets.filter(p => p.id !== id));
  };

  // 필터 설명 생성
  const getFilterDescription = (filters: TodoFilters) => {
    const parts = [];
    
    if (filters.search) parts.push(`검색: "${filters.search}"`);
    if (filters.status && filters.status !== 'all') parts.push(`상태: ${filters.status}`);
    if (filters.priority) parts.push(`우선순위: ${filters.priority}`);
    if (filters.category) {
      const category = categories.find(c => c.id === filters.category);
      parts.push(`카테고리: ${category?.name || filters.category}`);
    }
    if (filters.dueDate && filters.dueDate !== 'all') parts.push(`마감일: ${filters.dueDate}`);
    if (filters.tags && filters.tags.length > 0) parts.push(`태그: ${filters.tags.join(', ')}`);

    return parts.length > 0 ? parts.join(' | ') : '필터 없음';
  };

  // 빠른 필터 프리셋들
  const quickPresets = [
    {
      name: '⚠️ 긴급',
      filters: { status: 'active' as const, priority: 'high' as const, dueDate: 'today' as const }
    },
    {
      name: '📅 오늘 할 일',
      filters: { status: 'active' as const, dueDate: 'today' as const }
    },
    {
      name: '🔥 지연된 할 일',
      filters: { status: 'active' as const, dueDate: 'overdue' as const }
    },
    {
      name: '📋 미완료',
      filters: { status: 'active' as const }
    },
    {
      name: '✅ 완료됨',
      filters: { status: 'completed' as const }
    }
  ];

  const hasActiveFilters = Object.values(currentFilters).some(value => 
    value && value !== 'all' && (Array.isArray(value) ? value.length > 0 : true)
  );

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-700">필터 프리셋</h4>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {isOpen ? '닫기' : '관리'}
        </button>
      </div>

      {/* 빠른 프리셋 */}
      <div className="flex flex-wrap gap-2 mb-3">
        {quickPresets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onApplyPreset(preset.filters)}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* 현재 필터 저장 */}
      {hasActiveFilters && (
        <div className="mb-3 p-3 bg-blue-50 rounded-md border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-blue-700">현재 활성 필터</p>
              <p className="text-xs text-blue-600">{getFilterDescription(currentFilters)}</p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              저장
            </button>
          </div>
        </div>
      )}

      {/* 프리셋 생성 폼 */}
      {isCreating && (
        <div className="mb-3 p-3 bg-white border border-gray-200 rounded-md">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="프리셋 이름"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              className="flex-1 text-xs border border-gray-300 rounded px-2 py-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') createPreset();
                if (e.key === 'Escape') {
                  setIsCreating(false);
                  setNewPresetName('');
                }
              }}
              autoFocus
            />
            <button
              onClick={createPreset}
              disabled={!newPresetName.trim()}
              className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewPresetName('');
              }}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* 저장된 프리셋 목록 */}
      {isOpen && presets.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-xs font-medium text-gray-600">저장된 프리셋</h5>
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded border"
            >
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => onApplyPreset(preset.filters)}
                  className="text-left w-full"
                >
                  <p className="text-xs font-medium text-gray-700 truncate">{preset.name}</p>
                  <p className="text-xs text-gray-500 truncate">{getFilterDescription(preset.filters)}</p>
                </button>
              </div>
              <button
                onClick={() => deletePreset(preset.id)}
                className="ml-2 text-xs text-red-500 hover:text-red-700"
                title="삭제"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {isOpen && presets.length === 0 && (
        <p className="text-xs text-gray-500 text-center py-4">
          저장된 프리셋이 없습니다
        </p>
      )}
    </div>
  );
};