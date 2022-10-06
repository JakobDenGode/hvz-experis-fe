/* const apiUrl = process.env.REACT_APP_API_URL; */

const apiUrl = "insert";

export const findGames = async () => {
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
