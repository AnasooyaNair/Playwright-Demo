import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import { ProductPage } from "../pages/productpage";
import { HomePage } from "../pages/homepage";
import { CartPage } from "../pages/cartpage";
import { signupNewUser } from "../utils/signupUtils";
import dataSet from "../utils/testData.json";
import customerDetailsData from "../utils/testCustomerData.json";

for (const data of dataSet.purchaseData) {
  test(`Purchase Test - ${data.scenario}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Step 1: Signup using reusable helper
    const user = await signupNewUser(page, data);

    // Step 2: Login
    await loginPage.openLogin();
    await loginPage.login(user.username, user.password);

    await expect(loginPage.welcomeMessage).toHaveText(
      `Welcome ${user.username}`,
    );

    // Step 3: Select product
    if (data.category) {
      await homePage.selectCategory(data.category);
    }

    await homePage.selectProduct(data.product);
    await productPage.validateProduct(data.product, data.price);

    // Step 4: Add product to cart
    const cartDialogHandler = async (dialog) => {
      expect(dialog.message()).toBe(data.expectedMessageProductToCart);

      await dialog.accept();
    };

    page.on("dialog", cartDialogHandler);

    await productPage.addToCart();

    page.off("dialog", cartDialogHandler);

    // Step 5: Open cart and place order
    await productPage.openCartLink();
    await cartPage.placeOrder();

    const customer = customerDetailsData.customerData[0];
    // Step 6: Enter customer details
    await cartPage.enterDetails(
      customer.customerName,
      customer.country,
      customer.city,
      customer.card,
      customer.month,
      customer.year,
    );

    // Step 7: Purchase
    await cartPage.clickPurchase();

    // Step 8: Validate purchase confirmation
    await cartPage.validatePurchase(data);

    // Step 9: Close confirmation
    await cartPage.closeConfirmation();
  });
}
