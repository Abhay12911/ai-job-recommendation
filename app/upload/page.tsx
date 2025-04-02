'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");

    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch("/api/resume", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Resume uploaded successfully!");
    } else {
      setMessage(data.error || "Upload failed");
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        onClick={handleUpload}
      >
        Upload Resume
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
