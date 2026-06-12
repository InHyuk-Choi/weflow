# Requirements Document

## Introduction

The WEFLOW Website Platform is a comprehensive web service that provides landing page and homepage creation services with integrated advertising and operational management capabilities. The platform consists of a public-facing multi-page website showcasing services, pricing, and success cases, along with an administrative dashboard for managing reservations, inquiries, and content. The system enables customers to book services, request free diagnoses, and view case studies, while administrators can track reservations, manage inquiries, and export data.

## Glossary

- **WEFLOW_Platform**: The complete web application including public website and admin dashboard
- **Public_Website**: The customer-facing website with service information, booking, and contact forms
- **Admin_Dashboard**: The authenticated administrative interface for managing reservations and inquiries
- **Reservation**: A booking request for WEFLOW services with date, time, and service type
- **Inquiry**: A contact form submission from the Free Diagnosis page or general contact forms
- **Success_Case**: A portfolio item showcasing completed client projects
- **Service_Tier**: A pricing plan option (Landing Page, Homepage, Master Premium, or Care Plans)
- **Calendar_Interface**: The date and time slot selection component for booking
- **Status_Tracking**: The system for monitoring reservation states (pending, in-progress, completed)
- **External_Integration**: Links to third-party platforms (KakaoTalk, Instagram, Blog, Facebook)
- **Sticky_Navigation**: The fixed bottom navigation bar always visible on mobile devices
- **Excel_Export**: The functionality to download reservation and inquiry data as spreadsheet files
- **Authentication_System**: The login mechanism protecting the Admin_Dashboard
- **Responsive_Design**: The adaptive layout system for mobile and desktop devices
- **SEO_Optimization**: Search engine optimization features for discoverability

## Requirements

### Requirement 1: Public Website Navigation Structure

**User Story:** As a visitor, I want to navigate between different pages of the website, so that I can find information about WEFLOW services.

#### Acceptance Criteria

1. THE Public_Website SHALL provide a navigation menu with links to Home, Services, Pricing, Success Cases, Booking, and Free Diagnosis pages
2. THE Public_Website SHALL display the WEFLOW logo at the front of the navigation header (before the menu categories), and WHEN a visitor clicks the logo, THE Public_Website SHALL navigate to the WEFLOW site (home)
3. WHEN a visitor clicks a navigation link, THE Public_Website SHALL load the corresponding page within 3 seconds
4. THE Public_Website SHALL display identical navigation menu items, logo position, and link order across all pages
5. WHILE viewport width is 768 pixels or less, THE Public_Website SHALL display the navigation menu in a single-column vertical layout
6. IF a navigation link fails to load within 3 seconds, THEN THE Public_Website SHALL display an error message indicating the page is unavailable
7. WHILE a visitor is viewing a page, THE Public_Website SHALL visually distinguish the corresponding navigation link from other navigation links

### Requirement 2: Home Page Content Display

**User Story:** As a visitor, I want to view the home page with key information, so that I can understand WEFLOW's value proposition.

#### Acceptance Criteria

1. THE Public_Website SHALL display a hero banner on the home page containing a small eyebrow line ("랜딩&홈페이지 제작 · 광고 운영 · 검색 상단 노출 · 맞춤형 웹 솔루션"), a two-line headline that does not break mid-word ("문의로 이어지는 홈페이지를 만듭니다"), a supporting subtext ("홈페이지 제작부터 광고 연동·운영 관리까지 / 단순 제작이 아닌 문의 구조까지 설계합니다")
2. THE hero banner SHALL display three blue, shadowed call-to-action buttons: "무료 진단 신청" (→ Free Diagnosis page), "성공 사례 보기" (→ Success Cases), and "WEFLOW 랜딩 페이지" (→ Marketing Landing Page)
3. THE Public_Website SHALL display a care-plan benefits area on the home page containing three small fixed-width boxes ("케어 플랜(제작·광고·운영)", "빠른제작(3일~7일)", "합리적 비용(가성비+퀄리티)") and a long 6-cell box ("weflow 케어플랜", "제작+운영+광고+관리 원터치", "빠른 제작(3~7일 로켓배송)", "합리적인 가성비", "24시간 상담대기(빠른 상담 및 피드백)", "운영·광고 지원(사후관리서비스)")
4. THE Public_Website SHALL display a 4-step delivery flow on the home page: 고객 의뢰 → 접수 후 제작 → 3~7일 배송 완료 → 광고 및 운영 사후 관리, each step with its own image
5. THE Public_Website SHALL display a success-cases section with a left copy box ("다양한 업종의 성공 사례를 확인하세요." + subtext, and a "살펴보기→" button navigating to the Free Diagnosis page) and a right area of 5 success-case images with a "더보기" link at the top-right (navigating to the Success Cases page)
6. THE Public_Website SHALL display, placed side by side, a "제작 진행 과정" vertical box of 4 cells (고객 상담 / 협의 후 제작 / 3~7일 완료 / 광고 및 운영 사후 관리) and a "6단계 제작 프로세스" vertical box of 6 cells (01 상담·진단 / 02 기획·설계 / 03 디자인 / 04 개발·제작 / 05 SEO 최적화 / 06 광고운영·사후관리)
7. THE Public_Website SHALL display a free-diagnosis section ("무료진단 받기" headline, subtext) containing a box with the four items ✓ 문의 구조 진단, ✓ 디자인 점검, ✓ 검색 노출 분석, ✓ 문의 개선 제안, and a "무료진단 후 견적 받기" button navigating to the Free Diagnosis page
8. THE Public_Website SHALL present a service overview section on the home page containing descriptions of at least three service offerings
9. THE Public_Website SHALL present at least 5 customer testimonials on the home page in a continuously auto-scrolling horizontal marquee of 2 rows, each testimonial containing customer name, star rating (5 stars), and testimonial text
10. WHILE testimonials are displayed, THE Public_Website SHALL automatically scroll the testimonial rows horizontally without requiring user interaction, and SHALL loop seamlessly back to the start when the end is reached
11. THE Public_Website SHALL display a "후기 더보기" (View More Reviews) control at the top-right of the testimonial section
12. WHEN a visitor clicks the "후기 더보기" control, THE Public_Website SHALL navigate to the Free Diagnosis / inquiry page

