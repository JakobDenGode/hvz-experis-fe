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
} from "react-leaflet";

function Map() {
  const gameId = useParams();
  const [gameData, setGame] = useState([]);
  const [cords, setCords] = useState([0, 0]);
  const [getRectangle, setRectangle] = useState([
    [0, 0],
    [0, 0],
  ]);

  useEffect(() => {
    const findGames = async () => {
      try {
        const response = await fetch(
          `https://hvz-api-noroff.herokuapp.com/game/${gameId.gameId}`
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

  console.log("test rectangle:");
  console.log(getRectangle);

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
        <Marker position={cords}></Marker>
        {/* test marker/ for missions */}
        <Marker position={[59.92295744566574, 10.739275233893595]} />
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
