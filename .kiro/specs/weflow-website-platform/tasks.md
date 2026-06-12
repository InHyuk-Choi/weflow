# Implementation Plan: WEFLOW Website Platform

## Overview

This implementation plan builds a full-stack Next.js 14+ web application with App Router, deployed on Vercel with Vercel Postgres and Vercel Blob storage. The platform consists of a public-facing multi-page website for service marketing and booking, plus an authenticated admin dashboard for managing reservations, inquiries, and success case content.

**Implementation Strategy:**
- Start with foundational infrastructure (Next.js setup, database schema, authentication)
- Build public website components and pages incrementally
- Develop admin dashboard with authentication protection
- Integrate file upload and data export features
- Add property-based tests to validate correctness properties from the design
- Wire everything together with proper routing and navigation

**Technology Stack:**
- Next.js 14+ (App Router) with TypeScript
- Tailwind CSS for styling
- Vercel Postgres (serverless PostgreSQL)
- Prisma ORM with connection pooling
- NextAuth.js for authentication
- Vercel Blob for image storage
- SheetJS (xlsx) for Excel export
- fast-check for property-based testing

## Tasks

- [ ] 1. Set up project infrastructure and database
  - [ ] 1.1 Initialize Next.js 14+ project with TypeScript and Tailwind CSS
    - Create new Next.js project with `npx create-next-app@latest` using App Router
    - Configure TypeScript strict mode in `tsconfig.json`
    - Set up Tailwind CSS with mobile-first breakpoints (768px, 1024px)
    - Create folder structure: `app/(public)`, `app/(admin)`, `components/public`, `components/admin`, `lib/`
    - Install dependencies: `@prisma/client`, `@vercel/postgres`, `@vercel/blob`, `next-auth`, `xlsx`, `date-fns`, `react-datepicker`
    - _Requirements: 10.1, 10.2, 10.3_

  - [ ] 1.2 Configure Prisma schema and database models
    - Create `prisma/schema.prisma` with all models: User, Reservation, Inquiry, SuccessCase, Session
    - Configure datasource with `POSTGRES_PRISMA_URL` for connection pooling
    - Add indexes for performance: date+time, status, createdAt on relevant models
    - Create Prisma client singleton in `lib/db.ts` to prevent connection exhaustion
    - _Requirements: 6.7, 7.5, 11.1, 12.1, 13.1, 16.1_

  - [ ]* 1.3 Write property test for database data preservation
    - **Property 7: Reservation Data Preservation**
    - **Property 12: Inquiry Data Preservation**
    - **Validates: Requirements 6.7, 7.5**
    - Use fast-check to generate random valid reservation and inquiry data
    - Test that creating a record and then retrieving it returns all fields matching original values
    - Run 100 iterations per property

  - [ ] 1.4 Set up NextAuth.js authentication system
    - Create `app/api/auth/[...nextauth]/route.ts` with credentials provider
    - Configure authentication options: session strategy, JWT settings
    - Implement login attempt tracking and account lockout (5 attempts in 15 minutes → lock for 30 minutes)
    - Create session timeout logic (30 minutes of inactivity)
    - Store admin credentials securely with bcrypt hashing
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.6, 11.8_

  - [ ]* 1.5 Write property tests for authentication logic
    - **Property 16: Authentication Access Grant**
    - **Property 17: Authentication Access Denial**
    - **Property 18: Account Lockout After Failed Attempts**
    - **Validates: Requirements 11.3, 11.4, 11.8**
    - Test valid credentials grant access, invalid credentials deny access
    - Test account lockout after 5 failed attempts within 15 minutes

  - [ ] 1.6 Create validation utility functions
    - Implement email format validation (RFC 5322 pattern, max 254 chars) in `lib/validators.ts`
    - Implement phone number format validation (Korean and international formats, max 20 chars)
    - Implement string length validators for all form fields (name ≤100, industry ≤100, message ≤1000/2000)
    - Implement date range validator (current date to +90 days)
    - Implement prohibited content keyword detection in `lib/content-filter.ts`
    - _Requirements: 6.5, 7.7, 7.8, 7.9, 18.2, 18.3_

  - [ ]* 1.7 Write property tests for validation functions
    - **Property 13: Email Format Validation**
    - **Property 14: Phone Number Format Validation**
    - **Property 15: Required Field Validation**
    - **Property 28: Prohibited Content Detection and Rejection**
    - **Property 31-38: Length and format validations**
    - **Validates: Requirements 6.5, 7.7, 7.8, 7.9, 18.2**
    - Generate random valid and invalid inputs with fast-check
    - Test all validation rules reject/accept correctly across 100+ iterations

- [ ] 2. Checkpoint - Verify infrastructure setup
  - Ensure Prisma migrations run successfully against Vercel Postgres
  - Verify Prisma client generates types correctly
  - Verify NextAuth authentication routes are accessible
  - Ensure all validation utilities pass their property tests
  - Ask the user if questions arise

