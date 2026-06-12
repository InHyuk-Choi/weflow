"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ExistingCase {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  published: boolean;
}

export default function SuccessCaseForm({
  existing,
}: {
  existing?: ExistingCase;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [imageUrl, setImageUrl] = useState(existing?.imageUrl ?? "");
  const [published, setPublished] = useState(existing?.published ?? false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "업로드 실패");
      setImageUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    setError("");
    if (!title.trim()) return setError("제목을 입력해 주세요.");
    if (!imageUrl) return setError("이미지를 업로드해 주세요.");

    setSaving(true);
    try {
      const url = existing
        ? `/api/success-cases/${existing.id}`
        : "/api/success-cases";
      const res = await fetch(url, {
        method: existing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, imageUrl, published }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "저장 실패");
      router.push("/admin/success-cases");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장 실패");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!existing) return;
    if (!confirm("이 성공사례를 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/success-cases/${existing.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/admin/success-cases");
      router.refresh();
    }
  }

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500";

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          제목 <span className="text-red-500">*</span>
          <span className="ml-2 text-xs text-slate-400">
            {100 - title.length}자 남음
          </span>
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          className={inputCls}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          설명
          <span className="ml-2 text-xs text-slate-400">
            {2000 - description.length}자 남음
          </span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={2000}
          rows={5}
          className={inputCls}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          이미지 <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleUpload}
          className="text-sm"
        />
        {uploading && <p className="mt-1 text-xs text-slate-500">업로드 중...</p>}
        {imageUrl && (
          <div className="relative mt-3 aspect-[3/2] w-64 overflow-hidden rounded-lg bg-slate-100">
            <Image src={imageUrl} alt="미리보기" fill className="object-cover" />
          </div>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        공개(게시)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving || uploading}
          className="btn-primary px-5 py-2 text-sm disabled:opacity-60"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
        {existing && (
          <button
            onClick={handleDelete}
            className="rounded-lg border border-red-200 px-5 py-2 text-sm text-red-700 hover:bg-red-50"
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
}