### Requirement 3: Services Page Information

**User Story:** As a visitor, I want to view detailed service process information, so that I can understand how WEFLOW delivers their services.

#### Acceptance Criteria

1. THE Public_Website SHALL display a services page with process breakdown information
2. THE Public_Website SHALL present each process step with a description of at least 50 characters
3. THE Public_Website SHALL organize service information in numbered sequential order from step 1 to the final step
4. THE Public_Website SHALL include at least one visual element per process step
5. THE services page SHALL present the 6-step "제작진행과정" with the following titles and descriptions: 01 상담·진단 (업종 및 제작 방향 확인), 02 기획·설계 (문의 구조 및 전략 설계), 03 디자인 (브랜드 맞춤 화면 구성), 04 개발·테스트 (기능 구현, 최적화, 검수 및 수정 진행), 05 SEO 상단등록 (네이버·구글·사이트맵 등록), 06 광고운영·사후관리 (인스타·블로그·스레드·네이버 키워드 광고 운영관리)
6. THE services page SHALL present an "광고 운영·사후관리 시스템" section listing: 블로그 업로드, 인스타 업로드, 스레드 업로드, 네이버 키워드 업로드, 당근플레이스 키워드 업로드, 네이버 서치어드바이저 상단등록, 구글 콘솔 상단등록, 사이트맵 등록

### Requirement 4: Pricing and Plans Display

**User Story:** As a visitor, I want to view pricing options, so that I can choose a service tier that fits my needs.

#### Acceptance Criteria

1. WHEN the pricing page is loaded, THE Public_Website SHALL display a "START 랜딩페이지" tier with current price ₩249,000 and original price ₩498,000, and the feature list: 랜딩페이지 1페이지, 3~4일 빠른 제작기간, 반응형 제작(PC/모바일), 문의폼 연동, 기본 SEO 설정
2. WHEN the pricing page is loaded, THE Public_Website SHALL display a "GROW 홈페이지" tier with current price ₩990,000 and original price ₩1,980,000, and the feature list: 홈페이지 5페이지, 1주 빠른 제작기간, 반응형 제작(PC/모바일), 문의폼 연동, 카카오톡 상담연동, 기본 SEO 설정
3. WHEN the pricing page is loaded, THE Public_Website SHALL display a "MASTER 프리미엄" tier with current price ₩1,490,000 and original price ₩2,980,000, and the feature list: 홈페이지 + 랜딩페이지, 1~2주 빠른 제작기간, 반응형 제작(PC/모바일), 프리미엄 디자인, 예약·문의 시스템, SEO 최적화, 광고 전환 구조 설계
4. WHEN the pricing page is loaded, THE Public_Website SHALL display Care Plan options with monthly subscription labels, the following prices (each rendered as a two-line discounted price — original price de-emphasized above, current price emphasized below), and the following feature lists:
   - WE CARE (기본 관리 플랜): current ₩89,000/month (from ₩170,000); 유지보수(월 수정) 월 1회, 블로그 월 1개, 인스타 월 4회(주 1회), 스레드 월 4회(주 1회), SEO 상단등록
   - FLOW CARE (성장 관리 플랜): current ₩189,000/month (from ₩378,000); 유지보수 월 3회, 인스타 월 8회(주 2회), 스레드 월 8회(주 2회), 블로그 월 2회, 네이버 키워드 세팅 할인(₩149,000→₩79,000), 당근 키워드 광고 세팅 50% 할인(₩79,000→₩39,000), 문의 개선, SEO 상단 등록
   - WEFLOW CARE (올인원 관리 플랜): current ₩339,000/month (from ₩678,000); 유지보수 무제한, 블로그 월 4회(주 1회), 인스타 월 12회(주 3회), 스레드 월 12회(주 3회), 네이버 키워드/당근 플레이스 광고 세팅 무료, 월 성과 체크, 랜딩 개선, 광고관리, SEO 최적화