- [ ] 3. Build public website navigation and layout
  - [ ] 3.1 Create root layout and global styles
    - Implement `app/layout.tsx` with metadata configuration
    - Create `app/globals.css` with Tailwind directives and custom styles
    - Configure font loading (system fonts or Google Fonts)
    - Add responsive viewport meta tags
    - _Requirements: 1.1, 10.1, 17.1, 17.2_

  - [ ] 3.2 Build Navigation component with responsive menu
    - Create `components/public/Navigation.tsx` with desktop horizontal menu and mobile vertical menu
    - Implement hamburger menu for mobile (≤768px width)
    - Add active page highlighting using `usePathname()` hook
    - Include links to: Home, Services, Pricing, Success Cases, Booking, Free Diagnosis
    - Display WEFLOW logo in header
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 1.7_

  - [ ]* 3.3 Write property tests for navigation consistency
    - **Property 1: Navigation Menu Consistency Across Pages**
    - **Property 2: Active Navigation Link Distinction**
    - **Validates: Requirements 1.4, 1.7**
    - Test that navigation renders identically across all public pages
    - Test active page highlighting is visually distinct

  - [ ] 3.4 Build Sticky Bottom Navigation for mobile
    - Create `components/public/StickyBottomNav.tsx` with fixed bottom positioning
    - Display on every public page at all viewport widths (mobile, tablet, and desktop) as a single horizontal row
    - Include 4 action buttons: 24-hour consultation (tel: link), KakaoTalk, Blog, Free Diagnosis
    - Implement proper external link handling with `target="_blank"`
    - Style with icons and labels
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 9.10_

  - [ ] 3.5 Build Footer component
    - Create `components/public/Footer.tsx` shown on every public page
    - Display WEFLOW logo (clickable → home) and tagline "제작부터 관리까지 비즈니스 성장을 함께합니다."
    - Display company info: 대표 신서준, 사업자등록번호 884-07-03480, 이메일 contact@weflowlab.kr, 운영시간 연중무휴 24시간 상담가능
    - Display 개인정보처리방침 | 이용약관 and "© 2026 WEFLOW. All rights reserved."
    - Add 3 link columns: 서비스(홈페이지 제작 과정/랜딩페이지 제작 과정/광고 운영·관리 안내), WEFLOW 케어플랜(WE 케어/FLOW 케어/WEFLOW 케어), 상담문의(전화/이메일/카카오/인스타/페이스북 — tel:/mailto:/new-tab links)
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.7_

  - [ ] 3.6 Create public pages group layout
    - Create `app/(public)/layout.tsx` including Navigation, StickyBottomNav, and Footer
    - Keep StickyBottomNav visible at all viewport widths on every page
    - Apply consistent spacing and container styles
    - _Requirements: 1.1, 9.1, 21.1_

- [ ] 4. Implement home page components and content
  - [ ] 4.1 Build Hero banner component
    - Create `components/public/Hero.tsx` with eyebrow line, two-line headline (no mid-word break) "문의로 이어지는 홈페이지를 만듭니다", supporting subtext
    - Add three blue, shadowed CTA buttons: 무료 진단 신청 (→ Free Diagnosis), 성공 사례 보기 (→ Success Cases), WEFLOW 랜딩 페이지 (→ Marketing Landing Page)
    - Make banner responsive with proper image scaling
    - _Requirements: 2.1, 2.2_

  - [ ] 4.2 Create Testimonial Marquee component
    - Implement `components/public/TestimonialCarousel.tsx` as a continuously auto-scrolling horizontal marquee of 2 rows that loops seamlessly
    - Display customer name, 5-star rating, and testimonial text
    - Add a "후기 더보기" control at the top-right that navigates to the Free Diagnosis / inquiry page
    - _Requirements: 2.9, 2.10, 2.11, 2.12_

  - [ ]* 4.3 Write property test for testimonial marquee
    - **Validates: Requirements 2.9, 2.10**
    - Generate random testimonial lists with different lengths
    - Test the marquee renders all testimonials and loops seamlessly

  - [ ] 4.4 Build Success Case Card component
    - Create `components/public/SuccessCaseCard.tsx` with thumbnail image and title
    - Implement lazy loading for images
    - Add hover effects and click navigation to detail view
    - Make cards responsive to grid layout
    - _Requirements: 2.5, 5.3_

  - [ ] 4.5 Implement home page
    - Create `app/(public)/page.tsx` assembling all home page sections
    - Display hero banner at top
    - Add care-plan benefits area: three small fixed-width boxes + one long 6-cell box
    - Add 4-step delivery flow (고객 의뢰 → 접수 후 제작 → 3~7일 배송 완료 → 사후 관리) each with an image
    - Add success-cases section: left copy box with "살펴보기→" (→ Free Diagnosis) and right 5 case images with top-right "더보기" (→ Success Cases)
    - Add side-by-side "제작 진행 과정" (4 cells) and "6단계 제작 프로세스" (6 cells) boxes
    - Add free-diagnosis section box (✓ 문의 구조 진단 / ✓ 디자인 점검 / ✓ 검색 노출 분석 / ✓ 문의 개선 제안) with "무료진단 후 견적 받기" button (→ Free Diagnosis)
    - Show service overview section with at least 3 service offerings
    - Include testimonial marquee with 5+ testimonials and footer
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9_

