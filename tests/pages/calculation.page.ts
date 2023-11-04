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
}
