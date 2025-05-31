import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faUser,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type Post = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
};

export default function PostView() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [prevPost, setPrevPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      // Get the API base URL from environment or use localhost fallback
      const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:4000";

      const res = await fetch(`${apiBase}/api/posts`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const allPosts: Post[] = await res.json();

      // Find current post and navigation posts
      const currentIndex = allPosts.findIndex((p: Post) => p._id === id);
      const currentPost = allPosts[currentIndex];

      if (currentPost) {
        setPost(currentPost);

        // Set previous and next posts (newer posts have lower index)
        if (currentIndex > 0) {
          setNextPost(allPosts[currentIndex - 1]); // Newer post
        }
        if (currentIndex < allPosts.length - 1) {
          setPrevPost(allPosts[currentIndex + 1]); // Older post
        }
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="post-container">
        <div className="blog-loading">
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-container">
        <div className="blog-empty">
          <h3>Post not found</h3>
          <Link to="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="post-container">
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <div className="post-date">
            <FontAwesomeIcon icon={faCalendar} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="post-author">
            <FontAwesomeIcon icon={faUser} />
            <span>Mathew Moslow</span>
          </div>
        </div>
      </div>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="post-featured-image"
        />
      )}

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <nav className="post-navigation">
        {prevPost ? (
          <Link to={`/blog/post/${prevPost._id}`} className="post-nav-link">
            <FontAwesomeIcon icon={faChevronLeft} />
            <div>
              <small>Previous Post</small>
              <div>{prevPost.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link to={`/blog/post/${nextPost._id}`} className="post-nav-link">
            <div style={{ textAlign: "right" }}>
              <small>Next Post</small>
              <div>{nextPost.title}</div>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
