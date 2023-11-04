import { test, expect } from "@playwright/test";
import { CalculationPage } from "./pages/calculation.page";

test.describe("occupancy calculation tests", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("check basic occupancy calculation", async ({ page }) => {
    const calculationPage = new CalculationPage(page);
    const premiumRooms = 3;
    const economyRooms = 3;
    const expectedFreePremiumRooms = 0;
    const expectedFreeEconomyRooms = 0;
    const expectedPremiumOccupancy = 3;
    const expectedPremiumRevenue = 738;
    const expectedEconomyOccupancy = 3;
    const expectedEconomyRevenue = 167;
    await calculationPage.fillForm(premiumRooms, economyRooms);
    await calculationPage.checkIfCalculateButtonIsEnabled();
    await calculationPage.calculateOccupancy();
    await calculationPage.checIfkNumberOfFreeRoomsIs(
      expectedFreePremiumRooms,
      expectedFreeEconomyRooms
    );
    await calculationPage.checkIfRoomsUsageAndRevenueIs(
      expectedPremiumOccupancy,
      expectedPremiumRevenue,
      expectedEconomyOccupancy,
      expectedEconomyRevenue
    );
  });

  test("check if occupancy form does not allow negative values", async ({
    page,
  }) => {
    const calculationPage = new CalculationPage(page);
    const premiumRooms = -3;
    const economyRooms = -3;
    await calculationPage.fillForm(premiumRooms, economyRooms);
    await calculationPage.checkValuesFromInputsNotEqual(
      premiumRooms,
      economyRooms
    );
    await calculationPage.checkIfCalculateButtonIsDisabled();
    await calculationPage.checkIfResultsAreNotVisible();
  });

  test("check if occupancy cannot be calculated when the form is empty", async ({
    page,
  }) => {
    const calculationPage = new CalculationPage(page);
    await calculationPage.clearForm();
    await calculationPage.checkIfCalculateButtonIsDisabled();
    await calculationPage.checkIfResultsAreNotVisible();
  });

  test("check if form is not updated before clicking the calculate button", async ({
    page,
  }) => {
    const calculationPage = new CalculationPage(page);
    const premiumRooms = 3;
    const economyRooms = 3;
    const editPremiumRooms = 5;
    const editEconomyRooms = 2;
    await calculationPage.fillForm(premiumRooms, economyRooms);
    await calculationPage.calculateOccupancy();
    const preFillPremiumRooms = await calculationPage.getFreePremiumRooms();
    const preFillEconomyRooms = await calculationPage.getFreeEconomyRooms();
    await calculationPage.fillForm(editPremiumRooms, editEconomyRooms);
    const afterFillPremiumRooms = await calculationPage.getFreePremiumRooms();
    const afterFillEconomyRooms = await calculationPage.getFreeEconomyRooms();
    await expect(preFillPremiumRooms).toEqual(afterFillPremiumRooms);
    await expect(preFillEconomyRooms).toEqual(afterFillEconomyRooms);
  });
});
