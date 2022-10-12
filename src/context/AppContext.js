import PlayerProvider from "./PlayerContext";

const AppContext = ({ children }) => {
  return <PlayerProvider>{children}</PlayerProvider>;
};

export default AppContext;
