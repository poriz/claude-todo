import React from 'react';
import type { Todo, Category } from '../../../../shared/types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  getCategoryById?: (id: string) => Category | undefined;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit, getCategoryById }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">할 일이 없습니다</h3>
        <p className="text-gray-600">새로운 할 일을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          getCategoryById={getCategoryById}
        />
      ))}
    </div>
  );
};