- [ ] 5. Build Services and Pricing pages
  - [ ] 5.1 Create Services page with process breakdown
    - Implement `app/(public)/services/page.tsx`
    - Display the 6-step 제작진행과정 with titles/descriptions: 01 상담·진단, 02 기획·설계, 03 디자인, 04 개발·테스트, 05 SEO 상단등록, 06 광고운영·사후관리
    - Each step includes description (≥50 characters) and visual element
    - Add "광고 운영·사후관리 시스템" section listing: 블로그/인스타/스레드/네이버 키워드/당근플레이스 업로드, 네이버 서치어드바이저 상단등록, 구글 콘솔 상단등록, 사이트맵 등록
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [ ] 5.2 Create Pricing page with service tiers
    - Implement `app/(public)/pricing/page.tsx`
    - Display START 랜딩페이지: ₩249,000 (from ₩498,000) + features (1페이지, 3~4일, 반응형, 문의폼 연동, 기본 SEO)
    - Display GROW 홈페이지: ₩990,000 (from ₩1,980,000) + features (5페이지, 1주, 반응형, 문의폼 연동, 카카오톡 상담연동, 기본 SEO)
    - Display MASTER 프리미엄: ₩1,490,000 (from ₩2,980,000) + features (홈페이지+랜딩, 1~2주, 프리미엄 디자인, 예약·문의 시스템, SEO 최적화, 광고 전환 구조 설계) — emphasized with distinct color and crown
    - Show Care Plans with "Monthly Subscription" labels, two-line discounted prices, and feature lists: WE CARE ₩89,000/월 (from ₩170,000), FLOW CARE ₩189,000/월 (from ₩378,000; include 네이버 키워드 세팅 ₩149,000→₩79,000 and 당근 키워드 세팅 50% ₩79,000→₩39,000), WEFLOW CARE ₩339,000/월 (from ₩678,000) — WEFLOW Care emphasized with distinct color and crown
    - Display advertising setup options with two-line discounted prices and feature lists: 네이버 광고 ₩149,000 (from ₩298,000), 당근 플레이스 광고 ₩79,000 (from ₩158,000)
    - Render every price as a two-line discounted price; present one-time tiers and Care tiers as required single-select (1-of-3) card groups with ✓ indicators in a single vertical column
    - Label one-time payments as "One-Time Payment" and subscriptions as "Monthly Subscription"
    - Add notices: VAT 포함, domain registered under customer (cost separate, setup free), ad spend paid by customer directly, maintenance covers minor edits only
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11_

  - [ ]* 5.3 Write property test for service tier labeling
    - **Property 5: Service Tier Payment Type Labeling**
    - **Validates: Requirements 4.6, 4.7**
    - Generate various service tier configurations
    - Test that one-time tiers show "One-Time Payment" and subscriptions show "Monthly Subscription"

- [ ] 6. Implement Success Cases gallery and detail views
  - [ ] 6.1 Create Success Cases gallery page
    - Implement `app/(public)/success-cases/page.tsx`
    - Fetch published success cases from API
    - Display in responsive grid: 4 per row (desktop ≥1024px), 2 per row (tablet 768-1023px), 1 per row (mobile ≤767px)
    - Show each case with thumbnail and title using SuccessCaseCard
    - Handle empty state with "no cases available" message
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.6_

  - [ ]* 6.2 Write property test for gallery grid layout
    - **Property 5: Responsive Grid Layout**
    - **Validates: Requirements 5.4**
    - Test different viewport widths and verify correct number of columns
    - Test with various numbers of success cases

  - [ ] 6.3 Create Success Case detail view page
    - Implement `app/(public)/success-cases/[id]/page.tsx`
    - Display full-size image and complete text description
    - Add navigation control to return to gallery
    - Implement proper error handling for invalid IDs
    - _Requirements: 5.5, 5.7_

  - [ ]* 6.4 Write property test for detail view navigation
    - **Property 7: Success Case Detail View Navigation**
    - **Validates: Requirements 5.5**
    - Test clicking any gallery item navigates to correct detail view

- [ ] 7. Build booking system with calendar interface
  - [ ] 7.1 Create Calendar Interface component
    - Implement `components/public/CalendarInterface.tsx` with date and time slot selection
    - Display date range: current date through +90 days
    - Show exactly 20 time slots at 30-minute intervals from 09:00 to 18:30 (5-column × 4-row grid); when the date is today, disable slots earlier than the current time; include a free-text "원하시는 시간대 직접 입력" field
    - Mark dates as available if any time slot is free
    - Mark time slots as available if no conflicting reservation exists
    - Implement multi-step form: Date → Time → Contact information
    - Use react-datepicker or custom calendar with date-fns
    - _Requirements: 6.1, 6.2, 6.3, 6.9, 6.10_

  - [ ]* 7.2 Write property tests for calendar logic
    - **Property 8: Calendar Date Range**
    - **Property 9: Time Slot Duration**
    - **Property 9: Date Availability Calculation**
    - **Property 10: Time Slot Availability Calculation**
    - **Validates: Requirements 6.2, 6.3, 6.9, 6.10**
    - Test date range is always current date to +90 days
    - Test there are exactly 20 time slots at 30-minute intervals (09:00–18:30), with past slots disabled for today
    - Test availability logic with various reservation scenarios

  - [ ] 7.3 Create booking form with validation
    - Implement contact information form: name (max 100), phone (max 20) — required; no email field
    - Add service type selection: 랜딩페이지 제작 / 홈페이지 제작 / 랜딩&홈페이지 제작 / 기타(WEFLOW 케어플랜)
    - Add fields: industry (max 100), additional requests (max 2000), and required consent checkbox
    - Implement client-side validation with error messages
    - Display character counters for text fields
    - _Requirements: 6.6, 6.7, 6.8, 6.9_

  - [ ] 7.4 Implement booking page and API endpoint
    - Create `app/(public)/booking/page.tsx` with CalendarInterface
    - Create `app/api/reservations/route.ts` POST endpoint
    - Validate all inputs server-side
    - Check for booking conflicts using database transaction
    - Create reservation with status "pending"
    - Return confirmation with date, time, service type
    - Handle conflict errors with clear message
    - _Requirements: 6.6, 6.7, 6.8, 6.11_

  - [ ]* 7.5 Write property tests for booking creation
    - **Property 6: New Reservation Status Initialization**
    - **Property 8: Booking Confirmation Content**
    - **Property 11: Booking Conflict Rejection**
    - **Validates: Requirements 6.6, 6.8, 6.11**
    - Test all new reservations have "pending" status
    - Test confirmation message contains correct date, time, service type
    - Test conflicting bookings are rejected

