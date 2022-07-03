import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostByName } from "../../features/posts/postsSlice";
import Post from "../Home/Posts/Post/Post";

const Search = () => {
  const { postTitle } = useParams();
  const dispatch = useDispatch();   

  const getData = async (postTitle) => {
    await dispatch(getPostByName(postTitle));
  };
  
  useEffect(() => {    
    getData(postTitle);
    console.log(postTitle)
  // eslint-disable-next-line  
  }, [postTitle]);
  
  return <div><Post/></div>;
};

export default Search;
