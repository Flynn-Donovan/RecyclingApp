import { useState } from "react";
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
    <div style={styles.page}>
      <div style={styles.appShell}>
        <Header />
        <div style={styles.content}>{renderPage()}</div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#edf1ee",
    display: "flex",
    justifyContent: "center",
    padding: "24px 16px",
    fontFamily: "Inter, Arial, sans-serif",
    alignItems: "center",
  },
  appShell: {
  width: "100%",
  maxWidth: "540px",
  margin: "0 auto",
  minHeight: "90vh",
  background: "#2e9660",
  borderRadius: "0 0 28px 28px",
  overflow: "hidden",
  boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
},
  content: {
    padding: "24px 20px 28px",
  },
};