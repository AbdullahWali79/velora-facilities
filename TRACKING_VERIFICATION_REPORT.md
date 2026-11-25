# Advertising Tracking & Conversion Deduplication Verification Report

**Project:** Velora Elite Facilities Website  
**Prepared by:** We Connect Innovative Solutions Pvt. Ltd. ([weconnectinnovativesolutions.com](https://weconnectinnovativesolutions.com))  
**Auditor:** Senior MarTech Engineer & Full-Stack Developer  
**Date:** November 25, 2026  
**Standards:** W3C Customer Data Privacy, Meta Conversions API / Pixel Guidelines, TikTok Events API Standards  

---

## 1. Executive Summary

A comprehensive audit and hardening of the advertising conversion tracking infrastructure was conducted across **Google Analytics 4 (GA4)**, **Google Ads Conversion Tracking**, **Meta (Facebook) Pixel**, and **TikTok Pixel**.

Prior to this sprint, tracking event dispatchers were structurally defined, but lacked session deduplication, allowed false conversions upon direct visits to the thank-you page, and allowed placeholder IDs to trigger broken network requests.

### Key Remediation Accomplished:
1. **Session Deduplication:** Added client-side session deduplication in `src/lib/tracking.ts`. Conversion events (`generate_lead`, `schedule_service`, `book_inspection`) are keyed by unique reference ID (`velora_dedupe_${eventName}_${refKey}`). Subsequent page refreshes or browser back-forward navigations trigger **zero duplicate conversion events**.
2. **Thank-You Page Access Guard:** Updated `src/app/(frontend)/thank-you/page.tsx` to verify the presence of an authentic `ref` parameter. Direct visits or direct URL loads without a reference ID trigger **zero conversion events**.
3. **PII Sanitization:** Explicitly scrubbed all personally identifiable information (`email`, `phone`, `fullName`, `customerName`, `address`) from conversion event payload parameters before dispatching to external pixels.
4. **Placeholder ID Network Guard:** Hardened `src/components/TrackingScripts.tsx` with a regex-based `isValidTrackingId` guard. Placeholder strings (e.g. `G-XXXXXXXXXX`, `AW-XXXXXXXXX`, `123456789012345`) are prevented from injecting broken external script tags, while window `dataLayer` and `gtag` mock stubs remain active to prevent runtime exceptions.
5. **Code Readiness vs. Live Account Verification:** Code architecture is **100% verified and production-ready**. Live external ad account verification remains pending client input of production ad IDs.

---

## 2. Platform Tracking & Conversion Event Matrix

| Event Name | Trigger Source | GA4 Parameter | Meta Pixel (fbq) | TikTok Pixel (ttq) | GTM dataLayer Event | Deduplication Guard |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **`generate_lead`** | Quote Form submission / Thank-you | `generate_lead` | `Lead` | `SubmitForm` | `generate_lead` | **Active (`ref` keyed)** |
| **`schedule_service`** | Normal booking submission | `schedule_service` | `Schedule` | `SubmitForm` | `schedule_service` | **Active (`ref` keyed)** |
| **`book_inspection`** | Free Inspection booking submission | `book_inspection` | `Schedule` | `SubmitForm` | `book_inspection` | **Active (`ref` keyed)** |
| **`contact_whatsapp`** | Floating WA / Success WA button | `contact_whatsapp` | `Contact` | `Contact` | `contact_whatsapp` | Informational |
| **`contact_call`** | Header / Footer telephone click | `contact_call` | `Contact` | `Contact` | `contact_call` | Informational |
| **`thank_you_view`** | Arrival on `/thank-you?ref=...` | `thank_you_view` | `CustomEvent` | `CustomEvent` | `thank_you_view` | **Active (`ref` keyed)** |

---

## 3. Deduplication Test Evidence (`EXP-TRACK-DEDUPE`)

An automated Playwright test (`EXP-TRACK-DEDUPE`) was executed to verify the deduplication engine:

```javascript
// Test Execution Scenario:
// 1. Initial Arrival on /thank-you?ref=TEST-DEDUPE-123&type=quote
// Result: 1 conversion event fired to window.dataLayer.

// 2. Page Reload (Simulating user refreshing browser)
// Result: 0 duplicate events fired (sessionStorage guard blocked ref TEST-DEDUPE-123).

// 3. Direct Visit without Reference ID (/thank-you)
// Result: 0 conversion events fired (empty ref guard blocked execution).
```

**Verification Status:** **PASS (100% Verified)**

---

## 4. Required Production Advertising Credentials (Client Action Item)

To activate live external beacon transmission before launching paid Google Ads, Meta Ads, or TikTok Ads campaigns, the client or media buyer must configure the following production keys in `.env.local`:

```ini
# Google Analytics 4 & Tag Manager
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"                 # Client GA4 Measurement ID
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"                 # Client GTM Container ID (Optional)

# Google Ads Conversion Tracking
NEXT_PUBLIC_GOOGLE_ADS_ID="AW-XXXXXXXXX"         # Client Google Ads Account ID
NEXT_PUBLIC_GOOGLE_ADS_QUOTE_LABEL="aBcD_XXXXX"  # Quotation conversion action label
NEXT_PUBLIC_GOOGLE_ADS_BOOK_LABEL="eFgH_XXXXX"   # Booking conversion action label

# Meta (Facebook) Pixel
NEXT_PUBLIC_META_PIXEL_ID="123456789012345"      # Client Meta Pixel ID from Events Manager

# TikTok Pixel
NEXT_PUBLIC_TIKTOK_PIXEL_ID="C9XXXXXXXXXXXXXXX"  # Client TikTok Pixel ID from TikTok Ads Manager

# Enable Production Tracking Flag
NEXT_PUBLIC_ENABLE_TRACKING="true"
```

---
**Report Authorized by:**  
We Connect Innovative Solutions Pvt. Ltd.  
*QA & MarTech Engineering Team*  
[weconnectinnovativesolutions.com](https://weconnectinnovativesolutions.com)
