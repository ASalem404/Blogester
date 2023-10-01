const Page = require("./factories/helpers/Page");

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
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

  describe("When inserting a valid input", async () => {
    beforeEach(async () => {
      await page.type(".title input", "Test Title");
      await page.type(".content input", "Test Content");
      await page.click("form button");
    });
    test("submitting takes user to confirmation screen", async () => {
      const confirmText = await page.getContent("form h5");
      expect(confirmText).toEqual("Please confirm your entries");
    });

    test("submitting then saving adds blog to index page", async () => {
      await page.click("button.green");
      await page.waitFor(".card");
      const cardTitle = await page.getContent(".card-title");
      const cardContent = await page.getContent("p");
      expect(cardTitle).toEqual("Test Title");
      expect(cardContent).toEqual("Test Content");
    });
  });
});

describe("User is not logged in", () => {
  test("User cannot creating new blog", async () => {
    const blog = {
      title: "Test Title",
      content: "Test content",
    };
    const result = await page.post("/api/blogs", blog);
    expect(result).toEqual({ error: "You must log in!" });
  });
  test("User cannot viewing blogs", async () => {
    const result = await page.get("/api/blogs");
    expect(result).toEqual({ error: "You must log in!" });
  });
});
