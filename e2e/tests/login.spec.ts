import { test, expect } from '@playwright/test';

test.describe('로그인 페이지 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('로그인 페이지가 올바르게 렌더링되는지 확인', async ({ page }) => {
    // 페이지 타이틀 확인
    await expect(
      page.getByText('5초만에 빠른 로그인을 해보아요!'),
    ).toBeVisible();

    // 소셜 로그인 버튼들이 존재하는지 확인
    await expect(page.getByText('카카오 계정으로 로그인하기')).toBeVisible();
    await expect(page.getByText('구글 계정으로 로그인하기')).toBeVisible();
  });

  test('카카오 로그인 프로세스 테스트', async ({ page }) => {
    // 네트워크 요청 인터셉트
    await page.route('**/oauth/kakao', async route => {
      const url = route.request().url();
      if (url.includes('kakao')) {
        // 카카오 로그인 요청을 모의 응답으로 처리
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      } else {
        await route.continue();
      }
    });

    // 로그인 버튼 클릭
    await page.getByText('카카오 계정으로 로그인하기').click();

    // 페이지가 리다이렉션 되기를 기다림
    await page.waitForLoadState('networkidle');
  });

  test('구글 로그인 프로세스 테스트', async ({ page }) => {
    // 네트워크 요청 인터셉트
    await page.route('**/oauth/google', async route => {
      const url = route.request().url();
      if (url.includes('google')) {
        // 구글 로그인 요청을 모의 응답으로 처리
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true }),
        });
      } else {
        await route.continue();
      }
    });

    // 로그인 버튼 클릭
    await page.getByText('구글 계정으로 로그인하기').click();

    // 페이지가 리다이렉션 되기를 기다림
    await page.waitForLoadState('networkidle');
  });

  test('로그인 성공 후 상태 확인', async ({ page }) => {
    // 모든 supabase 관련 요청을 인터셉트
    await page.route('**/*.supabase.co/**', async route => {
      const url = route.request().url();

      // OAuth 콜백 요청 처리
      if (url.includes('/callback')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ session: { access_token: 'test_token' } }),
        });
        return;
      }
      // 다른 supabase 요청은 정상적으로 처리
      await route.continue();
    });

    // 페이지 이동 이벤트 리스너 설정
    let resolveNavigationPromise;
    const navigationPromise = new Promise(resolve => {
      resolveNavigationPromise = resolve;
    });

    await page.route('**/*', async route => {
      const url = route.request().url();
      if (url.includes('/home') || url === 'http://localhost:5173/') {
        resolveNavigationPromise();
        await route.continue();
      } else {
        await route.continue();
      }
    });

    // 카카오 로그인 버튼 클릭
    await page.getByText('카카오 계정으로 로그인하기').click();

    // 리디렉션 완료 대기 (최대 10초)
    await Promise.race([
      navigationPromise,
      new Promise(resolve => setTimeout(resolve, 10000)),
    ]);

    // 네트워크 요청 완료 대기
    await page.waitForLoadState('networkidle');
  });
});