- [ ] 8. Build contact forms for inquiries
  - [ ] 8.1 Create reusable Contact Form component
    - Implement `components/public/ContactForm.tsx` with dynamic field rendering
    - Support two form types: 'free_diagnosis' and 'general_inquiry'
    - Include fields: name (max 100), phone (max 20), message, and optional email (max 254)
    - For diagnosis form: add service type selection, industry (max 100), additional requests (max 1000)
    - For general form: message (max 2000)
    - Add character counters and validation error display
    - Include consent checkbox (required)
    - _Requirements: 7.2, 7.3, 7.12, 19.2, 19.3_

  - [ ] 8.2 Implement Free Diagnosis page
    - Create `app/(public)/free-diagnosis/page.tsx`
    - Use ContactForm component with 'free_diagnosis' type
    - Display service type options: Landing Page, Homepage, Landing & Homepage, Other (WEFLOW Care Plan)
    - _Requirements: 7.1, 7.10_

  - [ ] 8.3 Create general inquiry page
    - Implement `app/(public)/contact/page.tsx`
    - Use ContactForm component with 'general_inquiry' type
    - Display confirmation message on successful submission
    - _Requirements: 19.1_

  - [ ] 8.4 Create Inquiries API endpoint
    - Implement `app/api/inquiries/route.ts` POST endpoint
    - Validate all inputs (phone format, optional email format, required fields)
    - Create inquiry record with status "pending" (대기)
    - Store timestamp, name, phone, service type, industry, message, and optional email
    - Return success confirmation
    - Handle validation errors with specific messages
    - _Requirements: 7.4, 7.5, 7.7, 7.8, 7.9, 7.11, 19.4, 19.5, 19.6, 19.7, 19.8_

  - [ ]* 8.5 Write property tests for form validation
    - **Property 10: Form Validation Prevents Submission on Invalid Input**
    - **Validates: Requirements 6.5, 7.7, 7.8, 7.9, 19.3, 19.5, 19.6**
    - Generate random valid and invalid form data
    - Test forms reject invalid email, empty required fields, invalid phone

- [ ] 9. Checkpoint - Verify public website functionality
  - Test navigation between all public pages
  - Verify booking calendar displays correct date range
  - Test reservation creation with valid data
  - Test inquiry form submission
  - Verify responsive layout on mobile, tablet, desktop
  - Ensure all tests pass, ask the user if questions arise

- [ ] 10. Build admin authentication and layout
  - [ ] 10.1 Create admin login page
    - Implement `app/(admin)/login/page.tsx` with username/password form
    - Display error messages for invalid credentials, empty fields, account lockout
    - Redirect to dashboard on successful login
    - Show generic error message: "Incorrect username or password"
    - Display lockout message: "Account locked due to multiple failed attempts. Try again in 30 minutes."
    - _Requirements: 11.1, 11.2, 11.4, 11.5, 11.8_

  - [ ] 10.2 Create admin layout with auth protection
    - Implement `app/(admin)/layout.tsx` with authentication check
    - Use NextAuth `useSession()` or `getServerSession()` to verify authentication
    - Redirect unauthenticated users to login page
    - Include admin navigation menu (Dashboard, Reservations, Inquiries, Success Cases)
    - Add a logout control and a manual refresh control; provide status filter tabs (대기/진행중/완료/전체) for reservations and inquiries
    - _Requirements: 11.9, 11.10, 11.11, 11.12_

  - [ ]* 10.3 Write property test for admin route protection
    - **Property 22: Unauthenticated Admin Route Redirect**
    - **Validates: Requirements 11.9**
    - Test all admin routes redirect to login when not authenticated

  - [ ] 10.3 Create middleware for auth redirects
    - Implement `middleware.ts` using NextAuth middleware
    - Protect all `/admin/*` routes except `/admin/login`
    - Redirect to login page if session expired
    - _Requirements: 11.7, 11.9_

