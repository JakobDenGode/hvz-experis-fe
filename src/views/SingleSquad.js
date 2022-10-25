import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Heading from "../common/Heading";
import { createHeaders } from "../components/admin/CreateHeaders";
import HeaderNavBar from "../components/nav/HeaderNavBar";
import LeaveSquadButton from "../components/player/LeaveSquadButton";
import PingButton from "../components/player/PingButton";
import SquadMemberList from "../components/squad-list/SquadMemberList";
import { useSquad } from "../context/PlayerContext";

function SingleSquad() {
  const [squadMembers, setSquadMembers] = useState([]);
  const { squad, setSquad } = useSquad();
  const gameId = useParams();
  const { getAccessTokenSilently } = useAuth0();

  console.log(squad.id);

  useEffect(() => {
    const findSquadMembers = async () => {
      const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/squad/${squad.id}/players`;
      // const apiUrl2 = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/players`;
      const accessToken = await getAccessTokenSilently();

      try {
        const squadMembersFetch = await fetch(apiUrl, {
          method: "GET",
          headers: createHeaders(accessToken),
        });

        //if (!response.ok) throw new Error("Could not complete request");
        const squadMembersResult = await squadMembersFetch.json();

        /*
        const currentMembers = squadMembersResult.filter((member) => {
          re
        })
        */

        console.log(squadMembersResult);

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
      <HeaderNavBar />
      <Heading title={squadMembers && squadMembers.name} />
      <SquadMemberList squadMembers={squadMembers} />
      <PingButton squadMembers={squadMembers} />
      <LeaveSquadButton squadMembers={squadMembers} />
    </div>
  );
}

export default SingleSquad;
