import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
// import styles from "./Header.module.sass";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Coding Social Network</span>
        { user?
        <>
          <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
          >
          <span className="navbar-toggler-icon"></span>
          </button>
            <span><Link className="nav-link" to="/" onClick={onLogout}>Logout</Link></span>
            <span><Link to="/profile" >{user.user.name}</Link></span>
        </>
        :
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home<span class="visually-hidden">(current)</span>
              </Link>
            </li>
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
          <form className="d-flex">
            <input
              className="form-control me-sm-2"
              type="text"
              placeholder="Search"
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div> 
        }         
      </div>            
    </nav>
  );
};

export default Header;
