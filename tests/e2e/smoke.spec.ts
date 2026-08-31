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
    const toggle = page.getByRole('banner').getByRole('button', { name: /Theme/i });
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', /.+/);
  });

  test('locale switcher preserves route context', async ({ page }) => {
    await page.goto('/en/project/sample-project');
    await page.getByRole('banner').getByRole('link', { name: /العربية|Arabic/i }).click();
    await expect(page).toHaveURL(/\/ar\/project\/sample-project/);
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
  });

  test('tools scroller controls are labeled', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/en');
    await expect(page.getByRole('button', { name: /scroll tools left/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /scroll tools right/i })).toBeVisible();
  });

  test('homepage has no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/en');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });

  test('sample project page loads', async ({ page }) => {
    await page.goto('/en/project/sample-project');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Luminous Systems');
  });

  test('studio shows setup message without credentials', async ({ page }) => {
    await page.goto('/studio');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Sanity Studio Setup');
  });
});