- [ ] 11. Implement reservation management in admin dashboard
  - [ ] 11.1 Build Reservation Table component
    - Create `components/admin/ReservationTable.tsx` with pagination
    - Display row columns: status, name, phone, 접수일(createdAt), 희망 일정; expandable detail (down-arrow) revealing service type, industry, additional requests
    - Show 50 reservations per page
    - Add per-row controls: 완료 / 진행중 / 삭제(delete), applied in real time
    - Implement status filter: 전체, 대기, 진행중, 완료
    - Sort by date (most recent first)
    - Add real-time updates via polling (5-second interval)
    - _Requirements: 12.1, 12.2, 12.3, 12.6, 12.7, 15.1, 15.3_

  - [ ]* 11.2 Write property tests for reservation display
    - **Property 23: Reservation Display Completeness**
    - **Property 24: Reservation Status Value Constraint**
    - **Property 25: Reservation Filtering by Status**
    - **Property 26: Reservation List Chronological Ordering**
    - **Validates: Requirements 12.2, 12.3, 12.6, 12.7**
    - Test all required fields are displayed
    - Test status values are constrained to valid set
    - Test filtering works correctly
    - Test chronological ordering

  - [ ] 11.3 Create Reservations API endpoints
    - Implement `app/api/reservations/route.ts` GET endpoint with pagination, filtering
    - Implement `app/api/reservations/[id]/route.ts` PATCH endpoint for status updates and DELETE endpoint for deletion
    - Add authentication checks with NextAuth
    - Validate status values: pending, in-progress, completed
    - Reject invalid status with error message
    - Update database and return updated reservation
    - Handle concurrent updates (last-write-wins)
    - _Requirements: 12.4, 12.5, 15.2, 15.5, 15.6_

  - [ ]* 11.4 Write property tests for reservation status updates
    - **Property 18: Reservation Status Update**
    - **Property 19: Invalid Status Rejection**
    - **Validates: Requirements 12.4, 12.5**
    - Test valid status values update correctly
    - Test invalid status values are rejected

  - [ ] 11.5 Create Reservations management page
    - Implement `app/(admin)/reservations/page.tsx`
    - Use ReservationTable component
    - Fetch data from API with pagination and filters
    - Handle status update submissions
    - Display loading states and error messages
    - _Requirements: 12.1, 12.2, 12.3_

- [ ] 12. Implement inquiry management in admin dashboard
  - [ ] 12.1 Build Inquiry Table component
    - Create `components/admin/InquiryTable.tsx` with pagination
    - Display row columns: status, name, phone, 접수일(submission timestamp); expandable detail (down-arrow) revealing service type(제작 종류), industry(업종), additional requests(추가요청사항)
    - Show 50 inquiries per page
    - Sort by timestamp (most recent first)
    - Add per-row controls: 완료 / 진행중 / 삭제(delete), applied in real time
    - Implement status filter: 전체, 대기, 진행중, 완료
    - Include real-time updates via polling (5-second interval)
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 15.4_

  - [ ]* 12.2 Write property tests for inquiry display
    - **Property 27: Inquiry Display Completeness**
    - **Property 28: Inquiry Status Value Constraint**
    - **Property 29: Inquiry List Chronological Ordering**
    - **Property 21: Inquiry Auto-Status Update**
    - **Validates: Requirements 13.2, 13.3, 13.4, 13.5**
    - Test all fields displayed correctly
    - Test status values constrained properly
    - Test chronological ordering
    - Test auto status update on selection

  - [ ] 12.3 Create Inquiries API endpoints
    - Implement `app/api/inquiries/route.ts` GET endpoint with pagination
    - Implement `app/api/inquiries/[id]/route.ts` PATCH endpoint for status updates and DELETE endpoint for deletion
    - Validate status values: pending, in-progress, completed
    - Handle empty inquiry list case
    - _Requirements: 13.5, 13.6, 13.9_

  - [ ] 12.4 Create Inquiries management page
    - Implement `app/(admin)/inquiries/page.tsx`
    - Use InquiryTable component
    - Fetch data from API with pagination
    - Handle status updates and selection events
    - Display "no inquiries available" message when empty
    - _Requirements: 13.1, 13.7_

- [ ] 13. Build success case content management
  - [ ] 13.1 Create Success Case Form component
    - Implement `components/admin/SuccessCaseForm.tsx`
    - Include fields: title (max 100), description (max 2000), image upload
    - Add character counters showing remaining characters
    - Implement image preview
    - Validate file type (JPEG, PNG, WebP) and size (max 5MB)
    - Run prohibited content validation on title and description
    - Add publish/unpublish toggle
    - Show confirmation dialog before delete
    - _Requirements: 16.1, 16.2, 16.3, 16.7_

  - [ ]* 13.2 Write property tests for success case validation
    - **Property 24: Success Case Required Field Validation**
    - **Property 31: Image Format Validation**
    - **Property 32: Image Size Validation**
    - **Property 34: Character Counter Accuracy**
    - **Validates: Requirements 16.2, 16.3, 16.4**
    - Test required field validation
    - Test image format and size validation
    - Test character counter calculations

  - [ ] 13.3 Create image upload API endpoint
    - Implement `app/api/upload/route.ts` POST endpoint
    - Use Vercel Blob `put()` function to upload images
    - Validate file type and size
    - Return Vercel Blob URL
    - Handle upload errors
    - _Requirements: 16.2_

  - [ ] 13.4 Create Success Cases API endpoints
    - Implement `app/api/success-cases/route.ts` GET and POST endpoints
    - GET: Fetch published cases for public, all cases for admin
    - POST: Create new success case with prohibited content validation
    - Implement `app/api/success-cases/[id]/route.ts` PATCH and DELETE endpoints
    - PATCH: Update success case with validation
    - DELETE: Delete success case and associated image from Vercel Blob
    - Return specific error messages for prohibited content (specify field)
    - _Requirements: 16.4, 16.5, 16.6, 18.2, 18.3, 18.5_

  - [ ]* 13.5 Write property tests for content filtering
    - **Property 28: Prohibited Content Detection and Rejection**
    - **Property 29: Success Case Gallery Content Filtering**
    - **Property 30: Prohibited Content Error Field Specification**
    - **Validates: Requirements 18.2, 18.3, 18.4, 18.5**
    - Generate random content with and without prohibited keywords
    - Test detection and rejection works correctly
    - Test only compliant content appears in public gallery

  - [ ] 13.6 Create Success Cases management pages
    - Implement `app/(admin)/success-cases/page.tsx` with list of all cases
    - Create `app/(admin)/success-cases/new/page.tsx` with SuccessCaseForm for creation
    - Create `app/(admin)/success-cases/[id]/edit/page.tsx` for editing
    - Display success/error confirmation messages
    - Handle image upload workflow: upload → get URL → save with form data
    - _Requirements: 16.1, 16.6, 16.8, 16.9_

  - [ ]* 13.7 Write property test for success case publication
    - **Property 36: Success Case Confirmation on Successful Save**
    - **Validates: Requirements 16.9**
    - Test confirmation message displays on successful save/publish

