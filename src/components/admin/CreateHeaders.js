export const createHeaders = (accessToken) => {
  return {
    "content-type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
};

//export const handleResponse = () => {};
