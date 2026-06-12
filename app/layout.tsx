import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: {
    default: "WEFLOW | 문의로 이어지는 홈페이지·랜딩페이지 제작",
    template: "%s | WEFLOW",
  },
  description:
    "WEFLOW는 홈페이지·랜딩페이지 제작부터 광고 연동·운영 관리까지 문의 구조를 설계합니다. 빠른 제작과 합리적 비용, 24시간 상담을 제공합니다.",
  icons: {
    icon: "/main_icon.png",
    apple: "/main_icon.png",
  },
  openGraph: {
    title: "WEFLOW | 문의로 이어지는 홈페이지를 만듭니다",
    description:
      "홈페이지 제작부터 광고 연동·운영 관리까지. 단순 제작이 아닌 문의 구조까지 설계합니다.",
    type: "website",
    images: ["/main_icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
