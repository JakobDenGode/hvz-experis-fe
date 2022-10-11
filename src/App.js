import "./sass/style.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import LandingPage from "./views/LandingPage";
import MapPage from "./views/MapPage";
import SquadPage from "./views/SquadPage";
import ChatPage from "./views/ChatPage";
import Container from "react-bootstrap/Container";
import AdminPage from "./views/EditPage";
import { Auth0Provider } from "@auth0/auth0-react";
import EditPage from "./views/EditPage";

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
  const { gameId } = useParams();
  console.log(gameId);
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
            <Route path="/games/:gameId/squad" element={<SquadPage />} />
            <Route path="/games/:gameId/chat" element={<ChatPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/games/:gameId/edit" element={<EditPage />} />
            <Route path="games/:gameId/map" element={<MapPage />} />
          </Routes>
        </Container>
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  );
}

export default App;
