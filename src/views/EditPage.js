import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createHeaders } from "../components/admin/CreateHeaders";
import EditList from "../components/admin/EditList";
import MobileNavBar from "../components/nav/MobileNavBar";

export default withAuthenticationRequired(AdminPage, {
  onRedirecting: () => <div>Redirecting to Login page</div>,
});

function AdminPage() {
  const { user, getAccessTokenSilently } = useAuth0();
  const gameId = useParams();
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    const findGames = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}`,
          { headers: createHeaders(accessToken) }
        );
        //if (!response.ok) throw new Error("Could not complete request");
        console.log(response);
        const data = await response.json();
        console.log(data);
        setGameData(data);
        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
    };
    findGames();
  }, []);

  console.log(gameData);

  if (user && !user["https//:hvz-server.com/roles"].length > 0) {
    return <div>Permission denied</div>;
  }

  return (
    <div>
      <EditList gameData={gameData} />
      <MobileNavBar />
    </div>
  );
}
