export const fetchUsersData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const fetchPostsData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const fetchPostDataById = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const fetchCommentsData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const fetchCommentsDataByPostId = async (id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
