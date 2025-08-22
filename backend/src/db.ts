import { PrismaClient } from '@prisma/client';

// Prisma 클라이언트 인스턴스 생성
export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // 개발 시 로깅 활성화
});

// 애플리케이션 종료 시 DB 연결 정리
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});