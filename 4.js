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

    return { ...user, posts: userPosts, comments: userComments };
  });

  // User with more than 3 comments
  const targetUser = formatedData.filter((user) => user.comments.length > 3);
  return targetUser;
};
const writeFile = async () => {
  const data = await getFormatData();
  writeJSON("4.json", JSON.stringify(data));
};
writeFile();
