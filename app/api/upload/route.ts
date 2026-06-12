import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { put } from "@vercel/blob";
import { authOptions } from "@/lib/auth";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// POST — upload an image to Vercel Blob (admin only).
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "JPEG, PNG, WebP 형식만 업로드할 수 있습니다." },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "이미지 크기는 5MB 이하여야 합니다." },
      { status: 400 }
    );
  }

  try {
    const blob = await put(`success-cases/${Date.now()}-${file.name}`, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return NextResponse.json({ success: true, url: blob.url });
  } catch {
    return NextResponse.json(
      { error: "업로드에 실패했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
