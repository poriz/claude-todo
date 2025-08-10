# 📋 Claude Todo

> Modern Todo Application built with React + TypeScript + Vite

## 🎯 프로젝트 개요

Claude Todo는 모던한 기술 스택을 활용한 완성도 높은 할일 관리 애플리케이션입니다. 
단순한 CRUD를 넘어서 사용자 경험, 성능, 접근성을 모두 고려한 풀스택 프로젝트입니다.

### ✨ 주요 특징
- 🔐 **완전한 인증 시스템** - 로그인/회원가입/세션 관리
- 📝 **Todo CRUD** - 생성/수정/삭제/완료 토글
- 🏷️ **태그 시스템** - 할일 분류 및 관리
- ⚡ **실시간 검색** - 즉시 반응하는 필터링
- 📱 **반응형 디자인** - 모바일/데스크톱 최적화
- 🎨 **모던 UI/UX** - Tailwind CSS 기반 깔끔한 디자인

## 🚀 시작하기

### 개발 환경 실행
```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 브라우저에서 http://localhost:5173 접속
```

### 테스트 계정
- **이메일**: test@example.com
- **비밀번호**: password123

## 🛠️ 기술 스택

### Frontend
- **React 18** - 최신 React 기능 활용
- **TypeScript** - 타입 안전성 보장
- **Vite** - 빠른 개발 서버 및 빌드
- **Tailwind CSS** - 효율적인 스타일링

### 개발 도구
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포매팅
- **Git** - 버전 관리

### 예정 기술 스택
- **Backend**: Node.js + Express/Fastify
- **Database**: PostgreSQL + Prisma ORM
- **Testing**: Vitest + Testing Library + Playwright
- **Deployment**: Vercel + Railway

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 컴포넌트
│   ├── ui/             # 기본 UI 컴포넌트
│   └── features/       # 기능별 컴포넌트
├── contexts/           # React Context
├── hooks/              # 커스텀 훅
├── pages/              # 페이지 컴포넌트
├── types/              # TypeScript 타입 정의
└── utils/              # 유틸리티 함수
```

## 📊 개발 진행 상황

### ✅ Phase 1: 기반 구축 (완료)
- [x] 프로젝트 초기 설정
- [x] 기본 UI 컴포넌트 라이브러리
- [x] 인증 시스템 구현
- [x] Todo CRUD 기능 완성

### 🔄 Phase 2: 핵심 기능 (진행 중)
- [ ] 할일 관리 고도화
- [ ] 카테고리/태그 시스템 확장
- [ ] 우선순위 및 마감일 관리
- [ ] 실시간 동기화

### ⏳ Phase 3: 사용자 경험 향상
- [ ] 드래그 앤 드롭 기능
- [ ] 키보드 단축키 지원
- [ ] 다크/라이트 모드
- [ ] 애니메이션 및 마이크로 인터랙션

### ⏳ Phase 4: 고급 기능
- [ ] 데이터 내보내기/가져오기
- [ ] 협업 기능 (공유 할일 목록)
- [ ] 알림 시스템
- [ ] PWA 기능

### ⏳ Phase 5: 테스트 & 배포
- [ ] 단위/통합/E2E 테스트
- [ ] 성능 최적화
- [ ] 접근성 검증
- [ ] CI/CD 파이프라인 구축

## 📈 프로젝트 관리

이 프로젝트는 **Notion**을 통해 체계적으로 관리됩니다:
- 📊 **Phase별 진행 현황** 추적
- ✅ **세부 작업** 관리
- 📋 **일일 작업 로그** 기록
- 🔧 **기술 스택** 적용 현황

자세한 내용은 [CLAUDE.md](./CLAUDE.md)를 참고하세요.

## 🤝 기여 가이드

1. 이 저장소를 Fork합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 제공됩니다.

---

**개발 기간**: 2025.08.06 ~ 2025.09.13 (6주)  
**현재 진행률**: Phase 1 완료 (17%)  
**마지막 업데이트**: 2025-08-10

> 💡 **Claude Code**로 개발된 프로젝트입니다. 
> 체계적인 계획과 단계별 구현을 통해 완성도 높은 웹 애플리케이션을 목표로 합니다.