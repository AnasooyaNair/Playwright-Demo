export class HomePage{
    constructor(page){
        this.page = page;
        //Locators
        this.productLinks = page.locator('.card-title a');
        this.category = page.locator('#itemc');
    }

    async selectCategory(categoryName){
        await this.category.filter({ hasText: categoryName }).click();
    }

    async selectProduct(productName){
        await this.productLinks.filter({ hasText: productName}).click();
    }


}