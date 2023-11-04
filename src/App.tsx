import React, { useState } from "react";
import "./App.css";

const GUESTS = [23, 45, 155, 374, 22, 99, 100, 101, 115, 209];

function calculateOccupancy(premiumRooms: any, economyRooms: any) {
  const sortedGuests = [...GUESTS].sort((a, b) => b - a);
  let economyGuests = sortedGuests.filter((guest) => guest < 100);
  let premiumOccupancy = 0;
  let economyOccupancy = 0;
  let premiumRevenue = 0;
  let economyRevenue = 0;

  for (const guest of sortedGuests) {
    if (guest >= 100 && premiumRooms > 0) {
      premiumOccupancy++;
      premiumRevenue += guest;
      premiumRooms--;
    } else if (economyRooms == 0 && premiumRooms > 0) {
      const highestPayingEconomyGuest = Math.max(...economyGuests);
      premiumOccupancy++;
      premiumRooms--;
      // remove highest paying economy guest from economy room
      // and on his place put next economy guest
      economyRevenue -= highestPayingEconomyGuest;
      economyRevenue += guest;
      premiumRevenue += highestPayingEconomyGuest;
      // remove highest paying economy guest from economy guests
      let guestIndex = economyGuests.indexOf(highestPayingEconomyGuest);
      economyGuests.splice(guestIndex, 1);
    } else if (guest < 100 && economyRooms > 0) {
      economyOccupancy++;
      economyRevenue += guest;
      economyRooms--;
    }
  }

  return {
    premiumOccupancy,
    economyOccupancy,
    premiumRevenue,
    economyRevenue,
  };
}
export const exportedForTesting = {
  calculateOccupancy,
};

function App() {
  const [premiumRooms, setPremiumRooms] = useState(0);
  const [economyRooms, setEconomyRooms] = useState(0);
  const [occupancy, setOccupancy] = useState<any>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const result = calculateOccupancy(premiumRooms, economyRooms);
    setOccupancy(result);
  };

  return (
    <div className="root">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div>
            <p>Premium Rooms:</p>
            <input
              aria-label="Premium Rooms Input"
              type="number"
              value={premiumRooms.toString()}
              onChange={(event) => {
                let val = parseInt(event.target.value, 10);
                val = val >= 0 ? val : 0;
                setPremiumRooms(val);
              }}
            />
          </div>
          <br />
          <div>
            <p>Economy Rooms:</p>
            <input
              aria-label="Economy Rooms Input"
              type="number"
              value={economyRooms.toString()}
              onChange={(event) => {
                let val = parseInt(event.target.value, 10);
                val = val >= 0 ? val : 0;
                setEconomyRooms(val);
              }}
            />
          </div>
          <br />
          <button 
            disabled={!premiumRooms && !economyRooms}
            type="submit"
          >
            Calculate Occupancy
          </button>
        </form>
        {occupancy && (
          <div>
            <p data-testid="freePremiumRooms">
              Free Premium rooms: {premiumRooms - occupancy.premiumOccupancy}
            </p>
            <p data-testid="freeEconomyRooms">
              Free Economy rooms: {economyRooms - occupancy.economyOccupancy}
            </p>
            <p data-testid="premiumOccupancy">
              Usage Premium: {occupancy.premiumOccupancy} (EUR{" "}
              {occupancy.premiumRevenue})
            </p>
            <p data-testid="economyOccupancy">
              Usage Economy: {occupancy.economyOccupancy} (EUR{" "}
              {occupancy.economyRevenue})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
