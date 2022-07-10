// import { useSelector } from "react-redux";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import './Home.scss'

const Home = () => {


  return (
    <div className="mainContainer">      
      <NewPost/>
      <Posts />
    </div>
  );
};

export default Home;
