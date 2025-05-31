import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Post = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
};

const LatestPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiBase =
          import.meta.env.VITE_API_BASE || "http://localhost:4000";
        const response = await fetch(`${apiBase}/api/posts`);
        if (response.ok) {
          const data = await response.json();
          // Get only the latest 3 posts
          setPosts(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="latest-posts section-padding">
        <div className="grid-container">
          <h2>Latest From the Blog</h2>
          <p>Loading posts...</p>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show section if no posts
  }

  return (
    <section className="latest-posts section-padding">
      <div className="grid-container">
        <div className="section-header">
          <h2>Latest From the Blog</h2>
          <Link to="/blog" className="view-all-link">
            View All Posts →
          </Link>
        </div>

        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post._id} className="post-card">
              {post.image && (
                <Link to={`/post/${post._id}`} className="post-image-link">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-image"
                  />
                </Link>
              )}
              <div className="post-content">
                <h3 className="post-title">
                  <Link to={`/post/${post._id}`}>{post.title}</Link>
                </h3>
                <div
                  className="post-excerpt"
                  dangerouslySetInnerHTML={{
                    __html: post.content.substring(0, 150) + "...",
                  }}
                />
                <Link to={`/post/${post._id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
