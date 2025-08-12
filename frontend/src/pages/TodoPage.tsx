import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { AddTodoForm } from '../components/features/AddTodoForm';
import { TodoList } from '../components/features/TodoList';

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-medium">📊</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">전체 할 일</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{todos.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-medium">⏳</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">진행 중</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{activeCount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-medium">✅</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">완료</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{completedCount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <AddTodoForm onAddTodo={createTodo} categories={categories} />

        <div className="mb-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <label htmlFor="search" className="sr-only">검색</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      id="search"
                      type="text"
                      placeholder="할 일 검색..."
                      value={filters.search || ''}
                      onChange={handleSearch}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">상태</label>
                    <select
                      id="status"
                      value={filters.status}
                      onChange={(e) => handleStatusFilter(e.target.value as 'all' | 'active' | 'completed')}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    >
                      <option value="all">전체</option>
                      <option value="active">진행 중</option>
                      <option value="completed">완료</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">카테고리</label>
                  <select
                    id="category"
                    value={filters.category || ''}
                    onChange={(e) => handleCategoryFilter(e.target.value || undefined)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    <option value="">전체 카테고리</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">우선순위</label>
                  <select
                    id="priority"
                    value={filters.priority || ''}
                    onChange={(e) => handlePriorityFilter(e.target.value as 'low' | 'medium' | 'high' | undefined || undefined)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    <option value="">전체 우선순위</option>
                    <option value="high">높음</option>
                    <option value="medium">보통</option>
                    <option value="low">낮음</option>
                  </select>
                </div>
              </div>
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
    </div>
  );
};