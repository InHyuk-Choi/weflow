import type { Metadata } from "next";
import ContactForm from "@/components/public/ContactForm";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "상담 문의 — 전화·카카오·이메일로 연결됩니다",
  description:
    "WEFLOW에 문의하세요. 전화, 카카오톡 채널, 이메일 등 편한 방법으로 빠르게 상담받을 수 있습니다. 간단한 문의 폼으로도 연락을 남길 수 있습니다.",
};

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="section-title">상담 문의</h1>
          <p className="mt-2 text-slate-600">
            편하신 방법으로 언제든 문의해 주세요. 연중무휴 24시간 상담 가능합니다.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            <li>
              전화 :{" "}
              <a href={CONTACT.phoneTel} className="text-brand-700">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              이메일 :{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-brand-700">
                {CONTACT.email}
              </a>
            </li>
            <li>
              카카오 채널 :{" "}
              <a
                href={CONTACT.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700"
              >
                바로가기
              </a>
            </li>
          </ul>
        </div>

        <div className="card">
          <h2 className="mb-4 text-lg font-bold text-slate-900">문의 남기기</h2>
          <ContactForm variant="general" submitLabel="문의 보내기" />
        </div>
      </div>
    </div>
  );
}
