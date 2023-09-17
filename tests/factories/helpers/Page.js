const puppeteer = require("puppeteer");
const sessionFactory = require("../../factories/sessionFactory");
const userFactory = require("../../factories/userFactory");

/**
 * Using Proxy to be able to get a method from the three classes/objectd {Page, browser ,CustomPage}.
 * Page and browser from Puppeteer.
 * CustomPage is implemented to contain all the additional methods.
 * Using Proxy to make the choice among them easy.
 */
class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const customePage = new CustomPage(page);
    return new Proxy(customePage, {
      get: function (target, property) {
        return target[property] || browser[property] || page[property];
      },
    });
  }
  constructor(page) {
    this.page = page;
  }
  async login() {
    const user = await userFactory();
    const { session, sig } = sessionFactory(user);
    await this.page.setCookie({ name: "session.sig", value: sig });
    await this.page.setCookie({ name: "session", value: session });
    await this.page.goto("localhost:3000/blogs");
    await this.page.waitFor('a[href="/auth/logout"]');
  }

  async getContent(selector) {
    return this.page.$eval(selector, (el) => el.innerHTML);
  }
}

module.exports = CustomPage;
