import React, { useEffect, useState } from "react";
import "./Home.css";
import img1 from "../image/icon.png";
import Nav_bar from "./Navbar";
import Header from "./Header";
import About from "./About";
import Categories from "./Categories";
import Reviews from "./Reviews";
import Footer from "./Footer";
import Button from "./Button";
function Home() {
  const [loading, setloading] = useState(false);
  const [username, setUserLogin] = useState("");
  const [name, setUsername] = useState(localStorage.getItem("name") || "");

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 4000);
  }, []);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || [];
    userData.forEach((user) => {
      setUserLogin(user.name);
    });
  });
  return (
    <>
      {loading ? (
        <div className={loading ? "loading" : ""}>
          <img src={img1} alt="" />
        </div>
      ) : (
        <>
          <Button />
          <Nav_bar />
          <Header />
          <About />
          <Categories />
          <Reviews />
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
