import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.sass";
import { notification } from "antd";
// import { Button, Checkbox, Form, Input } from 'antd';

const Login = () => {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  // const onFinish = (values) => {
  //   console.log('Success:', values);
  //   dispatch(login(formData));
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  const navigate = useNavigate();

  const { mail, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
    }

    if (isSuccess) {
      notification.success({ message: "Success", description: message });
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    }
    dispatch(reset());
    // eslint-disable-next-line
  }, [isError, isSuccess, message]);

  return (
    <div className={styles.container}>
      {/* <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onChange={onChange}
      // onSubmit={onSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="mail"
        value={mail}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        value={password}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="submit">
          Submit
        </Button>
      </Form.Item>
    </Form> */}
    <form className="form-group" onSubmit={onSubmit}>
        <label className="form-label mt-4">Rellena tus datos</label>
        <div className="form-floating mb-3">
          <input
            type="email"
            name="mail"
            value={mail}
            onChange={onChange}
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

      