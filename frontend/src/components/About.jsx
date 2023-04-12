import React from "react";
import "./About.css";
function About() {
  return (
    <>
      <section id="about" className="about">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
          earum vel doloremque neque minima, enim quidem. At odit labore
          exercitationem facere illum minus placeat nobis libero inventore
          possimus, rem sed. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Nesciunt accusamus, non consectetur sit, voluptatibus eum ipsum
          recusandae, eligendi nihil obcaecati amet maiores sed fugit
          dignissimos aperiam illo modi fugiat ab?
        </p>
        <div className="boxes">
          <div className="box boxg">
            <h1>Action</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="box boxg">
            <h1>Stories</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div className="box boxg">
            <h1>Tv</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
