import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import {login} from '../../features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    mail: "",

    password: "",
  });

  const { mail, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    dispatch(login(formData));
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="mail" value={mail} onChange={onChange} />

      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
