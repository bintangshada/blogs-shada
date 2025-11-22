"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";
import Image from "next/image";

export default function EditArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
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
        setCurrentImageUrl(a.imageUrl || null);
      } else setErr("Article not found");
    })();
  }, [slug]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErr("");

    let imageUrl = currentImageUrl;

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filepath = `articles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("article-image")
        .upload(filepath, imageFile);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        setErr("Upload gambar gagal");
        setSaving(false);
        return;
      }

      const { data } = supabase.storage
        .from("article-image")
        .getPublicUrl(filepath);

      imageUrl = data.publicUrl;
    }

    const res = await fetch(`/api/articles/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, imageUrl }),
    });

    setSaving(false);
    if (res.ok) router.push(`/articles/${slug}`);
    else {
      const data = await res.json().catch(() => ({}));
      setErr(data.error || "Failed to update");
    }
  };

  const removeImage = () => {
    setCurrentImageUrl(null);
    setImageFile(null);
  };

  if (loading) return <p className="pt-20">Loading...</p>;

  return (
    <section className="pt-20">
      <h1 className="text-2xl mb-4">Edit Article</h1>
      {err && <p className="text-red-500 mb-3">{err}</p>}

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full p-2 border rounded min-h-40"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {currentImageUrl && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Current Image:</label>
            <div className="relative">
              <Image
                src={currentImageUrl}
                alt="Current article image"
                width={300}
                height={200}
                className="rounded border"
              />
              <button
                type="button"
                onClick={removeImage}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {currentImageUrl ? "Replace Image:" : "Add Image:"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          disabled={saving}
          className="bg-gray-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </section>
  );
}
