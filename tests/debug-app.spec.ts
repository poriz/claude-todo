import { test } from '@playwright/test';

test('앱 구조 디버그', async ({ page }) => {
  console.log('🔍 애플리케이션 구조 분석 시작');
  
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  // 페이지 제목 확인
  const title = await page.title();
  console.log(`📋 페이지 제목: ${title}`);
  
  // 페이지의 주요 요소들 확인
  const bodyText = await page.locator('body').textContent();
  console.log(`📄 페이지 내용 (첫 200글자): ${bodyText?.substring(0, 200)}...`);
  
  // 폼 요소들 확인
  const forms = await page.locator('form').count();
  console.log(`📝 페이지의 폼 개수: ${forms}`);
  
  if (forms > 0) {
    for (let i = 0; i < Math.min(forms, 3); i++) {
      const form = page.locator('form').nth(i);
      const inputs = await form.locator('input').count();
      const buttons = await form.locator('button').count();
      console.log(`  📝 폼 ${i+1}: input ${inputs}개, button ${buttons}개`);
      
      // 입력 필드의 placeholder나 id 확인
      const inputPlaceholders = await form.locator('input').all();
      for (const input of inputPlaceholders.slice(0, 3)) {
        const placeholder = await input.getAttribute('placeholder');
        const id = await input.getAttribute('id');
        const type = await input.getAttribute('type');
        console.log(`    🔤 Input: type="${type}", id="${id}", placeholder="${placeholder}"`);
      }
    }
  }
  
  // 버튼 요소들 확인
  const buttons = await page.locator('button').count();
  console.log(`🔘 페이지의 버튼 개수: ${buttons}`);
  
  if (buttons > 0) {
    const buttonTexts = await page.locator('button').allTextContents();
    console.log(`🔘 버튼 텍스트들: ${buttonTexts.slice(0, 5).join(', ')}`);
  }
  
  // 입력 필드들 확인
  const inputs = await page.locator('input').count();
  console.log(`📝 페이지의 입력 필드 개수: ${inputs}`);
  
  // 주요 클래스나 ID 요소들 확인
  const todoElements = await page.locator('[class*="todo"], [id*="todo"], [data-testid*="todo"]').count();
  console.log(`📋 Todo 관련 요소 개수: ${todoElements}`);
  
  // 검색 관련 요소 확인
  const searchElements = await page.locator('[placeholder*="검색"], [placeholder*="search"]').count();
  console.log(`🔍 검색 요소 개수: ${searchElements}`);
  
  // 에러나 로딩 상태 확인
  const errorElements = await page.locator('[class*="error"], [class*="Error"]').count();
  const loadingElements = await page.locator('[class*="loading"], [class*="Loading"], [class*="spinner"]').count();
  console.log(`❌ 에러 요소 개수: ${errorElements}`);
  console.log(`⏳ 로딩 요소 개수: ${loadingElements}`);
  
  // 현재 URL 확인
  const currentUrl = page.url();
  console.log(`🌐 현재 URL: ${currentUrl}`);
  
  console.log('✅ 앱 구조 분석 완료');
});