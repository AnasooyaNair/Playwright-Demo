# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchase.spec.js >> Purchase Test - Purchase Phone
- Location: tests\purchase.spec.js:12:5

# Error details

```
TypeError: Cannot read properties of undefined (reading 'customerName')
```

# Page snapshot

```yaml
- generic [ref=f3e1]:
  - dialog "Place order" [active] [ref=f3e2]:
    - document [ref=f3e3]:
      - generic [ref=f3e4]:
        - generic [ref=f3e5]:
          - heading "Place order" [level=5] [ref=f3e6]
          - button "Close" [ref=f3e7] [cursor=pointer]: ×
        - generic [ref=f3e9]:
          - generic [ref=f3e10]: "Total: 360"
          - generic [ref=f3e11]:
            - generic [ref=f3e12]: "Name:"
            - 'textbox "Total: 360 Name:" [ref=f3e13]'
          - generic [ref=f3e14]:
            - generic [ref=f3e15]: "Country:"
            - textbox "Country:" [ref=f3e16]
          - generic [ref=f3e17]:
            - generic [ref=f3e18]: "City:"
            - textbox "City:" [ref=f3e19]
          - generic [ref=f3e20]:
            - generic [ref=f3e21]: "Credit card:"
            - textbox "Credit card:" [ref=f3e22]
          - generic [ref=f3e23]:
            - generic [ref=f3e24]: "Month:"
            - textbox "Month:" [ref=f3e25]
          - generic [ref=f3e26]:
            - generic [ref=f3e27]: "Year:"
            - textbox "Year:" [ref=f3e28]
        - generic [ref=f3e30]:
          - button "Close" [ref=f3e31]
          - button "Purchase" [ref=f3e32]
  - text:             
  - navigation [ref=f3e33]:
    - generic [ref=f3e34]:
      - link "PRODUCT STORE" [ref=f3e35] [cursor=pointer]:
        - /url: index.html
      - list [ref=f3e38]:
        - listitem [ref=f3e39]:
          - link "Home (current)" [ref=f3e40] [cursor=pointer]:
            - /url: index.html
            - text: Home
            - generic [ref=f3e41]: (current)
        - listitem [ref=f3e42]:
          - link "Contact" [ref=f3e43] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=f3e44]:
          - link "About us" [ref=f3e45] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=f3e46]:
          - link "Cart" [ref=f3e47] [cursor=pointer]:
            - /url: "#"
        - listitem
        - listitem [ref=f3e48]:
          - link "Log out" [ref=f3e49] [cursor=pointer]:
            - /url: "#"
        - listitem [ref=f3e50]:
          - link "Welcome PurchaseUser1795578931205" [ref=f3e51] [cursor=pointer]:
            - /url: "#"
        - listitem
  - generic [ref=f3e53]:
    - generic [ref=f3e54]:
      - heading "Products" [level=2] [ref=f3e55]
      - table [ref=f3e57]:
        - rowgroup [ref=f3e58]:
          - row [ref=f3e59]:
            - columnheader "Pic" [ref=f3e60]
            - columnheader "Title" [ref=f3e61]
            - columnheader "Price" [ref=f3e62]
            - columnheader "x" [ref=f3e63]
        - rowgroup [ref=f3e64]:
          - row [ref=f3e65]:
            - cell [ref=f3e66]
            - cell "Samsung galaxy s6" [ref=f3e68]
            - cell "360" [ref=f3e69]
            - cell [ref=f3e70]:
              - link "Delete" [ref=f3e71] [cursor=pointer]:
                - /url: "#"
    - generic [ref=f3e72]:
      - heading "Total" [level=2] [ref=f3e73]
      - heading "360" [level=3] [ref=f3e76]
      - button "Place Order" [ref=f3e77]
  - generic [ref=f3e79]:
    - generic [ref=f3e82]:
      - heading "About Us" [level=4] [ref=f3e83]
      - paragraph [ref=f3e84]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=f3e87]:
      - heading "Get in Touch" [level=4] [ref=f3e88]
      - paragraph [ref=f3e89]: "Address: 2390 El Camino Real"
      - paragraph [ref=f3e90]: "Phone: +440 123456"
      - paragraph [ref=f3e91]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=f3e95]
  - contentinfo [ref=f3e97]:
    - paragraph [ref=f3e98]: Copyright © Product Store
```

# Test source

```ts
  1  | 
  2  | import { test, expect } from "@playwright/test";
  3  | import { LoginPage } from "../pages/loginpage";
  4  | import { ProductPage } from "../pages/productpage";
  5  | import { HomePage } from "../pages/homepage";
  6  | import { CartPage } from "../pages/cartpage";
  7  | import { signupNewUser } from "../utils/signupUtils";
  8  | import dataSet from "../utils/testData.json";
  9  | import customerDetailsData from "../utils/testCustomerData.json";
  10 | 
  11 | for (const data of dataSet.purchaseData) {
  12 |     test(`Purchase Test - ${data.scenario}`, async ({ page }) => {
  13 | 
  14 |         const loginPage = new LoginPage(page);
  15 |         const homePage = new HomePage(page);
  16 |         const productPage = new ProductPage(page);
  17 |         const cartPage = new CartPage(page);
  18 | 
  19 |         // Step 1: Signup using reusable helper
  20 |         const user = await signupNewUser(page, data);
  21 | 
  22 |         // Step 2: Login
  23 |         await loginPage.openLogin();
  24 |         await loginPage.login(user.username, user.password);
  25 | 
  26 |         await expect(loginPage.welcomeMessage)
  27 |             .toHaveText(`Welcome ${user.username}`);
  28 | 
  29 |         // Step 3: Select product
  30 |         if (data.category) {
  31 |             await homePage.selectCategory(data.category);
  32 |         }
  33 | 
  34 |         await homePage.selectProduct(data.product);
  35 |         await productPage.validateProduct(data.product, data.price);
  36 | 
  37 |         // Step 4: Add product to cart
  38 |         const cartDialogHandler = async (dialog) => {
  39 |             expect(dialog.message())
  40 |                 .toBe(data.expectedMessageProductToCart);
  41 | 
  42 |             await dialog.accept();
  43 |         };
  44 | 
  45 |         page.on("dialog", cartDialogHandler);
  46 | 
  47 |         await productPage.addToCart();
  48 | 
  49 |         page.off("dialog", cartDialogHandler);
  50 | 
  51 |         // Step 5: Open cart and place order
  52 |         await productPage.openCartLink();
  53 |         await cartPage.placeOrder();
  54 |       const customer = customerDetailsData.customerData;
  55 |         // Step 6: Enter customer details
  56 |         await cartPage.enterDetails(
> 57 |             customer.customerName,
     |                      ^ TypeError: Cannot read properties of undefined (reading 'customerName')
  58 |             customer.country,
  59 |             customer.city,
  60 |             customer.card,
  61 |             customer.month,
  62 |             customer.year
  63 |         );
  64 | 
  65 |         // Step 7: Purchase
  66 |         await cartPage.clickPurchase();
  67 | 
  68 |         // Step 8: Validate purchase confirmation
  69 |         await cartPage.validatePurchase(data);
  70 | 
  71 |         // Step 9: Close confirmation
  72 |         await cartPage.closeConfirmation();
  73 |     });
  74 | }
```