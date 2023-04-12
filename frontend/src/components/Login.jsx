import React from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import img1 from "../image/icon.png";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ OnuserCreated }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/users/login/", {
      method: "POST",
      body: JSON.stringify({ name, password, email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const userData = {
            name,
            email,
            id: data.user_id,
          };
          console.log(userData);
          let users = JSON.parse(localStorage.getItem("data")) || [];
          users.push(userData);
          localStorage.setItem("data", JSON.stringify(users));
          setError("");
          // Login successful, redirect to home page
          navigate("/");
        } else {
          // Login failed, show error message here
          console.log(data);
          setError("Failed to login. Please check your username and password.");
        }
      })
      .catch((error) => {
        // Handle any errors here
        setError("An error occurred while trying to login.");
      });
  };
  const handleAlertClick = () => {
    swal({
      title: "مــــعــــلــــــش هه",
      timer: 4000,
    });
  };

  return (
    <>
      <div className="contain">
        <div className="containerr">
          {error && <div className="alert alert-danger">{error}</div>}
          <img src={img1} alt="" />
          <form action="" onSubmit={handleSubmit}>
            <div className="inputs">
              <input
                type="text"
                placeholder="Enter your Name..."
                id="name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Enter your Email..."
                id="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password..."
                name="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login">
              <button type="submit" className="login">
                Login
              </button>
              <Link href="#" onClick={handleAlertClick}>
                Forget Password ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
