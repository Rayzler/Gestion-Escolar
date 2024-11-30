import {Builder, By, until} from "selenium-webdriver";

describe('App', async () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://localhost:5173");
    });

    it("should render the login", async () => {
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Inicia sesión")]')), 10000);
    });

    it("should login successfully", async () => {
        await driver.findElement(By.id("email")).sendKeys("adminuser@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("admin123");
        await driver.findElement(By.id("login")).click();
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Bienvenido al sistema de gestión escolar")]')), 10000);
    });

    it("should navigate to the subjects page", async () => {
        await driver.findElement(By.id("subjects")).click();
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Agregar Materia")]')), 10000);
    });

    it("should create a subject successfully", async () => {
        await driver.findElement(By.id("add-subject")).click();
        await driver.findElement(By.id("name")).sendKeys("Test Subject");
        await driver.findElement(By.id("save-subject")).click();
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Test Subject")]')), 10000);
    });

    it("should navigate to the students page", async () => {
        await driver.findElement(By.id("students")).click();
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Agregar Estudiante")]')), 10000);
    });

    it("should create a student successfully", async () => {
        await driver.findElement(By.id("add-student")).click();
        await driver.findElement(By.id("name")).sendKeys("Test Student");
        await driver.findElement(By.id("age")).sendKeys("20");
        await driver.findElement(By.id("save-student")).click();
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Test Student")]')), 10000);
    });

    it("should edit a student successfully", async () => {
        const card = await driver.findElement(By.id("card-4"));
        await card.findElement(By.className("edit-button")).click();
        await driver.findElement(By.id("name")).clear();
        await driver.findElement(By.id("name")).sendKeys("Test Student Edited");
        await driver.findElement(By.id("save-student")).click();
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Test Student Edited")]')), 10000);
    });

    it("should navigate to the student details page", async () => {
        const card = await driver.findElement(By.id("card-4"));
        await card.findElement(By.className("view-button")).click();
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Materias")]')), 10000);
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Test Student")]')), 10000);
    });

    it("should add a subject to a student successfully", async () => {
        await driver.findElement(By.id("attach-subject")).click();
        await driver.findElement(By.css("select")).click();
        await driver.findElement(By.css("option[value='4']")).click();
        await driver.findElement(By.id("save-attach")).click();
        const subjectsTable = await driver.findElement(By.id("subjects-table"));
        await subjectsTable.findElement(By.xpath('//*[contains(text(), "Test Subject")]'));
    });

    it("should capture the student's grades successfully", async () => {
        const subjectRow = await driver.findElement(By.id("row-1"));
        await subjectRow.findElement(By.className("edit-button")).click();
        const input = subjectRow.findElement(By.id("grade-1"));
        await input.clear();
        await input.sendKeys("8.7");
        await subjectRow.findElement(By.className("save-button")).click();
        await input.getAttribute("value").then(value => {
            if (value !== "8.7") throw new Error("Grade not saved");
        });
    });

    it("should delete a student successfully", async () => {
        await driver.findElement(By.id("students")).click();
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Agregar Estudiante")]')), 10000);
        const card = await driver.findElement(By.id("card-4"));
        await card.findElement(By.className("delete-button")).click();
        await driver.wait(until.stalenessOf(card), 10000);
    });

    it("should edit a subject successfully", async () => {
        await driver.findElement(By.id("subjects")).click();
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Agregar Materia")]')), 10000);
        const card = await driver.findElement(By.id("card-4"));
        await card.findElement(By.className("edit-button")).click();
        await driver.findElement(By.id("name")).clear();
        await driver.findElement(By.id("name")).sendKeys("Test Subject Edited");
        await driver.findElement(By.id("save-subject")).click();
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Test Subject Edited")]')), 10000);
    });

    it("should delete a subject successfully", async () => {
        const card = await driver.findElement(By.id("card-4"));
        await card.findElement(By.className("delete-button")).click();
        await driver.wait(until.stalenessOf(card), 10000);
    });

    it("should logout successfully", async () => {
        await driver.findElement(By.id("logout")).click();
        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Inicia sesión")]')), 10000);
    });

    after(async () => driver.quit());
});
