import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/profile/profile";
import Navbar from "./components/Navbar/Navbar";
import Post from "./pages/post/Post";
import Register from "./components/Signup/REgister";
import Login from "./components/Signup/Login";
import PostForm from "./components/post/Form";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/api/user/profile" element={<Profile />} />
        <Route path="/api/user/upload-post" element={<PostForm />} />
        <Route path="/" element={<Post />} />
        <Route path="/api/user/signup" element={<Register />} />
        <Route path="/api/user/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
