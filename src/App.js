import "./sass/style.scss";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import MobileNavBar from "./components/nav/MobileNavBar";
import MapPage from "./views/MapPage";
import SquadPage from "./views/SquadPage";
import ChatPage from "./views/ChatPage";
import Container from "react-bootstrap/Container";
import AdminPage from "./views/AdminPage";
import { Auth0Provider } from "@auth0/auth0-react";
import GamePage from "./views/GamePage";

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  console.log("hi");
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback
        domain="dev-3w1bagtd.us.auth0.com"
        clientId="J6nMaFhZ1CTfvlD0o73lDgOhB5FmRqcf"
        redirectUri={window.location.origin}
      >
        <Container>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/games/:id/squad" element={<SquadPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/games/:id/map" element={<MapPage />} />
          </Routes>
        </Container>
        <MobileNavBar />
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  );
}

export default App;
