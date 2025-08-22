import React, { useState } from 'react';
import type { Category } from '../../types';

interface CategoryManagerProps {
  categories: Category[];
  onCreateCategory: (categoryData: Omit<Category, 'id' | 'createdAt'>) => void;
  onUpdateCategory: (id: string, updates: Partial<Omit<Category, 'id' | 'createdAt'>>) => void;
  onDeleteCategory: (id: string) => void;
}

const AVAILABLE_COLORS = [
  { name: 'blue', value: 'bg-blue-500', border: 'border-blue-500' },
  { name: 'green', value: 'bg-green-500', border: 'border-green-500' },
  { name: 'purple', value: 'bg-purple-500', border: 'border-purple-500' },
  { name: 'orange', value: 'bg-orange-500', border: 'border-orange-500' },
  { name: 'pink', value: 'bg-pink-500', border: 'border-pink-500' },
  { name: 'red', value: 'bg-red-500', border: 'border-red-500' },
  { name: 'yellow', value: 'bg-yellow-500', border: 'border-yellow-500' },
  { name: 'indigo', value: 'bg-indigo-500', border: 'border-indigo-500' },
];

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('blue');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('blue');

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    onCreateCategory({
      name: newCategoryName.trim(),
      color: newCategoryColor,
    });

    setNewCategoryName('');
    setNewCategoryColor('blue');
  };

  const handleEditCategory = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditColor(category.color);
  };

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !editName.trim()) return;

    onUpdateCategory(editingId, {
      name: editName.trim(),
      color: editColor,
    });

    setEditingId(null);
    setEditName('');
    setEditColor('blue');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditColor('blue');
  };

  const getColorClasses = (colorName: string) => {
    const color = AVAILABLE_COLORS.find(c => c.name === colorName);
    return color || AVAILABLE_COLORS[0];
  };

  return (
    <div className="mb-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">카테고리 관리</h3>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isOpen ? '닫기' : '관리'}
            </button>
          </div>

          {isOpen && (
            <div className="space-y-6">
              {/* 새 카테고리 추가 폼 */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">새 카테고리 추가</h4>
                <form onSubmit={handleCreateCategory} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="카테고리 이름"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="w-full sm:w-32">
                    <select
                      value={newCategoryColor}
                      onChange={(e) => setNewCategoryColor(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      {AVAILABLE_COLORS.map((color) => (
                        <option key={color.name} value={color.name}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={!newCategoryName.trim()}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    추가
                  </button>
                </form>
              </div>

              {/* 기존 카테고리 목록 */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">기존 카테고리</h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                      {editingId === category.id ? (
                        <form onSubmit={handleUpdateCategory} className="flex items-center gap-3 flex-1">
                          <div className={`w-4 h-4 rounded-full ${getColorClasses(editColor).value}`}></div>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                          <select
                            value={editColor}
                            onChange={(e) => setEditColor(e.target.value)}
                            className="w-24 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          >
                            {AVAILABLE_COLORS.map((color) => (
                              <option key={color.name} value={color.name}>
                                {color.name}
                              </option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            className="px-3 py-1 text-sm text-green-600 hover:text-green-800"
                          >
                            저장
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                          >
                            취소
                          </button>
                        </form>
                      ) : (
                        <>
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${getColorClasses(category.color).value}`}></div>
                            <span className="font-medium text-gray-900">{category.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditCategory(category)}
                              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                            >
                              수정
                            </button>
                            <button
                              onClick={() => onDeleteCategory(category.id)}
                              className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                            >
                              삭제
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {categories.length === 0 && (
                    <p className="text-gray-500 text-center py-4">아직 생성된 카테고리가 없습니다.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 간단한 카테고리 미리보기 (닫혀있을 때) */}
          {!isOpen && (
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category.id}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white ${getColorClasses(category.color).value}`}
                >
                  {category.name}
                </span>
              ))}
              {categories.length === 0 && (
                <span className="text-gray-500 text-sm">카테고리가 없습니다. 관리 버튼을 눌러 추가해보세요.</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};