- [ ] 14. Implement Excel export functionality
  - [ ] 14.1 Create Excel export utility functions
    - Implement `lib/excel-export.ts` using SheetJS (xlsx library)
    - Create function to generate .xlsx from reservation data with columns: date, time, service type, name, phone, industry, additional requests, status, submission timestamp
    - Create function to generate .xlsx from inquiry data with columns: name, phone, service type, industry, additional requests, submission timestamp, status
    - Create a combined export function ("전체 엑셀 다운로드") producing a single .xlsx with separate "Reservations" and "Inquiries" sheets
    - Set 30-second timeout for export generation
    - _Requirements: 14.4, 14.5, 14.6, 14.8_

  - [ ]* 14.2 Write property tests for Excel export completeness
    - **Property 22: Reservation Excel Export Completeness**
    - **Property 23: Inquiry Excel Export Completeness**
    - **Validates: Requirements 14.3, 14.4**
    - Generate random datasets of reservations and inquiries
    - Test exported Excel files contain all records with correct columns

  - [ ] 14.3 Create Excel export API endpoints
    - Implement `app/api/reservations/export/route.ts` GET endpoint
    - Implement `app/api/inquiries/export/route.ts` GET endpoint
    - Implement `app/api/export/route.ts` GET endpoint for the combined "전체 엑셀 다운로드"
    - Fetch all records from database
    - Generate Excel file using utility functions
    - Return binary .xlsx file with proper headers
    - Handle timeout errors with message: "Export is taking longer than expected"
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 14.8, 14.9_

  - [ ] 14.4 Build Export Button component
    - Create `components/admin/ExportButton.tsx`
    - Show loading state during export generation
    - Trigger file download on completion
    - Display error messages for timeout or failures
    - _Requirements: 14.1, 14.2_

  - [ ] 14.5 Add export buttons to admin pages
    - Add ExportButton to Reservations page for reservation export
    - Add ExportButton to Inquiries page for inquiry export
    - Add a combined "전체 엑셀 다운로드" button to the dashboard for exporting reservations and inquiries together
    - _Requirements: 14.1, 14.2, 14.3_

- [ ] 15. Add SEO optimization and metadata
  - [ ] 15.1 Configure meta tags for all public pages
    - Add unique meta title (30-60 chars) to each page: Home, Services, Pricing, Success Cases, Booking, Free Diagnosis, Landing
    - Add unique meta description (120-160 chars) to each page
    - Verify no duplicate titles across pages
    - Include WEFLOW keywords in visible content
    - _Requirements: 17.1, 17.2, 17.3, 17.4_

  - [ ]* 15.2 Write property tests for SEO metadata
    - **Property 25: Meta Title Length Constraint**
    - **Property 26: Meta Description Length Constraint**
    - **Property 27: Meta Title Uniqueness**
    - **Validates: Requirements 17.1, 17.2, 17.3**
    - Test all meta titles and descriptions meet length requirements
    - Test all meta titles are unique across pages

  - [ ] 15.3 Generate XML sitemap
    - Create sitemap generation logic in `app/sitemap.ts`
    - Include all public page URLs
    - Make sitemap accessible at `/sitemap.xml`
    - _Requirements: 17.5_

  - [ ] 15.4 Implement semantic HTML structure
    - Use semantic tags: header, nav, main, article, section, footer
    - Ensure proper document outline
    - Verify DOM renders within 3 seconds
    - _Requirements: 17.6, 17.7_

- [ ] 16. Build marketing landing page
  - [ ] 16.1 Create marketing landing page
    - Implement `app/(public)/landing/page.tsx` distinct from home page
    - Display service tier information: Landing Page, Homepage, or Master Premium with pricing
    - Include call-to-action button for booking
    - Include call-to-action button for free diagnosis
    - Add contact links to at least one external platform (KakaoTalk, Blog, etc.)
    - Add a right-side sticky free-diagnosis inquiry form (name, phone, service type, industry, additional requests, consent checkbox, "무료진단 후 견적받기" submit) that creates an Inquiry appearing in the admin dashboard
    - Add hero (headline + subtext + "무료 진단 후 견적받기"/"실제 제작 성공 보기" buttons → inquiry form)
    - Add "WEFLOW CARE PLAN" section with 5 benefit blocks (빠른 제작 진행 / 합리적인 비용 / 24시간 상담 가능 / 제작 후 운영 관리 / 광고 연동 지원)
    - Add "문의 증가 구조 설계" section (업종별 고객 흐름 분석 / 상담 버튼 위치 최적화 / 모바일 문의 동선 구성)
    - Reuse the 8 pricing cards, the 6-step 제작진행과정, the free-diagnosis "이런 걸 확인해드립니다" box + button, the full testimonials section, and the footer
    - Apply responsive design for mobile and desktop
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.9, 20.10, 20.11, 20.12, 20.13, 20.14_

  - [ ] 16.2 Wire up CTA button navigation
    - Link booking CTA to booking page
    - Link free diagnosis CTA to Free Diagnosis page
    - Verify navigation works correctly
    - _Requirements: 20.5, 20.6_

