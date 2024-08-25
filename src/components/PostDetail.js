import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://zuai-backend-2-pfu0.onrender.com/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      <div className="post-content">{post.content}</div>
      {post.picture_url && (
        <img
          src={post.picture_url}
          alt={post.title}
          className="post-detail-image"
        />
      )}
    </div>
  );
};

export default PostDetail;
