import React from "react";
import { createContext, useContext, useState } from "react";
import { STORAGE_KEY_PLAYER, STORAGE_KEY_SQUAD } from "../const/storageKeys";
import { storageRead } from "../utils/storage";

const PlayerContext = createContext();
const SquadContext = createContext();

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export const useSquad = () => {
  return useContext(SquadContext);
};

const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(storageRead(STORAGE_KEY_PLAYER));
  const [squad, setSquad] = useState(storageRead(STORAGE_KEY_SQUAD));

  const state = {
    player,
    setPlayer,
  };

  const squadState = {
    squad,
    setSquad,
  };

  return (
    <PlayerContext.Provider value={state}>
      <SquadContext.Provider value={squadState}>
        {children}
      </SquadContext.Provider>
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
