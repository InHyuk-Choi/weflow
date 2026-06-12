import * as XLSX from "xlsx";
import { serviceTypeLabel, statusLabel } from "./constants";

interface ReservationRow {
  date: Date;
  time: string;
  serviceType: string;
  name: string;
  phone: string;
  industry: string | null;
  additionalRequests: string | null;
  status: string;
  createdAt: Date;
}

interface InquiryRow {
  name: string;
  phone: string;
  serviceType: string | null;
  industry: string | null;
  message: string;
  status: string;
  createdAt: Date;
}

function fmtDate(d: Date): string {
  return new Date(d).toISOString().slice(0, 10);
}
function fmtDateTime(d: Date): string {
  return new Date(d).toISOString().replace("T", " ").slice(0, 16);
}

export function reservationSheet(reservations: ReservationRow[]): XLSX.WorkSheet {
  return XLSX.utils.json_to_sheet(
    reservations.map((r) => ({
      날짜: fmtDate(r.date),
      시간: r.time,
      제작종류: serviceTypeLabel(r.serviceType),
      이름: r.name,
      연락처: r.phone,
      업종: r.industry || "",
      추가요청사항: r.additionalRequests || "",
      상태: statusLabel(r.status),
      접수일: fmtDateTime(r.createdAt),
    }))
  );
}

export function inquirySheet(inquiries: InquiryRow[]): XLSX.WorkSheet {
  return XLSX.utils.json_to_sheet(
    inquiries.map((i) => ({
      이름: i.name,
      연락처: i.phone,
      제작종류: serviceTypeLabel(i.serviceType),
      업종: i.industry || "",
      추가요청사항: i.message,
      접수일: fmtDateTime(i.createdAt),
      상태: statusLabel(i.status),
    }))
  );
}

export function buildWorkbook(
  sheets: { name: string; ws: XLSX.WorkSheet }[]
): ArrayBuffer {
  const wb = XLSX.utils.book_new();
  for (const { name, ws } of sheets) {
    XLSX.utils.book_append_sheet(wb, ws, name);
  }
  return XLSX.write(wb, { type: "array", bookType: "xlsx" }) as ArrayBuffer;
}

export function reservationWorkbook(reservations: ReservationRow[]): ArrayBuffer {
  return buildWorkbook([
    { name: "Reservations", ws: reservationSheet(reservations) },
  ]);
}

export function inquiryWorkbook(inquiries: InquiryRow[]): ArrayBuffer {
  return buildWorkbook([{ name: "Inquiries", ws: inquirySheet(inquiries) }]);
}

export function combinedWorkbook(
  reservations: ReservationRow[],
  inquiries: InquiryRow[]
): ArrayBuffer {
  return buildWorkbook([
    { name: "Reservations", ws: reservationSheet(reservations) },
    { name: "Inquiries", ws: inquirySheet(inquiries) },
  ]);
}
