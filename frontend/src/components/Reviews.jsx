import React from "react";
import "./Review.css";
import { useEffect } from "react";
function Reviews() {
  useEffect(() => {
    const random = document.querySelectorAll("#review-random");

    const randomReviews = () => {
      for (let i = 0; i < random.length; i++) {
        random[i].innerHTML = Math.round(Math.random() * 5000) + `K`;
      }
    };
    const intervalId = setInterval(randomReviews, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <section className="review" id="review">
        <div className="box">
          <p id="review-random"></p>
          <p>Reviews</p>
        </div>
        <div className="box">
          <p id="review-random"></p>
          <p>watching</p>
        </div>
        <div className="box">
          <p id="review-random"></p>
          <p>subscribe</p>
        </div>
      </section>
    </>
  );
}

export default Reviews;
