/* eslint-disable spaced-comment */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Generated by Selenium IDE
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("search_species", function () {
  this.timeout(30000);
  let driver;
  let vars;
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    vars = {};
  });
  afterEach(async function () {
    await driver.quit();
  });
  it("search_species", async function () {
    await driver.get("http://localhost:3000/home");
    await driver.manage().window().setRect(1552, 832);
    await driver.sleep(2000);
    await driver.findElement(By.css(".mt-0:nth-child(3) > .w-full")).click();
    await driver.sleep(2000);
    await driver.findElement(By.id("simple-search")).click();
    await driver.sleep(2000);
    await driver.findElement(By.id("simple-search")).sendKeys("Huesito");
    await driver.findElement(By.css(".p-2\\.5 > .w-5")).click();
    await driver.sleep(2000);
    await driver.findElement(By.css(".text-xs:nth-child(1)")).click();
    await driver.sleep(2000);
  });
});