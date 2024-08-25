import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const API_URL = "https://zuai-backend-2-pfu0.onrender.com/api/posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState(null); // New error state

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false); // Data fetched successfully
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false); // Fetch failed
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>; // Display loading message
  }

  if (error) {
    return <div className="error">Error fetching posts: {error}</div>; // Display error message
  }

  return (
    <div className="home">
      <h1>Blog Posts</h1>
      <Link to="/add">
        <button className="add-post-btn">Add New Post</button>
      </Link>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            {post.picture_url && (
              <img
                src={post.picture_url}
                alt={post.title}
                className="post-image"
              />
            )}
            <Link to={`/posts/${post.id}`} className="read-more-link">
              Read more
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
