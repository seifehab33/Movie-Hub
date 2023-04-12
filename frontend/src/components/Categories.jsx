import React from "react";
import img1 from "../image/1.jpg";
import img2 from "../image/3.jpg";
import "./Categories.css";
function Categories() {
  return (
    <>
      <section className="categories" id="categories">
        <div className="text">
          <h1>Categories</h1>
        </div>
        <div className="box-img">
          <img src={img1} alt="" />
          <img src={img2} alt="" className="img2" />
        </div>
      </section>
    </>
  );
}

export default Categories;
