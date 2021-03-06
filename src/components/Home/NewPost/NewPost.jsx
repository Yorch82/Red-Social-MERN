import { Button, Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../../features/posts/postsSlice";
import "./NewPost.scss";

const NewPost = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const onSubmit = (e) => {    
    e.preventDefault();
    const formData = new FormData();
    if(e.target.myFile.files[0]) formData.set('myFile', e.target.myFile.files[0]);
    formData.set("title", e.target.title.value);
    formData.set("content", e.target.content.value);    
    dispatch(createPost(formData));
    setVisible(false)
  };

  
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Share your meme!
      </Button>
      <Modal
        title="Make a post.."
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={750}
        footer={null}
      >
        <form
          onSubmit={onSubmit}
          className="form"
        >
          <input type="file" name="myFile"/>
          <input type="text" placeholder="Title..." name="title" />
          <input type="text" placeholder="Description..." name="content" />
          <button type="submit">Post!</button>
        </form>
      </Modal>
    </>    
  );
};

export default NewPost;
