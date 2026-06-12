import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { inquiryWorkbook } from "@/lib/excel-export";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    const buffer = inquiryWorkbook(inquiries);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="weflow-inquiries.xlsx"',
      },
    });
  } catch {
    return NextResponse.json({ error: "내보내기에 실패했습니다." }, { status: 500 });
  }
}
