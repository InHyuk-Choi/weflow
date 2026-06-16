import DashboardClient from "@/components/admin/DashboardClient";
import ExportButton from "@/components/admin/ExportButton";

export const metadata = { title: "관리자 대시보드" };

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">대시보드</h1>
        <ExportButton
          endpoint="/api/export"
          label="전체 엑셀 다운로드"
          filename="weflow-all.xlsx"
        />
      </div>

      <DashboardClient />
    </div>
  );
}
