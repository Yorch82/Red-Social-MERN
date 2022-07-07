// import { useSelector } from "react-redux";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";

const Home = () => {


  return (
    <div>      
      <NewPost/>
      <Posts />
    </div>
  );
};

export default Home;
