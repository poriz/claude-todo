import { useState, useCallback, useMemo } from 'react';
import type { Todo, TodoFilters, Category } from '../types';
import { sortTodosByPriorityAndDate, getDueDateCategory } from '../utils/dateUtils';
import { useDebounce } from './useDebounce';
import { useApi } from './useApi';
import { todosApi, categoriesApi, type CreateTodoRequest, type UpdateTodoRequest } from '../services/api';

export const useTodos = () => {
  const [filters, setFilters] = useState<TodoFilters>({ status: 'all' });
  
  // API 데이터 fetch
  const { 
    data: todos = [], 
    loading: todosLoading, 
    error: todosError, 
    refetch: refetchTodos 
  } = useApi(todosApi.getAll, []);

  const { 
    data: categories = [], 
    loading: categoriesLoading, 
    error: categoriesError,
    refetch: refetchCategories 
  } = useApi(categoriesApi.getAll, []);

  // 로딩/에러 상태
  const loading = todosLoading || categoriesLoading;
  const error = todosError || categoriesError;

  // CRUD 작업들
  const createTodo = useCallback(async (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const createData: CreateTodoRequest = {
        title: todoData.title,
        description: todoData.description,
        priority: todoData.priority,
        dueDate: todoData.dueDate,
        categoryId: todoData.categoryId,
        tags: todoData.tags,
      };

      const newTodo = await todosApi.create(createData);
      await refetchTodos(); // 데이터 재조회
      return newTodo;
    } catch (error) {
      console.error('Create todo failed:', error);
      throw error;
    }
  }, [refetchTodos]);

  const updateTodo = useCallback(async (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    try {
      const updateData: UpdateTodoRequest = {
        title: updates.title,
        description: updates.description,
        completed: updates.completed,
        priority: updates.priority,
        dueDate: updates.dueDate,
        categoryId: updates.categoryId,
        tags: updates.tags,
      };

      const updatedTodo = await todosApi.update(id, updateData);
      await refetchTodos();
      return updatedTodo;
    } catch (error) {
      console.error('Update todo failed:', error);
      throw error;
    }
  }, [refetchTodos]);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      await todosApi.delete(id);
      await refetchTodos();
    } catch (error) {
      console.error('Delete todo failed:', error);
      throw error;
    }
  }, [refetchTodos]);

  const toggleComplete = useCallback(async (id: string) => {
    const todo = todos?.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { completed: !todo.completed });
    }
  }, [todos, updateTodo]);

  const updatePriority = useCallback(async (id: string, priority: 'low' | 'medium' | 'high') => {
    await updateTodo(id, { priority });
  }, [updateTodo]);

  // 카테고리 관련 기능
  const createCategory = useCallback(async (categoryData: Omit<Category, 'id' | 'createdAt'>) => {
    try {
      const newCategory = await categoriesApi.create({
        name: categoryData.name,
        color: categoryData.color,
      });
      await refetchCategories();
      return newCategory;
    } catch (error) {
      console.error('Create category failed:', error);
      throw error;
    }
  }, [refetchCategories]);

  const updateCategory = useCallback((_id: string, _updates: Partial<Omit<Category, 'id' | 'createdAt'>>) => {
    // TODO: 백엔드에 카테고리 수정 API 추가 후 구현
    console.warn('Category update not implemented in backend yet');
  }, []);

  const deleteCategory = useCallback((_id: string) => {
    // TODO: 백엔드에 카테고리 삭제 API 추가 후 구현
    console.warn('Category delete not implemented in backend yet');
  }, []);

  const getCategoryById = useCallback((id: string) => {
    return categories?.find(category => category.id === id);
  }, [categories]);

  // 검색어 디바운싱
  const debouncedSearchTerm = useDebounce(filters.search || '', 300);

  // 필터링 및 정렬 (클라이언트 사이드)
  const filteredAndSortedTodos = useMemo(() => {
    if (!todos) return [];
    const filtered = todos.filter(todo => {
      if (filters.status === 'active' && todo.completed) return false;
      if (filters.status === 'completed' && !todo.completed) return false;
      if (filters.priority && todo.priority !== filters.priority) return false;
      if (filters.category && todo.categoryId !== filters.category) return false;
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => todo.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }
      if (debouncedSearchTerm) {
        const searchLower = debouncedSearchTerm.toLowerCase();
        const matchesTitle = todo.title.toLowerCase().includes(searchLower);
        const matchesDescription = todo.description?.toLowerCase().includes(searchLower);
        const matchesTags = todo.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesTitle && !matchesDescription && !matchesTags) return false;
      }
      if (filters.dueDate && filters.dueDate !== 'all') {
        const todoDateCategory = getDueDateCategory(todo.dueDate);
        if (filters.dueDate === 'noDueDate') {
          if (todoDateCategory !== null) return false;
        } else if (todoDateCategory !== filters.dueDate) {
          return false;
        }
      }
      return true;
    });

    return sortTodosByPriorityAndDate(filtered);
  }, [todos, filters.status, filters.priority, filters.category, filters.tags, debouncedSearchTerm, filters.dueDate]);

  return {
    todos: filteredAndSortedTodos,
    allTodos: todos || [],
    categories: categories || [],
    filters,
    setFilters,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    updatePriority,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    refetchTodos,
    refetchCategories,
  };
};