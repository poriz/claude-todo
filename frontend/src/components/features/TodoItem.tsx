import React from 'react';
import type { Todo, Category } from '../../../../shared/types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  getCategoryById?: (id: string) => Category | undefined;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit, getCategoryById }) => {
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
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const category = todo.categoryId && getCategoryById ? getCategoryById(todo.categoryId) : null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
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
                {todo.title}
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
                
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}>
                  {todo.priority === 'high' && '높음'}
                  {todo.priority === 'medium' && '보통'}
                  {todo.priority === 'low' && '낮음'}
                </span>
              </div>
            </div>
            
            {todo.description && (
              <p className={`text-sm mb-3 ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {todo.description}
              </p>
            )}
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>생성: {formatDate(todo.createdAt)}</span>
              {todo.dueDate && (
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                  new Date(todo.dueDate) < new Date() && !todo.completed
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  마감: {formatDate(todo.dueDate)}
                </span>
              )}
            </div>
            
            {todo.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {todo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    #{tag}
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