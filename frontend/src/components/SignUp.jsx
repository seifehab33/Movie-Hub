import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../image/icon.png";
import axios from "axios";
import "./SignUp.css";
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    axios
      .post("http://127.0.0.1:8000/api/users/create/", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        // show a success message to the user
      })
      .catch((error) => {
        console.log(error);
        // show an error message to the user
      });
    if (validationName() && validationEmail() && validationPassword()) {
      const userData = {
        name,
        email,
        password,
      };
      let users = JSON.parse(localStorage.getItem("user")) || [];
      if (!Array.isArray(users)) {
        users = [];
        console.log("Handled successful");
      }
      users.push(userData);
      localStorage.setItem("user", JSON.stringify(users));
      navigate("/");
      setError("");
    }
  };
  const validationName = () => {
    const regx = /^\w{3,8}$/;
    if (regx.test(name)) {
      return true;
    } else {
      setError("Enter valid Name...!");
      return false;
    }
  };

  const validationEmail = () => {
    const regx = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    if (regx.test(email)) {
      return true;
    } else {
      setError("Enter Valid Email...!");
      return false;
    }
  };

  const validationPassword = () => {
    const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (regx.test(password)) {
      return true;
    } else {
      setError("Enter valid Password...!");
      return false;
    }
  };
  return (
    <>
      <section id="SignUp" className="SignUp">
        <div className="Box-contain">
          <form action="" onSubmit={handleSignUp}>
            {error && <div className="alert alert-danger">{error}</div>}
            <img src={img1} alt="" />
            <input
              type="text"
              placeholder="Enter Username"
              value={name}
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUp;
