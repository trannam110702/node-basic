import fs from "fs/promises";
const writeJSON = async (filePath, jsonData) => {
  try {
    await fs.writeFile(filePath, jsonData, "utf8");
    console.log("JSON data has been written to", filePath);
  } catch (err) {
    console.error("Error writing file:", err);
  }
};

//todo: các hàm fetch này viết thành 1 hàm riếng đc không , chỉ cần truyên path vào là lấy đc.
const fetchUsersData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
const fetchPostsData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
const fetchPostDataById = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
const fetchCommentsData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
const fetchCommentsDataByPostId = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// Task 2

const getUser = async () => {
  console.log("Start fetching users data");
  const data = await fetchUsersData();
  return data;
};
const writeFile2 = async () => {
  const data = await getUser();
  writeJSON("2.json", JSON.stringify(data));
};
writeFile2();

// Task 3
const getFormatData3 = async () => {
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

// todo thay vì write từng file mình truyền trên file cần write rồi gọi hàm luôn đc không , anh thấy hàm nó chức năng giống nhau mà viết di viết lại nhiều quá 
const writeFile3 = async () => {
  const data = await getFormatData3();
  writeJSON("3.json", JSON.stringify(data));
};
writeFile3();

// Task 4

const getFormatData4 = async () => {
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
  //todo return formatedData.filter((user) => user.comments.length > 3); return thế này luôn nhé , đỡ phải tạo thêm 1 biến nhé 
  const targetUser = formatedData.filter((user) => user.comments.length > 3);
  return targetUser;
};
const writeFile4 = async () => {
  const data = await getFormatData4();
  writeJSON("4.json", JSON.stringify(data));
};
writeFile4();

// Task 5

const getFormatData5 = async () => {
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
const writeFile5 = async () => {
  const data = await getFormatData5();
  writeJSON("5.json", JSON.stringify(data));
};
writeFile5();

// Task 6

const getFormatData6 = async () => {
  // Get all data
  const users = await fetchUsersData();
  const posts = await fetchPostsData();
  const comments = await fetchCommentsData();

  //mình return luôn từ chỗ này đc không ? đỡ phải tạo thêm 1 biến 

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
  const data = await getFormatData6();
  const sortByComments = data.sort((a, b) => {
    // todo: nhiều if else quá , mình sử dụng mình if và return đc không ? 
    if (a.comments.length > b.comments.length) {
      return 1;
    } else if (a.comments.length < b.comments.length) {
      return -1;
    } else {
      return 0;
    }
  });
  const sortByPosts = data.sort((a, b) => {
     // todo: nhiều if else quá , mình sử dụng mình if và return đc không ? 
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
const writeFile6 = async () => {
  const data = await getHighest();
  writeJSON("6.json", JSON.stringify(data));
};
writeFile6();

// Task 7

const getFormatData7 = async () => {
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
const getSortedData = async () => {
  const data = await getFormatData7();
  const sortByComments = data.sort((a, b) => {
     // todo: nhiều if else quá , mình sử dụng mình if và return đc không ? 
    if (a.commentsCount.length > b.commentsCount.length) {
      return -1;
    } else if (a.commentsCount.length < b.commentsCount.length) {
      return 1;
    } else {
      return 0;
    }
  });
  const sortByPosts = data.sort((a, b) => {
    if (a.postsCount.length > b.postsCount.length) {
      return -1;
    } else if (a.postsCount.length < b.postsCount.length) {
      return 1;
    } else {
      return 0;
    }
  });

  return {
    sortByComments,
    sortByPosts,
  };
};
const writeFile7 = async () => {
  const data = await getSortedData();
  writeJSON("7.json", JSON.stringify(data));
};
writeFile7();

// Task 8

const getFormatData8 = async (id) => {
  // Get all data
  const post = await fetchPostDataById(id);
  const comments = await fetchCommentsDataByPostId(id);

  return { ...post, comments };
};
const writeFile8 = async () => {
  const data = await getFormatData8(1);
  writeJSON("8.json", JSON.stringify(data));
};
writeFile8();
