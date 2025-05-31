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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiBase =
      import.meta.env.VITE_API_BASE ||
      "https://authorwebsite-7u6p.onrender.com/";
    console.log("Using API Base:", apiBase); // Debug line

    fetch(`${apiBase}/api/posts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(setPosts)
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load blog posts.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading posts...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ marginBottom: 40 }}>
            <h2>
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            {post.image && (
              <img src={post.image} alt="" style={{ maxWidth: "100%" }} />
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.slice(0, 300) + "...",
              }}
            />
            <Link to={`/post/${post._id}`}>Read more →</Link>
          </div>
        ))
      )}
    </div>
  );
}
