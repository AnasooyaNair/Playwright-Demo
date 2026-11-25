# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> Login Test - Valid username and invalid password
- Location: tests\login.spec.js:9:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Wrong password."
Received: undefined
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - navigation [ref=f1e2]:
    - link "PRODUCT STORE" [ref=f1e3] [cursor=pointer]:
      - /url: index.html
    - list [ref=f1e6]:
      - listitem [ref=f1e7]:
        - link "Home (current)" [ref=f1e8] [cursor=pointer]:
          - /url: index.html
          - text: Home
          - generic [ref=f1e9]: (current)
      - listitem [ref=f1e10]:
        - link "Contact" [ref=f1e11] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=f1e12]:
        - link "About us" [ref=f1e13] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=f1e14]:
        - link "Cart" [ref=f1e15] [cursor=pointer]:
          - /url: cart.html
      - listitem [ref=f1e16]:
        - link "Log in" [ref=f1e17] [cursor=pointer]:
          - /url: "#"
      - listitem
      - listitem
      - listitem [ref=f1e18]:
        - link "Sign up" [ref=f1e19] [cursor=pointer]:
          - /url: "#"
    - generic [ref=f1e21]:
      - list [ref=f1e22]:
        - listitem [ref=f1e23] [cursor=pointer]
        - listitem [ref=f1e24] [cursor=pointer]
        - listitem [ref=f1e25] [cursor=pointer]
      - img "First slide" [ref=f1e28]
      - button "Previous" [ref=f1e29] [cursor=pointer]
      - button "Next" [ref=f1e32] [cursor=pointer]
  - generic [ref=f1e36]:
    - generic [ref=f1e38]:
      - link "CATEGORIES" [ref=f1e39] [cursor=pointer]:
        - /url: ""
      - link "Phones" [ref=f1e40] [cursor=pointer]:
        - /url: "#"
      - link "Laptops" [ref=f1e41] [cursor=pointer]:
        - /url: "#"
      - link "Monitors" [ref=f1e42] [cursor=pointer]:
        - /url: "#"
    - list [ref=f1e45]:
      - listitem [ref=f1e46]:
        - button "Previous" [ref=f1e47]
      - listitem [ref=f1e48]:
        - button "Next" [ref=f1e49] [cursor=pointer]
  - generic [ref=f1e51]:
    - generic [ref=f1e54]:
      - heading "About Us" [level=4] [ref=f1e55]
      - paragraph [ref=f1e56]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=f1e59]:
      - heading "Get in Touch" [level=4] [ref=f1e60]
      - paragraph [ref=f1e61]: "Address: 2390 El Camino Real"
      - paragraph [ref=f1e62]: "Phone: +440 123456"
      - paragraph [ref=f1e63]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=f1e67]
  - contentinfo [ref=f1e69]:
    - paragraph [ref=f1e70]: Copyright © Product Store
```

# Test source

```ts
  1  | 
  2  | import { test, expect } from "@playwright/test";
  3  | import { LoginPage } from "../pages/loginpage";
  4  | import { signupNewUser } from "../utils/signupUtils";
  5  | import dataSet from "../utils/testData.json";
  6  | 
  7  | for (const data of dataSet.loginData) {
  8  | 
  9  |     test(`Login Test - ${data.scenario}`, async ({ page }) => {
  10 | 
  11 |         const loginPage = new LoginPage(page);
  12 |         let username;
  13 |         let password;
  14 | 
  15 |         // Create a new user for valid username scenarios
  16 |         if (data.usernamePrefix) {
  17 |         const user = await signupNewUser(page, data);
  18 | 
  19 |             username = user.username;
  20 |             password = data.password;
  21 | 
  22 |         } else {
  23 |             // Use invalid username from test data
  24 |             await loginPage.openApplication();
  25 |             username = data.username;
  26 |             password = data.password;
  27 |         }
  28 | 
  29 |         await loginPage.openLogin();
  30 | 
  31 |         if (!data.expectedMessage) {
  32 | 
  33 |             // Valid login
  34 |             await loginPage.login(username, data.password);
  35 | 
  36 |             await expect(loginPage.welcomeMessage).toBeVisible();
  37 |             await expect(loginPage.welcomeMessage)
  38 |                 .toHaveText(`Welcome ${username}`);
  39 | 
  40 |             await loginPage.logout();
  41 | 
  42 |         } else {
  43 | 
  44 |             // Invalid login - handle browser alert
  45 |             let actualMessage;
  46 | 
  47 |             const loginDialogHandler = async (dialog) => {
  48 |                 actualMessage = dialog.message();
  49 |                 console.log(actualMessage);
  50 |                 await dialog.accept();
  51 |             };
  52 | 
  53 |             page.on("dialog", loginDialogHandler);
  54 | 
  55 |             await loginPage.login(username, data.password);
  56 | 
  57 |             page.off("dialog", loginDialogHandler);
  58 | 
> 59 |             expect(actualMessage).toBe(data.expectedMessage);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  60 |         }
  61 |     });
  62 | }
```