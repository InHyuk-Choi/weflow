import Link from "next/link";
import Image from "next/image";

export interface SuccessCaseCardData {
  id: string;
  title: string;
  imageUrl: string;
}

// Card: top image, bottom 상호명 + 자세히보기. Whole card links to detail.
export default function SuccessCaseCard({
  successCase,
}: {
  successCase: SuccessCaseCardData;
}) {
  return (
    <Link
      href={`/success-cases/${successCase.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={successCase.imageUrl}
          alt={successCase.title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
          className="object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-semibold text-slate-900">{successCase.title}</h3>
        <span className="mt-1 inline-block text-sm text-brand-700 group-hover:underline">
          자세히 보기 →
        </span>
      </div>
    </Link>
  );
}
