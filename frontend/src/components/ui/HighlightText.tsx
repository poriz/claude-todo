import React from 'react';

interface HighlightTextProps {
  text: string;
  searchTerm?: string;
  className?: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({ 
  text, 
  searchTerm, 
  className = '' 
}) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return <span className={className}>{text}</span>;
  }

  // 검색어를 정규식으로 변환 (대소문자 구분 없이)
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (regex.test(part)) {
          return (
            <mark
              key={index}
              className="bg-yellow-200 text-yellow-900 font-medium px-1 rounded"
            >
              {part}
            </mark>
          );
        }
        return part;
      })}
    </span>
  );
};