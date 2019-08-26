import { AppiumDriver, createDriver, SearchOptions, nsCapabilities } from "nativescript-dev-appium";
import { assert } from "chai";
const addContext = require('mochawesome/addContext');

describe('Generate PDF', () => {
    let driver: AppiumDriver;

    before(async function(){
        nsCapabilities.testReporter.context = this; 
        driver = await createDriver();
    });

    after(async function () {
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            await driver.logTestArtifacts(this.currentTest.title);
        }
    });

    it('Should generate the pdf', async function () {
        const btn = await driver.findElementByText('Generate PDF');
        await btn.click();

        await driver.wait(5000);

        const okBtn = await driver.findElementByText('OK');
        await okBtn.click();
        await driver.wait(4000);
    });
});