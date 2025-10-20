"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      setErr("");
      const res = await fetch(`/api/articles/${slug}`);
      setLoading(false);
      if (res.ok) {
        const a = await res.json();
        setTitle(a.title);
        setContent(a.content);
      } else setErr("Article not found");
    })();
  }, [slug]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErr("");
    const res = await fetch(`/api/articles/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setSaving(false);
    if (res.ok) router.push(`/articles/${slug}`);
    else {
      const data = await res.json().catch(() => ({}));
      setErr(data.error || "Failed to update");
    }
  };

  if (loading) return <p className="pt-20">Loading...</p>;

  return (
    <section className="pt-20">
      <h1 className="text-2xl mb-4">Edit Article</h1>
      {err && <p className="text-red-500 mb-3">{err}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded min-h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button
          disabled={saving}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </section>
  );
}
