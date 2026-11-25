import { expect } from "@playwright/test";
export class ProductPage{ 
    constructor(page){
        this.page = page;
        //Locators
        this.productName = page.locator('//h2[@class="name"]');
        this.productPrice = page.locator('//h3[@class="price-container"]');
        this.addToCartLink = page.getByRole("link", { name: "Add to cart" });
        this.cartLink = page.locator('#cartur');
    }

    
    async validateProduct(expectedProduct, expectedPrice){
          await expect(this.productName).toHaveText(expectedProduct);
          await expect(this.productPrice).toContainText(expectedPrice);
    }

    async addToCart(){
        await expect(this.addToCartLink).toBeVisible();
        await this.addToCartLink.click();
    }

    async openCartLink(){
        await this.cartLink.click();
    }

}