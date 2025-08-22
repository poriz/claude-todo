import type { Todo, Category } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

// API 에러 타입
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// 기본 fetch 래퍼
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(response.status, `API Error: ${response.statusText}`);
  }

  return response.json();
}

// ===================
// TODOS API
// ===================

export interface CreateTodoRequest {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  categoryId?: string;
  tags?: string[];
}

export interface UpdateTodoRequest extends Partial<CreateTodoRequest> {
  completed?: boolean;
}

export const todosApi = {
  // 모든 할일 조회
  getAll: (): Promise<Todo[]> => 
    apiCall<Todo[]>('/todos'),

  // 할일 생성
  create: (data: CreateTodoRequest): Promise<Todo> =>
    apiCall<Todo>('/todos', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // 할일 수정
  update: (id: string, data: UpdateTodoRequest): Promise<Todo> =>
    apiCall<Todo>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // 할일 삭제
  delete: (id: string): Promise<void> =>
    apiCall<void>(`/todos/${id}`, {
      method: 'DELETE',
    }),
};

// ===================
// CATEGORIES API
// ===================

export interface CreateCategoryRequest {
  name: string;
  color?: string;
}

export const categoriesApi = {
  // 모든 카테고리 조회
  getAll: (): Promise<Category[]> =>
    apiCall<Category[]>('/categories'),

  // 카테고리 생성
  create: (data: CreateCategoryRequest): Promise<Category> =>
    apiCall<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};