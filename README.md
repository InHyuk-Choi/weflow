# WEFLOW Website Platform

문의로 이어지는 홈페이지·랜딩페이지 제작 서비스 플랫폼. 공개 마케팅/예약 사이트와
관리자 대시보드(예약·문의·성공사례 관리, 엑셀 내보내기)로 구성됩니다.

## 기술 스택

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Prisma + Vercel Postgres
- NextAuth (credentials) — 관리자 인증
- Vercel Blob — 성공사례 이미지 업로드
- SheetJS(xlsx) — 엑셀 내보내기

## 로컬 실행

```bash
npm install
cp .env.example .env       # 값 채우기 (아래 환경변수 참고)
npx prisma migrate dev     # DB 스키마 생성
npx prisma db seed         # 관리자 계정 + 샘플 성공사례
npm run dev                # http://localhost:3000
```

빌드/타입 검사만 확인하려면 DB 없이도 가능합니다:

```bash
npx prisma generate
npm run typecheck
npm run build
```

## 환경 변수 (.env)

| 변수 | 설명 |
| --- | --- |
| `POSTGRES_PRISMA_URL` | Vercel Postgres 풀링 연결 문자열 (런타임) |
| `POSTGRES_URL_NON_POOLING` | 마이그레이션용 다이렉트 연결 문자열 |
| `NEXTAUTH_URL` | 사이트 URL (예: https://yourapp.vercel.app) |
| `NEXTAUTH_SECRET` | 32자 랜덤 문자열 (`openssl rand -base64 32`) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob 토큰 (이미지 업로드) |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | 시드용 관리자 초기 계정 |

## Vercel 배포

1. GitHub 저장소를 Vercel에 연결합니다.
2. Storage 탭에서 **Postgres**와 **Blob**을 생성합니다 (환경변수 자동 주입).
   - `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`는 직접 추가합니다.
3. Build Command는 `prisma generate && next build` (package.json에 설정됨).
4. 최초 배포 후 마이그레이션/시드:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

## 주요 경로

- 공개 사이트: `/`, `/services`, `/pricing`, `/success-cases`, `/booking`,
  `/free-diagnosis`, `/contact`, `/landing`
- 관리자: `/admin/login`, `/admin` (대시보드), `/admin/success-cases`

## 참고

- 로고/이미지는 플레이스홀더입니다. 실제 에셋으로 교체하세요.
- 병원·의료·헬스케어 콘텐츠는 콘텐츠 필터로 차단됩니다.
