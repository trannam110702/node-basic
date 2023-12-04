import { fetchUsersData } from "./api.js";
import { writeJSON } from "./functions.js";
const getUser = async () => {
  console.log("Start fetching users data");
  const data = await fetchUsersData();
  return data;
};
const writeFile = async () => {
  const data = await getUser();
  writeJSON("2.json", JSON.stringify(data));
};
writeFile();
