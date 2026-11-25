import { expect } from "@playwright/test";
export class LoginPage{
    constructor(page){
        this.page = page;
        //locators
        this.loginLink = page.locator('#login2');
        this.username = page.locator('#loginusername');
        this.password = page.locator('#loginpassword');
        this.loginBtn = page.locator('#logInModal button.btn-primary');
        this.closeBtn = page.locator("//div[@id='logInModal']//button[@class='btn btn-secondary' and text()='Close']");
        this.welcomeMessage = page.locator('#nameofuser');
        this.logoutLink = page.locator('#logout2');

    }

    async openApplication() {
        await this.page.goto('https://www.demoblaze.com/');
    }

    async openLogin() {
        await this.loginLink.click();
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await expect(this.loginBtn).toBeVisible();
        await this.loginBtn.click();
    }
    async logout(){
        await this.logoutLink.click();
        await expect(this.loginLink).toBeVisible();

    }
}