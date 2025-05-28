#!/bin/bash

ADMIN_DIR="src/pages/admin"
mkdir -p "$ADMIN_DIR"

# Admin page with form
cat <<'EOF' > "$ADMIN_DIR/Admin.js"
import React, { useState } from 'react';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    const res = await fetch('https://your-backend-url/api/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert('Missing token');

    let imageUrl = '';
    if (image) imageUrl = await handleImageUpload();

    const res = await fetch('https://your-backend-url/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        title,
        content,
        image: imageUrl
      })
    });

    if (res.ok) {
      alert('Post created');
      setTitle('');
      setContent('');
      setImage(null);
    } else {
      alert('Failed to create post');
    }
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
    localStorage.setItem('adminToken', e.target.value);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h2>Create Blog Post</h2>
      <input
        type="password"
        placeholder="Admin token"
        value={token}
        onChange={handleTokenChange}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <div
        contentEditable
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
        style={{
          border: '1px solid #ccc',
          minHeight: 150,
          padding: 10,
          marginBottom: 10
        }}
        placeholder="Write your blog content here"
      ></div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ marginBottom: 10 }}
      />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}
EOF

# Optional route setup
ROUTER_FILE="src/App.js"
if grep -q "react-router-dom" "$ROUTER_FILE"; then
  echo "🛠  Make sure to add this route to your App.js or Routes file:"
  echo "import Admin from './pages/admin/Admin';"
  echo "<Route path='/admin' element={<Admin />} />"
else
  echo "⚠️  It looks like you're not using React Router. Add routing manually."
fi

echo "✅ Admin panel created at src/pages/admin/Admin.js"
