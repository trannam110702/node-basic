import { fetchUsersData, fetchPostsData, fetchCommentsData } from "./api.js";
import { writeJSON } from "./functions.js";
const getFormatData = async () => {
  // Get all data
  const users = await fetchUsersData();
  const posts = await fetchPostsData();
  const comments = await fetchCommentsData();

  // Format Data
  const formatedData = users.map((user) => {
    // Create post array of this user
    const userPosts = posts.filter((post) => post.userId === user.id);

    // Filter all comments of all post of this user
    const userComments = comments.filter((comment) => comment.email === user.email);

    return { ...user, postsCount: userPosts.length, commentsCount: userComments.length };
  });

  return formatedData;
};
const writeFile = async () => {
  const data = await getFormatData();
  writeJSON("5.json", JSON.stringify(data));
};
writeFile();
