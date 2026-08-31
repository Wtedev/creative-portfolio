import { test } from '@playwright/test';
import path from 'node:path';

const outputDir = path.join('/tmp', 'portfolio-phase3-screenshots');

const scenarios = [
  { name: 'en-dark-desktop', locale: 'en', theme: 'dark', width: 1440, height: 900 },
  { name: 'en-light-desktop', locale: 'en', theme: 'light', width: 1440, height: 900 },
  { name: 'ar-dark-desktop', locale: 'ar', theme: 'dark', width: 1440, height: 900 },
  { name: 'ar-light-desktop', locale: 'ar', theme: 'light', width: 1440, height: 900 },
  { name: 'en-dark-mobile', locale: 'en', theme: 'dark', width: 375, height: 812 },
  { name: 'en-light-mobile', locale: 'en', theme: 'light', width: 375, height: 812 },
  { name: 'ar-dark-mobile', locale: 'ar', theme: 'dark', width: 375, height: 812 },
  { name: 'ar-light-mobile', locale: 'ar', theme: 'light', width: 375, height: 812 },
] as const;

test.describe('Phase 3 visual verification', () => {
  for (const scenario of scenarios) {
    test(`capture ${scenario.name}`, async ({ page }) => {
      await page.setViewportSize({ width: scenario.width, height: scenario.height });
      await page.goto(`/${scenario.locale}`);
      await page.evaluate((theme) => {
        document.documentElement.setAttribute('data-theme', theme);
      }, scenario.theme);
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(outputDir, `${scenario.name}.png`),
        fullPage: true,
      });
    });
  }
});
