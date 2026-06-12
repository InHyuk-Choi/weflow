import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { combinedWorkbook } from "@/lib/excel-export";

// Combined "전체 엑셀 다운로드" — reservations + inquiries in one .xlsx
// (two sheets) in a single action.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const [reservations, inquiries] = await Promise.all([
      prisma.reservation.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } }),
    ]);
    const buffer = combinedWorkbook(reservations, inquiries);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="weflow-all.xlsx"',
      },
    });
  } catch {
    return NextResponse.json({ error: "내보내기에 실패했습니다." }, { status: 500 });
  }
}