5. WHEN the pricing page is loaded, THE Public_Website SHALL display advertising setup options with the following prices (each rendered as a two-line discounted price) and feature lists:
   - 네이버 광고 (키워드 셋팅): current ₩149,000 (from ₩298,000); 키워드 분석, 광고 세팅 지원, 광고 문구 제작, 문의 구조 연결, 채널 연동 지원, 성과 최적화
   - 당근 플레이스 광고 (키워드 셋팅): current ₩79,000 (from ₩158,000); 지역 키워드 분석, 광고 세팅 지원, 광고 문구 제작, 지역 타겟 설정, 랜딩 연결 지원, 성과 최적화
6. THE Public_Website SHALL render every Service_Tier price (Landing Page, Homepage, Master Premium, and all Care/advertising options) as a two-line discounted price emphasizing a markdown from the original price to the current price
7. THE Public_Website SHALL present the three one-time tiers (Landing Page, Homepage, Master Premium) and the three Care Plan tiers (WE Care, FLOW Care, WEFLOW Care) as required single-select (choose-1-of-3) card groups, each option displaying a checkmark (✓) indicator, laid out as a single vertical column of cards
8. THE Public_Website SHALL label one-time Service_Tier options with "One-Time Payment" or equivalent indicator
9. THE Public_Website SHALL label monthly subscription Service_Tier options with "Monthly Subscription" or equivalent indicator
10. WHEN the pricing page is loaded, THE Public_Website SHALL visually differentiate WE Care, FLOW Care, and WEFLOW Care as separate subscription tiers, and SHALL visually emphasize the Master Premium tier and the WEFLOW Care tier with a distinct color and a crown indicator
11. THE Public_Website SHALL display, below the prices, the notices: "VAT 포함" (VAT included) for each price, that the domain is registered under the customer's name with domain cost charged separately while WEFLOW provides registration and connection setup for free, that advertising spend is paid directly by the customer through the customer's own account and payment method (WEFLOW performs operation and setup only), and that maintenance covers minor edits (text, image, link) while page additions and feature development may incur separate costs

### Requirement 5: Success Cases Gallery

**User Story:** As a visitor, I want to browse completed project examples, so that I can evaluate WEFLOW's work quality.

#### Acceptance Criteria

1. THE Public_Website SHALL display a success cases gallery page
2. WHEN a Success_Case is published, THE Public_Website SHALL display it in the gallery within 5 seconds
3. THE Public_Website SHALL present each Success_Case in the gallery with a thumbnail image and case title
4. THE Public_Website SHALL organize Success_Cases in a grid layout with 4 cases per row on desktop viewports (1024px width or greater) and 1 case per row on mobile viewports (767px width or less)
5. WHEN a visitor clicks a Success_Case in the gallery, THE Public_Website SHALL display a detail view containing full-size image and text description
6. WHEN no Success_Cases are published, THE Public_Website SHALL display a message indicating no cases are available
7. WHEN a visitor is viewing a Success_Case detail view, THE Public_Website SHALL provide a control to return to the gallery view

### Requirement 6: Calendar-Based Booking System

**User Story:** As a visitor, I want to book a service appointment, so that I can schedule a consultation with WEFLOW.

#### Acceptance Criteria

