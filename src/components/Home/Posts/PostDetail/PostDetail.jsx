import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, reset } from "../../../../features/posts/postsSlice";
import AddComment from "./AddComment/AddComment";
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const API_URL = 'http://localhost:8080/assets/';

const PostDetail = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);  
  const getPost = async (_id) => {
    await dispatch(getById(_id));
    dispatch(reset());
  }

  useEffect(() => {
        getPost(_id);
    // eslint-disable-next-line
  }, []);    

  console.log(post.post?.commentIds)
  

  return (
    <div>
      <div>
        <Card
          style={{
            width: 300,
          }}
          cover={<img alt='avatar' src={API_URL + post.post?.avatar} />}
          
        >
          <Meta
            avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
            title={post.post?.title}
            description={post.post?.content}
          />
        </Card>
      </div>
      <div>
        <div>
         {
            post.post?.commentIds &&  post.post?.commentIds.map((e) => {              
              return <h2 key={e._id}>                
                        {e.content}
                    </h2>;
            })            
         }
        </div>
        <AddComment postId = {_id}/>
      </div>
    </div>
  );
};

export default PostDetail;
