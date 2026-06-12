import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        {/* Company info */}
        <div className="md:col-span-1">
          <Logo href="/" variant="light" />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            제작부터 관리까지 비즈니스 성장을 함께합니다.
          </p>
          <dl className="mt-4 space-y-1 text-xs text-slate-400">
            <div>대표 : {CONTACT.representative}</div>
            <div>사업자등록번호 : {CONTACT.businessNumber}</div>
            <div>이메일 : {CONTACT.email}</div>
            <div>운영시간 : {CONTACT.hours}</div>
          </dl>
        </div>

        {/* 서비스 */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">서비스</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/services" className="hover:text-white">
                홈페이지 제작 과정
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">
                랜딩페이지 제작 과정
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">
                광고 운영·관리 안내
              </Link>
            </li>
          </ul>
        </div>

        {/* WEFLOW 케어플랜 */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">WEFLOW 케어플랜</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/pricing" className="hover:text-white">
                WE 케어
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-white">
                FLOW 케어
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-white">
                WEFLOW 케어
              </Link>
            </li>
          </ul>
        </div>

        {/* 상담문의 */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">상담문의</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <a href={CONTACT.phoneTel} className="hover:text-white">
                전화 문의
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                이메일 문의
              </a>
            </li>
            <li>
              <a
                href={CONTACT.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                카카오 채널 문의
              </a>
            </li>
            <li>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                인스타 문의
              </a>
            </li>
            <li>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                페이스북 문의
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-slate-500 md:flex-row">
          <div className="flex gap-3">
            <Link href="/privacy" className="hover:text-white">
              개인정보처리방침
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white">
              이용약관
            </Link>
          </div>
          <div>© 2026 WEFLOW. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
