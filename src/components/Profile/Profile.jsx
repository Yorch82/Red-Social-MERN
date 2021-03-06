import './Profile.scss'
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { reset, deletePost, getById, editPost} from "../../features/posts/postsSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { updatePhoto, getInfo } from "../../features/auth/authSlice";
import { Avatar, Image } from 'antd';
import { HeartOutlined, HeartFilled, MessageOutlined, TeamOutlined, LikeOutlined} from "@ant-design/icons";
import "antd/dist/antd.css";

const API_URL = "http://localhost:8080/assets/";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts, post } = useSelector((state) => state.posts);  
  const postIds = user.user.postIds;
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  
  const [formData, setFormData] = useState({
    title: "",
    content: "",    
  });

  const { title, content } = formData;

 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUserPosts = async () => {
    await dispatch(getInfo());
    dispatch(reset());
  };
  

  useEffect(() => {
    getUserPosts();
    dispatch(getInfo())    
    // eslint-disable-next-line
  }, [posts]);

  const deletePostNow = async(_id) => {
  await  dispatch(deletePost(_id));
    // dispatch(getInfo())
  };

  useEffect(() => {
    setFormData({ 
      title: post.post?.title,
      content: post.post?.content,    
     });
  }, [post]); 

  const showModal = async (_id) => { 
    await dispatch(getById(_id));
    handleClickOpen();
  };



  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOk = (_id) => {    
    dispatch(editPost({...formData, _id}));
    handleClose(false);
  };

  const onSubmit = (e) => {    
    e.preventDefault();    
    const formData = new FormData();
    if(e.target.myFile.files[0]) formData.set('myFile', e.target.myFile.files[0]);           
    dispatch(updatePhoto(formData));    
  };



  const userPost = postIds?.map((userPost) => {
    const isAlreadyLiked = userPost.likes?.includes(user?.user._id); 
    return (
      <>
        <div key={userPost._id}>
          <Card sx={{ maxWidth: 700 }}>
            <CardMedia
              component='img'
              alt='your nosense meme'
              height='700'
              image={API_URL + userPost.avatar}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                <Link to={'/post/' + userPost._id}>
                  <p>{userPost.title}</p>
                </Link>
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {userPost.content}
              </Typography>
            </CardContent>
            <div className='cont'>
              <div className='pic'>
                <Avatar
                  src={
                    <Image
                      src={API_URL + user.user.avatar}
                      style={{ width: 60 }}
                    />
                  }
                />
              </div>
              <div className='corazon'>
                {isAlreadyLiked ? (
                  <HeartFilled className='heart' style={{ color: '#FF0000' }} />
                ) : (
                  <HeartOutlined className='heart' />
                )}
                <span>{userPost.likes?.length}</span>
                <MessageOutlined />
                <span>{userPost.commentIds?.length}</span>
              </div>
            </div>
          </Card>
          <div className='bin_like_icons'>
            <DeleteOutlined
              className='papelera'
              onClick={() => dispatch(deletePostNow(userPost._id))}
            />
            <EditOutlined
              className='papelera'
              onClick={() => showModal(userPost._id)}
            />
          </div>
        </div>
      </>
    );    
  });

  return (
    <>
      <div key={user.user._id} className='profileContainer'>
        <h1>Profile</h1>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component='img'
            alt='your ugly face'
            height='350'
            image={API_URL + user.user.avatar}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {user.user.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {user.user.mail}
            </Typography>
          </CardContent>
          <TeamOutlined />          
          <span>followers {user.user?.followedBy.length}</span>
          <span>following {user.user?.followTo.length}</span><br></br>
          <EditOutlined />
          <span>Posts {user.user?.postIds.length}</span><br></br>
          <MessageOutlined />
          <span>Comments {user.user?.commentIds.length}</span>
        </Card>
        <div>
        <form onSubmit={onSubmit} className='uploadPhoto'>
          <input type="file" name="myFile"/>          
          <button type="submit">Change your avatar!</button>
        </form>
        </div>
      </div>
      <div className='containerPost'>
        <h3>Posts</h3>
        <div>{userPost}</div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit your post!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Something wrong? Edit your post here!
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='New Title'
            type='text'
            fullWidth
            variant='standard'
            onChange={onChange}
            value={title}
            name='title'
          />
          <TextField
            autoFocus
            margin='dense'
            id='content'
            label='New content'
            type='text'
            fullWidth
            variant='standard'
            onChange={onChange}
            value={content}
            name='content'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleOk(post.post._id);
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
