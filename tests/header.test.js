const puppeteer = require("puppeteer");
let browser, page;
beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("localhost:3000");
});

// afterEach(async () => {
//   await browser.close();
// });

test("The Header has the correct text", async () => {
  const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);

  expect(text).toEqual("Blogster");
});

/***
 *  NOTE: This test needs to be connected to the internet to be able to test the correct
 *         URL not the error connection URL
 **/
test("Clicking login", async () => {
  await page.click(".right a");
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
});

/**
 * Faking login to the application to be able to test all the functionality
 * Testing logout button appearence
 */

test("logging in, and showing logout button", async () => {
  id = "64eb74006e673c3a3c827ffa";
  const Buffer = require("safe-buffer").Buffer;
  const Keygrip = require("keygrip");
  const sessionObj = {
    passport: {
      user: id,
    },
  };

  sessionStr = Buffer.from(JSON.stringify(sessionObj)).toString("base64");
  const keys = require("../config/keys");
  const keygrip = new Keygrip([keys.cookieKey]);
  const sig = keygrip.sign("session=" + sessionStr);
  await page.setCookie({ name: "session", value: sessionStr });
  await page.setCookie({ name: "session.sig", value: sig });
  await page.goto("localhost:3000");

  await page.waitFor('a[href="/auth/logout"]');
  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);

  expect(text).toEqual("Logout");
});
