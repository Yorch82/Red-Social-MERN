import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../../../features/posts/postsSlice";
const API_URL = "http://localhost:8080/assets/";

const PostAdmin = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const post = posts.map((post) => {
    return (
      <div className="post" key={post._id}>
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={API_URL + post.avatar}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        <button onClick={() => dispatch(deletePost(post._id))}>Delete Post</button>
      </div>
    );
  });

  return <>{post}</>;
};

export default PostAdmin;
