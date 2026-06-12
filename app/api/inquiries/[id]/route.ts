import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { isValidStatus } from "@/lib/validators";

// PATCH — update inquiry status (admin only).
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const status = String(body.status || "");
  if (!isValidStatus(status)) {
    return NextResponse.json({ error: "잘못된 상태값입니다." }, { status: 400 });
  }

  try {
    const inquiry = await prisma.inquiry.update({
      where: { id: params.id },
      data: { status },
    });
    return NextResponse.json({ success: true, inquiry });
  } catch {
    return NextResponse.json({ error: "문의를 찾을 수 없습니다." }, { status: 404 });
  }
}

// DELETE — remove inquiry (admin only).
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.inquiry.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "문의를 찾을 수 없습니다." }, { status: 404 });
  }
}