1. THE Public_Website SHALL provide a booking page with a vertically-oriented Calendar_Interface
2. THE Calendar_Interface SHALL display available dates from the current date through 90 days in the future
3. WHEN a visitor selects a date, THE Calendar_Interface SHALL display exactly 20 time slots at 30-minute intervals from 09:00 through 18:30 inclusive, arranged in a grid of 5 columns by 4 rows
4. WHILE the selected date is the current date, THE Calendar_Interface SHALL disable (make non-selectable) every time slot whose start time is earlier than the current time
5. THE Calendar_Interface SHALL additionally provide a free-text field allowing the visitor to directly enter a desired time ("원하시는 시간대 직접 입력")
6. WHEN a visitor selects a time slot, THE Public_Website SHALL display a form requiring name (maximum 100 characters) and phone number (maximum 20 characters), and accepting service type, industry field (maximum 100 characters), and additional requests (maximum 2000 characters)
7. THE booking form SHALL provide service type options: Landing Page (랜딩페이지 제작), Homepage (홈페이지 제작), Landing & Homepage (랜딩&홈페이지 제작), and Other / WEFLOW Care Plan (기타·WEFLOW 케어플랜)
8. IF any required contact field (name, phone number) is empty, THEN THE Public_Website SHALL display an error message indicating which fields are invalid and SHALL NOT submit the booking
9. THE booking form SHALL include a checkbox for visitor consent to personal information collection and use, which must be checked before submission is allowed
10. WHEN a visitor submits valid booking information, THE WEFLOW_Platform SHALL create a Reservation with status "pending" (대기)
11. WHEN a Reservation is created, THE WEFLOW_Platform SHALL store the date, time, service type (Landing Page, Homepage, Landing & Homepage, or Other/WEFLOW Care Plan), name, phone number, industry field, and additional requests
12. WHEN a Reservation is successfully created, THE Public_Website SHALL display a confirmation message containing the reservation date, time, and service type, AND THE Reservation SHALL appear in the Admin_Dashboard reservation list within 5 seconds
13. THE Calendar_Interface SHALL display a date as available IF at least one time slot on that date has no confirmed or pending Reservation
14. THE Calendar_Interface SHALL display a time slot as available IF it has no confirmed or pending Reservation for the selected date
15. IF a visitor attempts to submit a booking for a time slot that is no longer available, THEN THE WEFLOW_Platform SHALL reject the booking and THE Public_Website SHALL display an error message indicating the time slot is unavailable

### Requirement 7: Free Diagnosis Contact Form

**User Story:** As a visitor, I want to request a free diagnosis, so that I can get initial consultation about my needs.

#### Acceptance Criteria

1. THE Public_Website SHALL provide a Free Diagnosis page with a contact form
2. THE contact form SHALL accept visitor name (maximum 100 characters), phone number (maximum 20 characters), service type selection, industry field (maximum 100 characters), additional requests (maximum 1000 characters), and an optional email address (maximum 254 characters)
3. THE contact form SHALL require visitor name, phone number, service type, and industry field for submission (email address is optional)
4. WHEN a visitor submits the diagnosis form with all required fields completed, THE WEFLOW_Platform SHALL create an Inquiry record within 5 seconds, AND THE Inquiry SHALL appear in the Admin_Dashboard inquiry list within 5 seconds
5. WHEN an Inquiry is created, THE WEFLOW_Platform SHALL store submission timestamp, name, phone number, service type, industry field, additional requests, and email address if provided
6. WHEN an Inquiry is successfully created, THE Public_Website SHALL display a confirmation message to the visitor
7. IF an email address is provided AND its format is invalid, THEN THE contact form SHALL prevent submission and display an error message indicating invalid email format
8. IF phone number format is invalid, THEN THE contact form SHALL prevent submission and display an error message indicating invalid phone number format
9. IF any required field is empty, THEN THE contact form SHALL prevent submission and display an error message indicating which required fields are missing
10. THE contact form SHALL provide service type options: Landing Page, Homepage, Landing & Homepage, and Other (WEFLOW Care Plan)
11. IF Inquiry record creation fails, THEN THE Public_Website SHALL display an error message indicating the submission could not be completed and instruct the visitor to retry
12. THE contact form SHALL include a checkbox for visitor consent to personal information collection and use, which must be checked before submission is allowed

### Requirement 8: External Platform Integration Links

**User Story:** As a visitor, I want to access WEFLOW's social media and communication channels, so that I can connect through my preferred platform.

#### Acceptance Criteria

