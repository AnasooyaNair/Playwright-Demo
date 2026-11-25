
import { expect } from "@playwright/test";
import { SignupPage } from "../pages/signuppage";
import dataSet from "../utils/testData.json";

export const signupNewUser = async (page, data) => {
    const signupPage = new SignupPage(page);

    // Generate unique username
    const username = data.usernamePrefix + Date.now();
    const password = data.password;

    await signupPage.openApplication();
    await signupPage.openSignup();
    await signupPage.enterDetails(username, password);

    // Handle signup alert
    const signupDialogHandler = async (dialog) => {
        expect(dialog.message()).toBe(dataSet.signupData[0].expectedMessage);
        console.log(dialog.message());
        await dialog.accept();
    };

    page.on("dialog", signupDialogHandler);

    await signupPage.clickSignupBtn();

    // Remove listener after signup
    page.off("dialog", signupDialogHandler);

    return { username, password };
}