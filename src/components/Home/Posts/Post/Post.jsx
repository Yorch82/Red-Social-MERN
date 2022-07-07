import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { like, dislike } from "./../../../../features/posts/postsSlice"
import React from 'react';
import { HeartOutlined, HeartFilled,  MessageOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from 'antd';
const API_URL = "http://localhost:8080/assets/";

// const IconText = ({ icon, text }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );

const Post = (likes, _id) => {
  const { posts } = useSelector((state) => state.posts); 
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const data = posts.map((post) =>     
  // console.log(post.likes)
    (
      {        
    _id: post._id,
    title: post.title,
    avatar: post.avatar,
    content: post.content,
    likes: post.likes,
    // userAvatar: post.userId.avatar
  }));
  
  return (
    <div key={_id}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={data}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }        
        renderItem={(item) => (          
          <List.Item
            key={item.title}
            actions={[
              item.likes?.includes(user?.user._id) ? (
                <>
                <HeartFilled
                style={{ fontSize: "20px", color: "#FF0000" }}                
                key="list-vertical-like-o"
                onClick={ () => dispatch(dislike(item._id))}
              />
              <span>{item.likes?.length}</span>
              </>
              ) : (
                <>
                <HeartOutlined                
                text={item.likes?.length}
                key="list-vertical-like-o"
                onClick={ () => dispatch(like(item._id))}
              />
              <span>{item.likes?.length}</span>
              </>
              ),
              
              // <IconText
              //   icon={HeartFilled}
              //   style={{ fontSize: "20px", color: "#FF0000" }}  
              //   text= {item.likes?.length}
              //   key="list-vertical-message"
              // />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src={API_URL + item.avatar}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={API_URL + item.userAvatar} />}
              title={<Link to={"/post/" + item._id}>{item.title}</Link>}              
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>    
  );
};

export default Post;

