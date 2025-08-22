import React from 'react';
import type { Todo, Category } from '../../types';
import { formatDate, formatRelativeDate } from '../../utils/dateUtils';
import { HighlightText } from '../ui/HighlightText';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onUpdatePriority?: (id: string, priority: 'low' | 'medium' | 'high') => void;
  getCategoryById?: (id: string) => Category | undefined;
  searchTerm?: string;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit, onUpdatePriority, getCategoryById, searchTerm }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const getCategoryColorClasses = (color: string) => {
    const colors = {
      blue: { border: 'border-l-blue-500', bg: 'bg-blue-500' },
      green: { border: 'border-l-green-500', bg: 'bg-green-500' },
      purple: { border: 'border-l-purple-500', bg: 'bg-purple-500' },
      orange: { border: 'border-l-orange-500', bg: 'bg-orange-500' },
      red: { border: 'border-l-red-500', bg: 'bg-red-500' },
      pink: { border: 'border-l-pink-500', bg: 'bg-pink-500' },
      yellow: { border: 'border-l-yellow-500', bg: 'bg-yellow-500' },
      indigo: { border: 'border-l-indigo-500', bg: 'bg-indigo-500' },
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const category = todo.categoryId && getCategoryById ? getCategoryById(todo.categoryId) : null;
  const dueDateInfo = todo.dueDate ? formatRelativeDate(todo.dueDate) : null;

  const handlePriorityClick = () => {
    if (!onUpdatePriority) return;
    
    const priorities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
    const currentIndex = priorities.indexOf(todo.priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    onUpdatePriority(todo.id, priorities[nextIndex]);
  };

  return (
    <div className={`bg-white shadow rounded-lg border ${todo.completed ? 'opacity-60' : ''} ${category ? `border-l-4 ${getCategoryColorClasses(category.color).border}` : 'border-gray-200'}`}>
      <div className="px-6 py-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 pt-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                <HighlightText text={todo.title} searchTerm={searchTerm} />
              </h3>
              
              <div className="flex items-center space-x-2">
                {category && (
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getCategoryColorClasses(category.color).bg}`}
                    title={category.name}
                  >
                    {category.name}
                  </span>
                )}
                
                <button
                  onClick={handlePriorityClick}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                    onUpdatePriority 
                      ? `${priorityColors[todo.priority]} hover:opacity-80 cursor-pointer` 
                      : priorityColors[todo.priority]
                  }`}
                  title={onUpdatePriority ? "우선순위 변경하기" : undefined}
                >
                  {todo.priority === 'high' && '🔴 높음'}
                  {todo.priority === 'medium' && '🟡 보통'}
                  {todo.priority === 'low' && '🟢 낮음'}
                </button>
              </div>
            </div>
            
            {todo.description && (
              <p className={`text-sm mb-3 ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                <HighlightText text={todo.description} searchTerm={searchTerm} />
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>생성: {formatDate(todo.createdAt)}</span>
              </div>
              
              {dueDateInfo && (
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${dueDateInfo.color}`}>
                    {dueDateInfo.urgency === 'high' && (
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    마감: {dueDateInfo.label}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(todo.dueDate!)}
                  </span>
                </div>
              )}
            </div>
            
            {todo.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {todo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    #<HighlightText text={tag} searchTerm={searchTerm} />
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex-shrink-0 flex space-x-2">
            <button
              onClick={() => onEdit(todo.id)}
              className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              title="수정"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="inline-flex items-center p-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              title="삭제"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};