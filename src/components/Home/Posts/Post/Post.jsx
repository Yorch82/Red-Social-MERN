import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { like, dislike } from "./../../../../features/posts/postsSlice"
import { HeartOutlined, HeartFilled, MessageOutlined} from "@ant-design/icons";
import { Avatar, Image } from 'antd';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import './Post.scss'

const API_URL = "http://localhost:8080/assets/";

const Post = () => { 
 
  const { posts } = useSelector(state => state.posts);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const post = posts.map(post => {    
    const isAlreadyLiked = post.likes?.includes(user?.user._id);  
    return (
      <div key={post._id} className='card'>
        <Card sx={{ maxWidth: 600 }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='750'              
              image={API_URL + post.avatar}
              alt='post meme'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {<Link to={'/post/' + post._id}>{post.title}</Link>}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {post.content}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <div className='contenedor'>
              <div className='foto'>
                <Avatar
                  src={
                    <Image
                      src={API_URL + post?.userId.avatar}
                      style={{ width: 60 }}
                    />
                  }
                />
              </div>
              <div className='iconos'>
                {isAlreadyLiked ? (
                  <HeartFilled
                    className='heart'
                    onClick={() => dispatch(dislike(post._id))}
                    style={{ color: '#FF0000' }}
                  />
                ) : (
                  <HeartOutlined
                    className='heart'
                    onClick={() => dispatch(like(post._id))}
                  />
                )}
                <span>{post.likes?.length}</span>
                <MessageOutlined />
                <span>{post.commentIds?.length}</span>
              </div>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  });
  return (
    
      <div className="post">{post}</div>
    
  );
};


export default Post;

