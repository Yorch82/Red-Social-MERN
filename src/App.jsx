import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import PostDetail from "./components/Home/Posts/PostDetail/PostDetail";
import Search from "../src/components/Search/Search";
import Admin from "./components/Admin/Admin";
import Footer from "./components/Footer/Footer"
import SignInSide from "./components/SignInSide/SignInSide";
import PrivateZone from "./components/guards/PrivateZone";
import AdminZone from "./components/guards/AdminZone";
import NotFound from "./components/NotFound/NotFound";
import AppBar from "./components/AppBar/AppBar"
import "antd/dist/antd.css";
import "./styles.scss";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />          
          <Route path="/profile" element={<PrivateZone><Profile /></PrivateZone>} />
          <Route path="/post/:_id" element={<PostDetail />} />
          <Route path="/search/:postTitle" element={<Search />} />
          <Route path="/admin" element={<AdminZone><Admin /></AdminZone>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
