import { useState } from "react";
import "./styles/app.css";

import Header from "./components/shared/Header";
import Hero from "./components/home/Hero";
import ActionButtons from "./components/home/ActionButtons";
import StatsBar from "./components/home/StatsBar";

import EstimatePage from "./pages/EstimatePage";
import DepotsPage from "./pages/DepotsPage";
import PickupPage from "./pages/PickupPage";

export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "estimate":
        return <EstimatePage onBack={() => setPage("home")} />;
      case "depots":
        return <DepotsPage onBack={() => setPage("home")} />;
      case "pickup":
        return <PickupPage onBack={() => setPage("home")} />;
      default:
        return (
          <>
            <Hero />
            <ActionButtons
              onEstimate={() => setPage("estimate")}
              onDepots={() => setPage("depots")}
              onPickup={() => setPage("pickup")}
            />
            <StatsBar />
          </>
        );
    }
  };

  return (
    <div className="page">
      <div className="app-shell">
        <Header />
        <div className="app-content">{renderPage()}</div>
      </div>
    </div>
  );
}