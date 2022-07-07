import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { like, dislike } from "./../../../../features/posts/postsSlice"
import React from 'react';
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';


const API_URL = "http://localhost:8080/assets/";


// const Post = (likes, _id) => {
//   const { posts } = useSelector((state) => state.posts); 
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const data = posts.map((post) =>     
//   // console.log(post.likes)
//     (
//       {        
//     _id: post._id,
//     title: post.title,
//     avatar: post.avatar,
//     content: post.content,
//     likes: post.likes,
//     userAvatar: post.userId.avatar
//   }));
  
//   return (
//     <div key={_id}>
//       <List
//         itemLayout="vertical"
//         size="large"
//         pagination={{
//           onChange: (page) => {
//             console.log(page);
//           },
//           pageSize: 10,
//         }}
//         dataSource={data}
//         footer={
//           <div>
//             <b>ant design</b> footer part
//           </div>
//         }        
//         renderItem={(item) => (          
//           <List.Item
//             key={item.title}
//             actions={[
//               item.likes?.includes(user?.user._id) ? (
//                 <>
//                 <HeartFilled
//                 style={{ fontSize: "20px", color: "#FF0000" }}                
//                 key="list-vertical-like-o"
//                 onClick={ () => dispatch(dislike(item._id))}
//               />
//               <span>{item.likes?.length}</span>
//               </>
//               ) : (
//                 <>
//                 <HeartOutlined                
//                 text={item.likes?.length}
//                 key="list-vertical-like-o"
//                 onClick={ () => dispatch(like(item._id))}
//               />
//               <span>{item.likes?.length}</span>
//               </>
//               ),
              
//               <IconText
//                 icon={HeartFilled}
//                 style={{ fontSize: "20px", color: "#FF0000" }}  
//                 text= {item.likes?.length}
//                 key="list-vertical-message"
//               />,
//             ]}
//             extra={
//               <img
//                 width={272}
//                 alt="logo"
//                 src={API_URL + item.avatar}
//               />
//             }
//           >
//             <List.Item.Meta
//               avatar={<Avatar src={API_URL + item.userAvatar} />}
//               title={<Link to={"/post/" + item._id}>{item.title}</Link>}              
//             />
//             {item.content}
//           </List.Item>
//         )}
//       />
     

//     </div>    
//   );
// };

const Post = () => { 
 
  const { posts } = useSelector(state => state.posts);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const post = posts.map(post => {
   
    const isAlreadyLiked = post.likes?.includes(user?.user._id);  
    return (
      <div key={post._id}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='350'
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
            {isAlreadyLiked ? (
              <HeartFilled
                className='heart'
                onClick={() => dispatch(dislike(post._id))}
                style={{ color: '#FF0000' }}
                text={post.likes?.length}
              />
            ) : (
              <HeartOutlined
                className='heart'
                onClick={() => dispatch(like(post._id))}
              />
            )}
          </CardActions>
        </Card>
      </div>
    );
  });
  return (
    <>
      <div>{post}</div>
    </>
  );
};


export default Post;

