import Link from "next/link";
import SuccessCaseForm from "@/components/admin/SuccessCaseForm";

export const metadata = { title: "성공사례 등록" };

export default function NewSuccessCasePage() {
  return (
    <div className="space-y-6">
      <Link
        href="/admin/success-cases"
        className="text-sm font-medium text-brand-700 hover:underline"
      >
        ← 목록으로
      </Link>
      <h1 className="text-2xl font-bold text-slate-900">성공사례 등록</h1>
      <SuccessCaseForm />
    </div>
  );
}
