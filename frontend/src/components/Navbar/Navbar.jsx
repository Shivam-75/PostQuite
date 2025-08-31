import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/navbar.css";
import { useStore } from "../../store/Auth";
const Navbar = () => {
  const { profilename, isLogin, setlogout, setlogindata } = useStore();

  const logout = async () => {
    const response = await fetch("http://localhost:3000/api/user/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      console.log("user Error ");
    }
  };


  return (
    <header className="nav-main">
      <h1 style={{ fontSize: "3.6vmin" }}>Quites</h1>
      <nav className="nav-box">
        {isLogin && isLogin ? (
          <>
            <NavLink to={"/"}>Quites</NavLink>
            <NavLink to={"/api/user/upload-post"}>post</NavLink>
            <NavLink to={"/api/user/profile"}>Profile</NavLink>
            <NavLink
              to={"/login"}
              onClick={() => {
                logout();
                setlogout();
                setlogindata(false);
              }}>
              Logout
            </NavLink>
          </>
        ) : (
          <NavLink to={"/api/user/signup"}>signup</NavLink>
        )}
      </nav>
      {isLogin && isLogin ? (
        <div className="userId">
          <img src={profilename?.url} alt="" />
          <p className="userid-imgs-text">{profilename?.name}</p>
        </div>
      ) : (
        <h1 style={{ fontSize: "2.6vmin" }}>Login Loading...</h1>
      )}
    </header>
  );
};

export default Navbar;
