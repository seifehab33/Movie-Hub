import React, { useState, useEffect } from "react";
import "./Nav_bar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import img1 from "../image/icon.png";
import { useNavigate, NavLink } from "react-router-dom";

function Nav_bar() {
  const navigate = useNavigate();
  const [username, setUserLogin] = useState("");
  const [navbar, setNavbar] = useState(false);
  const ChangeWidth = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  // const reload = () => {
  //   window.location.reload(true);
  // };
  const logout = () => {
    localStorage.clear("user");
    localStorage.removeItem("userImage");
    navigate("/Login");
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data")) || [];
    userData.forEach((user) => {
      setUserLogin(user.name);
    });
  });
  window.addEventListener("scroll", ChangeWidth);
  return (
    <>
      <Navbar className={navbar ? "Navbar active" : "Navbar"} expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" className="logo">
            <img src={img1} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 links"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="navlink" as={NavLink} href="#header" to="/">
                Home
              </Nav.Link>
              <Nav.Link className="navlink" href="#about">
                About
              </Nav.Link>
              <Nav.Link className="navlink" href="#categories">
                Categories
              </Nav.Link>
              {username && (
                <>
                  <Nav.Link className="navlink" as={NavLink} to="/home/movies">
                    Movies
                  </Nav.Link>
                  <Nav.Link
                    className="navlink"
                    as={NavLink}
                    to="/home/commuinty"
                  >
                    Community
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav className="ms-auto links">
              {username ? (
                <>
                  <Nav.Link className="navlink" disabled>
                    Hi {username}
                  </Nav.Link>
                  <Nav.Link className="navlink" onClick={logout}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link className="navlink" as={NavLink} to="/Login">
                    Login
                  </Nav.Link>
                  <Nav.Link className="navlink" as={NavLink} to="/SignUp">
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Nav_bar;
