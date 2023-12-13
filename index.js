import fs from "fs/promises";

const queryStringify = (query) => {
  let queryString = "";
  if (query) {
    queryString += "?";
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const element = query[key];
        queryString += `${key}=${element}`;
      }
    }
  }
  return queryString;
};
const fetchData = async (endpoint, query) => {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  const response = await fetch(baseUrl + endpoint + queryStringify(query));
  const data = await response.json();
  return data;
};
const writeJSON = async (filePath, rawJsData) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(rawJsData), "utf8");
    console.log("JSON data has been written to", filePath);
  } catch (err) {
    console.error("Error writing file:", err);
  }
};

// Task 2
const getUser = async () => {
  const data = await fetchData("/users");
  return data;
};
writeJSON("2.json", getUser());

// Task 3
const getUsersWithCommentsAndPosts = async () => {
  // Get all data
  const [users, posts, comments] = await Promise.all([
    fetchData("/users"),
    fetchData("/posts"),
    fetchData("/comments"),
  ]);

  // Format Data
  const formatedData = users.map((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);
    const userComments = comments.filter((comment) => comment.email === user.email);
    return { ...user, posts: userPosts, comments: userComments };
  });
  return formatedData;
};

writeJSON("3.json", getUsersWithCommentsAndPosts());
// Task 4
const getUsersWithMoreThan3Comments = async () => {
  // Get all data
  const [users, posts, comments] = await Promise.all([
    fetchData("/users"),
    fetchData("/posts"),
    fetchData("/comments"),
  ]);

  // Format Data
  const formatedData = users.map((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);
    const userComments = comments.filter((comment) => comment.email === user.email);

    return { ...user, posts: userPosts, comments: userComments };
  });

  // User with more than 3 comments

  return formatedData.filter((user) => user.comments?.length > 3);
};
writeJSON("4.json", getUsersWithMoreThan3Comments());

// Task 5
const getUserWithPostAndCommentCount = async () => {
  // Get all data
  const [users, posts, comments] = await Promise.all([
    fetchData("/users"),
    fetchData("/posts"),
    fetchData("/comments"),
  ]);

  // Format Data
  const formatedData = users.map((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);
    const userComments = comments.filter((comment) => comment.email === user.email);
    return { ...user, postsCount: userPosts?.length, commentsCount: userComments?.length };
  });
  return formatedData;
};
writeJSON("5.json", getUserWithPostAndCommentCount());

//Task 6

const getHighest = async () => {
  const data = await getUsersWithCommentsAndPosts();
  const highestCommentsCount = data.reduce(
    (max, user) => (user.comments.length > max ? user.comments.length : max),
    0
  );
  const highestPostsCount = data.reduce(
    (max, user) => (user.posts.length > max ? user.posts.length : max),
    0
  );
  const rawData = {
    mostCommentUsers: data.filter((user) => user.comments?.length === highestCommentsCount),
    mostPostUsers: data.filter((user) => user.posts?.length === highestPostsCount),
  };
  return rawData;
};

writeJSON("6.json", getHighest());

// Task 7

const getSortedData = async () => {
  const data = await getUserWithPostAndCommentCount();
  const sortByComments = data.sort((a, b) => {
    return a.commentsCount?.length < b.commentsCount?.length;
  });
  const sortByPosts = data.sort((a, b) => {
    return a.postsCount?.length < b.postsCount?.length;
  });
  const rawData = {
    sortByComments,
    sortByPosts,
  };
  return rawData;
};
writeJSON("7.json", getSortedData());

// Task 8
const getPostWithComments = async (id) => {
  const [post, comments] = await Promise.all([
    fetchData(`/posts/${id}`),
    fetchData("/comments", { postId: id }),
  ]);

  return { ...post, comments };
};

writeJSON("8.json", getPostWithComments(1));
