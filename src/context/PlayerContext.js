import React from "react";
import { createContext, useContext, useState } from "react";
import {
  STORAGE_KEY_MAPCORDS,
  STORAGE_KEY_PLAYER,
  STORAGE_KEY_SQUAD,
} from "../const/storageKeys";
import { storageRead } from "../utils/storage";

const PlayerContext = createContext();
const SquadContext = createContext();
const MapCordsContext = createContext();

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export const useSquad = () => {
  return useContext(SquadContext);
};

export const useMapCords = () => {
  return useContext(MapCordsContext);
};

const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(storageRead(STORAGE_KEY_PLAYER));
  const [squad, setSquad] = useState(storageRead(STORAGE_KEY_SQUAD));
  const [mapCords, setMapCords] = useState(storageRead(STORAGE_KEY_MAPCORDS));

  const state = {
    player,
    setPlayer,
  };

  const squadState = {
    squad,
    setSquad,
  };

  const mapCordsState = {
    mapCords,
    setMapCords,
  };

  return (
    <PlayerContext.Provider value={state}>
      <SquadContext.Provider value={squadState}>
        <MapCordsContext.Provider value={mapCordsState}>
          {children}
        </MapCordsContext.Provider>
      </SquadContext.Provider>
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
