# Claude Todo Project - 작업 히스토리 관리 가이드

## 📋 Notion 기반 히스토리 관리

이 프로젝트는 **Notion MCP**를 통해 작업 히스토리를 관리합니다. 모든 작업 진행 상황과 계획은 Notion에서 체계적으로 추적됩니다.

### 🔗 Notion 루트 페이지
**메인 허브**: [📋 Claude Todo Project](https://www.notion.so/$NOTION_PROJECT_ROOT_ID)

## 📊 관리 구조

### 데이터베이스
1. **📊 Phases Database** - 개발 단계별 진행 상황
2. **✅ Tasks Database** - 세부 작업 추적 및 관리  
3. **📋 Daily Logs Database** - 일일 작업 기록 및 성과

### 페이지
- **📈 Progress Dashboard** - 전체 진행률 및 현황 요약
- **🔧 Tech Stack Tracker** - 기술 스택 적용 현황

## 🔄 작업 진행 시 수행해야 할 업데이트

### 1. 새로운 작업 시작 시
- **Tasks Database**에 새 작업 추가
- 우선순위, 태그, 예상 완료일 설정

### 2. 작업 완료 시
- **Tasks Database**에서 상태를 'Done'으로 변경
- 완료일 기록
- **Daily Logs Database**에 당일 성과 기록

### 3. Phase 완료 시
- **Phases Database**에서 진행률 100% 설정
- 완료일 기록 및 상태 변경
- **Progress Dashboard** 업데이트

### 4. 매일 작업 마감 시
- **Daily Logs Database**에 일일 로그 작성:
  - 작업 요약
  - 소요 시간
  - 주요 성과
  - 어려웠던 점
  - 다음 단계 계획

## 🛠️ Notion MCP 명령어 예시

```bash
# 현재 진행 상황 조회
mcp__notion__search("claude todo project progress")

# Tasks Database 확인
mcp__notion__fetch($NOTION_TASKS_DB_ID)

# 새 작업 추가
mcp__notion__notion-create-pages(
  parent: {"database_id": $NOTION_TASKS_DB_ID},
  properties: {"Task": "새로운 기능", "Phase": "Phase 2", "Status": "📝 Todo"}
)

# 일일 로그 추가
mcp__notion__notion-create-pages(
  parent: {"database_id": $NOTION_DAILY_LOGS_DB_ID},
  properties: {"Date": "2025-08-XX", "Work Summary": "작업 내용"}
)
```

## 🔐 환경변수 설정

### 📁 파일 구조
```
claude-todo/
├── .env.example          # 환경변수 템플릿 (Git 추적)  
├── .env                  # 실제 환경변수 (Git 무시)
└── CLAUDE.md            # 이 문서 (환경변수 참조)
```

### 🚀 초기 설정 방법
1. `.env.example`을 복사하여 `.env` 파일 생성:
   ```bash
   cp .env.example .env
   ```

2. `.env` 파일에 실제 Notion ID 값들 입력:
   ```bash
   # .env 파일 내용 
   NOTION_PROJECT_ROOT_ID=24bfdc52e94c81c1baa7e6ff2987725e
   NOTION_TASKS_DB_ID=c840dc861b0b4352aee4a388ff0d7f9b
   NOTION_DAILY_LOGS_DB_ID=437d707aed924b06aa2e1a89ce306b5f
   # ... 기타 ID들
   ```

### 🔒 보안 특징
- ✅ `.env` 파일은 `.gitignore`로 보호됨  
- ✅ `.env.example`은 템플릿만 제공 (실제 값 없음)
- ✅ CLAUDE.md는 환경변수 참조만 사용 ($VARIABLE_NAME)

### 💡 사용법
문서의 모든 Notion ID는 이제 환경변수로 참조됩니다:
- `$NOTION_PROJECT_ROOT_ID` - 메인 프로젝트 페이지
- `$NOTION_TASKS_DB_ID` - Tasks 데이터베이스  
- `$NOTION_DAILY_LOGS_DB_ID` - Daily Logs 데이터베이스

## 📈 프로젝트 현황 (2025-08-23 기준)

### 완료된 단계
- ✅ **Phase 1**: 기반 구축 (100% 완료)
  - 프로젝트 초기 설정
  - 기본 UI 컴포넌트 라이브러리
  - 인증 시스템 구현
  - 기본 CRUD 기능

- ✅ **Phase 2**: 핵심 기능 (100% 완료)
  - 할일 관리 고도화
  - 카테고리/태그 시스템 (8색상 지원)
  - 우선순위 및 마감일 관리
  - 고급 검색 및 필터링
  - 백엔드 API 완전 구축
  - Docker 컨테이너화 완료

- ✅ **Phase 5**: 테스트 & 배포 (100% 완료)
  - E2E 테스트 (Playwright)
  - Docker 멀티 스테이지 빌드
  - 프로덕션 배포 환경 구축
  - 83% 테스트 성공률

### 현재 진행 단계
- 🔄 **Phase 3**: 사용자 경험 향상 (진행 예정)
  - 애니메이션 & 트랜지션
  - 드래그 앤 드롭 기능
  - 다크/라이트 모드
  - 키보드 단축키 & 접근성

### 대기 단계
- ⏳ **Phase 4**: 고급 기능 (대기중)
  - CI/CD 파이프라인
  - 성능 모니터링
  - 실시간 협업 기능

## 🔧 기술 스택 현황

### ✅ 완료 (프로덕션 준비)
**Frontend:**
- React 18 + TypeScript + Vite
- Tailwind CSS
- ESLint + Prettier
- 완전한 타입 안전성

**Backend:**
- Express + TypeScript
- Prisma ORM + SQLite
- RESTful API (8개 엔드포인트)
- CORS 설정 완료

**DevOps & Testing:**
- Docker 멀티 스테이지 빌드
- docker-compose 오케스트레이션
- Nginx 리버스 프록시
- Playwright E2E 테스트
- 헬스체크 & 모니터링

### 📝 Phase 3 예정 추가
**UX Enhancement Libraries:**
- Framer Motion (애니메이션)
- React DnD (드래그앤드롭)
- React Hotkeys Hook (키보드 단축키)
- Tailwind Dark Mode (다크모드)

### 🚀 현재 접속 가능
- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:3001/api
- **헬스체크**: http://localhost:3001/health

## 🔄 로컬 개발 워크플로우

### 📁 도구별 역할
- **GitHub**: 코드 버전 관리 및 백업 (`https://github.com/poriz/claude-todo`)
- **Notion**: 작업 진행 상황 및 히스토리 관리 (이 워크스페이스)  
- **Claude Code**: 로컬 개발 환경 및 두 도구 연동

### 🔄 작업 프로세스
1. **Claude Code**로 개발 작업 수행
2. **Docker 개발 환경**에서 테스트 및 검증
3. **Git**으로 코드 변경사항 커밋/푸시  
4. **Notion**에 작업 진행 상황 수동 업데이트
5. **Daily Logs**에 작업 내용 기록

### 📝 연동 관리 가이드
- 코드 변경 후 반드시 **Notion Tasks** 상태 업데이트
- Phase 완료 시 **GitHub**에 태그 생성 고려
- 주요 커밋 시 **Daily Logs** 작성
- 브랜치 전략: `main`(프로덕션), `feature/*`(새 기능)

### 🏷️ 커밋 컨벤션
```
feat: 새 기능 추가
fix: 버그 수정  
docs: 문서 수정
style: 코드 스타일 변경
refactor: 리팩토링
test: 테스트 추가/수정
```

## 🐳 Docker 개발 환경 워크플로우

### 📋 Docker 환경 사용 이유
- **일관된 개발 환경**: 모든 개발자가 동일한 Node.js, 의존성 버전 사용
- **Hot Reload 지원**: 소스 코드 변경 시 실시간 반영
- **서비스 간 네트워킹**: 프론트엔드-백엔드 연동 자동화
- **테스트 환경 격리**: Playwright MCP 테스트 시 안정적인 환경 제공

### 🚀 Docker 개발 환경 시작
```bash
# 개발 환경 컨테이너 빌드 및 실행
docker-compose -f docker-compose.dev.yml up --build

# 백그라운드 실행
docker-compose -f docker-compose.dev.yml up -d --build

# 특정 서비스만 실행
docker-compose -f docker-compose.dev.yml up frontend-dev
```

### 📊 서비스 구성
- **frontend-dev**: http://localhost:5173 (Vite 개발 서버)
- **backend-dev**: http://localhost:3001 (Express API 서버)
- **Hot Reload**: `./frontend/src` → `/app/src` 볼륨 매핑

### 🔧 개발 중 Docker 관리
```bash
# 컨테이너 상태 확인
docker-compose -f docker-compose.dev.yml ps

# 로그 확인
docker-compose -f docker-compose.dev.yml logs -f frontend-dev
docker-compose -f docker-compose.dev.yml logs -f backend-dev

# 컨테이너 재시작
docker-compose -f docker-compose.dev.yml restart frontend-dev

# 환경 종료
docker-compose -f docker-compose.dev.yml down

# 컨테이너 및 볼륨 완전 삭제
docker-compose -f docker-compose.dev.yml down -v
```

### 🧪 Playwright MCP + Docker 테스트 워크플로우
```bash
# 1. Docker 개발 환경 실행
docker-compose -f docker-compose.dev.yml up -d --build

# 2. 컨테이너 헬스체크 대기
docker-compose -f docker-compose.dev.yml logs -f backend-dev | grep "Server is running"

# 3. Playwright MCP 브라우저 테스트
mcp__playwright__browser_navigate("http://localhost:5173")
mcp__playwright__browser_snapshot()

# 4. 테스트 완료 후 정리
docker-compose -f docker-compose.dev.yml down
```

### 💡 Docker 환경 장점
- **모듈 의존성 충돌 방지**: 로컬 node_modules와 격리
- **Vite 캐시 일관성**: 컨테이너 내 .vite 폴더 관리
- **포트 충돌 해결**: 컨테이너 네트워킹으로 안정적 연결
- **프로덕션 환경 근사**: docker-compose.yml과 유사한 구조

### ⚠️ 주의사항
- 볼륨 매핑된 파일만 실시간 반영됨 (package.json 변경 시 재빌드 필요)
- 컨테이너 재시작 시 node_modules 재설치 과정 시간 소요
- 로컬 포트 5173, 3001 사용 중인지 확인 필요

---

## 🎯 Phase 3: 사용자 경험 향상 - 상세 계획

### 📋 개발 워크플로우 (Context7 MCP + TDD + Playwright MCP 방식)
**Context7 MCP 사전 조사 → 기능 구현 → Playwright MCP 자동 테스트 → 검증 → 다음 단계**

### 🏗️ 7단계 개발 계획

#### 🥇 1단계: 애니메이션 인프라 구축 (1시간)
- Framer Motion 설치 & 기본 설정
- 공통 애니메이션 컴포넌트 생성
- 애니메이션 미리셋 정의
- **자동 테스트**: Playwright MCP로 애니메이션 렌더링 및 인터랙션 검증

#### 🎬 2단계: 기본 Todo 애니메이션 구현 (2-3시간)  
- Todo 추가/삭제 애니메이션 (Slide-in, Fade-out)
- 체크박스 상태 변경 애니메이션
- 로딩 스피너 고도화
- **자동 테스트**: Playwright MCP로 Todo 애니메이션 및 상태 변경 검증

#### 🌙 3단계: 다크모드 인프라 구축 (1-2시간)
- 테마 Context 구현 + localStorage 저장
- Tailwind 다크모드 설정
- 헤더 토글 버튼 추가
- **자동 테스트**: Playwright MCP로 테마 전환 기능 및 localStorage 저장 검증

#### 🖱️ 4단계: 드래그앤드롭 기본 기능 (2-3시간)
- React DnD 설치 & 기본 설정
- Todo 리스트 내 순서 변경
- 시각적 피드백 (드래그 상태, 드롭 존)
- **자동 테스트**: Playwright MCP로 드래그앤드롭 인터랙션 검증

#### 🔌 5단계: 드래그앤드롭 백엔드 연동 (1-2시간)
- 백엔드 API 엔드포인트 추가 (순서 정보 저장/조회)
- 에러 핸들링 구현
- **자동 테스트**: Playwright MCP로 백엔드 연동 및 데이터 영속성 검증

#### ⌨️ 6단계: 키보드 단축키 & 접근성 (1시간)
- 전역 단축키 구현 (Ctrl+N, Ctrl+F, Esc)
- ARIA 라벨 완성, 키보드 탐색 최적화
- **자동 테스트**: Playwright MCP로 키보드 단축키 및 접근성 검증

#### 🧪 7단계: 최종 테스트 및 정리 (1시간)
- E2E 테스트 업데이트 및 실행
- 성능 최적화 및 코드 정리
- **통합 테스트**: Playwright MCP로 E2E 시나리오 검증

### ⏱️ **총 예상 시간: 9-13시간**

### 🎯 **완료 후 기대 효과**
- 시각적 매력도 50% 향상
- 사용자 참여도 증가  
- 프로덕션급 품질 완성
- 포트폴리오 완성도 극대화

---

## 💡 중요 지침

1. **모든 작업 전에** Notion에서 현재 상황을 확인하세요
2. **작업 시작 시** Tasks Database에 작업을 추가하거나 상태를 업데이트하세요
3. **작업 완료 후** 반드시 Notion에 결과를 기록하세요
4. **매일 작업 마감 시** Daily Logs에 일일 요약을 작성하세요
5. **Phase 전환 시** Progress Dashboard를 업데이트하세요
6. **Phase 3 개발 시**: Context7 MCP 사전 조사 → 기능 구현 → Playwright MCP 자동 테스트 → 검증 반복

## 🔍 Context7 MCP 사전 조사 워크플로우

### 📋 **필수 사전 조사 프로세스**

#### 🥇 **0단계: 라이브러리 사전 조사 (모든 구현 전 필수)**
모든 라이브러리 구현 전에 **Context7 MCP**를 통해 최신 정보를 확인하고 올바른 사용법을 학습한 후 개발을 진행합니다.

##### **사전 조사 필수 항목**
1. **라이브러리 최신 버전 확인**
2. **API 변경사항 및 Breaking Changes**
3. **TypeScript 타입 정의 변경사항**
4. **권장 사용 패턴 및 Best Practices**
5. **호환성 이슈 및 해결방안**

#### 🔄 **Context7 MCP 조사 절차 (버전 명시 필수)**

##### **1. 기본 라이브러리 정보 수집**
```typescript
// Context7 MCP를 통해 다음 정보 수집 (버전 명시 필수):
// - 라이브러리명: framer-motion
// - 현재 프로젝트에서 사용 중인 정확한 버전 (예: 11.5.4)
// - 최신 안정 버전 및 주요 변경사항
// - 특정 버전의 TypeScript 지원 현황
// - 해당 버전의 Breaking Changes 목록
```

##### **2. 버전별 구현 패턴 및 예제 조사**
```typescript
// Context7 MCP로 확인할 내용 (버전 기반):
// - 특정 버전(예: framer-motion@11.x)에서 권장하는 컴포넌트 작성 방식
// - 해당 버전의 TypeScript 인터페이스 및 타입 정의
// - 버전별 성능 최적화 방안
// - 특정 버전에서 발생하는 일반적인 에러 케이스 및 해결책
```

##### **3. 버전 호환성 및 의존성 확인**
```typescript
// Context7 MCP로 검증할 사항 (버전 기반):
// - 특정 버전이 React 18과의 호환성 여부
// - 해당 버전이 Vite 5.x와의 호환성 여부  
// - 특정 버전이 TypeScript 5.x와의 호환성 여부
// - 해당 버전과 다른 라이브러리와의 충돌 가능성
```

#### ✅ **사전 조사 체크리스트**

##### **라이브러리별 확인 사항**
- [ ] **Framer Motion**: 최신 API, 타입 정의, 성능 최적화
- [ ] **React DnD**: 드래그앤드롭 구현 패턴, 터치 지원
- [ ] **React Hotkeys Hook**: 키보드 이벤트 처리, 접근성
- [ ] **Tailwind CSS Dark Mode**: 다크모드 구현 방식

##### **공통 확인 사항**
- [ ] **Breaking Changes**: 주요 API 변경사항
- [ ] **Migration Guide**: 기존 코드 마이그레이션 방법
- [ ] **Performance Impact**: 성능에 미치는 영향
- [ ] **Bundle Size**: 번들 크기 영향도

#### 🚨 **사전 조사 없이 진행 금지**

##### **금지 사항**
❌ **절대 하지 말 것**:
- 라이브러리 문서 확인 없이 바로 구현
- 인터넷 예제 코드 그대로 복사
- 타입 에러 발생 시 임시방편으로 any 사용
- 버전 충돌 발생 시 강제 업데이트

##### **문제 발생 시 대응**
🔧 **올바른 접근**:
1. Context7 MCP로 재조사 (구체적 버전 명시)
2. 공식 문서에서 해당 버전의 올바른 사용법 확인
3. 타입 안전성을 보장하는 방식으로 구현
4. 필요시 라이브러리 버전 조정 및 requirements.txt 업데이트
5. requirements.txt에 변경된 버전 및 이유 기록

#### 📊 **사전 조사 보고서 형식 (버전 명시 필수)**

```
## 🔍 [라이브러리명@버전] Context7 MCP 사전 조사 결과

### 📦 **라이브러리 정보**
- **타겟 버전**: X.X.X (구체적 버전 명시)
- **최신 안정 버전**: Y.Y.Y  
- **버전간 주요 변경사항**: [X.X.X에서 Y.Y.Y로의 Breaking Changes]
- **호환성 매트릭스**: React 18 + Vite 5.x + TypeScript 5.x

### 💡 **해당 버전 권장 구현 방식**
- **TypeScript 타입**: [X.X.X 버전의 올바른 타입 정의]
- **컴포넌트 패턴**: [X.X.X 버전의 권장 패턴]
- **성능 최적화**: [X.X.X 버전의 최적화 방안]

### ⚠️ **주의사항**
- **X.X.X 버전 특정 이슈**: [발견된 이슈들]
- **해결 방안**: [구체적 해결책]
- **requirements.txt 반영 필요**: [변경사항 있을 시]

### ✅ **구현 준비 완료**
- [ ] X.X.X 버전 타입 정의 확인
- [ ] X.X.X 버전 예제 코드 검증  
- [ ] 호환성 테스트 완료
- [ ] requirements.txt 업데이트 필요 여부 확인
```

### 💡 **Context7 MCP 활용 팁 (버전 명시)**
1. **구체적 질문**: "framer-motion@11.5.4에서 MotionProps 사용법"
2. **코드 예제 요청**: "React 18 + TypeScript 5.x + framer-motion@11.x 컴포넌트 예제"
3. **문제 해결**: "framer-motion@11.5.4 HTMLMotionProps 타입 에러 해결"
4. **성능 최적화**: "framer-motion@11.x 애니메이션 성능 최적화 방법"
5. **버전 비교**: "framer-motion@10.x vs @11.x 주요 차이점 및 마이그레이션"

## 📋 requirements.txt 관리 지침

### 🎯 **requirements.txt 목적**
- 라이브러리 버전 변경 이력 추적
- 버전 변경 이유 및 Breaking Changes 기록
- 팀원들과의 버전 동기화
- 문제 발생 시 롤백 참고 자료

### 📝 **requirements.txt 형식**
```
# Claude Todo Project - Library Version Requirements
# Last Updated: 2025-08-23

## Frontend Dependencies
framer-motion@11.5.4
# Reason: Animation infrastructure for Phase 3
# Changed from: N/A (new installation)
# Breaking Changes: None
# Compatible: React 18 + TypeScript 5.x + Vite 5.x

react-dnd@16.0.1
# Reason: Drag and drop functionality for Phase 3
# Changed from: N/A (new installation)  
# Breaking Changes: None
# Compatible: React 18 + TypeScript 5.x

react-hotkeys-hook@4.4.4
# Reason: Keyboard shortcuts for Phase 3
# Changed from: N/A (new installation)
# Breaking Changes: None
# Compatible: React 18 + TypeScript 5.x

## Backend Dependencies
# (No changes required for Phase 3)

## Update History
# 2025-08-23: Initial Phase 3 library versions defined
```

### 🔄 **requirements.txt 업데이트 절차**
1. **라이브러리 버전 변경 전**: Context7 MCP로 사전 조사
2. **변경 후**: requirements.txt에 변경사항 기록
3. **필수 기록 항목**:
   - 변경된 버전 (From → To)
   - 변경 이유
   - Breaking Changes 여부
   - 호환성 확인 결과
4. **Git 커밋 시**: requirements.txt도 함께 커밋

## 🧪 Playwright MCP 테스트 워크플로우

### 📋 **자동 테스트 표준 프로세스**

#### 🔄 **각 단계별 테스트 흐름**
1. **기능 구현 완료** 후 즉시 테스트 실행
2. **mcp__playwright__browser_navigate** → 개발 서버 접속
3. **mcp__playwright__browser_snapshot** → 페이지 상태 캡처
4. **상호작용 테스트** → 클릭, 호버, 키보드 입력 등
5. **결과 검증** → 예상 동작과 실제 결과 비교
6. **다음 단계 진행** 또는 **버그 수정**

#### 🎯 **테스트 명령어 표준화**

##### **기본 테스트 시작**
```typescript
// 1. 브라우저에서 개발 서버 접속
mcp__playwright__browser_navigate("http://localhost:5173")

// 2. 페이지 로드 완료 대기
mcp__playwright__browser_wait_for(time: 2)

// 3. 현재 페이지 상태 캡처 
mcp__playwright__browser_snapshot()
```

##### **애니메이션 컴포넌트 테스트**
```typescript
// 4. 특정 요소 존재 확인
mcp__playwright__browser_click(
  element: "테스트 버튼",
  ref: "button_reference"
)

// 5. 애니메이션 완료 대기
mcp__playwright__browser_wait_for(time: 1)

// 6. 결과 상태 스냅샷
mcp__playwright__browser_snapshot()
```

##### **인터랙션 테스트**
```typescript
// 7. 사용자 입력 시뮬레이션
mcp__playwright__browser_type(
  element: "입력 필드",
  ref: "input_reference", 
  text: "테스트 데이터"
)

// 8. 키보드 이벤트 테스트
mcp__playwright__browser_press_key(key: "Enter")
```

#### ✅ **성공 기준 정의**

##### **필수 통과 조건**
1. **렌더링 테스트** - 모든 컴포넌트가 정상 표시됨
2. **인터랙션 테스트** - 버튼 클릭, 호버 등이 정상 반응
3. **상태 변경 테스트** - 데이터 추가/수정/삭제가 UI에 반영
4. **애니메이션 테스트** - 애니메이션이 끊김 없이 실행
5. **에러 없음** - 콘솔에 JavaScript 에러가 없음

##### **품질 기준**
- **응답 시간**: 각 인터랙션이 2초 이내 완료
- **시각적 일관성**: 애니메이션이 자연스럽게 동작
- **접근성**: 키보드 탐색이 순서대로 가능

#### 🚨 **실패 시 대응 방안**

##### **테스트 실패 분류**
1. **렌더링 실패** → 컴포넌트 코드 재검토
2. **인터랙션 실패** → 이벤트 핸들러 확인  
3. **애니메이션 실패** → Framer Motion 설정 점검
4. **데이터 실패** → API 연동 상태 확인

##### **디버깅 절차**
```typescript
// 1. 콘솔 메시지 확인
mcp__playwright__browser_console_messages()

// 2. 네트워크 요청 확인  
mcp__playwright__browser_network_requests()

// 3. 스크린샷으로 현재 상태 기록
mcp__playwright__browser_take_screenshot(
  filename: "debug_screenshot.png"
)
```

#### 📊 **테스트 보고서 형식**

```
## 🧪 [단계명] 테스트 결과

### ✅ 통과한 테스트
- [ ] 렌더링 테스트 (5/5)
- [ ] 인터랙션 테스트 (4/4) 
- [ ] 상태 변경 테스트 (3/3)

### ❌ 실패한 테스트  
- [ ] 애니메이션 지연 (1초 초과)

### 🔧 수정 사항
- Framer Motion duration 0.3초로 단축

### 📈 다음 단계
- 1-3단계 애니메이션 미리셋 정의 진행
```

### 💡 **자동화 활용 팁**
1. **병렬 테스트**: 여러 컴포넌트 동시 테스트 가능
2. **스냅샷 비교**: 시각적 회귀 테스트 자동화
3. **성능 측정**: 로딩 시간 및 렌더링 속도 모니터링
4. **크로스 브라우저**: 필요시 Firefox, Safari 추가 테스트

## 🛡️ Notion API 에러 예방 가이드

### 📋 주요 에러 유형
1. **Select 필드 제약 위반** - 미리 정의된 옵션만 사용 가능
2. **문자열 매칭 실패** - 정확한 텍스트를 찾지 못함  
3. **데이터 타입 불일치** - 단일값 필드에 복수값 입력 시도

### 🔧 필수 사전 작업
```typescript
// 작업 전에 항상 데이터베이스 스키마 확인
const database = await mcp__notion__fetch($NOTION_TASKS_DB_ID);
console.log("Available options:", database.properties);
```

### ✅ Tasks Database 안전한 값들
```typescript
const SAFE_VALUES = {
  "Tags": ["Frontend", "Backend", "UI/UX", "Database", "Testing", "Bug Fix", "Feature"],
  "Priority": ["Low", "Medium", "High"], 
  "Status": ["📝 Todo", "🔄 In Progress", "✅ Done"],
  "Phase": ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5"],
  "Tasks Completed": ["Setup", "Development", "Testing", "Bug Fix", "Documentation", "Research"]
};
```

### 🔒 Daily Logs Database 안전한 값들
```typescript
const DAILY_LOGS_SAFE_VALUES = {
  "Phase": ["Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5"],
  "Tasks Completed": ["Setup", "Development", "Testing", "Bug Fix", "Documentation", "Research"]
};
```

### 📝 안전한 페이지 업데이트 방법
```typescript
// ❌ 위험한 방법 - 복잡한 문자열 매칭
"selection_with_ellipsis": "- **프로젝트 경로**: /Users/jangtaesu/claude-todo"

// ✅ 안전한 방법 - 간단하고 고유한 문자열
"selection_with_ellipsis": "로컬 경로...claude-todo"

// ✅ 더 안전한 방법 - append 사용
"command": "insert_content_after"  // replace 대신 insert 사용
```

### 🚨 에러 발생 시 대응 방법
```typescript
// 1. Select 필드 에러 시 → 기본값 사용
"Tags": "Feature"  // 항상 유효한 기본값

// 2. 문자열 매칭 실패 시 → 더 간단한 문자열로 재시도
// 3. 복수값 에러 시 → 단일값으로 변경
"Tasks Completed": "Development"  // 하나만 선택

// 4. 모든 에러 공통 → 필수 필드만으로 최소 생성
const minimalData = {
  "Task": "작업명",  // 필수 필드만 포함
  "Status": "📝 Todo",
  "Tags": "Feature"
};
```

### 💡 Best Practices
1. **항상 기존 옵션 사용**: 새로운 Select 값 생성 불가
2. **간단한 문자열 매칭**: 특수문자, 긴 문장 피하기
3. **에러 핸들링 필수**: try-catch로 안전장치 구비
4. **최소 필드로 시작**: 복잡한 데이터는 단계별로 추가

## 🔐 민감한 정보 관리 가이드

### 🚨 보안 위험 요소들
1. **API 키 및 토큰** - Notion API 토큰, GitHub 토큰 등
2. **데이터베이스 ID** - Notion 페이지/데이터베이스 고유 식별자
3. **워크스페이스 정보** - 조직 내부 정보, 사용자 ID
4. **접근 권한** - 특정 리소스에 대한 권한 정보

### 🛡️ 보안 대책

#### 1. 환경변수 활용
```bash
# ✅ 올바른 방법 - .env 파일 사용
NOTION_API_TOKEN=secret_xxx
NOTION_PROJECT_ROOT_ID=page_id_xxx

# ❌ 위험한 방법 - 코드에 하드코딩  
const token = "secret_xxx";  // Git에 노출됨!
```

#### 2. 파일 보호 설정
```gitignore
# .gitignore 필수 항목들
.env*           # 모든 환경변수 파일
!.env.example   # 템플릿은 예외
*.key           # 키 파일들
config/secrets/ # 비밀 설정 폴더
```

#### 3. Git 히스토리 정리
```bash
# 이미 커밋된 민감 정보 제거 (주의!)
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch path/to/sensitive/file' \
--prune-empty --tag-name-filter cat -- --all
```

### 📋 체크리스트

#### 🔍 커밋 전 검사사항
- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는가?
- [ ] 코드에 하드코딩된 ID/토큰이 없는가?  
- [ ] 로그 파일에 민감 정보가 출력되지 않는가?
- [ ] 주석에 실제 값들이 포함되지 않았는가?

#### 🚀 배포 전 검사사항  
- [ ] 프로덕션 환경변수가 별도로 설정되어 있는가?
- [ ] 개발용 ID와 프로덕션용 ID가 분리되어 있는가?
- [ ] API 키가 최소 권한으로 설정되어 있는가?
- [ ] 접근 로그 모니터링이 설정되어 있는가?

### 🎯 프로젝트별 적용사항

#### Notion Integration
- ✅ 모든 페이지/DB ID → 환경변수 처리 완료
- ✅ API 토큰 → MCP 설정으로 관리
- ✅ 워크스페이스 정보 → 로컬 설정에서만 관리

#### GitHub Integration  
- ✅ 레포지토리 URL → 공개 정보이므로 문서에 기록 가능
- ⚠️ Personal Access Token → 환경변수 처리 필요
- ⚠️ Webhook Secret → 별도 보안 저장소 관리 필요

### 💡 모범 사례
1. **계층별 보안**: 개발/스테이징/프로덕션 환경 분리
2. **최소 권한 원칙**: 필요한 최소한의 권한만 부여  
3. **정기적 로테이션**: API 키 주기적 갱신
4. **모니터링**: 비정상적인 접근 패턴 감지
5. **백업 계획**: 키 분실 시 복구 방안 수립

---

이 가이드를 따라 체계적인 프로젝트 관리를 유지하세요.

---
*마지막 업데이트: 2025-08-10 (Notion API 에러 예방 가이드 추가)*
*Notion 워크스페이스: claude code*
- to memorize