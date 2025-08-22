import { prisma } from './db.js';

async function seed() {
  console.log('🌱 Seeding database...');

  // 기본 카테고리 생성
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        id: 'work',
        name: '업무',
        color: 'blue',
      },
    }),
    prisma.category.create({
      data: {
        id: 'personal',
        name: '개인',
        color: 'green',
      },
    }),
    prisma.category.create({
      data: {
        id: 'study',
        name: '학습',
        color: 'purple',
      },
    }),
    prisma.category.create({
      data: {
        id: 'shopping',
        name: '쇼핑',
        color: 'orange',
      },
    }),
  ]);

  console.log('✅ Created categories:', categories.length);

  // 샘플 할일 생성
  const sampleTodos = await Promise.all([
    prisma.todo.create({
      data: {
        title: '백엔드 API 완성하기',
        description: 'Express + Prisma로 TODO API 구현',
        priority: 'high',
        categoryId: 'work',
        tags: JSON.stringify(['Backend', 'TypeScript']),
      },
    }),
    prisma.todo.create({
      data: {
        title: '장보기',
        description: '우유, 빵, 계란 사기',
        priority: 'medium',
        categoryId: 'personal',
        tags: JSON.stringify(['일상']),
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 내일
      },
    }),
  ]);

  console.log('✅ Created todos:', sampleTodos.length);
  console.log('🎉 Seeding completed!');
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });