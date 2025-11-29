import { test, expect, CommonUI } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { productInfo } from "../../utilities/qa-data-reader";

test.describe("Selecting a price plan @sep14", () => {
  let startAppPage: StartApplicationPage;
  let paymentPlanPage: PaymentPlanPage;
  let reviewPaymentPage: ReviewPaymentPage;

  test.beforeEach(async ({ page }) => {
    startAppPage = new StartApplicationPage(page);
    paymentPlanPage = new PaymentPlanPage(page);
    reviewPaymentPage = new ReviewPaymentPage(page);
  });

  test("Selecting a payment plan should highlight the chosen plan @sep14-1", async ({
    page,
  }) => {
    //user complete user information
    await CommonUI.completeStartApplicationForm(page);
    // user has completed step one with valid information
    await CommonUI.completeSelectingPaymentPlan(page, "upfront");
    // payment plan option should be highlighted
    await expect(paymentPlanPage.upfrontPaymentFrame).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  test("Selecting a payment plan should activate the Next button @sep14-2", async ({
    page,
  }) => {
    //user complete user information
    await CommonUI.completeStartApplicationForm(page);
    // user has completed step one with valid information
    await CommonUI.completeSelectingPaymentPlan(page, "upfront");
    // the next button on payment plan step should become enabled
    await expect(paymentPlanPage.activeNextButton).toBeEnabled();
  });

  test("User should be able to change their payment plan selection @sep14-3", async ({
    page,
  }) => {
    //user complete user information
    await CommonUI.completeStartApplicationForm(page);
    // user has completed step one with valid information
    await paymentPlanPage.selectPaymentPlan("upfront");

    await expect(paymentPlanPage.upfrontPaymentFrame).toHaveAttribute(
      "aria-expanded",
      "true"
    );

    // await page.waitForTimeout(2000);

    await paymentPlanPage.selectPaymentPlan("installments");

    await expect(paymentPlanPage.installmentsPaymentFrame).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    // await page.waitForTimeout(2000);
  });
});
