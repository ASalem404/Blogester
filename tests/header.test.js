const puppeteer = require("puppeteer");
const sessionFactory = require("../tests/factories/sessionFactory");
let browser, page;
beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

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

test.only("logging in, and showing logout button", async () => {
  const id = "64eb74006e673c3a3c827ffa";
  const { session, sig } = sessionFactory(id);
  await page.setCookie({ name: "session", value: session });
  await page.setCookie({ name: "session.sig", value: sig });
  await page.goto("localhost:3000");

  await page.waitFor('a[href="/auth/logout"]');
  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);

  expect(text).toEqual("Logout");
});
