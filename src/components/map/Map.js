import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  Rectangle,
  Tooltip,
} from "react-leaflet";
import { useParams } from "react-router-dom";

const mapsData = [
  {
    id: 1,
    name: "game1",
    nw_lat: 59.93003177303357,
    sw_lat: 10.755969426866766,
  },
  {
    id: 2,
    name: "gam2",
    coordinates: [60.93003177303357, 10.755969426866766],
  },
];

const rectangle = [
  [10.755969426866766, 59.928406],
  [59.93003177303357, 10.76105],
];

console.log(mapsData);

/*

const cords = [mapsData[0].nw_lat, mapsData[0].sw_lat];

console.log("test: " + cords);

*/

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
        setCords([data.nw_lat, data.nw_lng]);
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
        <Marker position={cords}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={mapsData[1].coordinates} />
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
