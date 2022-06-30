import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { notification } from "antd";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    password: "",
    password2: "",
  });

  const { name, mail, password, password2 } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      return notification.error({
        message: "Error",
        description: "Passwords do not match",
      });
    } else {
      return dispatch(register(formData));
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
      <legend>Legend</legend>
      <div className="form-group">
        <label className="col-form-label mt-4" for="inputDefault">Name</label>
        <input type="text" name="name" value={name} onChange={onChange} className="form-control" placeholder="Your name here..." id="inputDefault" />
      </div>
        <div className="form-group">
        <label for="exampleInputEmail1" className="form-label mt-4">Email address</label>
        <input type="email" name="mail" value={mail} onChange={onChange}  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
        <input type="password" name="password" value={password} onChange={onChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1" className="form-label mt-4">Repeat Password</label>
        <input type="password" name="password2" value={password2} onChange={onChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>      
      <button className="btn btn-primary" type="submit">Register</button>
      </fieldset>
    </form>
  );
};

export default Register;
