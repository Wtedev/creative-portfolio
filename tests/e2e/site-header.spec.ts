import { test, expect } from '@playwright/test';

test.describe('Site header', () => {
  test('desktop header uses a three-zone grid with centered navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en');

    const layout = await page.locator('.site-header__inner').evaluate((inner) => {
      const styles = getComputedStyle(inner);
      const brand = inner.querySelector('.site-header__brand');
      const nav = inner.querySelector('.site-header__nav');
      const controls = inner.querySelector('.site-header__controls');
      if (!brand || !nav || !controls) return null;

      const innerRect = inner.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const navCenter = navRect.left + navRect.width / 2;
      const innerCenter = innerRect.left + innerRect.width / 2;

      return {
        display: styles.display,
        gridTemplateColumns: styles.gridTemplateColumns,
        navOffset: Math.abs(navCenter - innerCenter),
      };
    });

    expect(layout).toBeTruthy();
    expect(layout?.display).toBe('grid');
    expect(layout?.gridTemplateColumns.split(' ').length).toBeGreaterThanOrEqual(3);
    expect(layout?.navOffset).toBeLessThan(48);
  });

  test('header fits at 1120px with visible desktop navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1120, height: 800 });
    await page.goto('/en');
    await expect(page.locator('.site-header__nav')).toBeVisible();
    await expect(page.locator('.site-header__menu-toggle')).toBeHidden();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });

  test('mobile header keeps compact equal-sized controls at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/en');

    const controls = page.locator('.site-header__controls');
    const theme = controls.locator('.theme-toggle');
    const menu = controls.locator('.site-header__menu-toggle');
    const locale = controls.locator('.locale-switcher');

    await expect(theme).toBeVisible();
    await expect(menu).toBeVisible();
    await expect(locale).toBeVisible();

    const sizes = await controls.evaluate((root) => {
      const themeEl = root.querySelector('.theme-toggle');
      const menuEl = root.querySelector('.site-header__menu-toggle');
      const localeEl = root.querySelector('.locale-switcher');
      if (!themeEl || !menuEl || !localeEl) return null;
      const themeBox = themeEl.getBoundingClientRect();
      const menuBox = menuEl.getBoundingClientRect();
      const label = themeEl.querySelector('.theme-toggle__label') as HTMLElement | null;
      const labelStyles = label ? getComputedStyle(label) : null;
      return {
        theme: { width: themeBox.width, height: themeBox.height },
        menu: { width: menuBox.width, height: menuBox.height },
        labelHidden:
          labelStyles?.clip === 'rect(0px, 0px, 0px, 0px)' ||
          labelStyles?.clipPath === 'inset(50%)' ||
          labelStyles?.width === '1px',
      };
    });

    expect(sizes).toBeTruthy();
    expect(sizes?.theme.height).toBeGreaterThanOrEqual(40);
    expect(sizes?.theme.height).toBeLessThanOrEqual(44);
    expect(sizes?.menu.height).toBeGreaterThanOrEqual(40);
    expect(sizes?.menu.height).toBeLessThanOrEqual(44);
    expect(Math.abs((sizes?.theme.width ?? 0) - (sizes?.menu.width ?? 0))).toBeLessThan(4);
    expect(sizes?.labelHidden).toBe(true);
  });

  test('theme toggle keeps an accessible stateful label', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en');
    const toggle = page.locator('.site-header .theme-toggle').first();
    await expect(toggle).toHaveAttribute('aria-label', /Theme:/i);
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-label', /Theme:/i);
  });

  test('mobile menu opens, traps focus, closes, and returns focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en');

    const toggle = page.locator('.site-header__menu-toggle');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.site-header__mobile-panel')).toBeVisible();

    await page.keyboard.press('Tab');
    const focusedInPanel = await page.evaluate(() => {
      const panel = document.querySelector('.site-header__mobile-panel');
      return panel?.contains(document.activeElement) ?? false;
    });
    expect(focusedInPanel).toBe(true);

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });

  test('active navigation state does not inflate link dimensions', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en');
    await page.locator('#work').scrollIntoViewIfNeeded();
    await expect(page.locator('.site-header__nav-link[aria-current="true"]')).toHaveCount(1);

    const sizes = await page.locator('.site-header__nav-link').evaluateAll((links) =>
      links.map((link) => {
        const rect = link.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          active: link.getAttribute('aria-current') === 'true',
        };
      }),
    );

    const active = sizes.find((entry) => entry.active);
    const inactive = sizes.filter((entry) => !entry.active);
    expect(active).toBeTruthy();
    if (!active) return;

    for (const link of inactive) {
      expect(Math.abs(link.height - active.height)).toBeLessThan(6);
    }
  });
});
