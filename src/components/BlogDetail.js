import React, { useEffect, useState } from "react";
import { getPostById } from "../api";
import "./BlogDetail.css";

const BlogDetail = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(postId);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="blog-detail">
      <h1>{post.title}</h1>
      <img src={post.picture_url} alt={post.title} />
      <p>{post.content}</p>
    </div>
  );
};

export default BlogDetail;
