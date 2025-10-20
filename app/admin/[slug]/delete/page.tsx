"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onDelete = async () => {
    setLoading(true);
    setErr("");
    const res = await fetch(`/api/articles/${slug}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) router.push("/admin/dashboard");
    else {
      const data = await res.json().catch(() => ({}));
      setErr(data.error || "Failed to delete");
    }
  };

  return (
    <section>
      <h1 className="text-2xl mb-4">Delete Article</h1>
      {err && <p className="text-red-500 mb-3">{err}</p>}
      <p>Yakin ingin menghapus artikel “{slug}”?</p>
      <div className="mt-4">
        <button
          onClick={onDelete}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={() => router.back()}
          className="ml-3 px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
