import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/loader.css";
import { useStore } from "../../store/Auth";
const Login = () => {
  const { setisadmin } = useStore();
  const navigate = useNavigate();

  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const changehandler = (e) => {
    const { name, value } = e.target;
    setlogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const clckhandler = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      credentials: "include",
      body: JSON.stringify(login),
    });
    const data = await response.json();
    if (response.ok) {
      navigate("/");
      console.log(data);
      if (!data.success) {
        console.log("loding");
      }
      else {
        console.log("login complete")
      }
      setisadmin(true);
      
    } 
  };

  return (
    <div className="register-main">
      <div className="register-cards">
        <div className="register-logo">
          <h1>Login</h1>
        </div>
        <form onSubmit={clckhandler} className="registration-inputs">
          <div className="register-div">
            <label htmlFor="">Email</label>
            <input
              onChange={changehandler}
              autoComplete="off"
              name="email"
              type="email"
            />
          </div>
          <div className="register-div">
            <label htmlFor="">Password</label>
            <input
              onChange={changehandler}
              autoComplete="off"
              name="password"
              type="password"
            />
          </div>
          <div className="register-button">
            <button type="submit">Login</button>
          </div>
          <div className="register-forget">
            <p>i dont't have account</p>{" "}
            <span
              onClick={() => {
                navigate("/signup");
              }}>
              Register
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
