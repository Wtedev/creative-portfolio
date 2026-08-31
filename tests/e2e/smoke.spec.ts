import { test, expect } from '@playwright/test';

const homepageAnchors = ['work', 'capabilities', 'tools', 'process', 'about', 'contact'];

test.describe('Portfolio smoke tests', () => {
  test('English homepage renders with LTR', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Art Director & Creative Developer',
    );
  });

  test('Arabic homepage renders with RTL', async ({ page }) => {
    await page.goto('/ar');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'مخرجة فنية ومطوّرة إبداعية',
    );
  });

  test('theme toggle updates data-theme', async ({ page }) => {
    await page.goto('/en');
    const toggle = page.getByRole('banner').getByRole('button', { name: /Theme|المظهر/i });
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', /.+/);
  });

  test('theme persists after reload', async ({ page }) => {
    await page.goto('/en');
    const toggle = page.getByRole('banner').getByRole('button', { name: /Theme|المظهر/i });
    await toggle.click();
    const theme = await page.locator('html').getAttribute('data-theme');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme ?? /.+/);
  });

  test('locale switcher preserves project slug', async ({ page }) => {
    await page.goto('/en/project/sample-project');
    await page
      .getByRole('banner')
      .getByRole('link', { name: /العربية|Arabic/i })
      .click();
    await expect(page).toHaveURL(/\/ar\/project\/sample-project/);
  });

  test('locale switcher preserves homepage hash', async ({ page }) => {
    await page.goto('/en#work');
    await page
      .getByRole('banner')
      .getByRole('link', { name: /العربية|Arabic/i })
      .click();
    await expect(page).toHaveURL(/\/ar(?:\/)?#work/);
  });

  test('homepage section anchors are reachable', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('link', { name: 'Capabilities', exact: true }).click();
    await expect(page.locator('#capabilities')).toBeInViewport();
  });

  test('homepage sections appear in locked order', async ({ page }) => {
    await page.goto('/en');
    const ids = await page
      .locator('main section[id]')
      .evaluateAll((sections) => sections.map((section) => section.id));
    expect(ids).toEqual(['hero', ...homepageAnchors]);
  });

  test('mobile navigation exposes expanded state', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en');
    const toggle = page.locator('.site-header__menu-toggle');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect.poll(async () => page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  });

  test('Arabic mobile menu works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/ar');
    const toggle = page.locator('.site-header__menu-toggle');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: 'الأعمال' }).first()).toBeVisible();
  });

  test('tools scroller controls are labeled', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/en');
    await expect(page.getByRole('button', { name: /previous tools/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /next tools/i })).toBeVisible();
  });

  test('tools remain labeled in Arabic RTL', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/ar');
    await expect(page.getByRole('button', { name: /الأدوات السابقة/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /الأدوات التالية/i })).toBeVisible();
  });

  test('homepage has no horizontal overflow at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/en');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });

  test('Arabic homepage has no horizontal overflow at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/ar');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });

  test('case study stays within viewport width on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en/project/sample-project');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });

  test('project card opens case study', async ({ page }) => {
    await page.goto('/en');
    await page.locator('.work-card--link').first().click();
    await expect(page).toHaveURL(/\/en\/project\//);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('next project link is present on case study', async ({ page }) => {
    await page.goto('/en/project/sample-project');
    await expect(page.getByText('Next project', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: /View Case Study/i }).last()).toBeVisible();
  });

  test('Arabic case study remains RTL', async ({ page }) => {
    await page.goto('/ar/project/sample-project');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.getByText('المشروع التالي', { exact: true })).toBeVisible();
  });

  test('luminous thread exists on homepage only', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByTestId('luminous-thread')).toBeVisible();
    await page.goto('/en/project/sample-project');
    await expect(page.getByTestId('luminous-thread')).toHaveCount(0);
  });

  test('studio shows setup message without credentials', async ({ page }) => {
    await page.goto('/studio');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Sanity Studio Setup');
  });

  test('reduced motion still shows homepage content', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('#work')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });
});
