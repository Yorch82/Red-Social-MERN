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
  return [res.data];
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

const like = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + `/users/likes/${_id}`,{}, {
      headers: {
        authorization: user?.token
      },
    } );
  return res.data;
};

const dislike = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + `/users/dislikes/${_id}`,{}, {
      headers: {
        authorization: user?.token
      },
    } );
  return res.data;
};

const getInfo = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/users/getInfo", {
      headers: {
          authorization: user?.token
      }
  });
  return res.data
};

const editPost = async (post) => {  
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + `/posts/update/${post._id}`, post, {
    headers: {
      authorization: user?.token,
    },
  });
  return res.data;
};

const addComment = async (comment) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(API_URL + '/comments/', comment,  {
    headers: {
      authorization: user?.token,
      
    },

  });
  console.log(res.data)
  return res.data;
};

const likeComment = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + `/users/likeComment/${_id}`,{}, {
      headers: {
        authorization: user?.token
      },
    } );
  return res.data;
};

const dislikeComment = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + `/users/dislikeComment/${_id}`,{}, {
      headers: {
        authorization: user?.token
      },
    } );
  return res.data;
};



const postsService = {
  getAll,
  getById,
  getPostByName,
  deletePost,
  createPost,
  like,
  dislike,
  getInfo,
  editPost,
  addComment,
  likeComment,
  dislikeComment
};

export default postsService;
