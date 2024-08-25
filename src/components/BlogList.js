import React, { useState, useEffect } from "react";
import { getPosts } from "../api";
import "./BlogList.css";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="blog-list">
      <h1>Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <a href={`/posts/${post.id}`}>Read more</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;
