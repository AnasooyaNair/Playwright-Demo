import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import { signupNewUser } from "../utils/signupUtils";
import dataSet from "../utils/testData.json";

for (const data of dataSet.loginData) {
  test(`Login Test - ${data.scenario}`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    let username;
    let password;

    // VALID USERNAME: Create a new account first
    if (data.usernamePrefix) {
  
      const signupPassword =
        data.expectedMessage === "Wrong password."
          ? dataSet.signupData[0].password
          : data.password;

      const user = await signupNewUser(page, {
        usernamePrefix: data.usernamePrefix,
        password: signupPassword,
      });

      username = user.username;

      // Password used for login
      password = data.password;
    } else {
      // INVALID USERNAME: Generate a username without signing up
      username = data.username + Date.now();
      password = data.password;

      await loginPage.openApplication();
    }

    await loginPage.openLogin();

    // VALID LOGIN
    if (!data.expectedMessage) {
      await loginPage.login(username, password);

      await expect(loginPage.welcomeMessage).toHaveText(`Welcome ${username}`);

      //await loginPage.logout();
    } else {
      // INVALID LOGIN
      const loginDialogHandler = async (dialog) => {
        const actualMessage = dialog.message();
        expect(actualMessage).toBe(data.expectedMessage);
        await dialog.accept();
      };

      page.on("dialog", loginDialogHandler);
      await loginPage.login(username, password);
      page.off("dialog", loginDialogHandler);
    }
  });
}
