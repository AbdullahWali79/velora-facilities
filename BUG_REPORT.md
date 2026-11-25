# Quality Assurance Bug Report: Velora Elite Facilities Website

**Project:** Velora Elite Facilities Website  
**Prepared by:** We Connect Innovative Solutions Pvt. Ltd. ([weconnectinnovativesolutions.com](https://weconnectinnovativesolutions.com))  
**Auditor:** Senior QA Engineer, Full-Stack Developer & Quality Assurance Auditor  
**Audit Date:** November 25, 2026  
**Defect Triage Standard:** IEEE 829 / ISO 29119 Software Testing Standard  
**Current Readiness Verdict:** **NEEDS FIXES**

---

## 1. Defect Summary & Severity Classification

| Severity Level | Definition | Active Bug Count |
| :--- | :--- | :---: |
| **P0 – Critical** | System crash, fatal runtime exception, database corruption, or complete blockage of primary revenue journey. | **0** |
| **P1 – High** | Core client requirement failed, data inconsistency between database and UI, or prominent service omission. | **2** |
| **P2 – Medium** | Secondary functionality degraded, missing direct external linkage, or unverified third-party sync. | **1** |
| **P3 – Low** | Minor polish issue, environment placeholder, or non-blocking external dependency. | **1** |
| **Total Defects** | | **4** |

---

## 2. Detailed Bug Reports

### BUG-01: Header & Footer Business Hours Display "8:00 AM – 8:00 PM" Instead of Requested "8:00 AM – 6:00 PM"
- **Bug ID:** `VEL-BUG-001`
- **Severity:** **P1 – High**
- **Client Requirement Reference:** Requirement 7 ("Update the business hours to 8:00 AM – 6:00 PM instead of 8:00 PM")
- **Affected Routes:** All public routes (`/`, `/about`, `/services`, `/contact`, `/gallery`, `/quote`, `/book`, etc.)
- **Affected Files:**
  - [src/lib/cms.ts](file:///c:/Users/premier/Documents/GitHub/velora-facilities/src/lib/cms.ts#L485)
  - [src/components/Header.tsx](file:///c:/Users/premier/Documents/GitHub/velora-facilities/src/components/Header.tsx#L70)
  - [src/components/Footer.tsx](file:///c:/Users/premier/Documents/GitHub/velora-facilities/src/components/Footer.tsx#L52)
- **Steps to Reproduce:**
  1. Start the application (`npm run start`) and open `http://localhost:3000/` in any browser.
  2. Inspect the top dark notification bar in the Header.
  3. Notice the clock icon text displays: `Monday – Saturday: 8:00 AM – 8:00 PM`.
  4. Scroll down to the Footer under "Contact & Headquarters".
  5. Notice the business hours line displays: `Monday – Saturday: 8:00 AM – 8:00 PM`.
- **Root Cause Analysis (RCA):**
  In `Header.tsx` line 70 and `Footer.tsx` line 52, the components read `settings.contactInfo.workingHours` provided by `getSiteSettings()`. While fallback strings were updated in the code to `8:00 AM – 6:00 PM`, the PostgreSQL database table for Payload CMS global `site-settings` was previously initialized with `"Monday – Saturday: 8:00 AM – 8:00 PM"`. Because the database field is populated and non-null, the code fallback is bypassed, and the outdated `8:00 PM` database value is rendered to end users.
- **Expected Behavior:**
  Both Header and Footer must render `Monday – Saturday: 8:00 AM – 6:00 PM` consistently.
- **Recommended Fix:**
  In `src/lib/cms.ts` within `getSiteSettings()`, sanitize `data.contactInfo?.workingHours`: if it contains `8:00 PM`, normalize it to `'Monday – Saturday: 8:00 AM – 6:00 PM'`. Alternatively, execute an update query on the Payload CMS `site-settings` database row to persist the new operating hours in Supabase.

---

### BUG-02: Services Catalog Page (`/services`) Queries Database That Omits the 4 New Specialized Cleaning Services
- **Bug ID:** `VEL-BUG-002`
- **Severity:** **P1 – High**
- **Client Requirement Reference:** Requirement 5 & Requirement B/C ("Reduce content related to technical services and focus primarily on professional cleaning services: Marble Polishing, Kitchen Hood & Duct Cleaning, Restaurant Cleaning, Post-Construction Cleaning")
- **Affected Routes:** `/services`
- **Affected Files:**
  - [src/app/(frontend)/services/page.tsx](file:///c:/Users/premier/Documents/GitHub/velora-facilities/src/app/(frontend)/services/page.tsx#L18-L23)
  - [src/lib/cms.ts](file:///c:/Users/premier/Documents/GitHub/velora-facilities/src/lib/cms.ts#L589-L616)
- **Steps to Reproduce:**
  1. Open `http://localhost:3000/services` in the browser.
  2. Examine the rendered service cards under Category 01 ("Specialized Surface & Residential Deep Cleaning").
  3. Note that the cards present are: "Home & Villa Cleaning", "Deep Cleaning Services", "Move-In & Move-Out Cleaning", "Glass & Window Cleaning", "Sofa & Carpet Cleaning", and "Office Cleaning".
  4. Observe that the primary requested cleaning services (**Marble Polishing**, **Kitchen Hood & Duct Cleaning**, **Restaurant Cleaning**, and **Post-Construction Cleaning**) are absent from the catalog grid.
- **Root Cause Analysis (RCA):**
  `ServicesPage` calls `getServices()` from `src/lib/cms.ts`. `getServices()` queries `payload.find({ collection: 'services' })`. The Supabase PostgreSQL database currently contains only the 6 initial seeded service rows. Because the database query succeeds, the function returns those 6 legacy records rather than falling back to `DEFAULT_SERVICES` (which contains the full 10 specialized cleaning services). While dedicated slug routes (e.g. `/services/marble-polishing`) render correctly because they leverage fallback data, the catalog overview relies strictly on the database query.
- **Expected Behavior:**
  The `/services` catalog page must prominently display **Marble Polishing**, **Kitchen Hood & Duct Cleaning**, **Restaurant Cleaning**, and **Post-Construction Cleaning** at the top of the cleaning services category.
- **Recommended Fix:**
  Either:
  1. Update `getServices()` in `src/lib/cms.ts` to merge or prioritize `DEFAULT_SERVICES` when database records lack the new specialized cleaning slugs; OR
  2. Seed the 4 new specialized cleaning records directly into the Payload CMS `services` database table via an automated database migration or Payload seed script.

---

### BUG-03: Google Reviews Section Uses Search Query Link Instead of Official Google Business Profile Place ID / CID
- **Bug ID:** `VEL-BUG-003`
- **Severity:** **P2 – Medium**
- **Client Requirement Reference:** Requirement 4 ("Display genuine customer reviews from Google")
- **Affected Routes:** `/` (Homepage), `/about`
- **Affected Files:**
  - [src/components/GoogleReviewsSection.tsx](file:///c:/Users/premier/Documents/GitHub/velora-facilities/src/components/GoogleReviewsSection.tsx#L108)
- **Steps to Reproduce:**
  1. Scroll down to the "Customer Feedback & Google Reviews" section on the Homepage.
  2. Click the "View On Google Maps" or "Write a Review" button.
  3. The link opens `https://maps.google.com/?q=Velora+Elite+Facilities+Dubai`.
- **Root Cause Analysis (RCA):**
  The client has not yet supplied their exact Google Business Profile CID (Customer Identification Number) or Google Place ID. As a result, the component uses a generic search query fallback.
- **Expected Behavior:**
  Clicking the button should open Velora Elite's exact Google Business Profile review dialog or drawer directly.
- **Recommended Fix:**
  Request the client's official Google Business Profile share link or Place ID and update the `googleReviewUrl` prop in `GoogleReviewsSection.tsx`.

---

### BUG-04: Advertising Campaign Tracking Pixels Active with Placeholder IDs Awaiting Client Media Accounts
- **Bug ID:** `VEL-BUG-004`
- **Severity:** **P3 – Low**
- **Client Requirement Reference:** Advertising Campaign Pre-Launch Checklist (Meta Pixel, TikTok Pixel, GA4, Google Ads conversion tracking)
- **Affected Routes:** All public routes
- **Affected Files:**
  - [.env.local](file:///c:/Users/premier/Documents/GitHub/velora-facilities/.env.local)
  - [src/components/TrackingScripts.tsx](file:///c:/Users/premier/Documents/GitHub/velora-facilities/src/components/TrackingScripts.tsx)
- **Steps to Reproduce:**
  1. Inspect browser network traffic when navigating between pages or submitting a quote.
  2. Note that custom events (`trackPhoneCallClick`, `trackWhatsAppClick`, `trackQuoteSubmit`) fire cleanly via `src/lib/tracking.ts`.
  3. However, live network requests to `google-analytics.com`, `connect.facebook.net`, or `analytics.tiktok.com` do not record conversions on live client dashboards because environment variables contain placeholder values.
- **Root Cause Analysis (RCA):**
  The tracking infrastructure, event schemas, script injection, and server action triggers are completely engineered and functioning. However, live advertising accounts have not been connected because real account IDs have not yet been provided by the client.
- **Expected Behavior:**
  Live campaign events must populate the client's live Google Ads, Meta Ads Manager, and TikTok Ads Manager dashboards.
- **Recommended Fix:**
  Client or digital marketing agency to provide active production tracking IDs:
  - `NEXT_PUBLIC_GA_ID`
  - `NEXT_PUBLIC_META_PIXEL_ID`
  - `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
  - `GOOGLE_ADS_CONVERSION_ID` & labels

---

## 3. Production Readiness Assessment & Conclusion

| Readiness Check | Assessment | Status |
| :--- | :--- | :---: |
| **P0 Defect Count** | 0 Critical Bugs | **CLEARED** |
| **Next.js Production Build** | Compiles with 0 errors | **CLEARED** |
| **TypeScript Type Safety** | 0 typing errors | **CLEARED** |
| **Responsive Viewports (320px–1920px)** | 0 horizontal overflow; mobile action bar fully responsive | **CLEARED** |
| **Quotation Flow & Optional Email** | Tested end-to-end; inserts to PostgreSQL without email | **CLEARED** |
| **Free Inspection Booking Journey** | 0 AED guarantee and dedicated booking route tested | **CLEARED** |
| **Legal Pages & Compliance** | Privacy Policy, Terms, Cancellation live and linked | **CLEARED** |
| **P1 Defect Resolution** | Business hours & Services catalog database sync needed | **ACTION REQUIRED** |

### **Final Audit Verdict:** **NEEDS FIXES**

The core web application exhibits outstanding visual presentation, robust security architecture, and seamless responsive performance across all tested viewports. However, before the website can be signed off for client review as 100% complete, **BUG-01** (operating hours display) and **BUG-02** (services catalog database sync) must be resolved.

---
**Report Authorized by:**  
We Connect Innovative Solutions Pvt. Ltd.  
*QA & Full-Stack Engineering Team*  
[weconnectinnovativesolutions.com](https://weconnectinnovativesolutions.com)
