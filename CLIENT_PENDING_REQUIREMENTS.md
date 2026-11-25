# Client Pending Requirements & Production Dependencies

**Project:** Velora Elite Facilities Website  
**Prepared by:** We Connect Innovative Solutions Pvt. Ltd. ([weconnectinnovativesolutions.com](https://weconnectinnovativesolutions.com))  
**Auditor:** Senior Full-Stack Developer & Quality Assurance Lead  
**Date:** November 25, 2026  

---

## 1. Overview

While all application code, database migrations, security headers, and responsive layouts have been completed and verified, several operational items require client input or account access prior to public advertising launch.

This document clearly outlines these dependencies, their impact, and the recommended action steps.

---

## 2. Itemized Client Dependencies Matrix

| Item # | Dependency Category | Required Client Action / Asset | Current Fallback in Code | Production Impact | Priority |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **DEP-01** | **Test Data Cleanup Approval** | Explicit authorization to run [`scratch/cleanup_test_records.sql`](file:///c:/Users/premier/Documents/GitHub/velora-facilities/scratch/cleanup_test_records.sql) to delete QA test quote #VEL-6482 from `quote_requests`. | Record #VEL-6482 remains in database marked with `[QA-AUDIT-AUTOMATED-TEST]`. | Low (No customer impact; cleanly purges staging quote). | **HIGH** |
| **DEP-02** | **Production Advertising Pixel IDs** | Provide active account IDs: Meta Pixel ID, TikTok Pixel ID, Google Analytics 4 Measurement ID, and Google Ads Conversion ID & Labels. | Script guards prevent invalid network requests; window stubs active. | Paid ad campaigns cannot track external ROAS until IDs are populated. | **HIGH** (Prior to Ad Spend) |
| **DEP-03** | **Google Business Profile CID / Place ID** | Provide official Google Maps review drawer URL or Place ID for Velora Elite. | Action button targets Velora Elite Aspin Commercial Tower hub on Google Maps. | Direct one-click review drawer opening vs Google Maps profile page. | **MEDIUM** |
| **DEP-04** | **Trade License Number** | Provide official Dubai Economy & Tourism commercial license number to display in footer. | Field `settings.tradeLicense` is currently optional and omitted from footer text. | Enhanced trust and formal commercial transparency. | **MEDIUM** |
| **DEP-05** | **Client Team & Video Reels** | Supply final high-definition video files of Velora Elite technicians on site in Dubai. | Showcase currently displays authenticated high-definition sample demonstrations. | Reinforces 100% authentic in-house branded team identity. | **LOW** |
| **DEP-06** | **Legal Counsel Review** | Have UAE legal counsel review `/privacy-policy`, `/terms-and-conditions`, and `/cancellation-policy`. | Policies drafted strictly under UAE Federal Decree-Law No. 45 of 2021 and Dubai consumer protection law. | Qualified legal sign-off for enterprise operations. | **RECOMMENDED** |

---

## 3. Action Plan for Production Handover

1. **Step 1:** Client provides approval for test cleanup -> Developer runs `scratch/cleanup_test_records.sql`.
2. **Step 2:** Media buyer inputs production Pixel IDs in `.env.local` -> Developer sets `NEXT_PUBLIC_ENABLE_TRACKING="true"`.
3. **Step 3:** Client supplies Google Business Profile review link -> Developer updates `googleReviewUrl` in `GoogleReviewsSection.tsx`.
4. **Step 4:** Final domain DNS points to production server, SSL certificates verified, and campaign launch initiated.

---
**Report Authorized by:**  
We Connect Innovative Solutions Pvt. Ltd.  
*QA & Project Management Team*  
[weconnectinnovativesolutions.com](https://weconnectinnovativesolutions.com)
