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
  image: string;
  createdAt: string;
};

export default function PostView() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [prevPost, setPrevPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    if (!id) return;
    
    try {
      // Fetch the specific post
      const postRes = await fetch(`${API_BASE}/api/posts/${id}`);
      if (!postRes.ok) {
        throw new Error('Post not found');
      }
      const postData = await postRes.json();
      setPost(postData);

      // Fetch all posts for navigation
      const allPostsRes = await fetch(`${API_BASE}/api/posts`);
      const allPostsData = await allPostsRes.json();
      setAllPosts(allPostsData);

      // Find current post index and set prev/next
      const currentIndex = allPostsData.findIndex((p: Post) => p._id === id);
      if (currentIndex !== -1) {
        // Set previous and next posts (newer posts have lower index)
        if (currentIndex > 0) {
          setNextPost(allPostsData[currentIndex - 1]);
        } else {
          setNextPost(null);
        }
        
        if (currentIndex < allPostsData.length - 1) {
          setPrevPost(allPostsData[currentIndex + 1]);
        } else {
          setPrevPost(null);
        }
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      setPost(null);
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
          <Link to={`/post/${prevPost._id}`} className="post-nav-link">
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
          <Link to={`/post/${nextPost._id}`} className="post-nav-link">
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