import { test, expect } from '@playwright/test';

function boxesOverlap(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
  gap = 8,
) {
  return !(
    a.x + a.width + gap <= b.x ||
    b.x + b.width + gap <= a.x ||
    a.y + a.height + gap <= b.y ||
    b.y + b.height + gap <= a.y
  );
}

test.describe('Interactive folder hero', () => {
  test('English hero renders split title and folder', async ({ page }) => {
    await page.goto('/en');
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Art Director');
    await expect(heading).toContainText('Creative Developer');
    await expect(page.getByTestId('folder-shell')).toBeVisible();
    await expect(page.getByTestId('folder-fragment-2')).toBeVisible();
    await expect(page.getByTestId('folder-reset')).toHaveCount(0);
    await expect(page.locator('.folder-fragment__return')).toHaveCount(0);
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

  test('only one interactive project link exists for fallback content', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByTestId(/^folder-fragment-link-/)).toHaveCount(1);
  });

  test('clicking a fragment link navigates to the project', async ({ page }) => {
    await page.goto('/en');
    await page.getByRole('link', { name: /Open project:.*Sample/i }).click();
    await expect(page).toHaveURL(/\/en\/project\/sample-project/);
  });

  test('dragging a fragment does not navigate and returns to stacked', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en');
    const fragment = page.getByTestId('folder-fragment-2');
    const box = await fragment.boundingBox();
    expect(box).toBeTruthy();
    if (!box) return;

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 80, box.y + box.height / 2 - 40, { steps: 8 });
    await page.mouse.up();
    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(fragment).toHaveAttribute('data-state', /stacked|returning/);
    await expect(fragment).toHaveAttribute('data-state', 'stacked', { timeout: 3000 });
    await expect(fragment).not.toHaveAttribute('data-state', 'inspecting');
  });

  test('title and folder do not overlap on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en');
    const titleBox = await page.getByRole('heading', { level: 1 }).boundingBox();
    const folderBox = await page.getByTestId('folder-shell').boundingBox();
    expect(titleBox).toBeTruthy();
    expect(folderBox).toBeTruthy();
    if (!titleBox || !folderBox) return;
    expect(boxesOverlap(titleBox, folderBox)).toBe(false);
  });

  test('Arabic title and folder do not overlap on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/ar');
    const titleBox = await page.getByRole('heading', { level: 1 }).boundingBox();
    const folderBox = await page.getByTestId('folder-shell').boundingBox();
    expect(titleBox).toBeTruthy();
    expect(folderBox).toBeTruthy();
    if (!titleBox || !folderBox) return;
    expect(boxesOverlap(titleBox, folderBox)).toBe(false);
  });

  test('hero has no horizontal overflow at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/en');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });

  test('mobile hero stays compact', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en');
    const heroHeight = await page
      .locator('#hero')
      .evaluate((element) => element.getBoundingClientRect().height);
    expect(heroHeight).toBeLessThan(900);
  });

  test('reduced motion still exposes projects and CTAs', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /Open project:/i })).toBeVisible();
    await expect(
      page.locator('#hero').getByRole('link', { name: /Start a Project/i }),
    ).toBeVisible();
    await expect(page.getByText(/Reset folder|Return to folder/i)).toHaveCount(0);
  });

  test('explore work still reaches the work section', async ({ page }) => {
    await page.goto('/en');
    const explore = page.locator('#hero').getByRole('link', { name: /Explore My Work/i });
    await expect(explore).toHaveAttribute('href', '#work');
    await explore.click();
    await expect(page.locator('#work')).toBeInViewport({ timeout: 10_000 });
  });
});
