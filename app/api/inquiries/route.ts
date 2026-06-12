import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import {
  validateName,
  validatePhone,
  validateOptionalEmail,
  validateMaxLength,
} from "@/lib/validators";

// GET — paginated inquiries (admin only).
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
  const [inquiries, totalCount] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.inquiry.count({ where }),
  ]);

  return NextResponse.json({ inquiries, totalCount, page, pageSize });
}

// POST — create inquiry (public). Email optional.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const email = body.email ? String(body.email).trim() : null;
    const serviceType = body.serviceType ? String(body.serviceType) : null;
    const industry = body.industry ? String(body.industry).trim() : null;
    const message = String(body.message || "").trim();
    const consent = Boolean(body.consentToDataCollection);

    if (!consent) {
      return NextResponse.json(
        { error: "개인정보 수집 및 상담 동의가 필요합니다." },
        { status: 400 }
      );
    }
    for (const check of [
      validateName(name),
      validatePhone(phone),
      validateOptionalEmail(email),
      validateMaxLength(industry, 100, "업종"),
      validateMaxLength(message, 1000, "추가 요청사항"),
    ]) {
      if (!check.valid) {
        return NextResponse.json({ error: check.error }, { status: 400 });
      }
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        phone,
        email,
        serviceType,
        industry,
        message,
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "제출을 완료하지 못했습니다. 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
