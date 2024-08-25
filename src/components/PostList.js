import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://zuai-backend-2-pfu0.onrender.com/api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      <h1>Post List</h1>
      <Link to="/new">Add New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
