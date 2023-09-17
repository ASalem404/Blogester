const Page = require("./factories/helpers/Page");

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await page.close();
});

describe("when logged in", async () => {
  beforeEach(async () => {
    await page.login();
    await page.click("a.btn-floating");
  });
  test("check for appearance of create button", async () => {
    const formLabel = await page.getContent("form label");
    expect(formLabel).toEqual("Blog Title");
  });

  describe("when inserting an invalid input", async () => {
    beforeEach(async () => {
      await page.click("form button");
    });
    test("check for error messages", async () => {
      const titleError = await page.getContent(".title .red-text");
      const contentError = await page.getContent(".content .red-text");

      expect(titleError).toEqual("You must provide a value");
      expect(contentError).toEqual("You must provide a value");
    });
  });
});
