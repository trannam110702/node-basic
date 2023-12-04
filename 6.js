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

  return formatedData;
};

const getHighest = async () => {
  const data = await getFormatData();
  const sortByComments = data.sort((a, b) => {
    if (a.comments.length > b.comments.length) {
      return 1;
    } else if (a.comments.length < b.comments.length) {
      return -1;
    } else {
      return 0;
    }
  });
  const sortByPosts = data.sort((a, b) => {
    if (a.posts.length > b.posts.length) {
      return 1;
    } else if (a.posts.length < b.posts.length) {
      return -1;
    } else {
      return 0;
    }
  });
  const highestCommentsCount = sortByComments[data.length - 1].comments.length;
  const highestPostsCount = sortByPosts[data.length - 1].posts.length;

  return {
    mostCommentUsers: data.filter((user) => user.comments.length === highestCommentsCount),
    mostPostUsers: data.filter((user) => user.comments.length === highestPostsCount),
  };
};
const writeFile = async () => {
  const data = await getHighest();
  writeJSON("6.json", JSON.stringify(data));
};
writeFile();
