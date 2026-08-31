import { test, expect } from '@playwright/test';

test.describe('Interactive folder hero', () => {
  test('English hero renders split title and folder', async ({ page }) => {
    await page.goto('/en');
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Art Director');
    await expect(heading).toContainText('Creative Developer');
    await expect(page.getByTestId('folder-shell')).toBeVisible();
    await expect(page.getByTestId('folder-fragment-0')).toBeVisible();
    await expect(
      page.locator('#hero').getByRole('link', { name: /Discuss a Role/i }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /Explore My Work/i })).toBeVisible();
  });

  test('Arabic hero uses language-appropriate hierarchy', async ({ page }) => {
    await page.goto('/ar');
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('مخرجة فنية');
    await expect(heading).toContainText('ومطوّرة إبداعية');
    await expect(page.getByTestId('folder-shell')).toBeVisible();
  });

  test('opening a fragment link navigates to the project', async ({ page }) => {
    await page.goto('/en');
    await page.getByTestId('folder-fragment-link-3').click();
    await expect(page).toHaveURL(/\/en\/project\/sample-project/);
  });

  test('dragging a fragment does not navigate', async ({ page }) => {
    await page.goto('/en');
    const fragment = page.getByTestId('folder-fragment-0');
    const box = await fragment.boundingBox();
    expect(box).toBeTruthy();
    if (!box) return;

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 80, box.y + box.height / 2 - 40, { steps: 8 });
    await page.mouse.up();
    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(fragment).toHaveAttribute('data-state', /(inspecting|dragging|returning|stacked)/);
  });

  test('reset restores stacked fragments', async ({ page }) => {
    await page.goto('/en');
    const fragment = page.getByTestId('folder-fragment-1');
    const box = await fragment.boundingBox();
    expect(box).toBeTruthy();
    if (!box) return;

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + 90, box.y - 30, { steps: 6 });
    await page.mouse.up();

    const reset = page.getByTestId('folder-reset');
    await expect(reset).toBeEnabled();
    await reset.click();
    await expect(page.getByTestId('folder-fragment-1')).toHaveAttribute('data-state', 'stacked');
  });

  test('hero has no horizontal overflow at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/en');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });

  test('reduced motion still exposes projects and CTAs', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByTestId('folder-fragment-link-3')).toBeVisible();
    await expect(
      page.locator('#hero').getByRole('link', { name: /Start a Project/i }),
    ).toBeVisible();
  });

  test('explore work still reaches the work section', async ({ page }) => {
    await page.goto('/en');
    const explore = page.locator('#hero').getByRole('link', { name: /Explore My Work/i });
    await expect(explore).toHaveAttribute('href', '#work');
    await explore.click();
    await expect(page.locator('#work')).toBeInViewport({ timeout: 10_000 });
  });
});
