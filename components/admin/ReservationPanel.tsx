"use client";

import { useState } from "react";
import AdminFilterBar from "./AdminFilterBar";
import ReservationTable from "./ReservationTable";

export default function ReservationPanel() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  return (
    <div className="space-y-6">
      <AdminFilterBar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />
      <ReservationTable statusFilter={filter} search={search} />
    </div>
  );
}
