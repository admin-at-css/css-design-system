import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  { name: 'index', file: 'index.html', fullPage: true },
  { name: 'color-palette', file: 'color-palette.html', fullPage: true },
  { name: 'typography-scale', file: 'typography-scale.html', fullPage: true },
  { name: 'spacing-scale', file: 'spacing-scale.html', fullPage: true },
  { name: 'shadow-elevation', file: 'shadow-elevation.html', fullPage: true },
  { name: 'component-showcase', file: 'component-showcase.html', fullPage: true },
  { name: 'neutral-palette', file: 'gray-tone-comparison.html', fullPage: true },
];

async function takeScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2, // Retina quality
  });

  const referencesDir = path.join(__dirname, '../references');
  const screenshotsDir = path.join(__dirname, '../docs/screenshots');

  for (const pageInfo of pages) {
    const page = await context.newPage();
    const filePath = `file://${path.join(referencesDir, pageInfo.file)}`;

    console.log(`Taking screenshot of ${pageInfo.name}...`);

    await page.goto(filePath);
    await page.waitForLoadState('networkidle');

    // Wait a bit for fonts to load
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: path.join(screenshotsDir, `${pageInfo.name}.png`),
      fullPage: pageInfo.fullPage,
    });

    // Also take a viewport-only version for hero images
    if (pageInfo.name === 'index') {
      await page.screenshot({
        path: path.join(screenshotsDir, `${pageInfo.name}-hero.png`),
        fullPage: false,
      });
    }

    await page.close();
  }

  await browser.close();
  console.log('Screenshots saved to docs/screenshots/');
}

takeScreenshots().catch(console.error);
