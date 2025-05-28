import { useState, FormEvent, ChangeEvent } from "react";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");

  const API_BASE = import.meta.env.VITE_API_BASE;

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return alert("Missing admin token.");

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
      alert("Post created");
      setTitle("");
      setContent("");
      setImage(null);
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Create Blog Post</h2>

      <input
        type="password"
        placeholder="Admin token"
        value={token}
        onChange={handleTokenChange}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <div
        contentEditable
        onInput={handleInput}
        style={{
          border: "1px solid #ccc",
          minHeight: 150,
          padding: 10,
          marginBottom: 10,
        }}
        data-placeholder="Write your blog content here"
      ></div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: 10 }}
      />

      <button onClick={handleSubmit}>Post</button>

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #999;
          pointer-events: none;
          display: block;
        }
      `}</style>
    </div>
  );
}
