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
  LocationMarker,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import { createHeaders } from "../admin/CreateHeaders";
import { useAuth0 } from "@auth0/auth0-react";

import HeaderNavBar from "../nav/HeaderNavBar";

import { divIcon } from "leaflet";
import { Button } from "react-bootstrap";


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

  //styling for missions
  const fillZombie = { fillColor: "red" };
  const fillHuman = { fillColor: "blue" };

  //styling for tombstone marker
  const tombstone = L.icon({
    iconUrl: "https://img.icons8.com/ios-filled/50/000000/grave.png",
    iconSize: [23, 23], // size of the icon
    iconAnchor: [23, 23], // point of the icon which will correspond to marker's location
    popupAnchor: [-10, -15], // point from which the popup should open relative to the iconAnchor
  });

  //Get game
  useEffect(() => {
    const findGames = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER_URL}game/${gameId.gameId}`,
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
          `https://hvz-api-noroff.herokuapp.com/game/${gameId.gameId}/mission/1`,
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

        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
    };
    findMissions();
  }, []);

  missionCords.map((item) => console.log(item.missionLat, item.missionLng));

  //Function to get all mission markers
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
          radius={70}
        >
          <Popup>
            {item.missionName} <br></br> {item.missionDescription}
          </Popup>
        </Circle>
      );
    });
  }

  //Get player location when the game starts
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvent({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    console.log("Player location: ");
    console.log(position);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>Player Location</Popup>
      </Marker>
    );
  }

  //Map
  return (
    <>
      <HeaderNavBar title={gameData.gameTitle} />
      <MapContainer
        center={[35.6762, 139.6503]}
        zoom={8}
        scrollWheelZoom={false}
        height={180}
      >
        <LocationMarker />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* marker for missions */}
        <MultipleMarkers />
        {/*Rectangle to draw game area*/}
        <Rectangle
          bounds={getRectangle}
          pathOptions={{ color: "black" }}
        ></Rectangle>
        {/*test marker for tombstone styling*/}
        <Marker icon={tombstone} position={[59.931145, 10.78683]}>
          {" "}
          <Popup>A dead player</Popup>
        </Marker>
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
