import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";

export const revalidate = 0;
export const metadata = { title: "성공사례 관리" };

async function getAllCases() {
  try {
    return await prisma.successCase.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function AdminCasesPage() {
  const cases = await getAllCases();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">성공사례 관리</h1>
        <Link href="/admin/success-cases/new" className="btn-primary px-4 py-2 text-sm">
          + 새 사례
        </Link>
      </div>

      {cases.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-400">
          등록된 성공사례가 없습니다.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c.id}
              href={`/admin/success-cases/${c.id}/edit`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <Image
                  src={c.imageUrl}
                  alt={c.title}
                  fill
                  sizes="(max-width:767px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="truncate font-medium text-slate-800">
                  {c.title}
                </span>
                <span
                  className={
                    c.published
                      ? "rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                      : "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                  }
                >
                  {c.published ? "공개" : "비공개"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
