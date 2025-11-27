import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";

test.describe("Display the product information @sep09", ()=>{

    let startAppPage: StartApplicationPage;

    test.beforeEach(async ({ page })=>{
        startAppPage = new StartApplicationPage(page);
    });

    test("Verify product name should be displayed on the information card @sep09-1", async()=>{
    
       await expect(startAppPage.programNameOnInfoCard).toBeVisible();

    });

    test("Verify product name on the information card matches the product name on the left side of the screen  @sep09-2", async({ page })=>{

       const EXPECT_PROGRAM_NAME = productInfo.productName;
       const ACTUAL_PROGRAM_NAME = await  startAppPage.programNameOnInfoCard.innerText();

       expect(ACTUAL_PROGRAM_NAME).toBe(EXPECT_PROGRAM_NAME)
    });


    test("Verify product price of the product should be displayed @sep09-3", async ({ page })=>{
       await expect(startAppPage.programBasePrice).toBeVisible();
    });

    test("Verify text indicating a flexible payment plan should be available and displayed @sep09-4", async ({ page })=>{
        await expect(startAppPage.flexiblePaymentsPlanAvailableText).toBeVisible();
    });

    test("Verify program start date should be displayed @sep09-5", async ({ page })=>{
        await expect(startAppPage.programStartDate).toBeVisible();
    });

    test("Verify return policy and the final date for returns should be displayed @sep09-6", async({ page })=>{
        await expect(startAppPage.refundEndDate).toBeVisible();

    });




});