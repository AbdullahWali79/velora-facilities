# Database Synchronization & Migration Report

**Project:** Velora Elite Facilities Website  
**Prepared by:** We Connect Innovative Solutions Pvt. Ltd. ([weconnectinnovativesolutions.com](https://weconnectinnovativesolutions.com))  
**Auditor:** Senior Database Engineer, Payload CMS Specialist & Senior QA Engineer  
**Date:** November 25, 2026  
**Target Engine:** PostgreSQL (Supabase Pooled Connection)  
**Schema Standard:** Payload CMS v3.90.0 Relational Architecture  

---

## 1. Executive Summary & Purpose

The preliminary QA audit revealed two critical database-to-frontend discrepancies:
1. The `site_settings` table stored outdated working hours (`Monday – Saturday: 8:00 AM – 8:00 PM`), which overrode the updated code fallback.
2. The `services` table contained only 6 legacy service rows, omitting the four new premium cleaning services requested by the client from the `/services` catalog.

This document details the database backup, the targeted idempotent synchronization applied, verification queries, rollback scripts, and the test record cleanup plan.

---

## 2. Pre-Migration Backup & Safety Measures

In strict adherence to QA Safety Guidelines, a full JSON snapshot of all affected tables was captured prior to executing any database writes:

- **Backup Snapshot Path:** [`scratch/backup_pre_fix.json`](file:///c:/Users/premier/Documents/GitHub/velora-facilities/scratch/backup_pre_fix.json)
- **Tables Backed Up:**
  - `site_settings` (1 row)
  - `services` (6 legacy rows)
  - `quote_requests` (1 QA test row)
  - `booking_requests` (0 rows)
- **Rollback SQL Script:** [`scratch/rollback.sql`](file:///c:/Users/premier/Documents/GitHub/velora-facilities/scratch/rollback.sql)

---

## 3. Detailed Idempotent Migration Script

The synchronization was executed using transaction-safe, idempotent SQL operations wrapped in `BEGIN ... COMMIT` blocks:

### 3.1 Operating Hours Synchronization (`site_settings`)
```sql
UPDATE site_settings 
SET 
  contact_info_working_hours = 'Monday – Saturday: 8:00 AM – 6:00 PM',
  updated_at = NOW()
WHERE id = 1;
```

### 3.2 Legacy Services Preservation
Existing services (`deep-cleaning`, `office-cleaning`, `move-in-move-out`, `glass-window-cleaning`) were not deleted. Their display order was shifted to `12+` to keep all historical database foreign key references intact:
```sql
UPDATE services 
SET "order" = "order" + 10, updated_at = NOW()
WHERE slug NOT IN (
  'home-villa-cleaning', 
  'sofa-carpet-cleaning', 
  'marble-polishing', 
  'kitchen-hood-cleaning', 
  'restaurant-cleaning', 
  'post-construction-cleaning'
);
```

### 3.3 Upserting the 6 Approved Cleaning Services
The six client-approved services were inserted or updated with exact priority ordering (1 through 6):

| Order | Service Title | Slug | Category | DB ID |
| :---: | :--- | :--- | :---: | :---: |
| **1** | Marble Polishing & Italian Crystallization | `marble-polishing` | `cleaning` | 7 |
| **2** | Kitchen Hood & Commercial Exhaust Duct Cleaning | `kitchen-hood-cleaning` | `cleaning` | 8 |
| **3** | Restaurant Deep Cleaning & Kitchen Sanitation | `restaurant-cleaning` | `cleaning` | 9 |
| **4** | Post-Construction Deep Cleaning & Handover | `post-construction-cleaning` | `cleaning` | 10 |
| **5** | Luxury Villa & Residence Deep Cleaning | `home-villa-cleaning` | `cleaning` | 1 |
| **6** | Sofa, Rug & Upholstery Thermodynamic Steam Care | `sofa-carpet-cleaning` | `cleaning` | 6 |

For each service, associated features and FAQs were refreshed in `services_features` and `services_faqs` matching the service specifications.

---

## 4. Post-Migration Verification Query Results

```sql
SELECT id, title, slug, category, "order" FROM services ORDER BY "order" ASC, id ASC;
```

**Actual Database State:**
```
┌─────────┬────┬───────────────────────────────────────────────────┬──────────────────────────────┬───────────────┬───────┐
│ (index) │ id │ title                                             │ slug                         │ category      │ order │
├─────────┼────┼───────────────────────────────────────────────────┼──────────────────────────────┼───────────────┼───────┤
│ 0       │ 7  │ 'Marble Polishing & Italian Crystallization'      │ 'marble-polishing'           │ 'cleaning'    │ '1'   │
│ 1       │ 8  │ 'Kitchen Hood & Commercial Exhaust Duct Cleaning' │ 'kitchen-hood-cleaning'      │ 'cleaning'    │ '2'   │
│ 2       │ 9  │ 'Restaurant Deep Cleaning & Kitchen Sanitation'   │ 'restaurant-cleaning'        │ 'cleaning'    │ '3'   │
│ 3       │ 10 │ 'Post-Construction Deep Cleaning & Handover'      │ 'post-construction-cleaning' │ 'cleaning'    │ '4'   │
│ 4       │ 1  │ 'Luxury Villa & Residence Deep Cleaning'          │ 'home-villa-cleaning'        │ 'cleaning'    │ '5'   │
│ 5       │ 6  │ 'Sofa, Rug & Upholstery Thermodynamic Steam Care' │ 'sofa-carpet-cleaning'       │ 'cleaning'    │ '6'   │
│ 6       │ 2  │ 'Deep Cleaning Services'                          │ 'deep-cleaning'              │ 'cleaning'    │ '12'  │
│ 7       │ 3  │ 'Office Cleaning & Commercial Care'               │ 'office-cleaning'            │ 'commercial'  │ '13'  │
│ 8       │ 4  │ 'Move-In & Move-Out Cleaning'                     │ 'move-in-move-out'           │ 'cleaning'    │ '14'  │
│ 9       │ 5  │ 'Glass & Window Cleaning'                         │ 'glass-window-cleaning'      │ 'maintenance' │ '15'  │
└─────────┴────┴───────────────────────────────────────────────────┴──────────────────────────────┴───────────────┴───────┘
```

---

## 5. Test Data Review & Targeted Cleanup Plan (Task 5)

### 5.1 Verification of Live Database Records
A forensic audit was performed across all transactional tables:
- `booking_requests`: 0 records found.
- `contact_messages`: 0 records found.
- `quote_requests`: Exactly 1 record found.

### 5.2 QA Test Record Identification
- **Record ID:** 2
- **Full Name:** `"QA Test User"`
- **Phone:** `"551234567"`
- **Email:** `""` (Empty string / Null)
- **Details:** `"[QA-AUDIT-AUTOMATED-TEST] Verifying optional email quotation flow."`
- **Created At:** `2026-11-25T15:14:41.707Z`
- **Customer Impact:** Confirmed 0 real customer impact. No emails were dispatched externally because SMTP credentials are unconfigured/simulated in the development environment.

### 5.3 Targeted Cleanup Script
In accordance with Task 5 protocols, production record deletion requires explicit client authorization. The cleanup script has been staged in [`scratch/cleanup_test_records.sql`](file:///c:/Users/premier/Documents/GitHub/velora-facilities/scratch/cleanup_test_records.sql):

```sql
BEGIN;

-- Verify record before deletion
SELECT id, full_name, details FROM quote_requests WHERE id = 2;

-- Targeted delete of confirmed QA test data
DELETE FROM quote_requests 
WHERE id = 2 
  AND full_name = 'QA Test User' 
  AND details LIKE '%[QA-AUDIT-AUTOMATED-TEST]%';

COMMIT;
```

---

## 6. Production Database Runbook

To apply these identical changes to another production environment or replica:
1. Take a snapshot of `site_settings` and `services`.
2. Execute [`scratch/sync-database.mjs`](file:///c:/Users/premier/Documents/GitHub/velora-facilities/scratch/sync-database.mjs) using `node scratch/sync-database.mjs`.
3. Verify that `SELECT contact_info_working_hours FROM site_settings WHERE id = 1;` returns `'Monday – Saturday: 8:00 AM – 6:00 PM'`.
4. Verify that `SELECT count(*) FROM services;` returns 10.
5. If rollback is ever required, execute [`scratch/rollback.sql`](file:///c:/Users/premier/Documents/GitHub/velora-facilities/scratch/rollback.sql).

---
**Report Authorized by:**  
We Connect Innovative Solutions Pvt. Ltd.  
*QA & Database Engineering Team*  
[weconnectinnovativesolutions.com](https://weconnectinnovativesolutions.com)
