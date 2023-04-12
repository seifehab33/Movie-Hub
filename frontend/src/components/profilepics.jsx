import React, { useEffect, useState } from "react";
import axios from "axios";

const SaveImage = ({ user }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const [userid, setUserid] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data")) || [];
    userData.forEach((user) => {
      setUserid(user.id);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_pic", profilePic);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/save-image/${userid}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setImageUrl(response.data.url);
    } catch (err) {
      console.error(err);
      setError(err.response.data.error);
    }
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Save Image</button>
      </form>
      {imageUrl && (
        <div>
          <img
            src={`http://127.0.0.1:8000/profile_pics/${imageUrl}`}
            alt="profile pic"
          />
          <p>Image uploaded successfully!</p>
        </div>
      )}
    </div>
  );
};

export default SaveImage;
