import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getInfo,
  reset,
  deletePost,
  getById,
  editPost
} from "../../features/posts/postsSlice";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
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

const API_URL = "http://localhost:8080/assets/";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { userPosts, posts, post } = useSelector((state) => state.posts);

  const postIds = userPosts.postIds;
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  // const [form] = Dialog.useForm();

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
    setFormData({ ...posts });
    // form.setFieldsValue(post);
    // eslint-disable-next-line
  }, [posts]);

  const deletePostNow = (_id) => {
    dispatch(deletePost(_id));
  };

  const showModal = (_id) => {
    console.log(_id)
    dispatch(getById(_id));
    handleClickOpen();
  };

  const [formData, setFormData] = useState({
    title: "",
    content: "",    
  });

  const { title, content } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOk = (_id) => {
    console.log(_id)
    dispatch(editPost({...formData, _id}));
    handleClose(false);
  };

  const userPost = postIds?.map((userPost) => {
    return (
      <>
        <div key={userPost._id}>
          <Link to={"/post/" + userPost._id}>
            <p>{userPost.title}</p>
          </Link>
          <DeleteOutlined onClick={() => dispatch(deletePostNow(userPost._id))} /> 
          <EditOutlined onClick={() => showModal(userPost._id)} />          
        </div>
        <div>
        
      </div>
      </>

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
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit your post!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Something wrong? Edit your post here!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="New Title"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChange}
              value={title}
              name="title"
            />
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label="New content"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChange}
              value={content}
              name="content"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() =>{handleOk(post.post._id)} }>Update</Button>
          </DialogActions>
        </Dialog>
    </>
  );
};

export default Profile;
