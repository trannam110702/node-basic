import { fetchPostDataById, fetchCommentsDataByPostId } from "./api.js";
import { writeJSON } from "./functions.js";
const getFormatData = async (id) => {
  // Get all data
  const post = await fetchPostDataById(id);
  const comments = await fetchCommentsDataByPostId(id);

  return { ...post, comments };
};
const writeFile = async () => {
  const data = await getFormatData(1);
  writeJSON("8.json", JSON.stringify(data));
};
writeFile();
