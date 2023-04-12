import React, { useState, useEffect } from "react";
import axios from "axios";
function Currentuser() {
  const [username, Setusername] = useState(" ");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/users/")
      .then((response) => {
        Setusername(response.data.name);
        console.log(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div>{username && <span>Welcome, {username}!</span>}</div>
    </>
  );
}

export default Currentuser;
