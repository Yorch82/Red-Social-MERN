import axios from "axios";

const API_URL = "http://localhost:8080";

const getAll = async () => {
  const res = await axios.get(API_URL + "/posts/getAll?page=1");
  return res.data;
};

const getById = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + `/posts/getById/${_id}`, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const getPostByName = async (postTitle) => {
  const res = await axios.get(API_URL + "/posts/getByName/" + postTitle);
  return res.data;
};

const deletePost = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(API_URL + "/posts/delete/" + _id, {
    headers: {
      authorization: user?.token,
    },
  });

  return res.data;
};

const createPost = async (post) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(API_URL + "/posts/", post, {
    headers: {
      authorization: user?.token,
    },
  });  
  return res.data;
  
};

const postsService = {
  getAll,
  getById,
  getPostByName,
  deletePost,
  createPost
};

export default postsService;
