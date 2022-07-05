import "bootswatch/dist/spacelab/bootstrap.min.css";
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import PostDetail from "./components/Home/Posts/PostDetail/PostDetail";
import Search from "../src/components/Search/Search";
import Admin from "./components/Admin/Admin";
import Footer from "./components/Footer/Footer"
import "./styles.sass";
import SignInSide from "./components/SignInSide/SignInSide";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />          
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:_id" element={<PostDetail />} />
          <Route path="/search/:postTitle" element={<Search />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
