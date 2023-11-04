import { exportedForTesting } from "./App";

test("verify occupancy calculation for 3 premium and 3 economy rooms", () => {
  const premiumRooms = 3;
  const economyRooms = 3;
  const expectedPremiumOccupancy = 3;
  const expectedEconomyOccupancy = 3;
  const expectedPremiumRevenue = 738;
  const expectedEconomyRevenue = 167;
  const result = exportedForTesting.calculateOccupancy(
    premiumRooms,
    economyRooms
  );
  expect(result.premiumOccupancy).toEqual(expectedPremiumOccupancy);
  expect(result.economyOccupancy).toEqual(expectedEconomyOccupancy);
  expect(result.premiumRevenue).toEqual(expectedPremiumRevenue);
  expect(result.economyRevenue).toEqual(expectedEconomyRevenue);
});

test("verify occupancy calculation for 7 premium and 5 economy rooms", () => {
  const premiumRooms = 7;
  const economyRooms = 5;
  const expectedPremiumOccupancy = 6;
  const expectedEconomyOccupancy = 4;
  const expectedPremiumRevenue = 1054;
  const expectedEconomyRevenue = 189;
  const result = exportedForTesting.calculateOccupancy(
    premiumRooms,
    economyRooms
  );
  expect(result.premiumOccupancy).toEqual(expectedPremiumOccupancy);
  expect(result.economyOccupancy).toEqual(expectedEconomyOccupancy);
  expect(result.premiumRevenue).toEqual(expectedPremiumRevenue);
  expect(result.economyRevenue).toEqual(expectedEconomyRevenue);
});

test("verify occupancy calculation for 2 premium and 7 economy rooms", () => {
  const premiumRooms = 2;
  const economyRooms = 7;
  const expectedPremiumOccupancy = 2;
  const expectedEconomyOccupancy = 4;
  const expectedPremiumRevenue = 583;
  const expectedEconomyRevenue = 189;
  const result = exportedForTesting.calculateOccupancy(
    premiumRooms,
    economyRooms
  );
  expect(result.premiumOccupancy).toEqual(expectedPremiumOccupancy);
  expect(result.economyOccupancy).toEqual(expectedEconomyOccupancy);
  expect(result.premiumRevenue).toEqual(expectedPremiumRevenue);
  expect(result.economyRevenue).toEqual(expectedEconomyRevenue);
});

test("verify occupancy calculation for 7 premium and 1 economy rooms (check if highest paying customers below EUR 100 will get preference for the “upgrade”)", () => {
  const premiumRooms = 7;
  const economyRooms = 1;
  const expectedPremiumOccupancy = 7;
  const expectedEconomyOccupancy = 1;
  const expectedPremiumRevenue = 1153;
  const expectedEconomyRevenue = 45;
  const result = exportedForTesting.calculateOccupancy(
    premiumRooms,
    economyRooms
  );
  expect(result.premiumOccupancy).toEqual(expectedPremiumOccupancy);
  expect(result.economyOccupancy).toEqual(expectedEconomyOccupancy);
  expect(result.premiumRevenue).toEqual(expectedPremiumRevenue);
  expect(result.economyRevenue).toEqual(expectedEconomyRevenue);
});
