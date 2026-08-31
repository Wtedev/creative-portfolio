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
  test('English hero renders centered title and folder', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('.folder-hero__layout')).toHaveCount(0);
    await expect(page.locator('.folder-hero__content')).toBeVisible();
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Art Director');
    await expect(heading).toContainText('Creative Developer');
    await expect(page.getByTestId('folder-shell')).toBeVisible();
    await expect(page.locator('.folder-surface--back')).toBeVisible();
    await expect(page.locator('.folder-surface--front')).toBeVisible();
    await expect(page.getByTestId('folder-fragment-2')).toBeVisible();
    await expect(page.getByTestId('folder-reset')).toHaveCount(0);
    await expect(page.locator('.folder-scene__instruction')).toHaveCount(0);
    await expect(page.locator('.visually-hidden', { hasText: /Drag a project card/i })).toHaveCount(
      1,
    );
  });

  test('hero preserves exact semantic block order', async ({ page }) => {
    await page.goto('/en');
    const order = await page.locator('#hero .folder-hero__content').evaluate((root) => {
      const blocks = [
        root.querySelector('.eyebrow'),
        root.querySelector('#hero-heading'),
        root.querySelector('.folder-hero__visual'),
        root.querySelector('.folder-hero__explore'),
        root.querySelector('.folder-hero__statement'),
        root.querySelector('.folder-hero__actions'),
      ];
      const positions = blocks.map((element) =>
        element ? Array.from(root.children).indexOf(element as Element) : -1,
      );
      return positions;
    });
    expect(order).toEqual([0, 1, 2, 3, 4, 5]);
  });

  test('explore work uses a downward arrow and precedes statement and CTAs', async ({ page }) => {
    await page.goto('/en');
    const explore = page.locator('#hero .folder-hero__explore');
    await expect(explore).toHaveAttribute('href', '#work');
    await expect(explore.locator('.folder-hero__explore-arrow')).toHaveText('↓');

    const positions = await page.locator('#hero .folder-hero__content').evaluate((root) => {
      const index = (selector: string) =>
        Array.from(root.children).indexOf(root.querySelector(selector)!);
      return {
        folder: index('.folder-hero__visual'),
        explore: index('.folder-hero__explore'),
        statement: index('.folder-hero__statement'),
        actions: index('.folder-hero__actions'),
      };
    });
    expect(positions.folder).toBeLessThan(positions.explore);
    expect(positions.explore).toBeLessThan(positions.statement);
    expect(positions.statement).toBeLessThan(positions.actions);
  });

  test('Arabic hero uses language-appropriate hierarchy and same order', async ({ page }) => {
    await page.goto('/ar');
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('مخرجة فنية');
    await expect(heading).toContainText('ومطوّرة إبداعية');
    await expect(page.getByTestId('folder-shell')).toBeVisible();
    await expect(page.locator('.folder-hero__explore-arrow')).toHaveText('↓');
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

    const stackedClipPath = await page.evaluate(() => {
      const sheet = document.querySelector(
        '[data-testid="folder-fragment-2"] .folder-fragment__sheet',
      ) as HTMLElement | null;
      if (!sheet) return null;
      const clipPath = getComputedStyle(sheet).clipPath;
      return clipPath === 'none' || clipPath === '';
    });
    expect(stackedClipPath).toBe(true);
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

  test('folder and explore link do not overlap', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en');
    const folderBox = await page.getByTestId('folder-shell').boundingBox();
    const exploreBox = await page.locator('#hero .folder-hero__explore').boundingBox();
    expect(folderBox).toBeTruthy();
    expect(exploreBox).toBeTruthy();
    if (!folderBox || !exploreBox) return;
    expect(boxesOverlap(folderBox, exploreBox)).toBe(false);
  });

  test('complete hero content is visible at 1440x900', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en');
    await expect(page.locator('#hero .eyebrow')).toBeInViewport();
    await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
    await expect(page.getByTestId('folder-shell')).toBeInViewport();
    await expect(page.locator('#hero .folder-hero__explore')).toBeInViewport();
    await expect(page.locator('#hero .folder-hero__statement')).toBeInViewport();
    await expect(
      page.locator('#hero .folder-hero__actions').getByRole('link', { name: /Start a Project/i }),
    ).toBeInViewport();
  });

  test('explore work is visible at 1024x768', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/en');
    await expect(page.locator('#hero .folder-hero__explore')).toBeInViewport();
    await expect(page.getByTestId('folder-shell')).toBeInViewport();
  });

  test('stacked card body stays hidden behind opaque pocket without clip-path', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en');
    const metrics = await page.evaluate(() => {
      const card = document.querySelector('[data-testid="folder-fragment-2"]');
      const sheet = card?.querySelector('.folder-fragment__sheet') as HTMLElement | null;
      if (!card || !sheet) return null;
      const sheetStyles = getComputedStyle(sheet);
      const cardBox = card.getBoundingClientRect();
      const shell = document.querySelector('[data-testid="folder-shell"]');
      const shellBox = shell?.getBoundingClientRect();
      const pocketTop = shellBox ? shellBox.top + shellBox.height * (232 / 420) : cardBox.bottom;
      const hiddenHeight = Math.max(0, cardBox.bottom - pocketTop);
      const hiddenRatio = hiddenHeight / cardBox.height;
      const clipPath = sheetStyles.clipPath;
      return {
        usesClipPath: clipPath !== 'none' && clipPath !== '',
        cardMediaVisible: cardBox.top < pocketTop - 8,
        hiddenRatio,
      };
    });
    expect(metrics).toBeTruthy();
    expect(metrics?.usesClipPath).toBe(false);
    expect(metrics?.cardMediaVisible).toBe(true);
    expect(metrics?.hiddenRatio).toBeGreaterThanOrEqual(0.28);
    expect(metrics?.hiddenRatio).toBeLessThanOrEqual(0.34);
  });

  test('real and decorative cards share one silhouette', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en');
    const metrics = await page.evaluate(() => {
      const real = document.querySelector('[data-testid="folder-fragment-2"]');
      const left = document.querySelector('[data-testid="folder-decorative-0"]');
      const right = document.querySelector('[data-testid="folder-decorative-1"]');
      if (!real || !left || !right) return null;

      const realSheet = real.querySelector('.folder-fragment__sheet') as HTMLElement | null;
      const leftCard = left.querySelector('.folder-card') as HTMLElement | null;
      const rightCard = right.querySelector('.folder-card') as HTMLElement | null;
      const media = real.querySelector('.folder-fragment__media') as HTMLElement | null;
      const mediaAfterContent = media ? getComputedStyle(media, '::after').content : 'none';

      const realBox = (realSheet ?? real).getBoundingClientRect();
      const leftBox = (leftCard ?? left).getBoundingClientRect();
      const rightBox = (rightCard ?? right).getBoundingClientRect();
      const realWidth = (realSheet ?? real).clientWidth;
      const leftWidth = (leftCard ?? left).clientWidth;
      const rightWidth = (rightCard ?? right).clientWidth;
      const realHeight = (realSheet ?? real).clientHeight;
      const leftHeight = (leftCard ?? left).clientHeight;
      const rightHeight = (rightCard ?? right).clientHeight;

      return {
        widthDelta: Math.max(Math.abs(realWidth - leftWidth), Math.abs(realWidth - rightWidth)),
        heightDelta: Math.max(
          Math.abs(realHeight - leftHeight),
          Math.abs(realHeight - rightHeight),
        ),
        realRadius: realSheet ? getComputedStyle(realSheet).borderRadius : '',
        leftRadius: getComputedStyle(leftCard ?? left).borderRadius,
        realCenterOffset: realBox.left + realBox.width / 2,
        shellCenter:
          (document.querySelector('[data-testid="folder-shell"]')!.getBoundingClientRect().left +
            document.querySelector('[data-testid="folder-shell"]')!.getBoundingClientRect().right) /
          2,
        leftOffset: leftBox.left + leftBox.width / 2,
        rightOffset: rightBox.left + rightBox.width / 2,
        hasCyanStatusDot:
          mediaAfterContent !== 'none' &&
          mediaAfterContent !== 'normal' &&
          mediaAfterContent !== '""',
      };
    });
    expect(metrics).toBeTruthy();
    expect(metrics?.widthDelta).toBeLessThanOrEqual(2);
    expect(metrics?.heightDelta).toBeLessThanOrEqual(2);
    expect(metrics?.realRadius).toBe(metrics?.leftRadius);
    expect(
      Math.abs((metrics?.realCenterOffset ?? 0) - (metrics?.shellCenter ?? 0)),
    ).toBeLessThanOrEqual(6);
    expect(Math.abs((metrics?.leftOffset ?? 0) - (metrics?.shellCenter ?? 0))).toBeGreaterThan(20);
    expect(Math.abs((metrics?.rightOffset ?? 0) - (metrics?.shellCenter ?? 0))).toBeGreaterThan(20);
    expect(metrics?.hasCyanStatusDot).toBe(false);
  });

  test('cards sit inside folder width and intersect the pocket region', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en');
    const metrics = await page.evaluate(() => {
      const shell = document.querySelector('[data-testid="folder-shell"]');
      const card = document.querySelector('[data-testid="folder-fragment-2"]');
      if (!shell || !card) return null;
      const shellBox = shell.getBoundingClientRect();
      const cardBox = card.getBoundingClientRect();
      const pocketTop = shellBox.top + shellBox.height * (232 / 420);
      return {
        cardWithinShell: cardBox.left >= shellBox.left - 2 && cardBox.right <= shellBox.right + 2,
        cardOverlapsPocket: cardBox.bottom > pocketTop + 4,
        cardExtendsAbovePocket: cardBox.top < pocketTop - 8,
      };
    });
    expect(metrics).toBeTruthy();
    expect(metrics?.cardWithinShell).toBe(true);
    expect(metrics?.cardOverlapsPocket).toBe(true);
    expect(metrics?.cardExtendsAbovePocket).toBe(true);
  });

  test('desktop folder width stays within target range', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en');
    const width = await page.getByTestId('folder-shell').evaluate((element) => {
      return element.getBoundingClientRect().width;
    });
    expect(width).toBeGreaterThanOrEqual(27 * 16 - 8);
    expect(width).toBeLessThanOrEqual(31 * 16 + 8);
  });

  test('hero has no horizontal overflow at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/en');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });

  test('mobile hero to Selected Work gap stays within target', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en');
    const gap = await page.evaluate(() => {
      const actions = document.querySelector('#hero .folder-hero__actions');
      const workHeading = document.querySelector('#work-heading');
      if (!actions || !workHeading) return null;
      const actionsBox = actions.getBoundingClientRect();
      const workBox = workHeading.getBoundingClientRect();
      return workBox.top - actionsBox.bottom;
    });
    expect(gap).toBeTruthy();
    expect(gap!).toBeGreaterThanOrEqual(72);
    expect(gap!).toBeLessThanOrEqual(140);
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
    const explore = page.locator('#hero .folder-hero__explore');
    await expect(explore).toHaveAttribute('href', '#work');
    await explore.click();
    await expect(page.locator('#work')).toBeInViewport({ timeout: 10_000 });
  });
});
