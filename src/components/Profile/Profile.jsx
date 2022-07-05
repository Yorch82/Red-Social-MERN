import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getInfo, reset } from "../../features/posts/postsSlice"
import { Card } from "antd";
const API_URL = "http://localhost:8080";
const { Meta } = Card;

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const { userPosts } = useSelector((state) => state.posts);
  
  const postIds = userPosts.postIds;

  const dispatch = useDispatch();

  const getUserPosts = async () => {
    await dispatch(getInfo());
    dispatch(reset())
  };

  useEffect(() => {
    getUserPosts()
    // eslint-disable-next-line
  }, []);

  const userPost = postIds?.map((userPost) => {
    return (
        <div key={userPost._id}>
            <Link to={"/post/" + userPost._id}>
                <p>{userPost.title}</p>
            </Link>
        </div>
    )
  })

  return (
    <>
      <div>
        <h1>Profile</h1>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="your ugly face" src={API_URL + user.user.avatar} />}>
        <Meta title={user.user.name} description={user.user.mail} />
      </Card>
      </div>
      <div>
        <h3>Posts</h3>
        <div>{userPost}</div>
      </div>
    </>
    
  );
};

export default Profile;
