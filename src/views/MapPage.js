import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

const MapPage = () => {
  const { getAccessTokenSilently } = useAuth0();

  return <div>Map</div>;
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
