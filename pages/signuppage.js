import { expect } from "@playwright/test";
export class SignupPage{
    constructor(page){
        this.page = page;
        //locators
        this.sigupLink = page.locator('#signin2');
        this.username = page.locator('#sign-username');
        this.password = page.locator('#sign-password');
        this.signupBtn = page.locator("//div[@id='signInModal']//button[@class='btn btn-primary' and text()='Sign up']")
        this.closeBtn = page.locator("//div[@id='signInModal']//button[@class='btn btn-secondary' and text()='Close']");
        this.signupModal = page.locator('#signInModal');
        
    }
     async openApplication() {
        await this.page.goto('https://www.demoblaze.com/');
    }

     async openSignup() {
        await this.sigupLink.click();
        await expect(this.signupModal).toBeVisible();
        await expect(this.username).toBeVisible();
    }

    async enterDetails(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
    }

    async clickSignupBtn() {
        await this.signupBtn.click();
    }

      async closeSignup() {
        await this.closeBtn.click();
    }
  
}