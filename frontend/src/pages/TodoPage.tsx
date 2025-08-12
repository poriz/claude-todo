import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { AddTodoForm } from '../components/features/AddTodoForm';
import { TodoList } from '../components/features/TodoList';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const TodoPage: React.FC = () => {
  const { todos, categories, createTodo, toggleComplete, deleteTodo, filters, setFilters, getCategoryById } = useTodos();
  const [, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
    // TODO: 수정 모달 또는 인라인 편집 구현
    console.log('Edit todo:', id);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleStatusFilter = (status: 'all' | 'active' | 'completed') => {
    setFilters({ ...filters, status });
  };

  const handlePriorityFilter = (priority: 'low' | 'medium' | 'high' | undefined) => {
    setFilters({ ...filters, priority });
  };

  const handleCategoryFilter = (category: string | undefined) => {
    setFilters({ ...filters, category });
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex gap-4 text-sm text-gray-600">
          <span>전체: {todos.length}개</span>
          <span>진행 중: {activeCount}개</span>
          <span>완료: {completedCount}개</span>
        </div>
      </div>

      <AddTodoForm onAddTodo={createTodo} categories={categories} />

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="할 일 검색..."
              value={filters.search || ''}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filters.status === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleStatusFilter('all')}
            >
              전체
            </Button>
            <Button
              variant={filters.status === 'active' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleStatusFilter('active')}
            >
              진행 중
            </Button>
            <Button
              variant={filters.status === 'completed' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleStatusFilter('completed')}
            >
              완료
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex gap-2">
            <span className="text-sm text-gray-600 self-center">카테고리:</span>
            <select
              value={filters.category || ''}
              onChange={(e) => handleCategoryFilter(e.target.value || undefined)}
              className="text-sm px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">전체</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <span className="text-sm text-gray-600 self-center">우선순위:</span>
          <Button
            variant={!filters.priority ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handlePriorityFilter(undefined)}
          >
            전체
          </Button>
          <Button
            variant={filters.priority === 'high' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handlePriorityFilter('high')}
          >
            높음
          </Button>
          <Button
            variant={filters.priority === 'medium' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handlePriorityFilter('medium')}
          >
            보통
          </Button>
          <Button
            variant={filters.priority === 'low' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handlePriorityFilter('low')}
          >
            낮음
          </Button>
          </div>
        </div>
      </div>

      <TodoList
        todos={todos}
        onToggle={toggleComplete}
        onDelete={deleteTodo}
        onEdit={handleEdit}
        getCategoryById={getCategoryById}
      />
    </div>
  );
};