import InquiryPanel from "@/components/admin/InquiryPanel";

export const metadata = { title: "문의 관리" };

export default function InquiriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">문의 관리</h1>
      <InquiryPanel />
    </div>
  );
}
