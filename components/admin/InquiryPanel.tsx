"use client";

import { useState } from "react";
import AdminFilterBar from "./AdminFilterBar";
import InquiryTable from "./InquiryTable";

export default function InquiryPanel() {
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
      <InquiryTable statusFilter={filter} search={search} />
    </div>
  );
}
