#!/bin/bash
# 간단한 프론트엔드/백엔드 구조로 마이그레이션

set -e

echo "🚀 Migrating to frontend/backend structure..."

# 1. 백업 생성
TIMESTAMP=$(date +"%Y%m%d_%H%M%S") 
cp -r . "../claude-todo-backup-$TIMESTAMP"
echo "✅ Backup created at ../claude-todo-backup-$TIMESTAMP"

# 2. 폴더 생성
mkdir -p frontend backend shared/types shared/utils

# 3. 프론트엔드 파일 이동
echo "📁 Moving frontend files..."
mv src/ frontend/
mv public/ frontend/
mv index.html frontend/
mv vite.config.ts frontend/
mv tailwind.config.js frontend/
mv postcss.config.js frontend/
cp tsconfig.app.json frontend/tsconfig.json

# 4. 공유 타입 분리
echo "🔗 Setting up shared types..."
if [ -d "frontend/src/types" ]; then
    cp -r frontend/src/types/* shared/types/
    rm -rf frontend/src/types
fi

# 5. 백엔드 구조 생성
echo "🔧 Creating backend structure..."
mkdir -p backend/src/{controllers,routes,middleware,services}
mkdir -p backend/prisma

# 6. package.json 파일 생성
echo "📦 Creating package.json files..."

# 기존 의존성 백업
cp package.json package.json.old

# 루트 package.json
cat > package.json << 'EOF'
{
  "name": "claude-todo",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["frontend", "backend"],
  "scripts": {
    "dev": "concurrently \"npm run frontend:dev\" \"npm run backend:dev\"",
    "frontend:dev": "cd frontend && npm run dev",
    "backend:dev": "cd backend && npm run dev", 
    "docker:up": "docker-compose -f docker-compose.dev.yml up -d",
    "docker:down": "docker-compose -f docker-compose.dev.yml down"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
EOF

# 프론트엔드 package.json (기존 의존성 유지)
node -e "
const old = require('./package.json.old');
const newPkg = {
  name: 'claude-todo-frontend',
  version: '1.0.0',
  type: 'module',
  scripts: {
    dev: 'vite --host 0.0.0.0',
    build: 'tsc -b && vite build',
    lint: 'eslint .',
    preview: 'vite preview'
  },
  dependencies: old.dependencies,
  devDependencies: old.devDependencies
};
require('fs').writeFileSync('frontend/package.json', JSON.stringify(newPkg, null, 2));
"

# 백엔드 package.json
cat > backend/package.json << 'EOF'
{
  "name": "claude-todo-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc", 
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "@prisma/client": "^5.15.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "tsx": "^4.7.0",
    "typescript": "^5.8.3",
    "prisma": "^5.15.0"
  }
}
EOF

# 7. CLAUDE.md 파일 생성
echo "📝 Creating CLAUDE.md files..."

# 루트 CLAUDE.md (기존 내용 + 구조 설명)
cp CLAUDE.md CLAUDE.md.old
cat CLAUDE.md.old > temp_claude.md
cat >> temp_claude.md << 'EOF'

---

## 🏗️ 프로젝트 구조 업데이트 (2025-08-10)

### 📁 폴더 구성
- `frontend/` - React 프론트엔드 개발 (포트 5173)
- `backend/` - Express 백엔드 개발 (포트 3001)
- `shared/` - 공통 타입 및 유틸리티

### 🚀 개발 명령어
```bash
npm run dev              # 전체 개발 환경 시작 (프론트+백엔드)
npm run frontend:dev     # 프론트엔드만 시작
npm run backend:dev      # 백엔드만 시작 (구현 후)
```

### 📝 CLAUDE.md 파일 위치
- `/CLAUDE.md` - 전체 프로젝트 가이드 (이 파일)
- `/frontend/CLAUDE.md` - 프론트엔드 개발 가이드  
- `/backend/CLAUDE.md` - 백엔드 개발 가이드

### 🔄 워크플로우 업데이트
1. **Notion**에서 작업 계획 확인
2. 해당 영역(`frontend/` 또는 `backend/`)에서 개발
3. 작업 완료 후 **Notion** 업데이트
4. **Git** 커밋 및 푸시
EOF
mv temp_claude.md CLAUDE.md

# 프론트엔드 CLAUDE.md
cat > frontend/CLAUDE.md << 'EOF'
# Frontend Development Guide

## 🎨 기술 스택
- React 18 + TypeScript
- Vite (개발 서버)
- Tailwind CSS
- 공유 타입: `../shared/types` 사용

## 🛠️ 개발 명령어
```bash
npm run dev      # 개발 서버 시작 (포트 5173)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
npm run preview  # 프로덕션 빌드 미리보기
```

## 🔗 백엔드 연동
- API Base URL: `http://localhost:3001/api`
- HTTP 클라이언트: Fetch API 또는 Axios
- 공유 타입 적극 활용

## 📁 소스 구조
```
frontend/src/
├── components/     # UI 컴포넌트
│   ├── ui/        # 재사용 가능한 기본 컴포넌트
│   └── features/  # 기능별 컴포넌트
├── pages/         # 페이지 컴포넌트
├── hooks/         # 커스텀 훅
├── contexts/      # React Context
└── utils/         # 프론트엔드 유틸리티
```

## 📝 개발 가이드라인
1. **컴포넌트 재사용**: `components/ui/` 기본 컴포넌트 적극 활용
2. **타입 안전성**: `../shared/types`의 공유 타입 사용
3. **상태 관리**: React Context + useState/useReducer 패턴
4. **스타일링**: Tailwind CSS 클래스 사용
5. **API 호출**: 에러 핸들링 및 로딩 상태 관리 필수

## 🔄 백엔드와의 협업
- API 스펙은 `../shared/types`에서 공유
- 백엔드 개발 완료 전까지는 목 데이터 활용
- 인증 토큰은 localStorage 또는 쿠키에 저장

---
*이 문서는 프론트엔드 개발자를 위한 가이드입니다.*
*전체 프로젝트 정보는 `/CLAUDE.md`를 참고하세요.*
EOF

# 백엔드 CLAUDE.md  
cat > backend/CLAUDE.md << 'EOF'
# Backend Development Guide

## 🔧 기술 스택
- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL (Docker)
- JWT 기반 인증
- Docker 컨테이너 환경

## 🛠️ 개발 명령어
```bash
npm run dev         # 개발 서버 시작 (포트 3001, tsx watch)
npm run build       # TypeScript 빌드
npm run start       # 프로덕션 서버 시작
```

## 🗄️ 데이터베이스 (구현 예정)
- PostgreSQL (Docker 컨테이너)
- Prisma ORM 사용
- 마이그레이션: `npx prisma migrate dev`
- Prisma Studio: `npx prisma studio`

## 🌐 API 엔드포인트 (계획)
```
인증
POST /api/auth/login     # 로그인
POST /api/auth/signup    # 회원가입
POST /api/auth/logout    # 로그아웃

할일 관리
GET    /api/todos        # 할일 목록 조회
POST   /api/todos        # 할일 생성
PUT    /api/todos/:id    # 할일 수정
DELETE /api/todos/:id    # 할일 삭제

카테고리
GET    /api/categories   # 카테고리 목록
POST   /api/categories   # 카테고리 생성
```

## 📁 소스 구조
```
backend/src/
├── controllers/    # 컨트롤러 (비즈니스 로직)
├── routes/        # 라우터 (엔드포인트 정의)
├── middleware/    # 미들웨어 (인증, 로깅 등)
├── services/      # 서비스 (데이터베이스 로직)
└── index.ts       # 서버 진입점
```

## 📝 개발 가이드라인
1. **타입 안전성**: `../shared/types`의 공유 타입 사용
2. **에러 핸들링**: 모든 엔드포인트에 적절한 에러 응답
3. **인증**: JWT 토큰 기반 인증 구현
4. **검증**: 입력 데이터 유효성 검사 필수
5. **로깅**: 개발/운영 환경별 로그 레벨 관리

## 🔄 프론트엔드와의 협업
- API 스펙은 `../shared/types`에서 공유
- CORS 설정으로 프론트엔드 연동
- 개발 시 프론트엔드 포트(5173) 허용

## 🐳 Docker 환경
- `docker-compose.dev.yml`로 PostgreSQL 실행
- 컨테이너 내에서 개발 서버 실행
- 볼륨 마운트로 실시간 코드 반영

---
*이 문서는 백엔드 개발자를 위한 가이드입니다.*
*전체 프로젝트 정보는 `/CLAUDE.md`를 참고하세요.*
EOF

# 8. shared 타입 설정
echo "🔗 Setting up shared types..."
cat > shared/types/index.ts << 'EOF'
// 기존 타입 정의들을 이곳으로 이동 예정
// 프론트엔드와 백엔드가 공유하는 타입 정의

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  categoryId?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface TodoFilters {
  status?: 'all' | 'active' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  tags?: string[];
  search?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
EOF

# 9. 프론트엔드에서 공유 타입 import 설정
echo "🔧 Updating frontend imports..."
if [ -f "frontend/src/components/features/TodoItem.tsx" ]; then
    sed -i '' 's/import.*from.*\.\.\/\.\.\/types/import { Todo } from "..\/..\/..\/shared\/types"/g' frontend/src/components/features/TodoItem.tsx
fi

# 10. 정리
echo "🧹 Cleaning up..."
rm -rf node_modules package-lock.json dist/
rm -f package.json.old CLAUDE.md.old

echo ""
echo "✅ 🎉 SIMPLE MIGRATION COMPLETED! 🎉"
echo ""
echo "📋 Next steps:"
echo "1. npm install"
echo "2. npm run dev"
echo ""
echo "📁 New structure:"
echo "├── frontend/ (React App - Port 5173)"
echo "├── backend/ (Express API - Port 3001)" 
echo "├── shared/ (Common Types & Utils)"
echo "└── CLAUDE.md files in each folder"
echo ""
echo "📝 Check the new CLAUDE.md files:"
echo "- /CLAUDE.md (Project overview)"
echo "- /frontend/CLAUDE.md (Frontend guide)"
echo "- /backend/CLAUDE.md (Backend guide)"
echo ""