1. THE Public_Website SHALL provide a clickable link to KakaoTalk channel at http://pf.kakao.com/_xntCbX
2. THE Public_Website SHALL provide a clickable link to Blog at https://m.blog.naver.com/weflowlab
3. THE Public_Website SHALL provide a clickable link to Instagram at https://www.instagram.com/weflowlab.kr?igsh=b2c1eTdwbHo2bWRt (the bare profile URL https://www.instagram.com/weflowlab.kr resolves to the same destination and is acceptable)
4. THE Public_Website SHALL provide a clickable link to the Facebook page identified by id=61590187124682 (the canonical https://www.facebook.com/profile.php?id=61590187124682 is acceptable)
5. THE Public_Website SHALL provide a phone contact link using tel: protocol to 010-2971-7280
6. WHEN a visitor clicks a KakaoTalk, Blog, Instagram, or Facebook link, THE Public_Website SHALL open the link in a new browser tab
7. WHEN a visitor clicks the phone contact link, THE Public_Website SHALL initiate a phone call to 010-2971-7280 using the device's default phone application

### Requirement 9: Sticky Bottom Navigation Bar

**User Story:** As a visitor on any device, I want quick access to key actions, so that I can easily contact WEFLOW or request diagnosis.

#### Acceptance Criteria

1. THE Public_Website SHALL display a Sticky_Navigation bar at the bottom of the screen on every public page, at all viewport widths (mobile, tablet, and desktop), as a single horizontal row of 4 items
2. WHILE the Sticky_Navigation is displayed, THE Sticky_Navigation SHALL remain visible and fixed at the bottom of the viewport during page scrolling and across page navigation
3. THE Sticky_Navigation SHALL include a 24-hour consultation button
4. THE Sticky_Navigation SHALL include a KakaoTalk button
5. THE Sticky_Navigation SHALL include a Blog button
6. THE Sticky_Navigation SHALL include a Free Diagnosis button
7. WHEN a visitor clicks the 24-hour consultation button, THE Public_Website SHALL initiate a phone call to 010-2971-7280
8. WHEN a visitor clicks the KakaoTalk button, THE Public_Website SHALL navigate to http://pf.kakao.com/_xntCbX
9. WHEN a visitor clicks the Blog button, THE Public_Website SHALL navigate to https://m.blog.naver.com/weflowlab
10. WHEN a visitor clicks the Free Diagnosis button, THE Public_Website SHALL navigate to the Free Diagnosis page
11. IF navigation to any Sticky_Navigation target fails, THEN THE Public_Website SHALL display an error message indicating the navigation could not be completed

### Requirement 10: Responsive Design for Mobile and Desktop

**User Story:** As a visitor on any device, I want the website to display correctly, so that I can access information without layout issues.

#### Acceptance Criteria

1. WHILE viewport width is between 320 pixels and 767 pixels, THE Public_Website SHALL display content in a single-column vertical layout with full-width elements
2. WHILE viewport width is between 768 pixels and 1023 pixels, THE Public_Website SHALL display content in a two-column layout with navigation menu adapted for tablet viewing
3. WHILE viewport width is 1024 pixels or greater, THE Public_Website SHALL display content in a multi-column layout with horizontal navigation menu
4. THE Public_Website SHALL render all text without horizontal scrolling, cutting, or overflow on viewports with width between 320 pixels and 767 pixels
5. THE Public_Website SHALL render all images without cutting, distortion, or overflow on viewports with width between 320 pixels and 767 pixels by scaling images proportionally to fit viewport width
6. WHEN a visitor interacts with buttons, links, or form elements on viewports with width between 320 pixels and 767 pixels, THE Public_Website SHALL respond to the interaction within 100 milliseconds
7. WHEN viewport width changes from one breakpoint range to another, THE Public_Website SHALL adjust the layout to the appropriate configuration within 500 milliseconds

### Requirement 11: Admin Dashboard Authentication

**User Story:** As an administrator, I want to log in securely, so that I can access the admin dashboard.

#### Acceptance Criteria

1. THE WEFLOW_Platform SHALL provide a login page for the Admin_Dashboard accessible at a dedicated URL path
2. THE Authentication_System SHALL require username with length between 1 and 255 characters and password with length between 8 and 128 characters
3. WHEN valid credentials are provided, THE Authentication_System SHALL grant access to the Admin_Dashboard within 2 seconds
4. WHEN invalid credentials are provided, THE Authentication_System SHALL display an error message indicating incorrect username or password and deny access
5. WHEN empty username or empty password is submitted, THE Authentication_System SHALL display an error message indicating required fields are missing and deny access
6. THE Authentication_System SHALL maintain session state for authenticated administrators for 30 minutes of inactivity
7. WHEN an administrator's session exceeds 30 minutes of inactivity, THE Authentication_System SHALL terminate the session and redirect to the login page
8. WHEN 5 failed login attempts occur from the same username within 15 minutes, THE Authentication_System SHALL lock the account for 30 minutes
9. WHEN an unauthenticated user attempts to access any Admin_Dashboard page, THE WEFLOW_Platform SHALL redirect to the login page
10. THE Admin_Dashboard SHALL provide a logout control that, when clicked, terminates the administrator session and redirects to the login page
11. THE Admin_Dashboard SHALL provide a manual refresh control that re-fetches and re-renders the latest reservation and inquiry data on demand
12. THE Admin_Dashboard SHALL provide status filter tabs (대기 / 진행중 / 완료 / 전체) for both Reservations and Inquiries, with selections reflected in real time

### Requirement 12: Reservation Management in Admin Dashboard

**User Story:** As an administrator, I want to view and manage reservations, so that I can track customer bookings.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL display a paginated list of Reservations with 50 Reservations per page
2. THE Admin_Dashboard SHALL display in each Reservation row: status, name, phone number, submission date (접수일), and desired schedule (희망 일정), along with management controls
3. THE Admin_Dashboard SHALL provide an expand control (down-arrow) on each Reservation row that, when clicked, reveals the Reservation detail: service type (Landing Page, Homepage, Landing & Homepage, or Other/WEFLOW Care Plan), industry field, and additional requests
4. THE Admin_Dashboard SHALL display the current status for each Reservation as one of: pending (대기), in-progress (진행중), or completed (완료)
5. THE Admin_Dashboard SHALL provide per-Reservation management controls: a "완료" (complete), "진행중" (in-progress), and "삭제" (delete) action, each taking effect in real time
6. WHEN an administrator changes a Reservation status to a valid status value, THE Admin_Dashboard SHALL update the status in the database and reflect the change in the display within 3 seconds
7. WHEN an administrator clicks the delete action for a Reservation, THE Admin_Dashboard SHALL remove the Reservation and reflect the removal in the display in real time
8. IF an administrator attempts to change a Reservation status to an invalid value, THEN THE Admin_Dashboard SHALL display an error message and not update the status
9. THE Admin_Dashboard SHALL allow filtering Reservations by status value (pending, in-progress, completed, or all)
10. THE Admin_Dashboard SHALL display Reservations in chronological order with the most recent reservation date first

### Requirement 13: Inquiry Management in Admin Dashboard

**User Story:** As an administrator, I want to view and manage inquiries, so that I can respond to customer questions.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL display a paginated list of Inquiries with 50 Inquiries per page
2. THE Admin_Dashboard SHALL display in each Inquiry row: status, name, phone number, submission date (접수일), and management controls
3. THE Admin_Dashboard SHALL provide an expand control (down-arrow) on each Inquiry row that, when clicked, reveals the Inquiry detail: service type (제작 종류), industry field (업종), and additional requests (추가요청사항)
4. THE Admin_Dashboard SHALL display the current status for each Inquiry as one of: pending (대기), in-progress (진행중), or completed (완료)
5. THE Admin_Dashboard SHALL provide per-Inquiry management controls: a "완료" (complete), "진행중" (in-progress), and "삭제" (delete) action, each taking effect in real time
6. WHEN an administrator changes an Inquiry status or clicks the delete action, THE Admin_Dashboard SHALL update the database and reflect the change in the display in real time
7. THE Admin_Dashboard SHALL allow filtering Inquiries by status value (pending, in-progress, completed, or all)
8. THE Admin_Dashboard SHALL display Inquiries in chronological order with the most recent submission timestamp first
9. WHEN no Inquiries exist in the system, THE Admin_Dashboard SHALL display a message indicating no inquiries are available

### Requirement 14: Excel Export Functionality

**User Story:** As an administrator, I want to export reservation and inquiry data to Excel, so that I can analyze data offline.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL provide an Excel_Export button for Reservation data
2. THE Admin_Dashboard SHALL provide an Excel_Export button for Inquiry data
3. THE Admin_Dashboard SHALL provide a combined "전체 엑셀 다운로드" (Export All) button that exports both Reservation and Inquiry data together in a single .xlsx file in one action
4. WHEN an administrator clicks the Reservation Excel_Export button, THE Admin_Dashboard SHALL generate a .xlsx spreadsheet file containing all Reservation records with columns: date, time, service type, name, phone number, industry field, additional requests, status, and submission timestamp
5. WHEN an administrator clicks the Inquiry Excel_Export button, THE Admin_Dashboard SHALL generate a .xlsx spreadsheet file containing all Inquiry records with columns: name, phone number, service type, industry field, additional requests, submission timestamp, and status
6. WHEN an administrator clicks the combined "전체 엑셀 다운로드" button, THE Admin_Dashboard SHALL generate a single .xlsx file containing all Reservation records and all Inquiry records (on separate sheets or clearly separated sections)
7. WHEN Excel_Export file generation completes, THE Admin_Dashboard SHALL initiate a file download to the administrator's device
8. IF Excel_Export file generation exceeds 30 seconds, THEN THE Admin_Dashboard SHALL display an error message indicating export timeout
9. IF Excel_Export file generation fails, THEN THE Admin_Dashboard SHALL display an error message indicating the export could not be completed

### Requirement 15: Real-Time Status Updates

**User Story:** As an administrator, I want status changes to reflect immediately, so that I can see current operational state without refreshing.

#### Acceptance Criteria

1. WHEN an administrator changes a Reservation status, THE Admin_Dashboard SHALL update the display of the changed Reservation entry within 2 seconds without requiring page refresh
2. IF an administrator changes a Reservation status and the update fails, THEN THE Admin_Dashboard SHALL display an error message and revert the displayed status to the previous value
3. WHEN a new Reservation is created and an administrator is viewing the reservation list, THE Admin_Dashboard SHALL display the new Reservation within 5 seconds
4. WHEN a new Inquiry is submitted and an administrator is viewing the inquiry list, THE Admin_Dashboard SHALL display the new Inquiry within 5 seconds
5. WHEN multiple administrators view the same Reservation or Inquiry, THE Admin_Dashboard SHALL display the most recently saved version of the record's data for all administrators
6. WHEN two administrators modify the same Reservation or Inquiry simultaneously, THE Admin_Dashboard SHALL save the last modification submitted (last-write-wins)
7. WHEN an administrator's network connection is lost and then restored, THE Admin_Dashboard SHALL synchronize displayed data with the server within 5 seconds of reconnection

### Requirement 16: Success Case Content Management

**User Story:** As an administrator, I want to manage success case content, so that I can showcase completed projects.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL provide an interface for creating Success_Cases with input fields for case title (maximum 100 characters), text description (maximum 2000 characters), and image upload
2. THE Admin_Dashboard SHALL accept image uploads in JPEG, PNG, or WebP format with maximum file size of 5 MB
3. THE Admin_Dashboard SHALL allow entering text descriptions for Success_Cases with a character counter showing remaining characters
4. WHEN an administrator saves a new Success_Case, THE Admin_Dashboard SHALL validate that case title and image are provided
5. IF case title or image is missing when saving, THEN THE Admin_Dashboard SHALL display an error message indicating required fields and SHALL NOT save the Success_Case
6. THE Admin_Dashboard SHALL allow editing existing Success_Cases by modifying case title, text description, or replacing the image
7. THE Admin_Dashboard SHALL allow deleting Success_Cases with a confirmation prompt before deletion
8. WHEN an administrator publishes a Success_Case, THE Public_Website SHALL display it in the gallery within 5 seconds
9. WHEN a Success_Case is successfully saved or published, THE Admin_Dashboard SHALL display a confirmation message

### Requirement 17: SEO Optimization

**User Story:** As a website owner, I want the site optimized for search engines, so that potential customers can discover WEFLOW services.

#### Acceptance Criteria

1. THE Public_Website SHALL include a meta title tag with length between 30 and 60 characters for each of the following pages: Home, Services, Pricing, Success Cases, Booking, Free Diagnosis, and Marketing Landing Page
2. THE Public_Website SHALL include a meta description tag with length between 120 and 160 characters for each of the following pages: Home, Services, Pricing, Success Cases, Booking, Free Diagnosis, and Marketing Landing Page
3. THE Public_Website SHALL include unique meta title tags for each page with no duplicate titles across different pages
4. WHEN page content mentions service offerings, THE Public_Website SHALL include at least one Service_Tier name or "WEFLOW" keyword in the visible page content
5. THE Public_Website SHALL generate an XML sitemap accessible at /sitemap.xml containing URLs for all public pages
6. THE Public_Website SHALL implement semantic HTML structure using header, nav, main, article, section, and footer elements
7. WHEN a page is requested, THE Public_Website SHALL complete DOM rendering within 3 seconds from the initial request

### Requirement 18: Content Restriction Compliance

**User Story:** As a website owner, I want to ensure content compliance, so that the platform avoids prohibited content categories.

#### Acceptance Criteria

1. THE WEFLOW_Platform SHALL NOT include content in the following prohibited categories: medical services, hospital services, healthcare facilities, medical devices, pharmaceutical products, diagnostic equipment, or clinical treatment technologies
2. WHEN an administrator attempts to create or edit a Success_Case with title, description, or image metadata containing keywords related to medical services, hospital services, healthcare facilities, medical devices, pharmaceutical products, diagnostic equipment, or clinical treatment technologies, THEN THE Admin_Dashboard SHALL prevent saving and display an error message indicating prohibited content detected
3. THE Admin_Dashboard SHALL validate Success_Case title, description, and image metadata against prohibited content categories before allowing save operation
4. THE Public_Website SHALL display only Success_Cases that do not contain prohibited content categories
5. WHEN prohibited content is detected during Success_Case creation or editing, THE error message SHALL specify which field contains prohibited content

### Requirement 19: Additional Contact Forms

**User Story:** As a visitor, I want multiple ways to contact WEFLOW, so that I can reach out through convenient touchpoints.

#### Acceptance Criteria

1. THE Public_Website SHALL provide a general inquiry contact form
2. THE contact forms SHALL collect visitor name with maximum length of 100 characters, email with maximum length of 254 characters, phone number with maximum length of 20 characters, and message with maximum length of 2000 characters
3. THE contact forms SHALL require visitor name, email, and message fields for submission
4. WHEN a visitor submits a contact form with all required fields provided, THE WEFLOW_Platform SHALL create an Inquiry record within 5 seconds
5. IF email format is invalid, THEN THE contact forms SHALL prevent submission and display an error message indicating invalid email format
6. IF phone number format is invalid and phone number is provided, THEN THE contact forms SHALL prevent submission and display an error message indicating invalid phone number format
7. WHEN an Inquiry record is successfully created, THE Public_Website SHALL display a confirmation message to the visitor
8. IF Inquiry record creation fails, THEN THE Public_Website SHALL display an error message indicating the submission could not be completed and instruct the visitor to retry

### Requirement 20: Marketing Landing Page

**User Story:** As a marketing campaign visitor, I want to view a dedicated landing page, so that I can learn about specific WEFLOW offerings.

#### Acceptance Criteria

1. THE Public_Website SHALL provide a marketing landing page accessible via a URL path distinct from the home page
2. THE landing page SHALL present service tier information including at least one of Landing Page, Homepage, or Master Premium tiers with pricing
3. THE landing page SHALL include a call-to-action button for booking services
4. THE landing page SHALL include a call-to-action button for requesting free diagnosis
5. WHEN a visitor clicks the booking call-to-action button, THE Public_Website SHALL navigate to the booking page
6. WHEN a visitor clicks the free diagnosis call-to-action button, THE Public_Website SHALL navigate to the Free Diagnosis page
7. THE landing page SHALL display contact links to at least one External_Integration platform
8. THE landing page SHALL apply Responsive_Design for mobile and desktop devices
9. THE landing page SHALL display a free-diagnosis inquiry form fixed to the right side of the page that remains visible (sticky) as the visitor scrolls, containing fields for name, phone number, service type (Landing Page, Homepage, Landing & Homepage, Other/WEFLOW Care Plan), industry, additional requests, and a personal-information consent checkbox, with a "무료진단 후 견적받기" submit button
10. WHEN a visitor submits the landing page inquiry form, THE WEFLOW_Platform SHALL create an Inquiry record that appears in the Admin_Dashboard inquiry list within 5 seconds
11. THE landing page SHALL display a hero headline "문의로 이어지는 홈페이지를 만듭니다" with subtext "기획부터 제작, 광고 연동, 운영 관리까지 WEFLOW가 함께합니다.", and two buttons "무료 진단 후 견적받기" and "실제 제작 성공 보기" that each navigate to the inquiry form/section
12. THE landing page SHALL display a "WEFLOW CARE PLAN" section with five benefit blocks, each with a headline and supporting text: 빠른 제작 진행 (랜딩페이지 3~4일 / 홈페이지 약 1주일), 합리적인 비용 (가성비+실속+퀄리티), 24시간 상담 가능 (언제든 빠른 상담 및 피드백), 제작 후 운영 관리 (검색 등록·수정·유지보수·운영 관리), 광고 연동 지원 (홈페이지+랜딩페이지+광고 한 번에 연결 — 인스타·스레드·블로그·카카오톡·당근 플레이스 등)
13. THE landing page SHALL display a "문의 증가 구조 설계" section listing: 업종별 고객 흐름 분석, 상담 버튼 위치 최적화, 모바일 문의 동선 구성
14. THE landing page SHALL reuse (display) the full pricing card set of 8 cards (the same as the pricing page), the 6-step "제작진행과정" from the services page, the free-diagnosis "이런 걸 확인해드립니다" box (✓ 문의 구조 진단, ✓ 디자인 점검, ✓ 검색 노출 분석, ✓ 문의 개선 제안) with a "무료진단 후 견적받기" button navigating to the Free Diagnosis page, the full testimonials section, and the site footer

### Requirement 21: Site Footer

**User Story:** As a visitor, I want consistent company and contact information in the footer, so that I can find official details and reach WEFLOW.

#### Acceptance Criteria

1. THE Public_Website SHALL display a footer on every public page containing the WEFLOW logo and the tagline "제작부터 관리까지 비즈니스 성장을 함께합니다."
2. THE footer SHALL display company information: 대표 : 신서준, 사업자등록번호 : 884-07-03480, 이메일 : contact@weflowlab.kr, 운영시간 : 연중무휴 24시간 상담가능
3. THE footer SHALL display links to 개인정보처리방침 and 이용약관, and the copyright line "© 2026 WEFLOW. All rights reserved."
4. THE footer SHALL display a "서비스" column with: 홈페이지 제작 과정, 랜딩페이지 제작 과정, 광고 운영·관리 안내
5. THE footer SHALL display a "WEFLOW 케어플랜" column with: WE 케어, FLOW 케어, WEFLOW 케어
6. THE footer SHALL display a "상담문의" column with: 전화 문의, 이메일 문의, 카카오 채널 문의, 인스타 문의, 페이스북 문의, each linking to its respective External_Integration target (phone via tel:, email via mailto:, and KakaoTalk/Instagram/Facebook opening in a new tab)
7. WHEN a visitor clicks the footer WEFLOW logo, THE Public_Website SHALL navigate to the WEFLOW site (home)
8. THE WEFLOW_Platform SHALL NOT include any medical, hospital, or healthcare content in the footer or anywhere else on the Public_Website
