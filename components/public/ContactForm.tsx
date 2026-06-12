"use client";

import { useState } from "react";
import { SERVICE_TYPES } from "@/lib/constants";

// Reusable inquiry form for Free Diagnosis, general Contact, and the
// Landing page sticky form. Requires 이름·연락처 (+ service type/industry for
// diagnosis). Email is optional. Consent required.
export default function ContactForm({
  variant = "diagnosis",
  compact = false,
  submitLabel = "무료진단 후 견적받기",
}: {
  variant?: "diagnosis" | "general";
  compact?: boolean;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const serviceType = String(data.get("serviceType") || "");
    const industry = String(data.get("industry") || "").trim();
    const consent = data.get("consent") === "on";

    if (!name) return setError("이름을 입력해 주세요.");
    if (!phone) return setError("연락처를 입력해 주세요.");
    if (variant === "diagnosis" && !serviceType)
      return setError("제작종류를 선택해 주세요.");
    if (variant === "diagnosis" && !industry)
      return setError("업종을 입력해 주세요.");
    if (!consent) return setError("개인정보 수집 및 상담 동의가 필요합니다.");

    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: String(data.get("email") || "").trim() || undefined,
          serviceType: serviceType || undefined,
          industry: industry || undefined,
          message: String(data.get("message") || "").trim(),
          consentToDataCollection: consent,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "제출에 실패했습니다. 다시 시도해 주세요.");
      }
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "제출에 실패했습니다.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
        <div className="text-lg font-bold text-brand-700">신청이 완료되었습니다 ✅</div>
        <p className="mt-2 text-sm text-slate-600">
          빠르게 확인 후 연락드리겠습니다. 감사합니다.
        </p>
        <button
          className="btn-secondary mt-4"
          onClick={() => setStatus("idle")}
          type="button"
        >
          다시 신청하기
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500";

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          이름 <span className="text-red-500">*</span>
        </label>
        <input name="name" maxLength={100} className={inputCls} required />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          연락처 <span className="text-red-500">*</span>
        </label>
        <input name="phone" maxLength={20} className={inputCls} required />
      </div>

      {variant === "diagnosis" && (
        <>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              제작종류 <span className="text-red-500">*</span>
            </label>
            <select name="serviceType" className={inputCls} defaultValue="">
              <option value="" disabled>
                선택해 주세요
              </option>
              {SERVICE_TYPES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              업종 <span className="text-red-500">*</span>
            </label>
            <input name="industry" maxLength={100} className={inputCls} />
          </div>
        </>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          이메일 <span className="text-slate-400">(선택)</span>
        </label>
        <input name="email" type="email" maxLength={254} className={inputCls} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          추가 요청사항
        </label>
        <textarea name="message" rows={compact ? 2 : 3} maxLength={1000} className={inputCls} />
      </div>

      <label className="flex items-start gap-2 text-sm text-slate-600">
        <input type="checkbox" name="consent" className="mt-1" />
        <span>개인정보 수집 및 상담 동의</span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === "submitting" ? "제출 중..." : submitLabel}
      </button>
    </form>
  );
}
