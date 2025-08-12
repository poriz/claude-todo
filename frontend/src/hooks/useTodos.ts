import { useState, useCallback, useEffect } from 'react';
import type { Todo, TodoFilters, Category } from '../../../shared/types';

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: '업무', color: 'blue', createdAt: new Date() },
  { id: 'personal', name: '개인', color: 'green', createdAt: new Date() },
  { id: 'study', name: '학습', color: 'purple', createdAt: new Date() },
  { id: 'shopping', name: '쇼핑', color: 'orange', createdAt: new Date() },
];

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [filters, setFilters] = useState<TodoFilters>({ status: 'all' });
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  // 로컬스토리지에서 데이터 로드
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedCategories = localStorage.getItem('todos-categories');
    
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // 로컬스토리지에 데이터 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('todos-categories', JSON.stringify(categories));
  }, [categories]);

  const createTodo = useCallback((todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTodos(prev => [newTodo, ...prev]);
    return newTodo;
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date() }
        : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    updateTodo(id, { completed: !todos.find(t => t.id === id)?.completed });
  }, [todos, updateTodo]);

  const filteredTodos = todos.filter(todo => {
    if (filters.status === 'active' && todo.completed) return false;
    if (filters.status === 'completed' && !todo.completed) return false;
    if (filters.priority && todo.priority !== filters.priority) return false;
    if (filters.category && todo.categoryId !== filters.category) return false;
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => todo.tags.includes(tag));
      if (!hasMatchingTag) return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = todo.title.toLowerCase().includes(searchLower);
      const matchesDescription = todo.description?.toLowerCase().includes(searchLower);
      if (!matchesTitle && !matchesDescription) return false;
    }
    return true;
  });

  const createCategory = useCallback((categoryData: Omit<Category, 'id' | 'createdAt'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Omit<Category, 'id' | 'createdAt'>>) => {
    setCategories(prev => prev.map(category => 
      category.id === id 
        ? { ...category, ...updates }
        : category
    ));
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
    // 해당 카테고리를 사용하는 할일들의 categoryId 제거
    setTodos(prev => prev.map(todo => 
      todo.categoryId === id 
        ? { ...todo, categoryId: undefined, updatedAt: new Date() }
        : todo
    ));
  }, []);

  const getCategoryById = useCallback((id: string) => {
    return categories.find(category => category.id === id);
  }, [categories]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    categories,
    filters,
    setFilters,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  };
};