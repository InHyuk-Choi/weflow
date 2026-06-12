import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseById } from "@/lib/queries";

export const revalidate = 0;

export default async function SuccessCaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await getCaseById(params.id);
  if (!item) notFound();

  return (
    <div className="section">
      <div className="container-page max-w-3xl">
        <Link
          href="/success-cases"
          className="text-sm font-medium text-brand-700 hover:underline"
        >
          ← 성공사례 목록으로
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
          {item.title}
        </h1>

        <div className="relative mt-6 aspect-[3/2] w-full overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 767px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <p className="mt-6 whitespace-pre-line leading-relaxed text-slate-700">
          {item.description}
        </p>

        <div className="mt-10 flex gap-3">
          <Link href="/free-diagnosis" className="btn-primary">
            무료진단 신청
          </Link>
          <Link href="/success-cases" className="btn-secondary">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
