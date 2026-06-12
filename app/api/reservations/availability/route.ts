import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET ?date=YYYY-MM-DD — returns the list of already-taken time slots for that
// date (public). Used by the booking calendar to disable unavailable slots.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date");
  if (!dateStr) {
    return NextResponse.json({ takenSlots: [] });
  }

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return NextResponse.json({ takenSlots: [] });
  }

  try {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const rows = await prisma.reservation.findMany({
      where: {
        date: { gte: dayStart, lt: dayEnd },
        status: { in: ["pending", "in-progress", "completed"] },
      },
      select: { time: true },
    });
    return NextResponse.json({ takenSlots: rows.map((r) => r.time) });
  } catch {
    return NextResponse.json({ takenSlots: [] });
  }
}
