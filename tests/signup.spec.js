import { test, expect } from "@playwright/test";
import { SignupPage } from "../pages/signuppage";
import { signupNewUser } from "../utils/signupUtils";
import dataSet from "../utils/testData.json";

for (const data of dataSet.signupData) {
    test(`Signup Test - ${data.scenario}`, async ({ page }) => {

        if (data.expectedMessage === "Sign up successful.") {
            const user = await signupNewUser(page, data);
            console.log("Created user:", user.username);
        } else {
            const signupPage = new SignupPage(page);

            await signupPage.openApplication();
            await signupPage.openSignup();
            await signupPage.enterDetails(
                data.usernamePrefix,
                data.password
            );

            await signupPage.closeSignup();
            await expect(signupPage.signupModal).toBeHidden();
        }
    });
}