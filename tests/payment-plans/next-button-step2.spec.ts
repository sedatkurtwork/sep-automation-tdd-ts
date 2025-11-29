import {
  test,
  expect,
  verifyElementColor,
} from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";

test.describe("Next button on selecting payment page @sep16", () => {
  let startApplicationPage: StartApplicationPage;
  let paymentPlanPage: PaymentPlanPage;
  let reviewPaymentPage: ReviewPaymentPage;

  test.beforeEach(async ({ page }) => {
    startApplicationPage = new StartApplicationPage(page);
    paymentPlanPage = new PaymentPlanPage(page);
    reviewPaymentPage = new ReviewPaymentPage(page);

    await CommonUI.completeStartApplicationForm(
      page,
      "Muhtar",
      "M",
      "muhtar.mahmoud@example.com",
      "1234567890"
    );
  });

  test("Verify that the next button is displayed @sep16-1", async ({
    page,
  }) => {
    await expect(paymentPlanPage.inactiveNextButton).toBeVisible();
  });

  test("Verify that the next button is disabled by default @sep16-2", async ({
    page,
  }) => {
    await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
  });

  //TODO Complete the other remaining tests of this user story ...

  test("Stepper should show steps 1 and 2 in green and step 3 in blue @sep16-3", async ({
    page,
  }) => {
    // select a playment plan
    await CommonUI.completeSelectingPaymentPlan(page, "upfront");

    // step 3 page should be displayed
    await expect(reviewPaymentPage.cardNumberInput).toBeVisible();

    // step 1 circle should be displayed green
    await verifyElementColor(
      startApplicationPage.startApplicationStepCircle,
      "rgb(172, 245, 138)"
    );

    // step 2 circle should be displayed green
    await verifyElementColor(
      startApplicationPage.paymentPlanStepCircle,
      "rgb(172, 245, 138)"
    );

    // step 3 stepper circle should be blue
    await verifyElementColor(
      startApplicationPage.reviewStepCircle,
      "rgb(1, 201, 255)"
    );
  });

  test("Payment component should be displayed on Step 3 @sep16-4", async ({
    page,
  }) => {
    // user selects a payment plan
    await CommonUI.completeSelectingPaymentPlan(page, "upfront");

    // step 3 page  should be displayed
    await expect(reviewPaymentPage.cardNumberInput).toBeVisible;
  });

  test("Price summary should be displayed on Step 3 @sep16-5", async ({
    page,
  }) => {
    // user selects a payment plan
    await CommonUI.completeSelectingPaymentPlan(page, "upfront");
    // the price summary should be visible
    await expect(reviewPaymentPage.subtotalText).toBeVisible();
  });

  test("Back button should be displayed on Step 3 @sep16-6", async ({
    page,
  }) => {
    // user selects a payment plan
    await CommonUI.completeSelectingPaymentPlan(page, "upfront");
    //the back button on Step 3 should be visible
    await expect(reviewPaymentPage.backButton).toBeVisible();
  });

  test("Pay button should be displayed by default on Step 3 @sep16-7", async ({
    page,
  }) => {
    // user selects a payment plan
    await CommonUI.completeSelectingPaymentPlan(page, "upfront");

    // the pay button should be visible by default
    await expect(reviewPaymentPage.payButton).toBeVisible();
  });
});
