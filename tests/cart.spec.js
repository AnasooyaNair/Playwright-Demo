import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import { ProductPage } from "../pages/productpage";
import { HomePage } from "../pages/homepage";
import { signupNewUser } from "../utils/signupUtils";
import dataSet from "../utils/testData.json";

for (const data of dataSet.cartData) {
    test(`Cart Test - ${data.scenario}`, async ({ page }) => {

        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);

        // Reusable signup method
        const user = await signupNewUser(page, data);

        // Login with newly created credentials
        await loginPage.openLogin();
        await loginPage.login(user.username, user.password);

        await expect(loginPage.welcomeMessage)
            .toHaveText(`Welcome ${user.username}`);

        // Select category and product
        if (data.category) {
            await homePage.selectCategory(data.category);
        }

        await homePage.selectProduct(data.product);
        await productPage.validateProduct(data.product, data.price);

        // Handle Add to Cart alert
        const cartDialogHandler = async (dialog) => {
            expect(dialog.message()).toBe(data.expectedMessage);
            await dialog.accept();
        };

        page.on("dialog", cartDialogHandler);

        await productPage.addToCart();

        page.off("dialog", cartDialogHandler);
    });
}