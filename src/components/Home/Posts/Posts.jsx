import React, { useEffect } from "react";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../../features/posts/postsSlice";
import { LoadingOutlined } from "@ant-design/icons";

const Posts = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.posts);

  const getPostsAndReset = async () => {
    await dispatch(getAll());
    dispatch(reset());
  };
  useEffect(() => {
    getPostsAndReset();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <LoadingOutlined
        style={{
          fontSize: 120,
        }}
        spin
      />
    );
  }

  return (
    <div>      
      <Post />
    </div>
  );
};

export default Posts;
