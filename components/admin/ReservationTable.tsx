"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { clsx } from "clsx";
import {
  statusLabel,
  serviceTypeLabel,
  POLLING_INTERVAL,
} from "@/lib/constants";
import ExportButton from "./ExportButton";

interface Reservation {
  id: string;
  date: string;
  time: string;
  serviceType: string;
  name: string;
  phone: string;
  industry: string | null;
  additionalRequests: string | null;
  status: string;
  createdAt: string;
}

function statusColor(status: string) {
  return status === "completed"
    ? "bg-green-100 text-green-700"
    : status === "in-progress"
      ? "bg-amber-100 text-amber-700"
      : "bg-slate-100 text-slate-600";
}

export default function ReservationTable({
  statusFilter = "all",
  search = "",
}: {
  statusFilter?: string;
  search?: string;
}) {
  const [rows, setRows] = useState<Reservation[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/reservations?status=${statusFilter}&pageSize=100`);
      if (res.ok) {
        const data = await res.json();
        setRows(data.reservations);
      }
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    load();
    const t = setInterval(load, POLLING_INTERVAL);
    return () => clearInterval(t);
  }, [load]);

  async function updateStatus(id: string, status: string) {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    const res = await fetch(`/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) load();
  }

  async function remove(id: string) {
    if (!confirm("이 예약을 삭제하시겠습니까?")) return;
    setRows((r) => r.filter((x) => x.id !== id));
    const res = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
    if (!res.ok) load();
  }

  const q = search.trim().toLowerCase();
  const visible = q
    ? rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) || r.phone.toLowerCase().includes(q)
      )
    : rows;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-900">
          예약 관리{" "}
          <span className="text-sm font-normal text-slate-400">
            ({visible.length})
          </span>
        </h2>
        <ExportButton
          endpoint="/api/reservations/export"
          label="엑셀 다운로드"
          filename="weflow-reservations.xlsx"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs text-slate-500">
              <th className="px-5 py-3">상태</th>
              <th className="px-5 py-3">이름</th>
              <th className="px-5 py-3">연락처</th>
              <th className="px-5 py-3">접수일</th>
              <th className="px-5 py-3">희망 일정</th>
              <th className="px-5 py-3">관리</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                  {loading ? "불러오는 중..." : "데이터가 없습니다"}
                </td>
              </tr>
            )}
            {visible.map((r) => (
              <Fragment key={r.id}>
                <tr className="border-b border-slate-50">
                  <td className="px-5 py-3">
                    <span
                      className={clsx(
                        "rounded-full px-2 py-1 text-xs font-medium",
                        statusColor(r.status)
                      )}
                    >
                      {statusLabel(r.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-medium text-slate-800">{r.name}</td>
                  <td className="px-5 py-3 text-slate-600">{r.phone}</td>
                  <td className="px-5 py-3 text-slate-500">
                    {new Date(r.createdAt).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {new Date(r.date).toLocaleDateString("ko-KR")} {r.time}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setExpanded(expanded === r.id ? null : r.id)
                        }
                        className="rounded border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                      >
                        상세 {expanded === r.id ? "▲" : "▼"}
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, "in-progress")}
                        className="rounded border border-amber-200 px-2 py-1 text-xs text-amber-700 hover:bg-amber-50"
                      >
                        진행중
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, "completed")}
                        className="rounded border border-green-200 px-2 py-1 text-xs text-green-700 hover:bg-green-50"
                      >
                        완료
                      </button>
                      <button
                        onClick={() => remove(r.id)}
                        className="rounded border border-red-200 px-2 py-1 text-xs text-red-700 hover:bg-red-50"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
                {expanded === r.id && (
                  <tr className="bg-slate-50">
                    <td colSpan={6} className="px-5 py-3 text-sm text-slate-600">
                      <div className="grid gap-1 sm:grid-cols-3">
                        <div>
                          <span className="text-slate-400">제작 종류 : </span>
                          {serviceTypeLabel(r.serviceType)}
                        </div>
                        <div>
                          <span className="text-slate-400">업종 : </span>
                          {r.industry || "-"}
                        </div>
                        <div className="sm:col-span-3">
                          <span className="text-slate-400">추가요청사항 : </span>
                          {r.additionalRequests || "-"}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
