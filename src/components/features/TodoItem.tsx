import React from 'react';
import type { Todo } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <Card className={`p-4 ${todo.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {todo.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
          </div>
          
          {todo.description && (
            <p className={`text-sm mb-2 ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span>생성: {formatDate(todo.createdAt)}</span>
            {todo.dueDate && (
              <span className={`px-2 py-1 rounded ${
                new Date(todo.dueDate) < new Date() && !todo.completed
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100'
              }`}>
                마감: {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
          
          {todo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {todo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex gap-2 ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(todo.id)}
          >
            수정
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(todo.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            삭제
          </Button>
        </div>
      </div>
    </Card>
  );
};