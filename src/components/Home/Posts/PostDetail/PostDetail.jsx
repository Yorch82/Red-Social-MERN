import './PostDetail.scss';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, reset,  dislikeComment, likeComment  } from "../../../../features/posts/postsSlice";
import AddComment from "./AddComment/AddComment";
import { Avatar, Card, Comment } from 'antd';
import { HeartOutlined, HeartFilled, MessageOutlined } from "@ant-design/icons";
// import { dislikeComment, likeComment } from "../../../../features/comments/commentsSlice";
const { Meta } = Card;
const API_URL = 'http://localhost:8080/assets/';

const PostDetail = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);  
  const { user } = useSelector ((state) => state.auth);
  const getPost = async (_id) => {
    await dispatch(getById(_id));
    dispatch(reset());
  }
  const { comments }= useSelector((state) => state.posts);
  
  useEffect(() => {
        getPost(_id);
    // eslint-disable-next-line
  }, [comments]);    
 return (
    <>
      <div className="detailContainer">
        <Card
          style={{
            width: 300,
          }}
          cover={<img alt='avatar' src={API_URL + post.post?.avatar} />}    
                
          >
          
          <Meta
            avatar={<Avatar src={API_URL + post.post?.userId.avatar} />}
            title={post.post?.title}
            description={post.post?.content}
            /> 
            <MessageOutlined/>          
            <span>{post.post?.commentIds?.length}</span>
        </Card>
      </div>
      <div className='commentContainer'>
        <div>
         {
            post.post?.commentIds &&  post.post?.commentIds.map((e) => {              
              const isAlreadyLiked = e.likes?.includes(user?.user._id)                          
              return (
                <div key={e._id}>
                  <Comment
                    author={<p>{post.post.userId?.name}</p>}
                    avatar={
                      <Avatar
                        src={API_URL + post.post.userId?.avatar}
                        alt='Your ugly face'
                      />
                    }
                    content={<p>{e.content}</p>}
                  />
                  {isAlreadyLiked ? (
                    <HeartFilled
                      style={{ color: '#FF0000' }}
                      onClick={() => dispatch(dislikeComment(e._id))}
                    />                   
                  ) : (
                    <HeartOutlined
                      onClick={() => dispatch(likeComment(e._id))}
                    />
                  )}
                  <span>{e.likes?.length}</span>                  
                </div>
              );
            })            
         }
        </div>
        <AddComment postId = {_id}/>
      </div>
    </>
  );
};

export default PostDetail;
