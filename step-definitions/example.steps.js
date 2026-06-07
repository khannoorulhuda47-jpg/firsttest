const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let page;
let cartCount = 0;
let productPage;
let cartPage;
let checkoutPage;

// Mock page objects for now
class ProductPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToProductPage() {
    await this.page.goto('http://localhost:3000/products');
  }

  async verifyProductPageIsLoaded() {
    const heading = await this.page.locator('h1').textContent();
    if (!heading || !heading.includes('Product')) {
      throw new Error('Product page not loaded');
    }
  }

  async clickAddToCartButton() {
    await this.page.click('button:has-text("Add to Cart")');
    await this.page.waitForTimeout(500);
  }

  async verifyItemAddedToCart() {
    const successMessage = await this.page.locator('.success-message').isVisible();
    if (!successMessage) {
      throw new Error('Item was not added to the cart');
    }
  }
}

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToCartPage() {
    await this.page.goto('http://localhost:3000/cart');
  }

  async verifyCartHasItems() {
    const cartItems = await this.page.locator('.cart-item').count();
    if (cartItems === 0) {
      throw new Error('No items in cart');
    }
  }

  async removeItem() {
    await this.page.click('.cart-item button:has-text("Remove")');
    await this.page.waitForTimeout(500);
  }

  async verifyCartIsUpdated() {
    const updateMessage = await this.page.locator('.update-message').isVisible();
    if (!updateMessage) {
      throw new Error('Cart was not updated');
    }
  }

  async verifyItemRemovedFromCart() {
    const removeButton = await this.page.locator('.cart-item button:has-text("Remove")').count();
    if (removeButton > 0) {
      const message = await this.page.locator('.error-message').textContent();
      if (!message || !message.includes('removed')) {
        throw new Error('Item is still visible in cart');
      }
    }
  }

  async getCartCount() {
    const cartCountText = await this.page.locator('.cart-count').textContent();
    return parseInt(cartCountText || '0');
  }

  async verifyCartCountIncremented(expectedCount) {
    const pageCartCount = await this.getCartCount();
    if (pageCartCount !== expectedCount) {
      throw new Error(`Expected cart count ${expectedCount}, but got ${pageCartCount}`);
    }
  }

  async clickCheckoutButton() {
    await this.page.click('button:has-text("Checkout")');
    await this.page.waitForTimeout(1000);
  }
}

class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async verifyCheckoutPageLoaded() {
    const url = this.page.url();
    if (!url.includes('/checkout')) {
      throw new Error('User was not redirected to checkout page');
    }
  }

  async verifyOrderSummaryDisplayed() {
    const orderSummary = await this.page.locator('.order-summary').isVisible();
    if (!orderSummary) {
      throw new Error('Order summary was not displayed');
    }
  }

  async verifyOrderSummaryHasItems() {
    const items = await this.page.locator('.order-item').count();
    if (items === 0) {
      throw new Error('No items in order summary');
    }
  }
}

Before(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  cartCount = 0;
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
});

After(async () => {
  await page.close();
  await browser.close();
});

Given('the user is on the product page', async () => {
  await productPage.navigateToProductPage();
  await productPage.verifyProductPageIsLoaded();
});

When('the user clicks add to cart button', async () => {
  await productPage.clickAddToCartButton();
  cartCount++;
});

Then('the item should be added to the cart', async () => {
  await productPage.verifyItemAddedToCart();
});

Then('the cart count should increase by one', async () => {
  await cartPage.verifyCartCountIncremented(cartCount);
});

Given('the user has items in the cart', async () => {
  await cartPage.navigateToCartPage();
  await cartPage.verifyCartHasItems();
});

When('the user removes an item', async () => {
  await cartPage.removeItem();
});

Then('the cart should be updated', async () => {
  await cartPage.verifyCartIsUpdated();
});

Then('the item should no longer be visible', async () => {
  await cartPage.verifyItemRemovedFromCart();
});

When('the user clicks the checkout button', async () => {
  await cartPage.clickCheckoutButton();
});

Then('the user should be redirected to the checkout page', async () => {
  await checkoutPage.verifyCheckoutPageLoaded();
});

Then('the order summary should be displayed', async () => {
  await checkoutPage.verifyOrderSummaryDisplayed();
  await checkoutPage.verifyOrderSummaryHasItems();
});
