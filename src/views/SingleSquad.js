import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../common/Heading";
import { createHeaders } from "../components/admin/CreateHeaders";
import SquadMemberList from "../components/squad-list/SquadMemberList";
import { useSquad } from "../context/PlayerContext";

function SingleSquad() {
  const [squadMembers, setSquadMembers] = useState();
  const { squad, setSquad } = useSquad();
  const gameId = useParams();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const findSquadMembers = async () => {
      const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/squad/${squad.id}`;
      const apiUrl2 = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/players`;
      const accessToken = await getAccessTokenSilently();
      try {
        const squadMembersFetch = await fetch(apiUrl, {
          method: "GET",
          headers: createHeaders(accessToken),
        });

        const playersFetch = await fetch(apiUrl2, {
          method: "GET",
          headers: createHeaders(accessToken),
        });
        //if (!response.ok) throw new Error("Could not complete request");
        const squadMembersResult = await squadMembersFetch.json();
        const playersResult = await playersFetch.json();

        /*
        const currentMembers = squadMembersResult.filter((member) => {
          re
        })
        */

        console.log(squadMembersResult);
        console.log(playersResult);
        //console.log(players);
        setSquadMembers(squadMembersResult);
      } catch (error) {
        return [error.message, []];
      }
    };
    findSquadMembers();
  }, []);

  return (
    <div>
      <Heading title={squadMembers && squadMembers.name} />
    </div>
  );
}

export default SingleSquad;
