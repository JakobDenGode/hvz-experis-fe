import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Heading from "../common/Heading";
import GameList from "../components/game-list/GameList";

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

  /* 
  if (isLoading) {
    return <p>loading...</p>;
  }

  Move the button or the login elements to another component */

  const [games2, setGames2] = useState([]);

  const apiUrl = "https://hvz-api-noroff.herokuapp.com/game";

  useEffect(() => {
    const findGames = async () => {
      try {
        const response = await fetch(`${apiUrl}`);
        if (!response.ok) throw new Error("Could not complete request");
        const data = await response.json();
        console.log(data);
        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
    };
    findGames();
  }, [apiUrl]);

  const games = [
    {
      name: "Knoll",
      age: 4,
      id: 1,
    },
    {
      name: "Tott",
      age: 3,
      id: 2,
    },
  ];

  return (
    <>
      <div>
        <Heading title="Games" />
        <GameList games={games} />
      </div>
    </>
  );
};
export default LandingPage;

/*
{
  isAuthenticated && (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
    <button onClick={() => loginWithRedirect()}>Log In</button>
  );
}
*/
