import { Page } from 'playwright';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly LOGIN_PAGE_URL = 'http://localhost:3000/login';
  private readonly EMAIL_INPUT = 'input[name="email"]';
  private readonly PASSWORD_INPUT = 'input[name="password"]';
  private readonly LOGIN_BUTTON = 'button[type="submit"]';
  private readonly PAGE_HEADING = 'h1';
  private readonly ERROR_MESSAGE = '.error-message';
  private readonly DASHBOARD_PAGE_PATH = '/dashboard';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLoginPage(): Promise<void> {
    await this.goto(this.LOGIN_PAGE_URL);
  }

  async verifyLoginPageLoaded(): Promise<void> {
    const heading = await this.getText(this.PAGE_HEADING);
    if (!heading?.includes('Login')) {
      throw new Error('Login page not loaded');
    }
  }

  async enterValidCredentials(): Promise<void> {
    await this.fill(this.EMAIL_INPUT, 'test@example.com');
    await this.fill(this.PASSWORD_INPUT, 'password123');
  }

  async enterInvalidCredentials(): Promise<void> {
    await this.fill(this.EMAIL_INPUT, 'invalid@example.com');
    await this.fill(this.PASSWORD_INPUT, 'wrongpassword');
  }

  async clickLoginButton(): Promise<void> {
    await this.click(this.LOGIN_BUTTON);
    await this.waitForTimeout(1000);
  }

  async verifyDashboardRedirect(): Promise<void> {
    const url = this.getUrl();
    if (!url.includes(this.DASHBOARD_PAGE_PATH)) {
      throw new Error('User was not redirected to dashboard');
    }
  }

  async verifyErrorMessageDisplayed(): Promise<void> {
    const errorMessage = await this.isVisible(this.ERROR_MESSAGE);
    if (!errorMessage) {
      throw new Error('Error message was not displayed');
    }
  }
}
