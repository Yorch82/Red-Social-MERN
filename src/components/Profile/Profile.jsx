import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getInfo, reset } from "../../features/posts/postsSlice";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const API_URL = "http://localhost:8080";


const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const { userPosts } = useSelector((state) => state.posts);

  const postIds = userPosts.postIds;

  const dispatch = useDispatch();

  const getUserPosts = async () => {
    await dispatch(getInfo());
    dispatch(reset());
  };

  useEffect(() => {
    getUserPosts();
    // eslint-disable-next-line
  }, []);

  const userPost = postIds?.map((userPost) => {
    return (
      <div key={userPost._id}>
        <Link to={"/post/" + userPost._id}>
          <p>{userPost.title}</p>
        </Link>
      </div>
    );
  });

  return (
    <>
      <div>
        <h1>Profile</h1>        
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="your ugly face"
            height="250"
            image={API_URL + user.user.avatar}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {user.user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {user.user.mail}
            </Typography>
          </CardContent>          
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
