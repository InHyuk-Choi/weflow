import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// Start of "today" in KST, expressed as a UTC Date.
function startOfTodayKST(): Date {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 3600 * 1000);
  const kstMidnight = Date.UTC(
    kst.getUTCFullYear(),
    kst.getUTCMonth(),
    kst.getUTCDate()
  );
  return new Date(kstMidnight - 9 * 3600 * 1000);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const todayStart = startOfTodayKST();
    const [
      resTotal,
      inqTotal,
      resPending,
      inqPending,
      resInProgress,
      inqInProgress,
      resCompleted,
      inqCompleted,
      resToday,
      inqToday,
    ] = await Promise.all([
      prisma.reservation.count(),
      prisma.inquiry.count(),
      prisma.reservation.count({ where: { status: "pending" } }),
      prisma.inquiry.count({ where: { status: "pending" } }),
      prisma.reservation.count({ where: { status: "in-progress" } }),
      prisma.inquiry.count({ where: { status: "in-progress" } }),
      prisma.reservation.count({ where: { status: "completed" } }),
      prisma.inquiry.count({ where: { status: "completed" } }),
      prisma.reservation.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.inquiry.count({ where: { createdAt: { gte: todayStart } } }),
    ]);

    const total = resTotal + inqTotal;
    const completed = resCompleted + inqCompleted;
    const conversionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return NextResponse.json({
      reservations: resTotal,
      inquiries: inqTotal,
      today: resToday + inqToday,
      pending: resPending + inqPending,
      inProgress: resInProgress + inqInProgress,
      completed,
      total,
      conversionRate,
    });
  } catch {
    return NextResponse.json(
      {
        reservations: 0,
        inquiries: 0,
        today: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        total: 0,
        conversionRate: 0,
      },
      { status: 200 }
    );
  }
}
