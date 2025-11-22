"use client";

import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    setErr("");
    let imageUrl: string | null = null;

    if(imageFile){
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filepath = `articles/${fileName}`;

      const { error: uploadError} = await supabase.storage
        .from('article-image')
        .upload(filepath, imageFile);

        if (uploadError) {
          console.error(uploadError);
          alert("Upload gambar gagal");
          setLoading(false);
          return;
        }

        const { data } = supabase.storage
          .from("article-image")
          .getPublicUrl(filepath);

        imageUrl = data.publicUrl;
    }


    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, imageUrl }),
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
        <label htmlFor="image" className="block">Image (optional) </label>
        <input name="image" type="file" accept="image/*" className="p-2 border file:bg-gray-600 file:p-2 file:border file:rounded" onChange={e=>setImageFile(e.target.files?.[0] || null)}/>
        <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required autoFocus/>
        <textarea className="w-full p-2 border rounded min-h-40" placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} required />
        <button disabled={loading} className="bg-gray-600 text-white px-4 py-2 rounded">{loading ? "Saving..." : "Create"}</button>
      </form>
    </section>
  );
}