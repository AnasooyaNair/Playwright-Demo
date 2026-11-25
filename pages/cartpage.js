import { expect } from "@playwright/test";
export class CartPage {
  constructor(page) {
    this.page = page;
    //Locators
    this.orderModal = page.locator("#orderModal");
    this.placeOrderBtn = page.locator('//button[text()="Place Order"]');
    this.customerName = page.locator("#name");
    this.country = page.locator("#country");
    this.city = page.locator("#city");
    this.card = page.locator("#card");
    this.month = page.locator("#month");
    this.year = page.locator("#year");
    this.purchaseBtn = page.locator('#orderModal button.btn-primary');
    this.confirmationMessage = page.locator('//h2[text()="Thank you for your purchase!"]');
    this.confirmationDetails = page.locator('.lead.text-muted');
    this.okBtn = page.getByRole('button', { name: 'OK' });
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
    await expect(this.orderModal).toBeVisible();
  }

  async enterDetails(customerName, country, city, card, month, year) {
    await expect(this.customerName).toBeVisible();
    await this.customerName.fill(customerName);
    await this.country.fill(country);
    await this.city.fill(city);
    await this.card.fill(card);
    await this.month.fill(month);
    await this.year.fill(year);
  }

  async clickPurchase() {
    await this.purchaseBtn.waitFor({ state: "visible" });
    await this.purchaseBtn.click();
  }

  async validatePurchase(data){
    await expect(this.confirmationMessage).toBeVisible();
    await expect(this.confirmationMessage).toContainText(data.expectedMessage);
    await expect(this.confirmationDetails)
            .toContainText(`Name: ${data.expectedName}`);
    await expect(this.confirmationDetails).toContainText(`Amount: ${data.expectedAmount}`);

}

  async closeConfirmation() {
        await this.okBtn.click();
    }
}
