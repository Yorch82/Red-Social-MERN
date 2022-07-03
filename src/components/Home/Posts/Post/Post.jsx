import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from 'react';
// import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
// import { Avatar, List, Space } from 'antd';

// const data = Array.from({
//   length: 23,
// }).map((_, i) => ({
//   href: 'https://ant.design',
//   title: `ant design part ${i}`,
//   avatar: 'https://joeschmoe.io/api/v1/random',
//   description:
//     'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//   content:
//     'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// }));

// const IconText = ({ icon, text }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  console.log(posts);
  const post = posts.map((post) => {
    console.log(post)
    return (
      <div className="post" key={post._id}>
        <Link to={"/post/" + post._id}>
          <p>{post.title}</p>
        </Link>
      </div>
    );
  });

  return (
    // <div>
    //   <List
    //     itemLayout="vertical"
    //     size="large"
    //     pagination={{
    //       onChange: (page) => {
    //         console.log(page);
    //       },
    //       pageSize: 3,
    //     }}
    //     dataSource={data}
    //     footer={
    //       <div>
    //         <b>ant design</b> footer part
    //       </div>
    //     }
    //     renderItem={(item) => (
    //       <List.Item
    //         key={item.title}
    //         actions={[
    //           <IconText
    //             icon={StarOutlined}
    //             text="156"
    //             key="list-vertical-star-o"
    //           />,
    //           <IconText
    //             icon={LikeOutlined}
    //             text="156"
    //             key="list-vertical-like-o"
    //           />,
    //           <IconText
    //             icon={MessageOutlined}
    //             text="2"
    //             key="list-vertical-message"
    //           />,
    //         ]}
    //         extra={
    //           <img
    //             width={272}
    //             alt="logo"
    //             src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
    //           />
    //         }
    //       >
    //         <List.Item.Meta
    //           avatar={<Avatar src={item.avatar} />}
    //           title={<a href={item.href}>{item.title}</a>}
    //           description={item.description}
    //         />
    //         {item.content}
    //       </List.Item>
    //     )}
    //   />
    // </div>
    <div>{post}</div>
  );
};

export default Post;

