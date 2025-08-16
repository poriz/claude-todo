import React, { useState, useEffect } from 'react';
import type { Todo, Category } from '../../../../shared/types';

interface EditTodoFormProps {
  todo: Todo;
  categories: Category[];
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  onCancel: () => void;
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({ 
  todo, 
  categories, 
  onUpdate, 
  onCancel 
}) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(todo.priority);
  const [categoryId, setCategoryId] = useState<string>(todo.categoryId || '');
  const [dueDate, setDueDate] = useState(() => {
    if (todo.dueDate) {
      const date = new Date(todo.dueDate);
      return date.toISOString().split('T')[0];
    }
    return '';
  });
  const [tags, setTags] = useState(todo.tags.join(', '));

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setPriority(todo.priority);
    setCategoryId(todo.categoryId || '');
    setDueDate(() => {
      if (todo.dueDate) {
        const date = new Date(todo.dueDate);
        return date.toISOString().split('T')[0];
      }
      return '';
    });
    setTags(todo.tags.join(', '));
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const updates: Partial<Omit<Todo, 'id' | 'createdAt'>> = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      categoryId: categoryId || undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      updatedAt: new Date(),
    };

    onUpdate(todo.id, updates);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="lg:col-span-2">
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">
              설명
            </label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="edit-priority" className="block text-sm font-medium text-gray-700">
              우선순위
            </label>
            <select
              id="edit-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">낮음</option>
              <option value="medium">보통</option>
              <option value="high">높음</option>
            </select>
          </div>

          <div>
            <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">
              카테고리
            </label>
            <select
              id="edit-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">카테고리 없음</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="edit-dueDate" className="block text-sm font-medium text-gray-700">
              마감일
            </label>
            <input
              type="date"
              id="edit-dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="edit-tags" className="block text-sm font-medium text-gray-700">
              태그 (콤마로 구분)
            </label>
            <input
              type="text"
              id="edit-tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
};