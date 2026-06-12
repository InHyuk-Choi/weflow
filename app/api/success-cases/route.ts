import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { checkProhibitedContent } from "@/lib/content-filter";
import { validateMaxLength } from "@/lib/validators";

// GET — success cases. Public sees published only; admin can request all.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wantAll = searchParams.get("all") === "true";

  let publishedOnly = true;
  if (wantAll) {
    const session = await getServerSession(authOptions);
    if (session) publishedOnly = false;
  }

  const successCases = await prisma.successCase.findMany({
    where: publishedOnly ? { published: true } : {},
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ successCases });
}

// POST — create success case (admin only) with prohibited-content check.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const imageUrl = String(body.imageUrl || "").trim();
  const published = Boolean(body.published);

  if (!title) {
    return NextResponse.json({ error: "제목을 입력해 주세요." }, { status: 400 });
  }
  if (!imageUrl) {
    return NextResponse.json({ error: "이미지를 업로드해 주세요." }, { status: 400 });
  }
  for (const check of [
    validateMaxLength(title, 100, "제목"),
    validateMaxLength(description, 2000, "설명"),
  ]) {
    if (!check.valid) {
      return NextResponse.json({ error: check.error }, { status: 400 });
    }
  }

  const content = checkProhibitedContent({ 제목: title, 설명: description });
  if (!content.ok) {
    return NextResponse.json(
      {
        error: `금지된 콘텐츠가 감지되었습니다 (${content.field}: "${content.keyword}"). 의료·병원·헬스케어 관련 표현을 제거해 주세요.`,
      },
      { status: 422 }
    );
  }

  const successCase = await prisma.successCase.create({
    data: { title, description, imageUrl, published },
  });
  return NextResponse.json({ success: true, successCase }, { status: 201 });
}
