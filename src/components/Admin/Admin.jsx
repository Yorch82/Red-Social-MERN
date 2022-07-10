import PostAdmin from "./PostAdmin/PostAdmin";
import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../features/posts/postsSlice";
import { useEffect } from "react";

const Admin = () => {
  const { isLoading, posts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const getPostsAndReset = async () => {
    await dispatch(getAll());
    dispatch(reset());
  };

  useEffect(() => {
    getPostsAndReset();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <h1>Cargando posts...</h1>;
  }

  return (
    <div className="adminContainer">
      <h1>Admin</h1>

      <PostAdmin />
    </div>
  );
};

export default Admin;
