import Login from "./../Login/Login";
import { Link } from "react-router-dom";

const WelcomeHome = () => {  
    return (
      <div>
        <h1>WelcomeHome</h1>        
        <Login/>
        <Link to="/register">Register</Link>
      </div>
    );
  };
  
export default WelcomeHome;