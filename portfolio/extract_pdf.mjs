import { chromium } from 'playwright';

const browser = await chromium.launch({ 
  headless: true,
  args: ['--disable-pdf-viewer'] // prevent download, force render
});
const context = await browser.newContext({
  acceptDownloads: false,
});
const page = await context.newPage();
await page.setViewportSize({ width: 1400, height: 900 });

// Use file:// URL so Chromium renders it natively
const pdfPath = 'H:/pibric/portfolio/Inventory Analysis.pdf';
await page.goto(`file:///${pdfPath.replace(/\/g, '/')}`, { timeout: 10000 }).catch(e => console.log('goto note:', e.message));
await new Promise(r => setTimeout(r, 3000));

const text = await page.evaluate(() => document.body?.innerText || document.documentElement?.innerText || '').catch(() => '');
console.log('=== TEXT ===');
console.log(text.slice(0, 2000));

await page.screenshot({ 
  path: 'h:/pibric/portfolio/public/case-studies/inventory-thumbnail.png',
  fullPage: false
});
console.log('Screenshot saved');

await browser.close();
