# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> Login Test - Valid username and valid password
- Location: tests\login.spec.js:9:5

# Error details

```
ReferenceError: password is not defined
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - text:             
  - navigation [ref=e2]:
    - link "PRODUCT STORE" [ref=e3] [cursor=pointer]:
      - /url: index.html
    - list [ref=e6]:
      - listitem [ref=e7]:
        - link "Home (current)" [ref=e8] [cursor=pointer]:
          - /url: index.html
          - text: Home
          - generic [ref=e9]: (current)
      - listitem [ref=e10]:
        - link "Contact" [ref=e11] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e12]:
        - link "About us" [ref=e13] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e14]:
        - link "Cart" [ref=e15] [cursor=pointer]:
          - /url: cart.html
      - listitem [ref=e16]:
        - link "Log in" [ref=e17] [cursor=pointer]:
          - /url: "#"
      - listitem
      - listitem
      - listitem [ref=e18]:
        - link "Sign up" [ref=e19] [cursor=pointer]:
          - /url: "#"
    - generic [ref=e21]:
      - list [ref=e22]:
        - listitem [ref=e23] [cursor=pointer]
        - listitem [ref=e24] [cursor=pointer]
        - listitem [ref=e25] [cursor=pointer]
      - img "First slide" [ref=e28]
      - button "Previous" [ref=e29] [cursor=pointer]
      - button "Next" [ref=e32] [cursor=pointer]
  - generic [ref=e36]:
    - generic [ref=e38]:
      - link "CATEGORIES" [ref=e39] [cursor=pointer]:
        - /url: ""
      - link "Phones" [ref=e40] [cursor=pointer]:
        - /url: "#"
      - link "Laptops" [ref=e41] [cursor=pointer]:
        - /url: "#"
      - link "Monitors" [ref=e42] [cursor=pointer]:
        - /url: "#"
    - list [ref=e45]:
      - listitem [ref=e46]:
        - button "Previous" [ref=e47]
      - listitem [ref=e48]:
        - button "Next" [ref=e49] [cursor=pointer]
  - generic [ref=e51]:
    - generic [ref=e54]:
      - heading "About Us" [level=4] [ref=e55]
      - paragraph [ref=e56]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e59]:
      - heading "Get in Touch" [level=4] [ref=e60]
      - paragraph [ref=e61]: "Address: 2390 El Camino Real"
      - paragraph [ref=e62]: "Phone: +440 123456"
      - paragraph [ref=e63]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e67]
  - contentinfo [ref=e69]:
    - paragraph [ref=e70]: Copyright © Product Store
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
  13 | 
  14 |         // Create a new user for valid username scenarios
  15 |         if (data.usernamePrefix) {
  16 |         const user = await signupNewUser(page, data);
  17 | 
  18 |             username = user.username;
  19 | 
  20 |         } else {
  21 |             // Use invalid username from test data
  22 |             await loginPage.openApplication();
  23 |             username = data.username;
> 24 |             password = data.password;
     |                     ^ ReferenceError: password is not defined
  25 |         }
  26 | 
  27 |         await loginPage.openLogin();
  28 | 
  29 |         if (!data.expectedMessage) {
  30 | 
  31 |             // Valid login
  32 |             await loginPage.login(username, data.password);
  33 | 
  34 |             await expect(loginPage.welcomeMessage).toBeVisible();
  35 |             await expect(loginPage.welcomeMessage)
  36 |                 .toHaveText(`Welcome ${username}`);
  37 | 
  38 |             await loginPage.logout();
  39 | 
  40 |         } else {
  41 | 
  42 |             // Invalid login - handle browser alert
  43 |             let actualMessage;
  44 | 
  45 |             const loginDialogHandler = async (dialog) => {
  46 |                 actualMessage = dialog.message();
  47 |                 console.log(actualMessage);
  48 |                 await dialog.accept();
  49 |             };
  50 | 
  51 |             page.on("dialog", loginDialogHandler);
  52 | 
  53 |             await loginPage.login(username, data.password);
  54 | 
  55 |             page.off("dialog", loginDialogHandler);
  56 | 
  57 |             expect(actualMessage).toBe(data.expectedMessage);
  58 |         }
  59 |     });
  60 | }
```