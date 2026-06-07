import { Page } from 'playwright';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  private readonly PRODUCT_PAGE_URL = 'http://localhost:3000/products';
  private readonly ADD_TO_CART_BUTTON = 'button:has-text("Add to Cart")';
  private readonly PAGE_HEADING = 'h1';
  private readonly SUCCESS_MESSAGE = '.success-message';

  constructor(page: Page) {
    super(page);
  }

  async navigateToProductPage(): Promise<void> {
    await this.goto(this.PRODUCT_PAGE_URL);
  }

  async verifyProductPageIsLoaded(): Promise<void> {
    const heading = await this.getText(this.PAGE_HEADING);
    if (!heading?.includes('Product')) {
      throw new Error('Product page not loaded');
    }
  }

  async clickAddToCartButton(): Promise<void> {
    await this.click(this.ADD_TO_CART_BUTTON);
    await this.waitForTimeout(500);
  }

  async verifyItemAddedToCart(): Promise<void> {
    const successMessage = await this.isVisible(this.SUCCESS_MESSAGE);
    if (!successMessage) {
      throw new Error('Item was not added to the cart');
    }
  }
}
