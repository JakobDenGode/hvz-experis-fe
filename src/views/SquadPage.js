import React, { useEffect } from "react";
import SquadList from "../components/squad-list/SquadList";
import Heading from "../common/Heading";
import HeaderNavBar from "../components/nav/HeaderNavBar";
import MobileNavBar from "../components/nav/MobileNavBar";
import { useParams } from "react-router-dom";

const apiUrl = "https://hvz-api-noroff.herokuapp.com/squad";

//const [squads, setSquad] = useState([]);

function SquadPage() {
  const gameId = useParams();
  console.log(gameId);

  useEffect(() => {
    console.log("squad");
    const findSquads = async () => {
      try {
        const response = await fetch(`${apiUrl}`);
        if (!response.ok) throw new Error("Could not complete request");
        const data = await response.json();
        console.log(data);
        //      setSquad(data);
        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
    };

    findSquads();
  }, []);

  const squads = [
    {
      name: "Squad1",
      id: 1,
    },
    {
      name: "Squad2",
      id: 2,
    },
  ];

  return (
    <div>
      <Heading title="Squads" />
      <SquadList squads={squads} />
      <MobileNavBar />
    </div>
  );
}

export default SquadPage;
