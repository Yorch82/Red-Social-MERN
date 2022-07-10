import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { HeartFilled, MessageOutlined, DeleteOutlined, HeartOutlined} from "@ant-design/icons";
import { Avatar, Image } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../../../features/posts/postsSlice";
const API_URL = "http://localhost:8080/assets/";

const PostAdmin = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const post = posts.map((post) => {
    const isAlreadyLiked = post.likes?.includes(user?.user._id);
    return (
      <div className='post' key={post._id}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='350'
              image={API_URL + post.avatar}
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {post.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {post.content}
              </Typography>
            </CardContent>
          </CardActionArea>
          {isAlreadyLiked ? (
              <HeartFilled
                className='heart'                
                style={{ color: '#FF0000' }}
                
              />
            ) : (
              <HeartOutlined
                className='heart'
                
              />
            )}
          <span>{post.likes?.length}</span>
          <MessageOutlined />
          <span>{post.commentIds?.length}</span>
          <Avatar
            src={
              <Image src={API_URL + user.user.avatar} style={{ width: 32 }} />
            }
          />
        </Card>
        <DeleteOutlined onClick={() => dispatch(deletePost(post._id))} />
      </div>
    );
  });

  return <>{post}</>;
};

export default PostAdmin;
