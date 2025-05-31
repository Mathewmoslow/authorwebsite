import { useState, FormEvent, ChangeEvent, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  const handleTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
    localStorage.setItem("adminToken", e.target.value);
  };

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    setContent((e.target as HTMLDivElement).innerHTML);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (): Promise<string> => {
    if (!image) return "";
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(`${API_BASE}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview("");
    if (contentEditableRef.current) {
      contentEditableRef.current.innerHTML = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage({ type: "error", text: "Please enter your admin token." });
      return;
    }

    if (!title.trim()) {
      setMessage({ type: "error", text: "Please enter a title." });
      return;
    }

    if (!content.trim()) {
      setMessage({ type: "error", text: "Please enter some content." });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const imageUrl = image ? await handleImageUpload() : "";

      const res = await fetch(`${API_BASE}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          image: imageUrl,
        }),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Post published successfully!" });
        resetForm();

        // Clear success message after 5 seconds
        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 5000);
      } else {
        const error = await res.json();
        setMessage({
          type: "error",
          text: error.message || "Failed to create post. Check your token.",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simple formatting functions
  const formatText = (command: string) => {
    document.execCommand(command, false);
    contentEditableRef.current?.focus();
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      document.execCommand("createLink", false, url);
      contentEditableRef.current?.focus();
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Create Blog Post</h2>
        <p className="admin-subtitle">Share your thoughts with the world</p>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="token">
            Admin Token
          </label>
          <input
            type="password"
            id="token"
            className="form-input"
            placeholder="Enter your admin token"
            value={token}
            onChange={handleTokenChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            placeholder="Enter an engaging title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Content</label>

          {/* Simple formatting toolbar */}
          <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={() => formatText("bold")}
              style={{
                padding: "5px 10px",
                background: "#f0f0f0",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              onClick={() => formatText("italic")}
              style={{
                padding: "5px 10px",
                background: "#f0f0f0",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
                fontStyle: "italic",
              }}
            >
              I
            </button>
            <button
              type="button"
              onClick={insertLink}
              style={{
                padding: "5px 10px",
                background: "#f0f0f0",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Link
            </button>
          </div>

          <div
            ref={contentEditableRef}
            contentEditable
            onInput={handleInput}
            className="content-editor"
            data-placeholder="Write your blog content here..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Featured Image</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <label htmlFor="image" className="file-input-label">
              <FontAwesomeIcon icon={faImage} />
              Choose Image
            </label>
          </div>

          {imagePreview && (
            <div style={{ marginTop: "1rem" }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: "200px",
                  borderRadius: "8px",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          )}
        </div>

        {message.text && (
          <div
            style={{
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              background: message.type === "success" ? "#d4edda" : "#f8d7da",
              color: message.type === "success" ? "#155724" : "#721c24",
              border: `1px solid ${
                message.type === "success" ? "#c3e6cb" : "#f5c6cb"
              }`,
            }}
          >
            {message.text}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin />
              {" Publishing..."}
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faCheck} />
              {" Publish Post"}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