- [ ] 17. Implement responsive design finalization
  - [ ] 17.1 Test and fix mobile layout (320-767px)
    - Verify single-column layout
    - Test text rendering without overflow
    - Test image scaling without distortion
    - Verify sticky bottom navigation displays correctly
    - Test touch interactions respond within 100ms
    - _Requirements: 10.1, 10.4, 10.5, 10.6_

  - [ ]* 17.2 Write property tests for responsive rendering
    - **Property 18: Responsive Text Rendering Without Overflow**
    - **Property 19: Responsive Image Scaling Without Distortion**
    - **Validates: Requirements 10.4, 10.5**
    - Test various viewport widths and content sizes
    - Test no horizontal scrolling or overflow occurs

  - [ ] 17.3 Test and fix tablet layout (768-1023px)
    - Verify two-column layout
    - Test navigation menu tablet adaptation
    - Verify sticky bottom nav hidden
    - _Requirements: 10.2_

  - [ ] 17.4 Test and fix desktop layout (1024px+)
    - Verify multi-column layout
    - Test horizontal navigation menu
    - Verify responsive breakpoint transitions within 500ms
    - _Requirements: 10.3, 10.7_

- [ ] 18. Configure external platform integration links
  - [ ] 18.1 Add external platform links throughout site
    - Ensure all external links (KakaoTalk, Blog, Instagram, Facebook) open in new tab with `target="_blank"`
    - Add phone contact link using `tel:010-2971-7280` protocol
    - Verify link URLs: http://pf.kakao.com/_xntCbX, https://m.blog.naver.com/weflowlab, https://www.instagram.com/weflowlab.kr, https://www.facebook.com/profile.php?id=61590187124682
    - Test phone link initiates call on mobile devices
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

  - [ ]* 18.2 Write property test for external link behavior
    - **Property 16: External Platform Links Open in New Tab**
    - **Validates: Requirements 8.6**
    - Test all external platform links have `target="_blank"` attribute

- [ ] 19. Implement real-time updates for admin dashboard
  - [ ] 19.1 Add polling mechanism for reservations and inquiries
    - Implement polling with 5-second intervals in ReservationTable and InquiryTable
    - Fetch latest data from API on each poll
    - Update display without page refresh
    - Handle network reconnection: sync data within 5 seconds of reconnection
    - Show new reservations within 5 seconds of creation
    - Show new inquiries within 5 seconds of submission
    - _Requirements: 15.1, 15.3, 15.4, 15.7_

  - [ ] 19.2 Test concurrent modification handling
    - Verify last-write-wins behavior when multiple admins modify same record
    - Test status update failures display error and revert to previous value
    - Ensure all admins see most recently saved version
    - _Requirements: 15.2, 15.5, 15.6_

- [ ] 20. Final integration and end-to-end testing
  - [ ] 20.1 Create database seed script
    - Create initial admin user with hashed password
    - Seed prohibited keywords list for content filtering
    - Add sample testimonials and success cases for demo
    - _Requirements: 11.1_

  - [ ] 20.2 Test complete booking workflow
    - Select date → select time → fill contact form → submit → verify confirmation
    - Test booking appears in admin dashboard within 5 seconds
    - Test admin can update reservation status
    - Verify status update reflects in database

  - [ ] 20.3 Test complete inquiry workflow
    - Submit free diagnosis form → verify inquiry created
    - Login to admin → view inquiry → change status (대기 → 진행중 → 완료)
    - Verify status updates and deletion persist correctly in real time

  - [ ] 20.4 Test success case publication workflow
    - Admin creates success case → upload image → add title/description → publish
    - Verify case appears in public gallery within 5 seconds
    - Test detail view displays correctly
    - Test prohibited content validation prevents save

  - [ ] 20.5 Test Excel export functionality
    - Create several reservations and inquiries
    - Export reservations to Excel → verify all columns and data present
    - Export inquiries to Excel → verify all columns and data present
    - Test timeout handling with large datasets (simulate if needed)

  - [ ] 20.6 Verify responsive design across devices
    - Test on mobile viewport (375px, 414px widths)
    - Test on tablet viewport (768px, 820px widths)
    - Test on desktop viewport (1024px, 1440px widths)
    - Verify sticky bottom nav shows/hides correctly
    - Verify all interactive elements work on touch devices

  - [ ] 20.7 Test authentication and session management
    - Test successful login with valid credentials
    - Test login rejection with invalid credentials
    - Test account lockout after 5 failed attempts
    - Test session timeout after 30 minutes of inactivity
    - Test unauthenticated redirect to login page

- [ ] 21. Checkpoint - Final verification before deployment
  - Ensure all tests pass (unit tests and property tests)
  - Verify no console errors on any page
  - Test all navigation links work correctly
  - Verify all forms validate and submit properly
  - Test admin dashboard with sample data
  - Confirm real-time polling works correctly
  - Ask the user if questions arise

