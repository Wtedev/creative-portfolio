import { test } from '@playwright/test';
import path from 'node:path';

const outputDir = path.join('/tmp', 'portfolio-phase5-screenshots');

const scenarios = [
  { name: 'en-dark-1440', path: '/en', theme: 'dark', width: 1440, height: 900 },
  { name: 'en-light-1440', path: '/en', theme: 'light', width: 1440, height: 900 },
  { name: 'ar-dark-1440', path: '/ar', theme: 'dark', width: 1440, height: 900 },
  { name: 'ar-light-1440', path: '/ar', theme: 'light', width: 1440, height: 900 },
  { name: 'en-dark-768', path: '/en', theme: 'dark', width: 768, height: 1024 },
  { name: 'ar-light-768', path: '/ar', theme: 'light', width: 768, height: 1024 },
  { name: 'en-dark-375', path: '/en', theme: 'dark', width: 375, height: 812 },
  { name: 'en-light-375', path: '/en', theme: 'light', width: 375, height: 812 },
  { name: 'ar-dark-375', path: '/ar', theme: 'dark', width: 375, height: 812 },
  { name: 'ar-light-375', path: '/ar', theme: 'light', width: 375, height: 812 },
  { name: 'en-dark-320', path: '/en', theme: 'dark', width: 320, height: 568 },
  { name: 'ar-light-320', path: '/ar', theme: 'light', width: 320, height: 568 },
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
  {
    name: 'case-ar-light-mobile',
    path: '/ar/project/sample-project',
    theme: 'light',
    width: 375,
    height: 812,
  },
] as const;

test.describe('Phase 5 visual verification', () => {
  for (const scenario of scenarios) {
    test(`capture ${scenario.name}`, async ({ page }) => {
      await page.setViewportSize({ width: scenario.width, height: scenario.height });
      await page.goto(scenario.path);
      await page.evaluate((theme) => {
        document.documentElement.setAttribute('data-theme', theme);
      }, scenario.theme);
      await page.waitForTimeout(350);
      await page.screenshot({
        path: path.join(outputDir, `${scenario.name}.png`),
        fullPage: true,
      });
    });
  }
});
