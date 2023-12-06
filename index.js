import fs from "fs/promises";
const fetchData = async (endpoint, query) => {
  const baseUrl = "https://jsonplaceholder.typicode.com";
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
  try {
    const response = await fetch(baseUrl + endpoint + queryString);
    console.log(baseUrl + endpoint + queryString);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
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
  console.log("Start fetching users data");
  const data = await fetchData("/users");
  await writeJSON("2.json", data);
};
getUser();

// Task 3
const getFormatData3 = async () => {
  // Get all data
  const users = await fetchData("/users");
  const posts = await fetchData("/posts");
  const comments = await fetchData("/comments");

  // Format Data
  const formatedData = users.map((user) => {
    // Create post array of this user
    const userPosts = posts.filter((post) => post.userId === user.id);

    // Filter all comments of all post of this user
    const userComments = comments.filter((comment) => comment.email === user.email);

    return { ...user, posts: userPosts, comments: userComments };
  });
  await writeJSON("3.json", formatedData);
};
getFormatData3();

// Task 4
const getFormatData4 = async () => {
  // Get all data
  const users = await fetchData("/users");
  const posts = await fetchData("/posts");
  const comments = await fetchData("/comments");

  // Format Data
  const formatedData = users.map((user) => {
    // Create post array of this user
    const userPosts = posts.filter((post) => post.userId === user.id);

    // Filter all comments of all post of this user
    const userComments = comments.filter((comment) => comment.email === user.email);

    return { ...user, posts: userPosts, comments: userComments };
  });

  // User with more than 3 comments
  await writeJSON(
    "4.json",
    formatedData.filter((user) => user.comments?.length > 3)
  );
};
getFormatData4();

// Task 5
const getFormatData5 = async () => {
  // Get all data
  const users = await fetchData("/users");
  const posts = await fetchData("/posts");
  const comments = await fetchData("/comments");

  // Format Data
  const formatedData = users.map((user) => {
    // Create post array of this user
    const userPosts = posts.filter((post) => post.userId === user.id);

    // Filter all comments of all post of this user
    const userComments = comments.filter((comment) => comment.email === user.email);

    return { ...user, postsCount: userPosts?.length, commentsCount: userComments?.length };
  });
  await writeJSON(
    "5.json",
    formatedData.filter((user) => user.comments?.length > 3)
  );
};
getFormatData5();

//Task 6
const getFormatData6 = async () => {
  // Get all data
  const users = await fetchData("/users");
  const posts = await fetchData("/posts");
  const comments = await fetchData("/comments");

  // Format Data
  const formatedData = users.map((user) => {
    // Create posts array of this user
    const userPosts = posts.filter((post) => post.userId === user.id);

    // Filter all comments of all posts of this user
    const userComments = comments.filter((comment) => comment.email === user.email);

    return { ...user, posts: userPosts, comments: userComments };
  });

  return formatedData;
};
const getHighest = async () => {
  const data = await getFormatData6();
  const sortByComments = data.sort((a, b) => {
    return a.comments?.length > b.comments?.length;
  });
  const sortByPosts = data.sort((a, b) => {
    return a.posts?.length > b.posts?.length;
  });
  const highestCommentsCount = sortByComments[data?.length - 1].comments?.length;
  const highestPostsCount = sortByPosts[data?.length - 1].posts?.length;

  const rawData = {
    mostCommentUsers: data.filter((user) => user.comments?.length === highestCommentsCount),
    mostPostUsers: data.filter((user) => user.comments?.length === highestPostsCount),
  };
  await writeJSON("6.json", rawData);
};
getHighest();

// Task 7
const getFormatData7 = async () => {
  // Get all data
  const users = await fetchData("/users");
  const posts = await fetchData("/posts");
  const comments = await fetchData("/comments");

  // Format Data
  const formatedData = users.map((user) => {
    // Create post array of this user
    const userPosts = posts.filter((post) => post.userId === user.id);

    // Filter all comments of all post of this user
    const userComments = comments.filter((comment) => comment.email === user.email);

    return { ...user, postsCount: userPosts?.length, commentsCount: userComments?.length };
  });

  return formatedData;
};
const getSortedData = async () => {
  const data = await getFormatData7();
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
  await writeJSON("7.json", rawData);
};
getSortedData();

// Task 8
const getFormatData8 = async (id) => {
  // Get all data
  const post = await fetchData(`/posts/${id}`);
  const comments = await fetchData("/comments", { postId: id });

  const rawData = { ...post, comments };
  writeJSON("8.json", rawData);
};
getFormatData8(1);
