import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import { signupNewUser } from "../utils/signupUtils";
import dataSet from "../utils/testData.json";

for (const data of dataSet.logoutData) {

    test(`Logout Test - ${data.scenario}`, async ({ page }) => {

        const loginPage = new LoginPage(page);

        // Create a new user using test data
        const user = await signupNewUser(page, data);

        // Login with newly registered credentials
        await loginPage.openLogin();
        await loginPage.login(user.username, user.password);

        await expect(loginPage.welcomeMessage)
            .toHaveText(`Welcome ${user.username}`);

        // Logout
        await loginPage.logout();

        // Verify logout
        await expect(loginPage.loginLink).toBeVisible();
        await expect(loginPage.welcomeMessage).toBeHidden();
    });
}