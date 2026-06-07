import { Page } from 'playwright';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly ORDER_SUMMARY = '.order-summary';
  private readonly ORDER_ITEMS = '.order-item';
  private readonly CHECKOUT_PAGE_PATH = '/checkout';

  constructor(page: Page) {
    super(page);
  }

  async verifyCheckoutPageLoaded(): Promise<void> {
    const url = this.getUrl();
    if (!url.includes(this.CHECKOUT_PAGE_PATH)) {
      throw new Error('User was not redirected to checkout page');
    }
  }

  async verifyOrderSummaryDisplayed(): Promise<void> {
    const orderSummary = await this.isVisible(this.ORDER_SUMMARY);
    if (!orderSummary) {
      throw new Error('Order summary was not displayed');
    }
  }

  async verifyOrderSummaryHasItems(): Promise<void> {
    const items = await this.getCount(this.ORDER_ITEMS);
    if (items === 0) {
      throw new Error('No items in order summary');
    }
  }

  async verifyOrderSummary(): Promise<void> {
    await this.verifyCheckoutPageLoaded();
    await this.verifyOrderSummaryDisplayed();
    await this.verifyOrderSummaryHasItems();
  }
}
