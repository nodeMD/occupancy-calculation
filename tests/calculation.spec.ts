import { test } from "@playwright/test";
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
});
