import React from 'react';
import type { Todo, Category } from '../../../../shared/types';
import { TodoItem } from './TodoItem';
import { EditTodoForm } from './EditTodoForm';

interface TodoListProps {
  todos: Todo[];
  categories: Category[];
  editingId: string | null;
  searchTerm?: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  onUpdatePriority?: (id: string, priority: 'low' | 'medium' | 'high') => void;
  onCancelEdit: () => void;
  getCategoryById?: (id: string) => Category | undefined;
}

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  categories,
  editingId,
  searchTerm,
  onToggle, 
  onDelete, 
  onEdit, 
  onUpdate,
  onUpdatePriority,
  onCancelEdit,
  getCategoryById 
}) => {
  if (todos.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">할 일이 없습니다</h3>
          <p className="mt-1 text-sm text-gray-500">새로운 할 일을 추가해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div key={todo.id}>
          {editingId === todo.id ? (
            <EditTodoForm
              todo={todo}
              categories={categories}
              onUpdate={(id, updates) => {
                onUpdate(id, updates);
                onCancelEdit();
              }}
              onCancel={onCancelEdit}
            />
          ) : (
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              onUpdatePriority={onUpdatePriority}
              getCategoryById={getCategoryById}
              searchTerm={searchTerm}
            />
          )}
        </div>
      ))}
    </div>
  );
};