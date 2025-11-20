import React from "react";
import PortfolioTracker from "./PortfolioTracker";
import "./styles/App.css";
import { StockProvider } from "./context/StockCon";
function Main() {
  return (
    <StockProvider>
      <div className="App">
        <PortfolioTracker />
      </div>
    </StockProvider>
  );
}
export default Main;
