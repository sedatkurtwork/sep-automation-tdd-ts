import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader"; 

test.describe("Display the steps of the checkout process @sep09", ()=>{

    let startAppPage : StartApplicationPage;
    test.beforeEach(async ( { page })=>{
        startAppPage = new StartApplicationPage(page);
    });

    test("Verify checkout process stepper displays all steps and highlights the current step @sep08-1", async({ page })=>{
        
        //the stepper should display Start Application
        await expect(startAppPage.startApplicationStepCircle).toBeVisible();

        // the stepper should display Payment Plan
        await expect(startAppPage.paymentPlanStepCircle).toBeVisible();
        
        // the stepper should display Review
        await expect (startAppPage.reviewStepCircle).toBeVisible();
    });

    test('Verify that system should highlight "Start Application" in blue @sep08-2', async ({ page }) =>{
        // the stepper should highlight Start Application in blue
        const circle = startAppPage.startApplicationStepCircle;

        const bgColor = await circle.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
        });

        expect(bgColor).toBe("rgb(1, 201, 255)");
    });

    test('Verify that system should highlight "Start Application" @sep08-3', async({ page })=>{

        // And the stepper should display Payment Plan in grey
        const EXPECTED = "Payment plan";
        const ACTUAL = await startAppPage.paymentPlanText.innerText();
        //   console.log("actual result: ", ACTUAL);
        expect(ACTUAL).toBe(EXPECTED);

        // And the stepper should display Review in grey

        const EXPECTED_REVIEW = "Review";
        const ACTUAL_REVIEW = await startAppPage.reviewText.innerText();
        // console.log("actual result: ", ACTUAL);
        expect(ACTUAL_REVIEW).toBe(EXPECTED_REVIEW);

    });


});