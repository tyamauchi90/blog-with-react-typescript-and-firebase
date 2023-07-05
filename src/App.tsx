import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./compornents/Home";
import Login from "./compornents/Login";
import Logout from "./compornents/Logout";
import Navbar from "./compornents/Navbar";
import { useState } from "react";
import CreatePost from "./compornents/Createpost";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/createpost"
          element={<CreatePost isAuth={isAuth} />}
        ></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route>
        <Route
          path="/logout"
          element={<Logout setIsAuth={setIsAuth} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
