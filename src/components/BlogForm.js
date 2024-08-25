import React, { useState } from "react";
import { createPost } from "../api";
import "./BlogForm.css";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPost({ title, content, picture_url: pictureUrl });
      setTitle("");
      setContent("");
      setPictureUrl("");
      alert("Post created successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-form">
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <label>
          Picture URL:
          <input
            type="text"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
        {error && <p className="error">Error: {error}</p>}
      </form>
    </div>
  );
};

export default BlogForm;
