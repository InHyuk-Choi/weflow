import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import {
  validateName,
  validatePhone,
  validateMaxLength,
  isValidServiceType,
  isWithinBookingRange,
} from "@/lib/validators";
import { TIME_SLOTS } from "@/lib/constants";

// GET — paginated reservations (admin only).
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const pageSize = Math.min(100, Number(searchParams.get("pageSize") || 50));
  const status = searchParams.get("status") || "all";

  const where = status !== "all" ? { status } : {};
  const [reservations, totalCount] = await Promise.all([
    prisma.reservation.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.reservation.count({ where }),
  ]);

  return NextResponse.json({ reservations, totalCount, page, pageSize });
}

// POST — create reservation (public) with conflict check. No email field.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dateStr = String(body.date || "");
    const time = String(body.time || "").trim();
    const serviceType = String(body.serviceType || "");
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const industry = body.industry ? String(body.industry).trim() : null;
    const additionalRequests = body.additionalRequests
      ? String(body.additionalRequests).trim()
      : null;
    const customTime = body.customTime ? String(body.customTime).trim() : "";
    const consent = Boolean(body.consentToDataCollection);

    const effectiveTime = time || customTime;
    const date = new Date(dateStr);

    if (!consent) {
      return NextResponse.json(
        { error: "개인정보 수집 및 상담 동의가 필요합니다." },
        { status: 400 }
      );
    }
    if (!dateStr || isNaN(date.getTime()) || !isWithinBookingRange(date)) {
      return NextResponse.json(
        { error: "예약 가능한 날짜를 선택해 주세요." },
        { status: 400 }
      );
    }
    if (!effectiveTime) {
      return NextResponse.json(
        { error: "시간대를 선택하거나 입력해 주세요." },
        { status: 400 }
      );
    }
    if (!isValidServiceType(serviceType)) {
      return NextResponse.json(
        { error: "제작종류를 선택해 주세요." },
        { status: 400 }
      );
    }
    for (const check of [
      validateName(name),
      validatePhone(phone),
      validateMaxLength(industry, 100, "업종"),
      validateMaxLength(additionalRequests, 2000, "추가요청사항"),
    ]) {
      if (!check.valid) {
        return NextResponse.json({ error: check.error }, { status: 400 });
      }
    }

    // Conflict check only applies to fixed grid slots (not free-text custom times).
    const isGridSlot = TIME_SLOTS.includes(effectiveTime);

    const reservation = await prisma.$transaction(async (tx) => {
      if (isGridSlot) {
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(dayStart);
        dayEnd.setDate(dayEnd.getDate() + 1);

        const existing = await tx.reservation.findFirst({
          where: {
            date: { gte: dayStart, lt: dayEnd },
            time: effectiveTime,
            status: { in: ["pending", "in-progress", "completed"] },
          },
        });
        if (existing) {
          throw new Error("SLOT_TAKEN");
        }
      }
      return tx.reservation.create({
        data: {
          date,
          time: effectiveTime,
          serviceType,
          name,
          phone,
          industry,
          additionalRequests,
          status: "pending",
        },
      });
    });

    return NextResponse.json({ success: true, reservation }, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "SLOT_TAKEN") {
      return NextResponse.json(
        { error: "이미 예약된 시간대입니다. 다른 시간을 선택해 주세요." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "예약을 완료하지 못했습니다. 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
