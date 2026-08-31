import { test } from '@playwright/test';
import path from 'node:path';

const outputDir = path.join('/tmp', 'portfolio-phase4-screenshots');

const scenarios = [
  {
    name: 'case-en-dark-desktop',
    path: '/en/project/sample-project',
    theme: 'dark',
    width: 1440,
    height: 900,
  },
  {
    name: 'case-en-light-mobile',
    path: '/en/project/sample-project',
    theme: 'light',
    width: 375,
    height: 812,
  },
  {
    name: 'case-ar-dark-desktop',
    path: '/ar/project/sample-project',
    theme: 'dark',
    width: 1440,
    height: 900,
  },
  { name: 'home-en-dark-desktop', path: '/en', theme: 'dark', width: 1440, height: 900 },
] as const;

test.describe('Phase 4 visual verification', () => {
  for (const scenario of scenarios) {
    test(`capture ${scenario.name}`, async ({ page }) => {
      await page.setViewportSize({ width: scenario.width, height: scenario.height });
      await page.goto(scenario.path);
      await page.evaluate((theme) => {
        document.documentElement.setAttribute('data-theme', theme);
      }, scenario.theme);
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(outputDir, `${scenario.name}.png`),
        fullPage: true,
      });
    });
  }
});
