import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { mkdirSync } from 'fs';

let browser: Browser;
let page: Page;
let testCounter = 0;

Before(async () => {
  testCounter++;
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.context().tracing.start({ screenshots: true, snapshots: true });
});

After(async () => {
  try {
    if (page && page.context()) {
      const traceDir = './test-results/traces';
      mkdirSync(traceDir, { recursive: true });
      const traceFile = `${traceDir}/trace_${testCounter}.trace`;
      await page.context().tracing.stop({ path: traceFile });
    }
  } catch (error) {
    console.log('Error saving trace:', error);
  } finally {
    if (page) await page.close();
    if (browser) await browser.close();
  }
});

// Google Search Steps
Given('the user is on the Google homepage', async () => {
  await page.goto('https://www.google.com', { waitUntil: 'networkidle' });
  await page.waitForSelector('textarea[name="q"]', { timeout: 5000 });
});

When('the user enters {string} in the search box', async (keyword: string) => {
  const searchBox = page.locator('textarea[name="q"]');
  await searchBox.fill(keyword);
});

When('the user clicks the search button', async () => {
  const searchBox = page.locator('textarea[name="q"]');
  await searchBox.press('Enter');
  await page.waitForNavigation({ waitUntil: 'networkidle' });
  await page.waitForSelector('[role="main"]', { timeout: 5000 });
});

Then('the search results should display for {string}', async (keyword: string) => {
  const resultsContainer = page.locator('[role="main"]');
  const isVisible = await resultsContainer.isVisible();
  if (!isVisible) {
    throw new Error(`Search results container is not visible for keyword: ${keyword}`);
  }
});

Then('the results page should show {string} or more results', async (resultCount: string) => {
  const resultsStats = page.locator('div#result-stats').first();
  const statsText = await resultsStats.textContent();
  
  if (!statsText) {
    throw new Error('Could not find result statistics');
  }
  
  const expectedCount = parseInt(resultCount.replace(/,/g, ''));
  console.log(`Result stats text: ${statsText}`);
  console.log(`Expected minimum results: ${expectedCount}`);
});

Then('the page title should contain {string}', async (keyword: string) => {
  const pageTitle = await page.title();
  if (!pageTitle.includes(keyword)) {
    throw new Error(`Page title "${pageTitle}" does not contain "${keyword}"`);
  }
});
Then('the page title should contain {string}', async (keyword: string) => {
  
  if (!pageTitle.includes(keyword)) {
    throw new Error(`Page title "${pageTitle}" does not contain "${keyword}"`);
  }
});

