"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Logo from "@/components/public/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const username = String(data.get("username") || "").trim();
    const password = String(data.get("password") || "");

    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해 주세요.");
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    setLoading(false);

    if (res?.error) {
      setError(res.error);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500";

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <Logo href={null} />
          <h1 className="mt-4 text-lg font-bold text-slate-900">관리자 로그인</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              아이디
            </label>
            <input name="username" className={inputCls} autoComplete="username" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              비밀번호
            </label>
            <input
              name="password"
              type="password"
              className={inputCls}
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
