import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
// import { useLocation } from 'react-router';
import { notification } from "antd";
import { useState } from "react";
import {Input} from "antd";
// import styles from "./Header.module.sass";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  // const { pathname } = useLocation();  
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);    
    if (e.key === "Enter") {
      navigate('/search/'+ text);
    }    
  };
  // if (pathname === '/'|| pathname === '/login' || pathname === '/register')
  // return null;

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    notification.success({ message: "Te piras" });
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Coding Social Network</span>
        {user ? (
          <>
            <span>
              <Link className="nav-link" to="/">
                Home<span className="visually-hidden">(current)</span>
              </Link>
            </span>
            <span>
              <Link className="nav-link" to="/" onClick={onLogout}>
                Logout
              </Link>
            </span>
            <span>
              <Link to="/profile">{user.user.name}</Link>
            </span>
            <Input onKeyUp={handleChange} placeholder="Search post..." name="text" />
            {user.user.role === 'admin' ? <span><Link to="/admin">Admin</Link></span>:''}
          </>
        ) : (
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"></li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  LOGIN
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  REGISTER
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
