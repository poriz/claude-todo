import { test } from '@playwright/test';

test('로그인 후 앱 구조 디버그', async ({ page }) => {
  console.log('🔓 로그인 후 애플리케이션 구조 분석 시작');
  
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // 로그인 시도
  const emailInput = page.locator('input[type="email"]');
  const passwordInput = page.locator('input[type="password"]');
  const loginButton = page.locator('button').filter({ hasText: '로그인' });
  
  await emailInput.fill('test@example.com');
  await passwordInput.fill('password');
  await loginButton.click();
  await page.waitForLoadState('networkidle');
  
  // 로그인 성공 확인
  const isStillOnLogin = await page.locator('input[type="email"]').isVisible({ timeout: 2000 }).catch(() => false);
  
  if (isStillOnLogin) {
    console.log('❌ 로그인 실패 - 로그인 폼이 여전히 표시됨');
    return;
  }
  
  console.log('✅ 로그인 성공');
  
  // 로그인 후 페이지 구조 분석
  const bodyText = await page.locator('body').textContent();
  console.log(`📄 로그인 후 페이지 내용 (첫 300글자): ${bodyText?.substring(0, 300)}...`);
  
  // 폼 요소들 확인
  const forms = await page.locator('form').count();
  console.log(`📝 로그인 후 폼 개수: ${forms}`);
  
  if (forms > 0) {
    for (let i = 0; i < Math.min(forms, 3); i++) {
      const form = page.locator('form').nth(i);
      const inputs = await form.locator('input').count();
      const buttons = await form.locator('button').count();
      console.log(`  📝 폼 ${i+1}: input ${inputs}개, button ${buttons}개`);
      
      // 입력 필드 상세 정보
      const inputDetails = await form.locator('input').all();
      for (const input of inputDetails.slice(0, 5)) {
        const placeholder = await input.getAttribute('placeholder');
        const id = await input.getAttribute('id');
        const type = await input.getAttribute('type');
        console.log(`    🔤 Input: type="${type}", id="${id}", placeholder="${placeholder}"`);
      }
    }
  }
  
  // 할일 관련 요소들 확인
  const todoElements = await page.locator('[class*="todo"], [id*="todo"]').count();
  const todoTextElements = await page.locator('text=/할.*일/').count();
  console.log(`📋 Todo 관련 요소 개수: ${todoElements}, 할일 텍스트: ${todoTextElements}`);
  
  // 할일 추가 관련 요소 확인
  const addTodoButton = await page.locator('text=할 일 추가').count();
  const addTodoText = await page.locator('text=새 할 일 추가').count();
  console.log(`➕ 할일 추가 버튼: ${addTodoButton}, 할일 추가 텍스트: ${addTodoText}`);
  
  // 검색 관련 요소 확인
  const searchElements = await page.locator('[placeholder*="검색"], [placeholder*="search"], input[type="search"]').count();
  console.log(`🔍 검색 요소 개수: ${searchElements}`);
  
  // 버튼 요소들 확인
  const buttons = await page.locator('button').count();
  console.log(`🔘 로그인 후 버튼 개수: ${buttons}`);
  
  if (buttons > 0) {
    const buttonTexts = await page.locator('button').allTextContents();
    console.log(`🔘 버튼 텍스트들: ${buttonTexts.slice(0, 8).join(', ')}`);
  }
  
  // 주요 텍스트 요소들 확인
  const headings = await page.locator('h1, h2, h3, h4').allTextContents();
  console.log(`📋 제목 요소들: ${headings.slice(0, 5).join(', ')}`);
  
  // 메뉴나 네비게이션 요소 확인
  const navElements = await page.locator('nav, [class*="nav"], [class*="menu"], [role="navigation"]').count();
  console.log(`🧭 네비게이션 요소 개수: ${navElements}`);
  
  console.log('✅ 로그인 후 앱 구조 분석 완료');
});