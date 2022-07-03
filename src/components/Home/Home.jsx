// import { useSelector } from "react-redux";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";

const Home = () => {
  // const { loginData } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Home</h1>
      {/* {loginData?.user ? <NewPost /> : null} */}
      <NewPost/>
      <Posts />
    </div>
  );
};

export default Home;
