import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostForm.css";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      excerpt,
      content,
      picture_url: pictureUrl,
    };

    fetch("https://zuai-backend-2-pfu0.onrender.com/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  return (
    <div className="post-form">
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Picture URL"
          value={pictureUrl}
          onChange={(e) => setPictureUrl(e.target.value)}
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default PostForm;
