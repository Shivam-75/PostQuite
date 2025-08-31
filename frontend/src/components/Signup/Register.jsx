import React, { useState } from "react";
import "../../css/registration.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const changeHandler = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const clickHandler = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("name", formData.name);
    body.append("email", formData.email);
    body.append("password", formData.password);
    if (formData.image) {
      body.append("avatar", formData.image);
    }

    try {
      const response = await fetch("http://localhost:3000/api/user/registration", {
        method: "POST",
        credentials: "include",
        body: body,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration success:", data);
        navigate("/login");
      } else {
        console.error("Registration failed:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-main">
      <div className="register-cards">
        <div className="register-logo">
          <h1>Registration</h1>
        </div>
        <form onSubmit={clickHandler} className="registration-inputs">
          <div className="register-div">
            <label htmlFor="">Name</label>
            <input
              name="name"
              type="text"
              autoComplete="off"
              onChange={changeHandler}
            />
          </div>
          <div className="register-div">
            <label htmlFor="">Email</label>
            <input
              name="email"
              type="email"
              autoComplete="off"
              onChange={changeHandler}
            />
          </div>
          <div className="register-div">
            <label htmlFor="">Password</label>
            <input
              name="password"
              type="password"
              autoComplete="off"
              onChange={changeHandler}
            />
          </div>
          <div className="register-div">
            <label htmlFor="">Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={changeHandler}
            />
          </div>
          <div className="register-button">
            <button type="submit">Register</button>
          </div>
          <div className="register-forget">
            <p>I have an account</p>
            <span onClick={() => navigate("/api/user/login")}>Login</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
