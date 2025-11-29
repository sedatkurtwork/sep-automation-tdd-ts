import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";

test.describe("Enter my Personal details @sep10", ()=>{

    let startAppPage: StartApplicationPage;

    test.beforeEach(async ({ page })=>{
        startAppPage = new StartApplicationPage(page);
    });

    test("Verify personal detail fields and validation - first name  @sep10-1", async ({ page })=>{
        await expect(startAppPage.firstNameInputBox).toBeVisible();
    });

    test("Verify personal detail fields and validation - last name @sep10-2", async({ page })=>{
        await expect(startAppPage.lastNameInputBox).toBeVisible();
    });

    test("Verify personal detail fields and validation - email field @sep10-3", async({ page })=>{
        await expect(startAppPage.emailInputBox).toBeVisible();
    });

    test("Verify personal detail fields and validation - phone @sep10-4", async ({ page })=>{
        await expect(startAppPage.phoneNumberInputBox).toBeVisible();
    });

    test('Verify "How did you hear about us?" dropdown is present @sep10-5', async({ page })=>{
        await expect(startAppPage.howDidYouHearAboutUsDropDown).toBeVisible();

    });

    test("Ensure 'Next' button is disabled when required fields are missing @sep10-6", async({ page })=>{
        await startAppPage.nextButton.click();
        await expect(startAppPage.nextButton).toBeVisible();
    });

});