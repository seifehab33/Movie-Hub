import React from "react";

function Moviebox({ imageURL, name, date }) {
  return (
    <>
      <div>
        <img className="main-img" src={imageURL} alt={name} />
        <div>
          <h1>{name}</h1>
          <p>{date}</p>
        </div>
      </div>
    </>
  );
}

export default Moviebox;
