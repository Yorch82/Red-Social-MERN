// import { Form, Input, Button } from "antd";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../../features/posts/postsSlice";

const NewPost = () => {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", e.target.title.value);
    formData.set("content", e.target.content.value);
    dispatch(createPost(formData));
  };

  return (
    // <Form onSubmit={onSubmit} autoComplete="off">
    //   <Form.Item
    //     name="title"
    //     rules={[{ required: true, message: "Please input a title." }]}
    //   >
    //     <Input placeholder="Title" />
    //   </Form.Item>

    //   <Form.Item
    //     name="content"
    //     rules={[{ required: true, message: "Please write some text." }]}
    //   >
    //     <Input placeholder="Body" />
    //   </Form.Item>

    //   <Form.Item>
    //     <Button type="submit" htmlType="submit">
    //       Send
    //     </Button>
    //   </Form.Item>
    // </Form>
    <form onSubmit={onSubmit} className='form card animate__animated animate__fadeIn'>
    {/* <input type="file" name="imagePost"/> */}
    <input type="text" placeholder="Título..." name="title" />
    <input type="text" placeholder="Descripción..." name="content" />
<button type="submit">Añade una publicación</button>
</form>
  );
};

export default NewPost;
