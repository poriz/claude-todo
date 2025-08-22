import { Router } from 'express';
import { prisma } from './db.js';

const router = Router();

// ===================
// TODOS API
// ===================

// GET /api/todos - 모든 할일 조회
router.get('/todos', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      include: {
        category: true, // 카테고리 정보도 포함
      },
      orderBy: [
        { completed: 'asc' }, // 완료되지 않은 것부터
        { createdAt: 'desc' },  // 최신순
      ],
    });

    // tags를 JSON 파싱해서 반환
    const formattedTodos = todos.map(todo => ({
      ...todo,
      tags: todo.tags ? JSON.parse(todo.tags) : [],
    }));

    res.json(formattedTodos);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST /api/todos - 새 할일 생성
router.post('/todos', async (req, res) => {
  try {
    const { title, description, priority, dueDate, categoryId, tags } = req.body;

    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        priority: priority || 'medium',
        dueDate: dueDate ? new Date(dueDate) : null,
        categoryId,
        tags: tags ? JSON.stringify(tags) : null,
      },
      include: {
        category: true,
      },
    });

    // 응답 시 tags 파싱
    const formattedTodo = {
      ...newTodo,
      tags: newTodo.tags ? JSON.parse(newTodo.tags) : [],
    };

    res.status(201).json(formattedTodo);
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT /api/todos/:id - 할일 수정
router.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, priority, dueDate, categoryId, tags } = req.body;

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
        completed,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        categoryId,
        tags: tags ? JSON.stringify(tags) : null,
      },
      include: {
        category: true,
      },
    });

    const formattedTodo = {
      ...updatedTodo,
      tags: updatedTodo.tags ? JSON.parse(updatedTodo.tags) : [],
    };

    res.json(formattedTodo);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE /api/todos/:id - 할일 삭제
router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.todo.delete({
      where: { id },
    });

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// ===================
// CATEGORIES API  
// ===================

// GET /api/categories - 모든 카테고리 조회
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'asc' },
    });

    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST /api/categories - 새 카테고리 생성
router.post('/categories', async (req, res) => {
  try {
    const { name, color } = req.body;

    const newCategory = await prisma.category.create({
      data: {
        name,
        color: color || 'blue',
      },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

export default router;