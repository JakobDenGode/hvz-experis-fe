import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Heading from "../common/Heading";
import GameList from "../components/game-list/GameList";
import CreateGame from "../components/admin/CreateGame";
import { createHeaders } from "../components/admin/CreateHeaders";

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

  /*if (user) {
    console.log(user["http://mynamespace/roles"].pop());
  }*/
  console.log(user);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}user/register`;
    const postUser = async () => {
      if (user) {
        const accessToken = await getAccessTokenSilently();
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

  const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}game`;

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
    <>
      <div>
        <Heading
          title={
            user && user["http://demozero.net/roles"].length > 0
              ? "Admin"
              : "Games"
          }
        />
        <CreateGame />
        <GameList games={games} />
      </div>
      {isAuthenticated && (
        <>
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.sub}</p>
          </div>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </>
      )}
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </>
  );
};
export default LandingPage;
