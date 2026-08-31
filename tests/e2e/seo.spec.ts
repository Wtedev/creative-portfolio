import { test, expect } from '@playwright/test';

test.describe('SEO and metadata', () => {
  test('English homepage exposes localized metadata', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/Art Director & Creative Developer/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Portfolio placeholder/i,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en$/);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      /\/en$/,
    );
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute(
      'href',
      /\/ar$/,
    );
    await expect(page.locator('link[rel="alternate"][hrefLang="x-default"]')).toHaveAttribute(
      'href',
      /\/en$/,
    );
  });

  test('Arabic homepage metadata is localized', async ({ page }) => {
    await page.goto('/ar');
    await expect(page).toHaveTitle(/مخرجة فنية/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/ar$/);
  });

  test('project page metadata is unique and localized', async ({ page }) => {
    await page.goto('/en/project/sample-project');
    await expect(page).toHaveTitle(/Luminous Systems/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /\/en\/project\/sample-project$/,
    );
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  });

  test('robots and sitemap exclude studio and api routes', async ({ request }) => {
    const robots = await request.get('/robots.txt');
    expect(robots.ok()).toBeTruthy();
    const robotsText = await robots.text();
    expect(robotsText).toContain('Disallow: /studio');
    expect(robotsText).toContain('Disallow: /api/');
    expect(robotsText).toMatch(/Sitemap: .+\/sitemap\.xml/);

    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
    const body = await sitemap.text();
    expect(body).toContain('/en/project/sample-project');
    expect(body).toContain('/ar/project/sample-project');
    expect(body).not.toContain('/studio');
  });

  test('manifest is available without placeholder branding', async ({ request }) => {
    const manifest = await request.get('/manifest.webmanifest');
    expect(manifest.ok()).toBeTruthy();
    const body = await manifest.json();
    expect(body.name).toBe('Creative Portfolio');
    expect(body.display).toBe('browser');
  });

  test('homepage heading hierarchy starts at h1', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  });
});
