import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { checkProhibitedContent } from "@/lib/content-filter";
import { validateMaxLength } from "@/lib/validators";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const successCase = await prisma.successCase.findUnique({
    where: { id: params.id },
  });
  if (!successCase) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ successCase });
}

// PATCH — update (admin only) with content check.
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const data: Record<string, unknown> = {};

  if (typeof body.title === "string") {
    const v = validateMaxLength(body.title, 100, "제목");
    if (!v.valid) return NextResponse.json({ error: v.error }, { status: 400 });
    data.title = body.title.trim();
  }
  if (typeof body.description === "string") {
    const v = validateMaxLength(body.description, 2000, "설명");
    if (!v.valid) return NextResponse.json({ error: v.error }, { status: 400 });
    data.description = body.description.trim();
  }
  if (typeof body.imageUrl === "string" && body.imageUrl.trim()) {
    data.imageUrl = body.imageUrl.trim();
  }
  if (typeof body.published === "boolean") {
    data.published = body.published;
  }

  const content = checkProhibitedContent({
    제목: (data.title as string) ?? "",
    설명: (data.description as string) ?? "",
  });
  if (!content.ok) {
    return NextResponse.json(
      {
        error: `금지된 콘텐츠가 감지되었습니다 (${content.field}: "${content.keyword}").`,
      },
      { status: 422 }
    );
  }

  try {
    const successCase = await prisma.successCase.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json({ success: true, successCase });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

// DELETE — remove (admin only).
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await prisma.successCase.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
