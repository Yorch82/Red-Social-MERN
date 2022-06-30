import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../../../features/posts/postsSlice";

const PostDetail = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getById(_id));
    console.log("soy  detail")
    // eslint-disable-next-line
  }, []);  
  return (
    <div>
      <h1>PostDetail</h1>
      <p>{post.post.title}</p>
      <p>{post.post.content}</p>
    </div>
  );
};

export default PostDetail;
