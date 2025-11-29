import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { productInfo } from "../../utilities/qa-data-reader";
import { CommonUI } from "../../utilities/sep-test-utilities";

test.describe("Click on the next button on step 1 @sep19", ()=>{

    let startAppPage: StartApplicationPage;
    let paymentPlanPage: PaymentPlanPage;

    test.beforeEach(async({ page })=>{
        startAppPage = new StartApplicationPage(page);
        paymentPlanPage = new PaymentPlanPage(page);

    });

    test("Verify that clicking next button after providing all the personal information info will navigates the user to payment plan page @sep19-1", async({page })=>{
        
        // fill all fields
        await CommonUI.completeStartApplicationForm(page);

        // click the next button
        await startAppPage.clickNextButton();

        // validate that payment page visible
        await expect(paymentPlanPage.UpfrontText.first()).toBeVisible();
        const circle = startAppPage.startApplicationStepCircle;
        
        // the start application stepper circle color should be green
        const bgColor = await circle.evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor;
        });
        await page.waitForTimeout(3);
         console.log("Green Stepper circle color:", bgColor);
        // await page.waitForTimeout(3000);
         expect(bgColor).toBe("rgb(172, 245, 138)");   

    });

    test(" Navigate to payment plan with only required fields provided @sep19-2", async({ page })=>{
        // enter only required fields
        await startAppPage.enterFirstName("Haci");
        await startAppPage.enterLastName("Hacioglu");
        await startAppPage.enterEmail("haci@ogullarindan.com");
        await startAppPage.enterPhoneNumber("8005554433");

        // click the next button
        await startAppPage.clickNextButton();

        // validate that payment page visible
        await expect(paymentPlanPage.UpfrontText.first()).toBeVisible();
        const circle = startAppPage.startApplicationStepCircle;

        // the start application stepper circle color should be green
        const bgColor = await circle.evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor;
        });
        await page.waitForTimeout(3);
         console.log("Green Stepper circle color:", bgColor);
        // await page.waitForTimeout(3000);
        expect(bgColor).toBe("rgb(172, 245, 138)");   
    });

});