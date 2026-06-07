import { Page } from 'playwright';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly CART_PAGE_URL = 'http://localhost:3000/cart';
  private readonly CART_ITEMS = '.cart-item';
  private readonly REMOVE_BUTTON = '.cart-item button:has-text("Remove")';
  private readonly CART_COUNT = '.cart-count';
  private readonly UPDATE_MESSAGE = '.update-message';
  private readonly ERROR_MESSAGE = '.error-message';
  private readonly CHECKOUT_BUTTON = 'button:has-text("Checkout")';

  constructor(page: Page) {
    super(page);
  }

  async navigateToCartPage(): Promise<void> {
    await this.goto(this.CART_PAGE_URL);
  }

  async verifyCartHasItems(): Promise<void> {
    const cartItems = await this.getCount(this.CART_ITEMS);
    if (cartItems === 0) {
      throw new Error('No items in cart');
    }
  }

  async removeItem(): Promise<void> {
    await this.click(this.REMOVE_BUTTON);
    await this.waitForTimeout(500);
  }

  async verifyCartIsUpdated(): Promise<void> {
    const updateMessage = await this.isVisible(this.UPDATE_MESSAGE);
    if (!updateMessage) {
      throw new Error('Cart was not updated');
    }
  }

  async verifyItemRemovedFromCart(): Promise<void> {
    const removeButton = await this.getCount(this.REMOVE_BUTTON);
    
    if (removeButton > 0) {
      const message = await this.getText(this.ERROR_MESSAGE);
      if (!message?.includes('removed')) {
        throw new Error('Item is still visible in cart');
      }
    }
  }

  async getCartCount(): Promise<number> {
    const cartCountText = await this.getText(this.CART_COUNT);
    return parseInt(cartCountText || '0');
  }

  async verifyCartCountIncremented(expectedCount: number): Promise<void> {
    const pageCartCount = await this.getCartCount();
    if (pageCartCount !== expectedCount) {
      throw new Error(`Expected cart count ${expectedCount}, but got ${pageCartCount}`);
    }
  }

  async clickCheckoutButton(): Promise<void> {
    await this.click(this.CHECKOUT_BUTTON);
    await this.waitForTimeout(1000);
  }
}
