import Link from "next/link";
import StatCards from "@/components/admin/StatCards";
import ExportButton from "@/components/admin/ExportButton";

export const metadata = { title: "관리자 대시보드" };

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">대시보드</h1>
        <ExportButton
          endpoint="/api/export"
          label="전체 엑셀 다운로드"
          filename="weflow-all.xlsx"
          variant="primary"
        />
      </div>

      <StatCards />

      {/* Quick links to the separated management pages */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Link
          href="/admin/reservations"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
        >
          <div>
            <div className="text-lg font-bold text-slate-900">예약 관리</div>
            <div className="mt-1 text-sm text-slate-500">
              예약 현황 확인 · 상태 변경 · 엑셀 다운로드
            </div>
          </div>
          <span className="text-2xl text-brand-500 transition group-hover:translate-x-1">
            →
          </span>
        </Link>

        <Link
          href="/admin/inquiries"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
        >
          <div>
            <div className="text-lg font-bold text-slate-900">문의 관리</div>
            <div className="mt-1 text-sm text-slate-500">
              무료진단·문의 확인 · 상태 변경 · 엑셀 다운로드
            </div>
          </div>
          <span className="text-2xl text-brand-500 transition group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
