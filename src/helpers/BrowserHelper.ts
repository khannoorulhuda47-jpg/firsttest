import { Browser, BrowserContext, Page } from 'playwright';

export class BrowserHelper {
  private static browser: Browser;
  private static context: BrowserContext;
  private static page: Page;

  static async initBrowser(browserType: string = 'chromium'): Promise<void> {
    const { chromium, firefox, webkit } = await import('playwright');
    
    const browserMap = {
      chromium,
      firefox,
      webkit,
    };

    const selectedBrowser = browserMap[browserType as keyof typeof browserMap] || chromium;
    this.browser = await selectedBrowser.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  static getPage(): Page {
    return this.page;
  }

  static async closeBrowser(): Promise<void> {
    await this.context.close();
    await this.browser.close();
  }

  static async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  static async fillInput(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  static async clickElement(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  static async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  static async getText(selector: string): Promise<string | null> {
    return this.page.locator(selector).textContent();
  }

  static async isElementVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible();
  }
}
