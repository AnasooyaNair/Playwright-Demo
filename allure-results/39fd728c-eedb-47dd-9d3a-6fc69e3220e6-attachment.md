# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> Login Test - Valid username and valid password
- Location: tests\login.spec.js:7:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('#nameofuser')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" locator('#nameofuser') with timeout 5000ms
  - waiting for locator('#nameofuser')
    13 × locator resolved to <a href="#" id="nameofuser" class="nav-link"></a>
       - unexpected value "hidden"

```

```yaml
- navigation:
  - link "PRODUCT STORE":
    - /url: index.html
    - img
    - text: PRODUCT STORE
  - list:
    - listitem:
      - link "Home (current)":
        - /url: index.html
    - listitem:
      - link "Contact":
        - /url: "#"
    - listitem:
      - link "About us":
        - /url: "#"
    - listitem:
      - link "Cart":
        - /url: cart.html
    - listitem:
      - link "Log in":
        - /url: "#"
    - listitem
    - listitem
    - listitem:
      - link "Sign up":
        - /url: "#"
  - list:
    - listitem
    - listitem
    - listitem
  - img "First slide"
  - button "Previous"
  - button "Next"
- link "CATEGORIES":
  - /url: ""
- link "Phones":
  - /url: "#"
- link "Laptops":
  - /url: "#"
- link "Monitors":
  - /url: "#"
- list:
  - listitem:
    - button "Previous"
  - listitem:
    - button "Next"
- heading "About Us" [level=4]
- paragraph: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
- heading "Get in Touch" [level=4]
- paragraph: "Address: 2390 El Camino Real"
- paragraph: "Phone: +440 123456"
- paragraph: "Email: demo@blazemeter.com"
- heading "PRODUCT STORE" [level=4]:
  - img
  - text: PRODUCT STORE
- contentinfo:
  - paragraph: Copyright © Product Store
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { LoginPage } from "../pages/loginpage";
  3  | import { signupNewUser } from "../utils/signupUtils";
  4  | import dataSet from "../utils/testData.json";
  5  | 
  6  | for (const data of dataSet.loginData) {
  7  |   test(`Login Test - ${data.scenario}`, async ({ page }) => {
  8  |     const loginPage = new LoginPage(page);
  9  |     let username;
  10 |     let password;
  11 | 
  12 |     if (data.usernamePrefix) {
  13 |       if (data.usernamePrefix === "InvalidUser") {
  14 |         username = data.usernamePrefix + Date.now();
  15 |         password = data.password;
  16 | 
  17 |         await loginPage.openApplication();
  18 |       } else {
  19 |         const signupPassword =
  20 |           data.expectedMessage == "Wrong password."
  21 |             ? dataSet.signupData[0].password
  22 |             : data.password;
  23 | 
  24 |         const user = await signupNewUser(page, {
  25 |           usernamePrefix: data.usernamePrefix,
  26 |           password: signupPassword,
  27 |         });
  28 | 
  29 |         username = user.username;
  30 |         password = data.password;
  31 |       }
  32 |     } else {
  33 |       // Use invalid username from test data
  34 |       await loginPage.openApplication();
  35 |       username = data.username;
  36 |       password = data.password;
  37 |     }
  38 | 
  39 |     console.log("Scenario:", data.scenario);
  40 |     console.log("Username entered:", username);
  41 |     console.log("Password entered:", password);
  42 |     await loginPage.openLogin();
  43 | 
  44 |     if (!data.expectedMessage) {
  45 |       // Valid login
  46 |       await loginPage.login(username, data.password);
  47 | 
> 48 |       await expect(loginPage.welcomeMessage).toBeVisible();
     |                                              ^ Error: expect(locator).toBeVisible() failed
  49 |       await expect(loginPage.welcomeMessage).toHaveText(`Welcome ${username}`);
  50 | 
  51 |       await loginPage.logout();
  52 |     } else {
  53 |       // Invalid login - handle browser alert
  54 |       let actualMessage;
  55 | 
  56 |       const loginDialogHandler = async (dialog) => {
  57 |         actualMessage = dialog.message();
  58 |         console.log(actualMessage);
  59 |         await dialog.accept();
  60 |       };
  61 | 
  62 |       page.on("dialog", loginDialogHandler);
  63 | 
  64 |       await loginPage.login(username, data.password);
  65 | 
  66 |       page.off("dialog", loginDialogHandler);
  67 | 
  68 |       expect(actualMessage).toBe(data.expectedMessage);
  69 |     }
  70 |   });
  71 | }
  72 | 
```