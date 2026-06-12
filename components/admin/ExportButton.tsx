"use client";

import { useState } from "react";

// Triggers Excel generation via an API route and downloads the .xlsx file.
export default function ExportButton({
  endpoint,
  label,
  filename,
  variant = "secondary",
}: {
  endpoint: string;
  label: string;
  filename: string;
  variant?: "primary" | "secondary";
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setError("");
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      const res = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error("export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(
        e instanceof DOMException && e.name === "AbortError"
          ? "내보내기가 지연되고 있습니다. 다시 시도해 주세요."
          : "내보내기에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <span className="inline-flex flex-col">
      <button
        onClick={handleClick}
        disabled={loading}
        className={
          variant === "primary"
            ? "btn-primary px-4 py-2 text-sm disabled:opacity-60"
            : "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-60"
        }
      >
        {loading ? "내보내는 중..." : label}
      </button>
      {error && <span className="mt-1 text-xs text-red-600">{error}</span>}
    </span>
  );
}
