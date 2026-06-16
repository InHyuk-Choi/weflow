"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import type { PriceCard } from "@/lib/pricing";
import { BUILD_TIERS, CARE_TIERS, AD_TIERS, PRICING_NOTICES } from "@/lib/pricing";

function Card({
  card,
  selected,
  onSelect,
  selectable,
}: {
  card: PriceCard;
  selected: boolean;
  onSelect?: () => void;
  selectable: boolean;
}) {
  return (
    <div
      onClick={onSelect}
      className={clsx(
        "relative flex flex-col rounded-2xl bg-white p-6 transition",
        card.highlight
          ? "border-2 border-amber-400 shadow-[0_8px_30px_-12px_rgba(245,158,11,0.5)]"
          : "border border-slate-200 shadow-sm",
        selected && "ring-2 ring-brand-600 ring-offset-2",
        selectable && "cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
      )}
    >
      {card.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-950 shadow">
          👑 추천 BEST
        </span>
      )}

      {selectable && (
        <span
          className={clsx(
            "absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full border text-xs font-bold transition",
            selected
              ? "border-brand-600 bg-brand-600 text-white"
              : "border-slate-300 bg-white text-transparent"
          )}
          aria-hidden
        >
          ✓
        </span>
      )}

      <h3
        className={clsx(
          "pr-8 text-lg font-bold",
          card.highlight ? "text-amber-600" : "text-slate-900"
        )}
      >
        {card.name}
      </h3>
      {card.subtitle && (
        <p className="mt-0.5 text-sm text-slate-500">({card.subtitle})</p>
      )}
      <span className="mt-3 inline-block w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
        {card.paymentLabel === "Monthly Subscription" ? "월 구독" : "1회 결제"}
      </span>

      <ul className="my-5 flex-1 space-y-2.5 text-sm text-slate-600">
        {card.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className={card.highlight ? "text-amber-500" : "text-brand-600"}>
              ✓
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-dashed border-slate-200 pt-4">
        <div className="text-sm text-slate-400 line-through">
          {card.originalPrice}
        </div>
        <div
          className={clsx(
            "text-2xl font-extrabold",
            card.highlight ? "text-amber-600" : "text-slate-900"
          )}
        >
          {card.currentPrice}
        </div>
        <div className="mt-1 text-xs text-slate-400">VAT 포함</div>
      </div>
    </div>
  );
}

// Controlled single-select group (selection state lives in the parent).
function SelectGroup({
  title,
  cards,
  selected,
  onSelect,
}: {
  title: string;
  cards: PriceCard[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div>
      <div className="mb-5">
        <h2 className="section-title">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">
          필수 선택형 (3중 택1) — 원하는 플랜을 선택하세요.
        </p>
      </div>
      <div className="grid gap-6 pt-3 md:grid-cols-3">
        {cards.map((card) => (
          <Card
            key={card.name}
            card={card}
            selectable
            selected={selected === card.name}
            onSelect={() => onSelect(card.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default function PricingCards({ showNotices = true }: { showNotices?: boolean }) {
  // Single global selection across all plan cards.
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="space-y-16">
      <SelectGroup
        title="제작 플랜"
        cards={BUILD_TIERS}
        selected={selected}
        onSelect={setSelected}
      />
      <SelectGroup
        title="WEFLOW 케어플랜"
        cards={CARE_TIERS}
        selected={selected}
        onSelect={setSelected}
      />

      <div>
        <h2 className="mb-5 section-title">광고 세팅</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {AD_TIERS.map((card) => (
            <Card key={card.name} card={card} selectable={false} selected={false} />
          ))}
        </div>
      </div>

      {/* Centered booking button at the bottom — appears only after a plan is selected */}
      {selected && (
        <div className="flex flex-col items-center gap-2 pt-2">
          <p className="text-sm text-slate-500">
            선택한 플랜: <b className="text-brand-700">{selected}</b>
          </p>
          <Link
            href={`/booking?plan=${encodeURIComponent(selected)}`}
            className="btn-primary px-8 py-4 text-lg"
          >
            이 플랜으로 예약하기 →
          </Link>
        </div>
      )}

      {showNotices && (
        <ul className="space-y-2 rounded-2xl bg-slate-50 p-6 text-sm text-slate-600">
          {PRICING_NOTICES.map((n) => (
            <li key={n} className="flex gap-2">
              <span className="text-brand-600">·</span>
              <span>{n}</span>
            </li>
          ))}
          <li className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-xs text-slate-500">
            <span>✓ 도메인 연결 지원</span>
            <span>✓ 도메인 등록 대행 가능</span>
            <span>✓ 도메인 비용 별도</span>
          </li>
        </ul>
      )}
    </div>
  );
}
