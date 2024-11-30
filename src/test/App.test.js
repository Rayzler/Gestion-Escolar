import {Builder, By, until} from "selenium-webdriver";

describe('App', async () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://localhost:5173");
    });

    it("should render the login", async () => {
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Sign in to your account")]')), 10000);
    });

    it("should login successfully", async () => {
        await driver.findElement(By.id("email")).sendKeys("adminuser@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("admin123");
        await driver.findElement(By.xpath('//*[contains(text(), "Sign in")]')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Welcome!")]')), 10000);
    });

    after(async () => driver.quit());
});
