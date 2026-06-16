"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { STATUSES } from "@/lib/constants";
import StatCards from "./StatCards";
import ReservationTable from "./ReservationTable";
import InquiryTable from "./InquiryTable";

const FILTERS = [{ value: "all", label: "전체" }, ...STATUSES];

export default function DashboardClient() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <StatCards />

      {/* Shared filter tabs + customer-name search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-xl border border-slate-200 bg-white p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={clsx(
                "rounded-lg px-4 py-1.5 text-sm font-medium transition",
                filter === f.value
                  ? "bg-brand-600 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="고객명 검색"
            className="w-64 rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Separated sections */}
      <ReservationTable statusFilter={filter} search={search} />
      <InquiryTable statusFilter={filter} search={search} />
    </div>
  );
}
