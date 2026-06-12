import type { Metadata } from "next";
import CalendarInterface from "@/components/public/CalendarInterface";

export const metadata: Metadata = {
  title: "상담 예약 — 원하는 날짜와 시간을 선택하세요",
  description:
    "WEFLOW 상담을 예약하세요. 9시부터 18시 30분까지 30분 단위로 원하는 시간을 선택하거나 직접 입력할 수 있습니다. 빠른 상담으로 제작을 시작하세요.",
};

export default function BookingPage() {
  return (
    <div className="section">
      <div className="container-page">
        <header className="mb-10 text-center">
          <h1 className="section-title">상담 예약</h1>
          <p className="mt-2 text-slate-600">
            원하시는 날짜와 시간대를 선택하고 간단한 정보를 남겨주세요.
          </p>
        </header>
        <CalendarInterface />
      </div>
    </div>
  );
}
