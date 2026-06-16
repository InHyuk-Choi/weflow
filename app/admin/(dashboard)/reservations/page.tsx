import ReservationPanel from "@/components/admin/ReservationPanel";

export const metadata = { title: "예약 관리" };

export default function ReservationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">예약 관리</h1>
      <ReservationPanel />
    </div>
  );
}
