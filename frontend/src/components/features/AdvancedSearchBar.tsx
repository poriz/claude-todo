import React, { useState, useRef, useEffect } from 'react';
import type { TodoFilters } from '../../../../shared/types';

interface AdvancedSearchBarProps {
  filters: TodoFilters;
  onFiltersChange: (filters: TodoFilters) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

type SearchMode = 'simple' | 'advanced';

export const AdvancedSearchBar: React.FC<AdvancedSearchBarProps> = ({
  filters,
  onFiltersChange,
  onFocus,
  onBlur,
}) => {
  const [mode, setMode] = useState<SearchMode>('simple');
  const [isExpanded, setIsExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 검색 모드별 placeholder 설정
  const getPlaceholder = () => {
    if (mode === 'advanced') {
      return '예: title:회의 tag:urgent priority:high';
    }
    return '할 일 검색... (Ctrl+K로 고급 검색)';
  };

  // 고급 검색 파싱
  const parseAdvancedSearch = (searchText: string) => {
    const newFilters = { ...filters };
    let remainingText = searchText;

    // title: 검색
    const titleMatch = searchText.match(/title:([^\s]+)/i);
    if (titleMatch) {
      newFilters.search = titleMatch[1];
      remainingText = remainingText.replace(/title:[^\s]+/gi, '').trim();
    }

    // tag: 검색
    const tagMatches = searchText.match(/tag:([^\s]+)/gi);
    if (tagMatches) {
      newFilters.tags = tagMatches.map(match => match.replace(/tag:/gi, ''));
      remainingText = remainingText.replace(/tag:[^\s]+/gi, '').trim();
    }

    // priority: 검색
    const priorityMatch = searchText.match(/priority:(low|medium|high)/i);
    if (priorityMatch) {
      newFilters.priority = priorityMatch[1] as 'low' | 'medium' | 'high';
      remainingText = remainingText.replace(/priority:(low|medium|high)/gi, '').trim();
    }

    // status: 검색
    const statusMatch = searchText.match(/status:(active|completed|all)/i);
    if (statusMatch) {
      newFilters.status = statusMatch[1] as 'active' | 'completed' | 'all';
      remainingText = remainingText.replace(/status:(active|completed|all)/gi, '').trim();
    }

    // 나머지 텍스트는 일반 검색으로
    if (remainingText && !titleMatch) {
      newFilters.search = remainingText;
    }

    return newFilters;
  };

  // 검색 입력 처리
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    
    if (mode === 'advanced' && searchText.includes(':')) {
      const newFilters = parseAdvancedSearch(searchText);
      onFiltersChange(newFilters);
    } else {
      onFiltersChange({ ...filters, search: searchText });
    }
  };

  // 키보드 단축키 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K 또는 Cmd+K로 검색 포커스
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setMode('advanced');
        setIsExpanded(true);
      }

      // Escape로 검색 초기화
      if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        onFiltersChange({ ...filters, search: '', tags: undefined });
        searchInputRef.current?.blur();
        setIsExpanded(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filters, onFiltersChange]);

  // 검색 제안 생성
  const getSearchSuggestions = () => {
    if (mode !== 'advanced' || !isExpanded) return null;

    const suggestions = [
      { label: 'title:', description: '제목으로 검색', example: 'title:회의' },
      { label: 'tag:', description: '태그로 검색', example: 'tag:urgent' },
      { label: 'priority:', description: '우선순위로 검색', example: 'priority:high' },
      { label: 'status:', description: '상태로 검색', example: 'status:active' },
    ];

    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
        <div className="p-3 border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-2">고급 검색 문법</h4>
          <div className="space-y-1">
            {suggestions.map((suggestion) => (
              <div key={suggestion.label} className="text-xs text-gray-600 flex justify-between">
                <span><code className="bg-gray-100 px-1 rounded">{suggestion.label}</code> {suggestion.description}</span>
                <span className="text-gray-400">{suggestion.example}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3">
          <p className="text-xs text-gray-500">
            💡 여러 조건을 조합할 수 있습니다: <code className="bg-gray-100 px-1 rounded">title:회의 tag:urgent priority:high</code>
          </p>
        </div>
      </div>
    );
  };

  // 활성 필터 표시
  const getActiveFilters = () => {
    const activeFilters = [];
    
    if (filters.search) {
      activeFilters.push({ type: 'search', value: filters.search, label: `검색: "${filters.search}"` });
    }
    if (filters.tags && filters.tags.length > 0) {
      activeFilters.push({ type: 'tags', value: filters.tags, label: `태그: ${filters.tags.join(', ')}` });
    }
    if (filters.priority) {
      activeFilters.push({ type: 'priority', value: filters.priority, label: `우선순위: ${filters.priority}` });
    }
    if (filters.status && filters.status !== 'all') {
      activeFilters.push({ type: 'status', value: filters.status, label: `상태: ${filters.status}` });
    }

    if (activeFilters.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {activeFilters.map((filter, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
          >
            {filter.label}
            <button
              onClick={() => {
                const newFilters = { ...filters };
                if (filter.type === 'search') newFilters.search = '';
                if (filter.type === 'tags') newFilters.tags = undefined;
                if (filter.type === 'priority') newFilters.priority = undefined;
                if (filter.type === 'status') newFilters.status = 'all';
                onFiltersChange(newFilters);
              }}
              className="ml-1 text-blue-500 hover:text-blue-700"
            >
              ×
            </button>
          </span>
        ))}
        <button
          onClick={() => onFiltersChange({ 
            ...filters, 
            search: '', 
            tags: undefined, 
            priority: undefined, 
            status: 'all' 
          })}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          모두 지우기
        </button>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            ref={searchInputRef}
            type="text"
            placeholder={getPlaceholder()}
            value={filters.search || ''}
            onChange={handleSearchChange}
            onFocus={() => {
              setIsExpanded(true);
              onFocus?.();
            }}
            onBlur={(e) => {
              // suggestions 클릭 시에는 blur 되지 않도록
              setTimeout(() => {
                setIsExpanded(false);
                onBlur?.();
              }, 200);
            }}
            className={`block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
              mode === 'advanced' ? 'font-mono text-sm' : ''
            }`}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              onClick={() => {
                setMode(mode === 'simple' ? 'advanced' : 'simple');
                setIsExpanded(mode === 'simple');
                searchInputRef.current?.focus();
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title={mode === 'simple' ? '고급 검색 모드' : '기본 검색 모드'}
            >
              {mode === 'simple' ? (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
          </div>
          {getSearchSuggestions()}
        </div>
      </div>
      {getActiveFilters()}
    </div>
  );
};