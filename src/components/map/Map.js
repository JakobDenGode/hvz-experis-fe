import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  Rectangle,
  Tooltip,
  Circle,
} from "react-leaflet";
import { createHeaders } from "../admin/CreateHeaders";
import { useAuth0 } from "@auth0/auth0-react";
import { divIcon } from "leaflet";

function Map() {
  const { getAccessTokenSilently } = useAuth0();
  const gameId = useParams();
  const [gameData, setGame] = useState([]);
  const [cords, setCords] = useState([]);
  const [missionCords, setMissionCords] = useState([]);
  const [getRectangle, setRectangle] = useState([
    [0, 0],
    [0, 0],
  ]);

  const fillZombie = { fillColor: "red" };
  const fillHuman = { fillColor: "blue" };

  useEffect(() => {
    const findGames = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const response = await fetch(
          `https://hvz-api-noroff.herokuapp.com/game/${gameId.gameId}`,
          { headers: createHeaders(accessToken) }
        );
        //if (!response.ok) throw new Error("Could not complete request");
        console.log(response);
        const data = await response.json();
        setGame(data);
        //get coordinates for marker
        setCords([data.nw_lat, data.nw_lng]);
        //get coordinates to draw rectangle
        setRectangle([
          [data.nw_lat, data.nw_lng],
          [data.se_lat, data.se_lng],
        ]);
        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
    };
    findGames();
  }, []);

  //Get missions
  useEffect(() => {
    const findMissions = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const response = await fetch(
          `https://hvz-api-noroff.herokuapp.com/game/1/mission/1`,
          { headers: createHeaders(accessToken) }
        );
        //if (!response.ok) throw new Error("Could not complete request");
        console.log(response);
        const data = await response.json();

        console.log("-------");
        console.log(data);
        console.log("here");
        data.map((item) =>
          console.log(item.missionName, item.missionLat, item.missionLng)
        );

        setMissionCords(data);
        console.log(missionCords);

        //get coordinates to draw rectangle
        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
    };
    findMissions();
  }, []);

  missionCords.map((item) => console.log(item.missionLat, item.missionLng));

  //Function to get all mission markers coordinaters
  function MultipleMarkers() {
    const map = useMapEvent({
      click() {
        map.locate();
      },
    });
    return missionCords.map((item) => {
      return (
        <Circle
          center={[item.missionLat, item.missionLng]}
          pathOptions={fillHuman}
          radius={50}
        />
      );
    });
  }

  return (
    <>
      <p>{gameData.gameTitle}</p>
      <MapContainer
        center={[59.92295744566574, 10.739275233893595]}
        zoom={12}
        scrollWheelZoom={false}
        height={180}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MultipleMarkers />
        {/* test marker/ for missions */}

        {/*Rectangle*/}
        <Rectangle
          bounds={getRectangle}
          pathOptions={{ color: "black" }}
        ></Rectangle>
      </MapContainer>
    </>
  );
}

export default Map;

/*
<Marker
  position={mapsData.map(function (data) {
    return data.coordinates;
  })}
/>;

*/
