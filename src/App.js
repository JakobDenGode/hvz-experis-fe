import "./sass/style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import MobileNavBar from "./components/nav/MobileNavBar";
import MapPage from "./views/MapPage";
import SquadPage from "./views/SquadPage";
import ChatPage from "./views/ChatPage";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/squad" element={<SquadPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Container>
      <MobileNavBar />
    </BrowserRouter>
  );
}

export default App;