- [ ] 22. Prepare for Vercel deployment
  - [ ] 22.1 Configure environment variables
    - Document required environment variables in `.env.example`
    - Set up Vercel environment variables: DATABASE_URL, POSTGRES_PRISMA_URL, POSTGRES_URL_NON_POOLING, NEXTAUTH_URL, NEXTAUTH_SECRET, BLOB_READ_WRITE_TOKEN, ADMIN_USERNAME, ADMIN_PASSWORD_HASH
    - _Requirements: All deployment-related requirements_

  - [ ] 22.2 Configure Vercel project settings
    - Set framework preset to Next.js
    - Configure build command: `prisma generate && next build`
    - Set Node version to 18.x or later
    - Connect Vercel Postgres database
    - Enable Vercel Blob storage
    - _Requirements: All deployment-related requirements_

  - [ ] 22.3 Run Prisma migrations
    - Generate initial migration: `prisma migrate dev --name init`
    - Deploy migration to Vercel Postgres: `prisma migrate deploy`
    - Verify all database tables created correctly
    - Run seed script to create initial admin user and data
    - _Requirements: Database setup requirements_

  - [ ] 22.4 Deploy to Vercel and verify production
    - Deploy application to Vercel
    - Verify all environment variables set correctly
    - Test production build locally first: `next build && next start`
    - Verify production URL loads correctly
    - Test critical user flows in production environment
    - Monitor for any serverless function errors
    - _Requirements: All functional requirements_

## Notes

- **Tasks marked with `*` are optional** property-based test sub-tasks. These validate universal correctness properties and can be skipped for faster MVP delivery, but provide strong guarantees about system behavior across all inputs.
- **Core implementation tasks are NOT optional** and must be completed for the platform to function correctly.
- **Each task references specific requirements** from the requirements document for traceability back to business needs.
- **Property-based tests use fast-check library** with minimum 100 iterations per property to ensure comprehensive coverage across random inputs.
- **Checkpoints ensure incremental validation** - pause at checkpoints to verify progress and ask user if questions or issues arise.
- **The tasks are organized by functional area** (infrastructure, public website, admin dashboard, integration) to enable logical progression through implementation.
- **Testing strategy combines unit tests, property tests, and integration tests** - property tests validate universal properties, unit tests validate specific examples and edge cases.
- **Real-time updates use polling approach** with 5-second intervals rather than WebSockets for simpler serverless deployment.
- **All authentication and authorization logic** uses NextAuth.js with session-based authentication and middleware-based route protection.
- **Content validation prevents prohibited content** from being saved or displayed in success cases using keyword detection.
- **Responsive design follows mobile-first approach** with Tailwind CSS breakpoints at 768px (mobile/desktop boundary) and 1024px (tablet/desktop boundary).
- **Deployment uses Vercel's serverless architecture** with automatic connection pooling via Vercel Postgres and Vercel Blob for file storage.

## Task Dependency Graph

```json
{
  "waves": [
    {
      "id": 0,
      "tasks": ["1.1", "1.2"]
    },
    {
      "id": 1,
      "tasks": ["1.3", "1.4", "1.6"]
    },
    {
      "id": 2,
      "tasks": ["1.5", "1.7", "3.1", "3.2"]
    },
    {
      "id": 3,
      "tasks": ["3.3", "3.4", "3.5", "4.1", "4.2"]
    },
    {
      "id": 4,
      "tasks": ["4.3", "4.4", "4.5", "5.1", "5.2"]
    },
    {
      "id": 5,
      "tasks": ["5.3", "6.1"]
    },
    {
      "id": 6,
      "tasks": ["6.2", "6.3"]
    },
    {
      "id": 7,
      "tasks": ["6.4", "7.1"]
    },
    {
      "id": 8,
      "tasks": ["7.2", "7.3"]
    },
    {
      "id": 9,
      "tasks": ["7.4"]
    },
    {
      "id": 10,
      "tasks": ["7.5", "8.1"]
    },
    {
      "id": 11,
      "tasks": ["8.2", "8.3", "8.4"]
    },
    {
      "id": 12,
      "tasks": ["8.5", "10.1", "10.2"]
    },
    {
      "id": 13,
      "tasks": ["10.3", "11.1"]
    },
    {
      "id": 14,
      "tasks": ["11.2", "11.3"]
    },
    {
      "id": 15,
      "tasks": ["11.4", "11.5", "12.1"]
    },
    {
      "id": 16,
      "tasks": ["12.2", "12.3", "12.4", "13.1"]
    },
    {
      "id": 17,
      "tasks": ["13.2", "13.3", "13.4"]
    },
    {
      "id": 18,
      "tasks": ["13.5", "13.6"]
    },
    {
      "id": 19,
      "tasks": ["13.7", "14.1"]
    },
    {
      "id": 20,
      "tasks": ["14.2", "14.3", "14.4", "14.5"]
    },
    {
      "id": 21,
      "tasks": ["15.1"]
    },
    {
      "id": 22,
      "tasks": ["15.2", "15.3", "15.4", "16.1"]
    },
    {
      "id": 23,
      "tasks": ["16.2", "17.1"]
    },
    {
      "id": 24,
      "tasks": ["17.2", "17.3", "17.4", "18.1"]
    },
    {
      "id": 25,
      "tasks": ["18.2", "19.1", "19.2"]
    },
    {
      "id": 26,
      "tasks": ["20.1", "20.2", "20.3", "20.4", "20.5", "20.6", "20.7"]
    },
    {
      "id": 27,
      "tasks": ["22.1", "22.2"]
    },
    {
      "id": 28,
      "tasks": ["22.3"]
    },
    {
      "id": 29,
      "tasks": ["22.4"]
    }
  ]
}
```
