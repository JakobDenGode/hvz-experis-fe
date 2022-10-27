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
import { usePlayer } from "./context/PlayerContext";
import SingleSquad from "./views/SingleSquad";
import LandingAnimation from "./views/LandingAnimation";
import RulesPage from "./views/RulesPage";

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();

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
  const { player, setPlayer } = usePlayer();
  console.log(player);

  return (
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri="http://localhost:3000/games"
        audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      >
        <Routes>
          <Route path="/" element={<LandingAnimation />} />
          <Route path="/games/:gameId/squad" element={<SquadPage />} />
          <Route path="/games" element={<LandingPage />} />
          <Route path="/games/:gameId/chat" element={<ChatPage />} />
          <Route path="games/:gameId/admin" element={<AdminPage />} />
          <Route path="/games/:gameId/edit" element={<EditPage />} />
          <Route path="games/:gameId/map" element={<MapPage />} />
          <Route path="games/:gameId/mysquad" element={<SingleSquad />} />
          <Route path="games/rules" element={<RulesPage />} />
        </Routes>
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  );
}

export default App;
