"use client";

import { useEffect, useState } from "react";
import { POLLING_INTERVAL } from "@/lib/constants";

interface Stats {
  reservations: number;
  inquiries: number;
  today: number;
  pending: number;
  inProgress: number;
  completed: number;
  total: number;
  conversionRate: number;
}

const EMPTY: Stats = {
  reservations: 0,
  inquiries: 0,
  today: 0,
  pending: 0,
  inProgress: 0,
  completed: 0,
  total: 0,
  conversionRate: 0,
};

export default function StatCards() {
  const [s, setS] = useState<Stats>(EMPTY);

  useEffect(() => {
    let active = true;
    const load = () =>
      fetch("/api/stats")
        .then((r) => r.json())
        .then((d) => active && setS(d))
        .catch(() => {});
    load();
    const t = setInterval(load, POLLING_INTERVAL);
    return () => {
      active = false;
      clearInterval(t);
    };
  }, []);

  const cards = [
    { label: "예약 접수", value: `${s.reservations}건`, sub: "관리자 예약 데이터", accent: "text-slate-900" },
    { label: "문의 접수", value: `${s.inquiries}건`, sub: "무료진단 및 일반 문의", accent: "text-slate-900" },
    { label: "오늘 유입", value: `${s.today}건`, sub: "KST 기준 당일 접수", accent: "text-brand-700" },
    { label: "대기", value: `${s.pending}건`, sub: "아직 응대 전", accent: "text-slate-900" },
    { label: "진행중", value: `${s.inProgress}건`, sub: "상담 및 작업 진행", accent: "text-amber-600" },
    { label: "완료 전환율", value: `${s.conversionRate}%`, sub: `${s.completed}건 완료`, accent: "text-green-600" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="text-sm text-slate-500">{c.label}</div>
          <div className={`mt-1 text-3xl font-extrabold ${c.accent}`}>
            {c.value}
          </div>
          <div className="mt-1 text-xs text-slate-400">{c.sub}</div>
        </div>
      ))}
    </div>
  );
}
