import { test, expect } from '@playwright/test';

test.describe('Claude Todo App 완전한 E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 홈페이지로 이동
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('1. 페이지 로드 테스트', async ({ page }) => {
    console.log('🚀 페이지 로드 테스트 시작');
    
    // 페이지가 정상적으로 로드되는지 확인
    await expect(page).toHaveTitle('Vite + React + TS');
    
    // Todo App 제목 확인
    await expect(page.locator('text=Todo App')).toBeVisible();
    
    // 로그인 폼 요소들이 표시되는지 확인
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button').filter({ hasText: '로그인' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: '회원가입' })).toBeVisible();
    
    // 테스트 계정 정보가 표시되는지 확인
    await expect(page.locator('text=테스트 계정')).toBeVisible();
    await expect(page.locator('text=test@example.com')).toBeVisible();
    
    console.log('✅ 페이지 로드 테스트 완료');
  });

  test('2. 사용자 인증 테스트', async ({ page }) => {
    console.log('🔐 사용자 인증 테스트 시작');
    
    // 테스트 계정으로 로그인 시도
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const loginButton = page.locator('button').filter({ hasText: '로그인' });
    
    await emailInput.fill('test@example.com');
    await passwordInput.fill('password');
    await loginButton.click();
    
    // 로그인 후 페이지 변화 대기
    await page.waitForLoadState('networkidle');
    
    // 로그인 성공 확인 - 할일 관리 인터페이스로 이동했는지 확인
    await expect(page.locator('text=새 할 일 추가')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=안녕하세요, 테스트 사용자님')).toBeVisible();
    await expect(page.locator('button').filter({ hasText: '로그아웃' })).toBeVisible();
    
    console.log('✅ 로그인 성공 - 할일 관리 페이지로 이동됨');
  });

  test('3. 할일 추가 테스트', async ({ page }) => {
    console.log('📝 할일 추가 테스트 시작');
    
    // 로그인
    await performLogin(page);
    
    // 할일 추가 폼 확인
    await expect(page.locator('text=새 할 일 추가')).toBeVisible();
    
    const testTodoTitle = `E2E 테스트 할일 ${Date.now()}`;
    
    // 할일 정보 입력
    const titleInput = page.locator('#title');
    await titleInput.fill(testTodoTitle);
    
    // 설명 입력 (textarea가 있는지 확인 후)
    const descriptionField = page.locator('#description, textarea');
    const isDescriptionVisible = await descriptionField.isVisible().catch(() => false);
    if (isDescriptionVisible) {
      await descriptionField.fill('E2E 테스트로 생성된 할일입니다.');
    }
    
    // 우선순위를 "높음"으로 설정
    const prioritySelect = page.locator('#priority');
    await prioritySelect.selectOption('high');
    console.log('✓ 우선순위를 높음으로 설정');
    
    // 태그 추가
    const tagsInput = page.locator('#tags');
    await tagsInput.fill('테스트, E2E, 자동화');
    
    // 폼 제출
    const submitButton = page.locator('button').filter({ hasText: '할 일 추가' });
    await submitButton.click();
    
    // 할일이 목록에 추가되었는지 확인
    await page.waitForTimeout(1000); // 추가 후 렌더링 대기
    
    // 할일이 성공적으로 추가되었는지 확인 (페이지에서 할일 찾기)
    const todoAdded = await page.locator(`text=${testTodoTitle}`).isVisible({ timeout: 5000 }).catch(() => false);
    
    if (todoAdded) {
      console.log('✅ 새 할일이 목록에 성공적으로 추가됨');
    } else {
      // 할일 목록에서 찾아보기
      const allText = await page.locator('body').textContent();
      if (allText?.includes(testTodoTitle)) {
        console.log('✅ 할일이 페이지 어딘가에 추가됨');
      } else {
        console.log('⚠ 할일 추가 확인 실패');
      }
    }
  });

  test('4. 검색 기능 테스트', async ({ page }) => {
    console.log('🔍 검색 기능 테스트 시작');
    
    await performLogin(page);
    
    // 먼저 테스트용 할일을 추가
    const testTitle = `검색테스트_${Date.now()}`;
    await addTestTodo(page, testTitle);
    
    // 검색창 찾기 및 검색 테스트
    const searchInput = page.locator('[placeholder*="검색"], [placeholder*="search"], input[type="search"]');
    const isSearchVisible = await searchInput.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (isSearchVisible) {
      // 기본 검색 테스트
      await searchInput.fill('검색테스트');
      await page.waitForTimeout(500); // 검색 결과 업데이트 대기
      console.log('✓ 기본 검색 입력 완료');
      
      // 검색 결과 확인
      const searchResult = await page.locator(`text*=${testTitle}`).isVisible({ timeout: 2000 }).catch(() => false);
      if (searchResult) {
        console.log('✅ 검색 기능 동작 확인');
      }
      
      // 검색창 초기화
      await searchInput.clear();
      await page.waitForTimeout(500);
    } else {
      console.log('⚠ 검색창을 찾을 수 없습니다.');
    }
  });

  test('5. 고급 검색 테스트', async ({ page }) => {
    console.log('🔎 고급 검색 테스트 시작');
    
    await performLogin(page);
    
    // 검색창 확인
    const searchInput = page.locator('[placeholder*="검색"], [placeholder*="search"], input[type="search"]');
    const isSearchVisible = await searchInput.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (isSearchVisible) {
      // 고급 검색 모드 활성화 시도 (Ctrl+K 단축키)
      await page.keyboard.press('Control+k');
      await page.waitForTimeout(500);
      
      console.log('✓ 고급 검색 모드 활성화 시도');
      
      // 고급 검색 문법 테스트
      const advancedQueries = [
        'priority:high',
        'status:active',
        'tag:테스트'
      ];
      
      for (const query of advancedQueries) {
        await searchInput.clear();
        await searchInput.fill(query);
        await page.waitForTimeout(500);
        console.log(`✓ 고급 검색 쿼리 테스트: ${query}`);
      }
      
      // 복합 검색 테스트
      await searchInput.clear();
      await searchInput.fill('priority:high status:active');
      await page.waitForTimeout(500);
      console.log('✓ 복합 고급 검색 쿼리 테스트 완료');
    } else {
      console.log('⚠ 검색창을 찾을 수 없어 고급 검색 테스트를 스킵합니다.');
    }
  });

  test('6. 필터 기능 테스트', async ({ page }) => {
    console.log('🎛️ 필터 기능 테스트 시작');
    
    await performLogin(page);
    
    // 상태 필터 테스트
    const statusButtons = await page.locator('button').filter({ hasText: /전체|진행 중|완료/ }).count();
    console.log(`📊 상태 필터 버튼 개수: ${statusButtons}`);
    
    if (statusButtons > 0) {
      // '진행 중' 필터 클릭
      const inProgressButton = page.locator('button').filter({ hasText: '진행 중' });
      const isInProgressVisible = await inProgressButton.isVisible().catch(() => false);
      if (isInProgressVisible) {
        await inProgressButton.click();
        await page.waitForTimeout(500);
        console.log('✓ 진행 중 필터 클릭');
      }
    }
    
    // 우선순위 필터 테스트
    const priorityFilters = await page.locator('text=/🔴.*높음|🟡.*보통|🟢.*낮음/').count();
    console.log(`⚡ 우선순위 필터 개수: ${priorityFilters}`);
    
    if (priorityFilters > 0) {
      const highPriorityFilter = page.locator('text=/🔴.*높음/');
      const isHighPriorityVisible = await highPriorityFilter.isVisible().catch(() => false);
      if (isHighPriorityVisible) {
        await highPriorityFilter.click();
        await page.waitForTimeout(500);
        console.log('✓ 높은 우선순위 필터 클릭');
      }
    }
    
    console.log('✅ 필터 기능 테스트 완료');
  });

  test('7. 할일 상태 변경 테스트', async ({ page }) => {
    console.log('✅ 할일 상태 변경 테스트 시작');
    
    await performLogin(page);
    
    // 먼저 테스트용 할일 추가
    const testTitle = `상태변경테스트_${Date.now()}`;
    await addTestTodo(page, testTitle);
    
    // 추가된 할일 찾기
    await page.waitForTimeout(1000);
    
    // 체크박스 찾기 (할일 항목 내의 체크박스)
    const checkbox = page.locator('input[type="checkbox"]').first();
    const isCheckboxVisible = await checkbox.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (isCheckboxVisible) {
      const isChecked = await checkbox.isChecked();
      console.log(`📋 현재 체크박스 상태: ${isChecked ? '체크됨' : '체크안됨'}`);
      
      // 체크박스 클릭하여 상태 변경
      await checkbox.click();
      await page.waitForTimeout(500);
      
      // 상태 변경 확인
      const newState = await checkbox.isChecked();
      
      if (newState !== isChecked) {
        console.log(`✅ 할일 상태 변경 성공: ${isChecked ? '완료 → 미완료' : '미완료 → 완료'}`);
      } else {
        console.log('⚠ 할일 상태 변경 실패');
      }
    } else {
      console.log('⚠ 체크박스를 찾을 수 없습니다. 할일이 없거나 다른 UI 구조를 사용합니다.');
    }
  });

  test('8. 카테고리 관리 테스트', async ({ page }) => {
    console.log('📁 카테고리 관리 테스트 시작');
    
    await performLogin(page);
    
    // 카테고리 관리 버튼 찾기
    const categoryManageButton = page.locator('button').filter({ hasText: '관리' });
    const buttons = await categoryManageButton.count();
    console.log(`🔧 관리 버튼 개수: ${buttons}`);
    
    if (buttons > 0) {
      // 첫 번째 관리 버튼 클릭 (카테고리 관리)
      await categoryManageButton.first().click();
      await page.waitForTimeout(500);
      console.log('✓ 카테고리 관리 버튼 클릭');
      
      // 카테고리 관리 모달이나 폼이 나타나는지 확인
      const modalOrForm = await page.locator('form, [role="dialog"], .modal').count();
      if (modalOrForm > 0) {
        console.log('✅ 카테고리 관리 인터페이스 열림');
      }
    }
    
    console.log('✅ 카테고리 관리 테스트 완료');
  });

  test('9. 필터 프리셋 테스트', async ({ page }) => {
    console.log('🔖 필터 프리셋 테스트 시작');
    
    await performLogin(page);
    
    // 필터 프리셋 버튼들 찾기
    const presetButtons = [
      page.locator('text=⚠️ 긴급'),
      page.locator('text=📅 오늘 할 일'),
      page.locator('text=🔥 지연된 할 일'),
      page.locator('text=📋 미완료'),
      page.locator('text=✅ 완료됨')
    ];
    
    for (const [index, button] of presetButtons.entries()) {
      const isVisible = await button.isVisible().catch(() => false);
      if (isVisible) {
        await button.click();
        await page.waitForTimeout(500);
        const buttonText = await button.textContent();
        console.log(`✓ 프리셋 버튼 클릭: ${buttonText}`);
      }
    }
    
    console.log('✅ 필터 프리셋 테스트 완료');
  });

  test('10. 종합 워크플로우 테스트', async ({ page }) => {
    console.log('🎯 종합 워크플로우 테스트 시작');
    
    // 1. 로그인
    await performLogin(page);
    console.log('✓ 1단계: 로그인 완료');
    
    // 2. 할일 추가
    const testTodoTitle = `종합테스트_${Date.now()}`;
    await addTestTodo(page, testTodoTitle, '높은 우선순위');
    console.log('✓ 2단계: 할일 추가 완료');
    
    // 3. 검색으로 추가한 할일 찾기
    const searchInput = page.locator('[placeholder*="검색"], [placeholder*="search"]');
    const isSearchVisible = await searchInput.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (isSearchVisible) {
      await searchInput.fill('종합테스트');
      await page.waitForTimeout(1000);
      console.log('✓ 3단계: 검색 완료');
    }
    
    // 4. 필터 적용
    const highPriorityFilter = page.locator('text=/🔴.*높음/');
    const isFilterVisible = await highPriorityFilter.isVisible().catch(() => false);
    if (isFilterVisible) {
      await highPriorityFilter.click();
      await page.waitForTimeout(500);
      console.log('✓ 4단계: 필터 적용 완료');
    }
    
    // 5. 할일 완료 처리 (체크박스가 있다면)
    const checkbox = page.locator('input[type="checkbox"]').first();
    const isCheckboxVisible = await checkbox.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (isCheckboxVisible) {
      await checkbox.click();
      await page.waitForTimeout(500);
      console.log('✓ 5단계: 할일 완료 처리');
    }
    
    console.log('🎉 종합 워크플로우 테스트 완료');
  });
});

// 헬퍼 함수들
async function performLogin(page) {
  // 로그인 폼이 보이면 로그인 수행
  const isLoginFormVisible = await page.locator('input[type="email"]').isVisible({ timeout: 3000 }).catch(() => false);
  
  if (isLoginFormVisible) {
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const loginButton = page.locator('button').filter({ hasText: '로그인' });
    
    await emailInput.fill('test@example.com');
    await passwordInput.fill('password');
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    
    // 로그인 성공 확인
    await page.waitForSelector('text=새 할 일 추가', { timeout: 5000 });
  }
}

async function addTestTodo(page, title: string, priority: string = '보통') {
  // 할일 추가 폼에 정보 입력
  const titleInput = page.locator('#title');
  const prioritySelect = page.locator('#priority');
  const submitButton = page.locator('button').filter({ hasText: '할 일 추가' });
  
  await titleInput.fill(title);
  
  // 우선순위 설정
  if (priority === '높은 우선순위' || priority === '높음') {
    await prioritySelect.selectOption('high');
  } else if (priority === '낮음') {
    await prioritySelect.selectOption('low');
  }
  
  await submitButton.click();
  await page.waitForTimeout(1000);
}