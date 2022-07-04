import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from 'react';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
const API_URL = "http://localhost:8080";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Post = () => {
  const { posts } = useSelector((state) => state.posts); 
  const data = posts.map((post) => ({
    _id: post._id,
    title: post.title,
    avatar: post.avatar,
    content: post.content
  }));
  

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
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
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
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
              avatar={<Avatar src={API_URL + item.avatar} />}
              title={<Link to={"/post/" + item._id}>{item.title}</Link>}
              description={item.title}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>    
  );
};

export default Post;

