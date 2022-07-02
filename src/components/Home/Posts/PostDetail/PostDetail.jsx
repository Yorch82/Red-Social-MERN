import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../../../features/posts/postsSlice";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const API_URL = 'http://localhost:8080';

const PostDetail = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getById(_id));    
    // eslint-disable-next-line
  }, []);    
  return (
    <div>
      <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="avatar"
        src= {API_URL + post.post.avatar}
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title={post.post.title}
      description={post.post.content}
      
    />
  </Card>
    </div>
  );
};

export default PostDetail;
