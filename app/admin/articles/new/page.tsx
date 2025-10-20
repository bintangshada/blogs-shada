"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setErr("");
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setLoading(false);
    if (res.ok) {
      const a = await res.json();
      router.push(`/articles/${a.slug}`);
    } else {
      const data = await res.json().catch(() => ({}));
      setErr(data.error || "Failed to create");
    }
  };

  return (
    <section className="pt-20">
      <h1 className="text-2xl mb-4">New Article</h1>
      {err && <p className="text-red-500 mb-3">{err}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <textarea className="w-full p-2 border rounded min-h-40" placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} required />
        <button disabled={loading} className="bg-gray-600 text-white px-4 py-2 rounded">{loading ? "Saving..." : "Create"}</button>
      </form>
    </section>
  );
}