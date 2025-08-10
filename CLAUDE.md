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

## 📈 프로젝트 현황 (2025-08-10 기준)

### 완료된 단계
- ✅ **Phase 1**: 기반 구축 (100% 완료)
  - 프로젝트 초기 설정
  - 기본 UI 컴포넌트 라이브러리
  - 인증 시스템 구현
  - 기본 CRUD 기능

### 현재 진행 단계
- 🔄 **Phase 2**: 핵심 기능 (0% 진행)
  - 할일 관리 고도화
  - 카테고리/태그 시스템
  - 우선순위 및 마감일 관리
  - 검색 및 필터링

## 🔧 기술 스택 현황

### ✅ 완료
- React 18 + TypeScript
- Vite 개발 환경
- Tailwind CSS
- ESLint + Prettier

### 📝 예정
- 백엔드 API 구현
- 데이터베이스 연동
- 테스트 프레임워크
- 배포 파이프라인

## 🔄 로컬 개발 워크플로우

### 📁 도구별 역할
- **GitHub**: 코드 버전 관리 및 백업 (`https://github.com/poriz/claude-todo`)
- **Notion**: 작업 진행 상황 및 히스토리 관리 (이 워크스페이스)  
- **Claude Code**: 로컬 개발 환경 및 두 도구 연동

### 🔄 작업 프로세스
1. **Claude Code**로 개발 작업 수행
2. **Git**으로 코드 변경사항 커밋/푸시  
3. **Notion**에 작업 진행 상황 수동 업데이트
4. **Daily Logs**에 작업 내용 기록

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

---

## 💡 중요 지침

1. **모든 작업 전에** Notion에서 현재 상황을 확인하세요
2. **작업 시작 시** Tasks Database에 작업을 추가하거나 상태를 업데이트하세요
3. **작업 완료 후** 반드시 Notion에 결과를 기록하세요
4. **매일 작업 마감 시** Daily Logs에 일일 요약을 작성하세요
5. **Phase 전환 시** Progress Dashboard를 업데이트하세요

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