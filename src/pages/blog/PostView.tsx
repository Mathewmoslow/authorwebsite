import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Post = {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
};

export default function PostView() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p: Post) => p._id === id);
        setPost(found);
      });
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h1>{post.title}</h1>
      {post.image && <img src={post.image} alt="" style={{ maxWidth: "100%", marginBottom: 20 }} />}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
