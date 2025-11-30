import { test, expect, CommonUI } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";
import { productInfo } from "../../utilities/qa-data-reader";

test.describe("View payment plan options in Step 2 @sep17", () => {
  let startApplicationPage: StartApplicationPage;
  let paymentPlanPage: PaymentPlanPage;
  let reviewPaymentPage: ReviewPaymentPage;

  test.beforeEach(async ({ page }) => {
    startApplicationPage = new StartApplicationPage(page);
    paymentPlanPage = new PaymentPlanPage(page);
    reviewPaymentPage = new ReviewPaymentPage(page);

    // complete start application form
    await CommonUI.completeStartApplicationForm(page);
  });

  test("Upfront payment should display correct text and format @sep17-1", async ({
    page,
  }) => {
    // only one upfront payment option should be displayed
    await expect(paymentPlanPage.upfrontPaymentOption).toHaveCount(1);
    await page.waitForTimeout(1000);

    // the upfront payment description should match the format "$400 pay once"
    let expectedPrice = "$400 pay once";
    let actualPrice = (
      await paymentPlanPage.upfrontPaymentAmount.innerText()
    ).trim();
    console.log(`actual price: ${actualPrice} `);

    expect(actualPrice).toBe(expectedPrice);
  });

  test("Installment plan should display 5 Installments with correct price format @sep17-2", async ({
    page,
  }) => {
    // only one installment payment plan should be displayed
    await expect(paymentPlanPage.installmentsPaymentOption).toHaveCount(1);

    // the installment plan price should match the format "$100 per month"
    let expectedPrice = "$100 per month";

    let actualPrice =
      await paymentPlanPage.installmentsPaymentAmount.innerText();
    console.log(`installment plan price: ${actualPrice}`);

    expect(actualPrice.trim()).toBe(expectedPrice);
  });

  test("User should be able to change their payment plan selection @sep17-3", async ({
    page,
  }) => {
    //user clicks the first payment plan option
    await paymentPlanPage.selectPaymentPlan("upfront");
    await expect(paymentPlanPage.upfrontPaymentFrame).toHaveAttribute(
      "aria-expanded",
      "true"
    );

    //user clicks the second payment plan option
    await paymentPlanPage.selectPaymentPlan("installments");
    await expect(paymentPlanPage.upfrontPaymentFrame).toHaveAttribute(
      "aria-expanded",
      "false"
    );

    await expect(paymentPlanPage.installmentsPaymentFrame).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });
});
