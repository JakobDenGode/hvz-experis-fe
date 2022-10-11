import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import JoinButton from "../components/map/JoinButton";
import Map from "../components/map/Map";
import MobileNavBar from "../components/nav/MobileNavBar";

const MapPage = () => {
  const gameId = useParams();
  console.log(gameId);
  const { getAccessTokenSilently } = useAuth0();

  console.log(useAuth0());

  return (
    <>
      <Map />
      <JoinButton />
      <MobileNavBar />
    </>
  );
};

export default withAuthenticationRequired(MapPage, {
  onRedirecting: () => <div>Redirecting to Login page</div>,
});

export const getProtectedResource = async (accessToken) => {
  const config = {
    url: ``,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
