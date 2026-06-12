import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { put } from "@vercel/blob";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
// Keep under Vercel's serverless request body limit (~4.5MB on Hobby).
const MAX_SIZE = 4 * 1024 * 1024; // 4MB

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// POST — upload an image to Vercel Blob (admin only).
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN 환경변수가 설정되지 않았습니다." },
      { status: 500 }
    );
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
      { error: "이미지 크기는 4MB 이하여야 합니다." },
      { status: 400 }
    );
  }

  try {
    // Use a safe ASCII filename (Korean/space filenames can break the Blob key).
    const ext = EXT[file.type] || "jpg";
    const blob = await put(`success-cases/${Date.now()}.${ext}`, file, {
      access: "public",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return NextResponse.json({ success: true, url: blob.url });
  } catch (err) {
    // Surface the real reason so it can be diagnosed from the client/logs.
    const message = err instanceof Error ? err.message : String(err);
    console.error("[upload] blob put failed:", message);
    return NextResponse.json(
      { error: `업로드 실패: ${message}` },
      { status: 500 }
    );
  }
}
