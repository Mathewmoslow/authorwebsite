import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Post = {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
};

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/posts`)
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>Blog</h1>
      {posts.map((post) => (
        <div key={post._id} style={{ marginBottom: 40 }}>
          <h2>
            <Link to={`/post/${post._id}`}>{post.title}</Link>
          </h2>
          {post.image && <img src={post.image} alt="" style={{ maxWidth: "100%" }} />}
          <div dangerouslySetInnerHTML={{ __html: post.content.slice(0, 300) + "..." }} />
          <Link to={`/post/${post._id}`}>Read more →</Link>
        </div>
      ))}
    </div>
  );
}
