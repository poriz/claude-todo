# 백엔드 Dockerfile
FROM node:18-alpine

# 필요한 의존성 설치 (OpenSSL, curl 포함)
RUN apk add --no-cache openssl openssl-dev curl

# 작업 디렉토리 설정
WORKDIR /app

# package files 복사 (캐싱 최적화)
COPY package*.json ./
COPY tsconfig.json ./

# 의존성 설치
RUN npm install --only=production && npm cache clean --force

# Prisma 설치 (개발 의존성이지만 필요)
RUN npm install prisma @prisma/client

# 소스 코드 복사
COPY src/ ./src/
COPY prisma/ ./prisma/

# Prisma 클라이언트 생성
RUN npx prisma generate

# TypeScript 빌드
RUN npm install -g typescript tsx
RUN npm run build || tsc

# 데이터베이스 디렉토리 생성 (SQLite용)
RUN mkdir -p /app/data

# 포트 노출
EXPOSE 3001

# 환경변수 설정
ENV NODE_ENV=production
ENV DATABASE_URL="file:./data/prod.db"

# 헬스체크 추가
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# 애플리케이션 실행
CMD ["npm", "start"]