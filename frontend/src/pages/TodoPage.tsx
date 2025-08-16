import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { AddTodoForm } from '../components/features/AddTodoForm';
import { TodoList } from '../components/features/TodoList';
import { CategoryManager } from '../components/features/CategoryManager';
import { AdvancedSearchBar } from '../components/features/AdvancedSearchBar';
import { FilterPresets } from '../components/features/FilterPresets';
import { getDueDateCategory } from '../utils/dateUtils';

export const TodoPage: React.FC = () => {
  const { 
    todos, 
    categories, 
    createTodo, 
    updateTodo,
    toggleComplete, 
    deleteTodo, 
    updatePriority,
    filters, 
    setFilters, 
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory 
  } = useTodos();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
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

  const handleDueDateFilter = (dueDate: 'all' | 'overdue' | 'today' | 'tomorrow' | 'thisWeek' | 'thisMonth' | 'future' | 'noDueDate') => {
    setFilters({ ...filters, dueDate });
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  // 마감일 관련 통계 계산
  const overdueCount = todos.filter(todo => !todo.completed && getDueDateCategory(todo.dueDate) === 'overdue').length;
  const todayCount = todos.filter(todo => !todo.completed && getDueDateCategory(todo.dueDate) === 'today').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
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

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-medium">⚠️</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">지연</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{overdueCount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white font-medium">📅</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">오늘</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{todayCount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <CategoryManager
        categories={categories}
        onCreateCategory={createCategory}
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
      />

      <AddTodoForm onAddTodo={createTodo} categories={categories} />

        <div className="mb-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">검색</label>
                  <AdvancedSearchBar
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                  />
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
              
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">카테고리</label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCategoryFilter(undefined)}
                      className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium border ${
                        !filters.category 
                          ? 'bg-blue-100 border-blue-300 text-blue-700' 
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      전체
                    </button>
                    {categories.map((category) => {
                      const isSelected = filters.category === category.id;
                      const colorClasses = {
                        blue: isSelected ? 'bg-blue-500 text-white border-blue-500' : 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200',
                        green: isSelected ? 'bg-green-500 text-white border-green-500' : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200',
                        purple: isSelected ? 'bg-purple-500 text-white border-purple-500' : 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200',
                        orange: isSelected ? 'bg-orange-500 text-white border-orange-500' : 'bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200',
                        red: isSelected ? 'bg-red-500 text-white border-red-500' : 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200',
                        pink: isSelected ? 'bg-pink-500 text-white border-pink-500' : 'bg-pink-100 text-pink-700 border-pink-300 hover:bg-pink-200',
                        yellow: isSelected ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200',
                        indigo: isSelected ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-indigo-100 text-indigo-700 border-indigo-300 hover:bg-indigo-200',
                      };
                      const categoryColorClass = colorClasses[category.color as keyof typeof colorClasses] || colorClasses.blue;
                      
                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryFilter(category.id)}
                          className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium border ${categoryColorClass}`}
                        >
                          {category.name}
                        </button>
                      );
                    })}
                  </div>
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
                    <option value="high">🔴 높음</option>
                    <option value="medium">🟡 보통</option>
                    <option value="low">🟢 낮음</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">마감일</label>
                  <select
                    id="dueDate"
                    value={filters.dueDate || 'all'}
                    onChange={(e) => handleDueDateFilter(e.target.value as 'all' | 'overdue' | 'today' | 'tomorrow' | 'thisWeek' | 'thisMonth' | 'future' | 'noDueDate')}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                  >
                    <option value="all">전체</option>
                    <option value="overdue">⚠️ 지연</option>
                    <option value="today">📅 오늘</option>
                    <option value="tomorrow">⏰ 내일</option>
                    <option value="thisWeek">📊 이번 주</option>
                    <option value="thisMonth">📆 이번 달</option>
                    <option value="future">🔮 미래</option>
                    <option value="noDueDate">❌ 마감일 없음</option>
                  </select>
                </div>
              </div>

              {/* 필터 프리셋 */}
              <div className="mt-6">
                <FilterPresets
                  currentFilters={filters}
                  onApplyPreset={handleFiltersChange}
                  categories={categories}
                />
              </div>
            </div>
          </div>
        </div>

      <TodoList
        todos={todos}
        categories={categories}
        editingId={editingId}
        searchTerm={filters.search}
        onToggle={toggleComplete}
        onDelete={deleteTodo}
        onEdit={handleEdit}
        onUpdate={updateTodo}
        onUpdatePriority={updatePriority}
        onCancelEdit={handleCancelEdit}
        getCategoryById={getCategoryById}
      />
      </div>
    </div>
  );
};