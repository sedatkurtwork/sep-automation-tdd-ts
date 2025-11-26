import { test, expect } from "../../utilities/sep-test-utilities";
import{ StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";
import { LeftMainPage } from "../../pages/LeftMainPage";

test.describe("View product landing page @sep07", ()=> {

    let startAppPage: StartApplicationPage;
    let leftMainPage: LeftMainPage;

    test.beforeEach(async ({ page })=>{

        startAppPage = new StartApplicationPage(page);
        leftMainPage = new LeftMainPage(page);
    });

    test('Verify system displays the text "Cydeo Secure chechout" @sep07-1', async({ page })=>{
        const EXPECT = "Secure checkout";
        const ACTUAL = (await leftMainPage.secureCheckout.innerText()).trim();
        expect(EXPECT).toBe(ACTUAL);
    });

    test("the page should display the program name @sep07-2", async ({ page })=>{
        const EXPECT = productInfo.productName;
        const ACTUAL = (await leftMainPage.programName.innerText()).trim();
        expect(EXPECT).toBe(ACTUAL);
    });

    test("the footer on the left side of the page should include the logo @sep07-3", async({ page }) =>{
        const LOGO = (leftMainPage.cydeoImageAtLeftWindow);
        await expect(LOGO).toBeVisible();
    });

    test("the footer items should appear in the correct order @sep07-4", async ({ page })=>{
   
            const EXPECTED_ITEMS = [        
                "Terms and conditions",
                "Privacy Policy",
                "Disclaimer",
                "Cookie Policy"];

            const FOOTER_ITEMS = await (leftMainPage.footerElements).allInnerTexts();

            for(let i = 0; i < EXPECTED_ITEMS.length; i++)
                {
                expect(FOOTER_ITEMS[i]).toContain(EXPECTED_ITEMS[i]);
            }
    });

    test('The system displays "Need help? Contact us at enrollment@cydeo.com" in the footer on the right. @sep07-5', async({ page })=>{

        const HELP_MESSAGE = "Need help? Contact us at enrollment@cydeo.com";

        expect(HELP_MESSAGE).toBe(await startAppPage.footer.first().innerText());

    });








});