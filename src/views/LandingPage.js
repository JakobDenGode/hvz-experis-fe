import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Heading from "../common/Heading";
import GameList from "../components/game-list/GameList";
import CreateGame from "../components/admin/CreateGame";
import { createHeaders } from "../components/admin/CreateHeaders";
import { useMapCords } from "../context/PlayerContext";
import { Button, Container } from "react-bootstrap";

const LandingPage = () => {
  const {
    loginWithRedirect,
    loginWithPopup,
    logout,
    isAuthenticated,
    isLoading,
    user,
    getIdTokenClaims,
    getAccessTokenSilently,
  } = useAuth0();
  const { MapCords, setMapCords } = useMapCords();
  console.log("our map cords");
  console.log(MapCords);

  /*if (user) {
    console
  .log(user["http://mynamespace/roles"].pop());
  }*/
  console.log(user);
  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}users`;
    const postUser = async () => {
      if (user) {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: createHeaders(accessToken),
          });
          console.log(response);
          if (!response.ok) throw new Error("Could not register kill");
        } catch (error) {
          console.log(error);
          return [error.message, []];
        }
      }
    };
    postUser();
  }, [user]);

  /* 
  if (isLoading) {
    return <p>loading...</p>;
  }

  Move the button or the login elements to another component */

  const [games, setGames] = useState([]);

  const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games`;

  useEffect(() => {
    const findGames = async () => {
      try {
        const response = await fetch(apiUrl);
        //if (!response.ok) throw new Error("Could not complete request");
        const data = await response.json();
        setGames(data);
      } catch (error) {
        return [error.message, []];
      }
    };
    findGames();
  }, [apiUrl]);

  return (
    <div className="position-relative">
      <Heading
        title={
          user && user["https//:hvz-server.com/roles"].length > 0
            ? "Admin"
            : "Games"
        }
      />
      <CreateGame />
      <Container>
        <GameList games={games} />
      </Container>
      {isAuthenticated && (
        <>
          <Button
            className="p-2 bg-success mt-4 me-3 position-absolute top-0 end-0"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </Button>
        </>
      )}
      {!isAuthenticated && (
        <Button
          className="p-2 bg-secondary mt-4 me-3 position-absolute top-0 end-0"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </div>
  );
};
export default LandingPage;
