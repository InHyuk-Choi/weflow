import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import SuccessCaseForm from "@/components/admin/SuccessCaseForm";

export const revalidate = 0;
export const metadata = { title: "성공사례 수정" };

export default async function EditSuccessCasePage({
  params,
}: {
  params: { id: string };
}) {
  const item = await prisma.successCase.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/admin/success-cases"
        className="text-sm font-medium text-brand-700 hover:underline"
      >
        ← 목록으로
      </Link>
      <h1 className="text-2xl font-bold text-slate-900">성공사례 수정</h1>
      <SuccessCaseForm
        existing={{
          id: item.id,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          published: item.published,
        }}
      />
    </div>
  );
}
