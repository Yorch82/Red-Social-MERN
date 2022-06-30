import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
// import { useNavigate } from 'react-router-dom';
import styles from "./Login.module.sass";

const Login = () => {
  const [formData, setFormData] = useState({
    mail: "",

    password: "",
  });

  // const navigate = useNavigate();

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
    dispatch(login(formData));
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     const foundToken = JSON.parse(localStorage.getItem('token'));
  //     if (foundToken) {
  //       navigate('/');
  //     }
  //   }, 2000);
  // }, []);

  return (
    <div className={styles.container}>
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
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
