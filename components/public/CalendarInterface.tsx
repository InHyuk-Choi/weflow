"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { TIME_SLOTS, SERVICE_TYPES } from "@/lib/constants";

function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// Build a 6-row month grid (null for leading/trailing blanks).
function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function CalendarInterface() {
  const today = startOfDay(new Date());
  const maxDate = startOfDay(new Date(today.getTime() + 90 * 86400000));

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customTime, setCustomTime] = useState<string>("");
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const isToday = ymd(selectedDate) === ymd(today);
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();

  useEffect(() => {
    let active = true;
    fetch(`/api/reservations/availability?date=${ymd(selectedDate)}`)
      .then((r) => r.json())
      .then((d) => active && setTakenSlots(d.takenSlots || []))
      .catch(() => active && setTakenSlots([]));
    setSelectedTime("");
    return () => {
      active = false;
    };
  }, [selectedDate]);

  function dateDisabled(d: Date): boolean {
    const s = startOfDay(d);
    return s < today || s > maxDate;
  }

  function slotDisabled(slot: string): boolean {
    if (takenSlots.includes(slot)) return true;
    if (isToday) {
      const [h, m] = slot.split(":").map(Number);
      if (h * 60 + m < nowMinutes) return true;
    }
    return false;
  }

  function prevMonth() {
    const m = viewMonth - 1;
    if (m < 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth(m);
  }
  function nextMonth() {
    const m = viewMonth + 1;
    if (m > 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth(m);
  }

  // Can't navigate before the current month or past the max month.
  const canPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());
  const canNext =
    viewYear < maxDate.getFullYear() ||
    (viewYear === maxDate.getFullYear() && viewMonth < maxDate.getMonth());

  const grid = buildMonthGrid(viewYear, viewMonth);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const serviceType = String(data.get("serviceType") || "");
    const consent = data.get("consent") === "on";
    const time = selectedTime || customTime.trim();

    if (!time) return setError("시간대를 선택하거나 직접 입력해 주세요.");
    if (!name) return setError("이름을 입력해 주세요.");
    if (!phone) return setError("연락처를 입력해 주세요.");
    if (!serviceType) return setError("제작종류를 선택해 주세요.");
    if (!consent) return setError("개인정보 수집 및 상담 동의가 필요합니다.");

    setStatus("submitting");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: ymd(selectedDate),
          time: selectedTime,
          customTime: selectedTime ? "" : customTime.trim(),
          serviceType,
          name,
          phone,
          industry: String(data.get("industry") || "").trim() || undefined,
          additionalRequests:
            String(data.get("additionalRequests") || "").trim() || undefined,
          consentToDataCollection: consent,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "예약에 실패했습니다.");
      }
      setStatus("done");
      form.reset();
      setSelectedTime("");
      setCustomTime("");
      fetch(`/api/reservations/availability?date=${ymd(selectedDate)}`)
        .then((r) => r.json())
        .then((d) => setTakenSlots(d.takenSlots || []));
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "예약에 실패했습니다.");
    }
  }

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500";

  if (status === "done") {
    return (
      <div className="card mx-auto max-w-md text-center">
        <div className="text-lg font-bold text-brand-700">예약이 접수되었습니다 ✅</div>
        <p className="mt-2 text-sm text-slate-600">
          {ymd(selectedDate)} {selectedTime || customTime} 예약이 접수되었습니다.
          빠르게 확인 후 연락드리겠습니다.
        </p>
        <button className="btn-secondary mt-4" onClick={() => setStatus("idle")}>
          다시 예약하기
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Month calendar + time slot grid */}
      <div>
        <h2 className="mb-3 font-bold text-slate-900">날짜 선택</h2>
        <div className="rounded-2xl border border-slate-200 p-4">
          {/* Month header */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              disabled={!canPrev}
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 enabled:hover:bg-slate-100 disabled:opacity-30"
              aria-label="이전 달"
            >
              ‹
            </button>
            <div className="font-semibold text-slate-800">
              {viewYear}년 {viewMonth + 1}월
            </div>
            <button
              type="button"
              onClick={nextMonth}
              disabled={!canNext}
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 enabled:hover:bg-slate-100 disabled:opacity-30"
              aria-label="다음 달"
            >
              ›
            </button>
          </div>

          {/* Weekday header */}
          <div className="grid grid-cols-7 text-center text-xs text-slate-400">
            {WEEKDAYS.map((w, i) => (
              <div
                key={w}
                className={clsx(
                  "py-1",
                  i === 0 && "text-red-400",
                  i === 6 && "text-blue-400"
                )}
              >
                {w}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {grid.map((d, i) => {
              if (!d) return <div key={`b-${i}`} />;
              const disabled = dateDisabled(d);
              const isSel = ymd(d) === ymd(selectedDate);
              const dow = d.getDay();
              return (
                <button
                  key={ymd(d)}
                  type="button"
                  disabled={disabled}
                  onClick={() => setSelectedDate(startOfDay(d))}
                  className={clsx(
                    "aspect-square rounded-lg text-sm transition",
                    isSel
                      ? "bg-brand-600 font-semibold text-white"
                      : disabled
                        ? "cursor-not-allowed text-slate-300"
                        : clsx(
                            "hover:bg-brand-50",
                            dow === 0 && "text-red-500",
                            dow === 6 && "text-blue-500"
                          )
                  )}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <h2 className="mb-3 mt-6 font-bold text-slate-900">시간대 선택</h2>
        {/* 20 slots, 30-min, 09:00–18:30, 5 cols x 4 rows */}
        <div className="grid grid-cols-5 gap-2">
          {TIME_SLOTS.map((slot) => {
            const disabled = slotDisabled(slot);
            return (
              <button
                key={slot}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setSelectedTime(slot);
                  setCustomTime("");
                }}
                className={clsx(
                  "rounded-lg border px-1 py-2 text-xs font-medium transition",
                  disabled
                    ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 line-through"
                    : selectedTime === slot
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-slate-200 hover:border-brand-400"
                )}
              >
                {slot}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            원하시는 시간대 (직접 입력)
          </label>
          <input
            value={customTime}
            onChange={(e) => {
              setCustomTime(e.target.value);
              setSelectedTime("");
            }}
            placeholder="예: 19:00"
            className={inputCls}
          />
        </div>
      </div>

      {/* Booking form */}
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 p-6">
        <div className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700">
          선택: <b>{ymd(selectedDate)}</b>
          {(selectedTime || customTime) && (
            <>
              {" "}
              <b>{selectedTime || customTime}</b>
            </>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            이름 <span className="text-red-500">*</span>
          </label>
          <input name="name" maxLength={100} className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input name="phone" maxLength={20} className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            제작종류 <span className="text-red-500">*</span>
          </label>
          <select name="serviceType" defaultValue="" className={inputCls}>
            <option value="" disabled>
              선택해 주세요
            </option>
            {SERVICE_TYPES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            업종 입력
          </label>
          <input name="industry" maxLength={100} className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            추가요청사항
          </label>
          <textarea name="additionalRequests" rows={3} maxLength={2000} className={inputCls} />
        </div>
        <label className="flex items-start gap-2 text-sm text-slate-600">
          <input type="checkbox" name="consent" className="mt-1" />
          <span>개인정보 수집 및 상담 동의</span>
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full disabled:opacity-60"
        >
          {status === "submitting" ? "예약 중..." : "예약하기"}
        </button>
      </form>
    </div>
  );
}
