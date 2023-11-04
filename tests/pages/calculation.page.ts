import { Locator, Page, expect } from "@playwright/test";

export class CalculationPage {
  readonly page: Page;
  readonly premiumRoomsInput: Locator;
  readonly economyRoomsInput: Locator;
  readonly calculateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.premiumRoomsInput = page.getByLabel("Premium Rooms Input");
    this.economyRoomsInput = page.getByLabel("Economy Rooms Input");
    this.calculateButton = page.getByRole("button", {
      name: "Calculate Occupancy",
    });
  }

  async calculateOccupancy() {
    await this.calculateButton.click();
  }

  async checkIfCalculateButtonIsEnabled() {
    await expect(this.calculateButton).toBeEnabled();
  }

  async checkIfCalculateButtonIsDisabled() {
    await expect(this.calculateButton).toBeDisabled();
  }

  async fillForm(premiumRooms: number, economyRooms: number) {
    await this.premiumRoomsInput.fill(premiumRooms.toString());
    await this.economyRoomsInput.fill(economyRooms.toString());
  }

  async checIfkNumberOfFreeRoomsIs(
    premiumRoomsFree: number,
    economyRoomsFree: number
  ) {
    await expect(
      this.page.getByText(`Free Premium rooms: ${premiumRoomsFree}`)
    ).toBeVisible();
    await expect(
      this.page.getByText(`Free Economy rooms: ${economyRoomsFree}`)
    ).toBeVisible();
  }

  async checkIfRoomsUsageAndRevenueIs(
    premiumRoomsUsage: number,
    premiumRoomsRevenue: number,
    economyRoomsUsage: number,
    economyRoomsRevenue: number
  ) {
    await expect(
      this.page.getByText(
        `Usage Premium: ${premiumRoomsUsage} (EUR ${premiumRoomsRevenue})`
      )
    ).toBeVisible();
    await expect(
      this.page.getByText(
        `Usage Economy: ${economyRoomsUsage} (EUR ${economyRoomsRevenue})`
      )
    ).toBeVisible();
  }
}
