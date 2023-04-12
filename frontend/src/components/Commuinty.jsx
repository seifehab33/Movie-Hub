import React, { useState, useEffect } from "react";
import axios from "axios";
import Createposts from "./Createposts";
import "./Community.css";
// import Comment from "./Comment";
import CommentForm from "./Comment";
import SaveImage from "./profilepics";
function Community() {
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(null);
  const [userid, setUserId] = useState(null);
  const [username, setUserLogin] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data")) || [];
    userData.forEach((user) => {
      setUserLogin(user.name);
    });
  });
  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/users/${userid}/posts/${postId}/delete/`
      );
      console.log("Post deleted successfully");

      // Find the index of the deleted post in the array of posts
      const index = posts.findIndex((post) => post.id === postId);

      // Remove the deleted post from the array of posts
      posts.splice(index, 1);

      // Update the state of the component with the new array of posts
      setPosts(posts);
      window.location.reload(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePostCreated = (post) => {
    setPosts([...posts, post]);
  };
  const handleCommentCreated = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
    setShowCommentForm({ ...showCommentForm, [postId]: false });
    window.location.reload(true);
  };
  // const handleCommentCreated = (comment) => {
  //   setComments([...comments, comment]);
  // };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data")) || [];
    userData.forEach((user) => {
      setUserId(user.id);
    });
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/posts/");
        const promises = response.data.map((post) =>
          axios.get(`http://127.0.0.1:8000/api/posts/${post.id}/comments/`)
        );
        const commentResponses = await Promise.all(promises);
        const postsWithComments = response.data.map((post, index) => ({
          ...post,
          comments: commentResponses[index].data,
        }));
        setPosts(postsWithComments);
      } catch (error) {
        if (
          error.response.status === 400 &&
          error.response.data.non_field_errors
        ) {
          setError(error.response.data.non_field_errors[0]);
        } else {
          setError(error.message);
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {error && <div className="error">{error}</div>}
      <section className="POSTS-BOX">
        <div className="POSTS">
          <Createposts onPostCreated={handlePostCreated} />
          {posts.map((post) => (
            <div key={post.id} className="box-pos">
              <div>
                <h2>Title :{post.title}</h2>
                <li>{post.user?.name}</li>
                <p>Description :{post.content}</p>

                {post.comments?.map((comment, index) => (
                  <div
                    key={comment.id}
                    className={`Comment-box ${
                      index % 2 === 0 ? "gray-background" : "white-background"
                    }`}
                  >
                    {comment.user && <h5> Commenter: {comment.user?.name}</h5>}
                    <li>{comment.content}</li>
                  </div>
                ))}

                {showCommentForm === post.id && (
                  <CommentForm
                    postId={post.id}
                    onSubmit={(comment) =>
                      handleCommentCreated(post.id, comment)
                    }
                  />
                )}
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
              <div>
                {post.user.id == userid && (
                  <div className="deleting">
                    <button
                      className="delete-buttom"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
                <ul className="com">
                  <li>
                    <button
                      onClick={() => setShowCommentForm(post.id)}
                      className="com"
                    >
                      <i className="fas fa-comment-alt comment"></i> Add Comment
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Community;
