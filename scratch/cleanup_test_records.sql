-- =============================================================================
-- TARGETED CLEANUP SCRIPT FOR CONFIRMED TEST RECORDS
-- Velora Elite Facilities Database
-- Prepared by: We Connect Innovative Solutions Pvt. Ltd.
-- =============================================================================
-- IMPORTANT: In accordance with QA Protocol Task 5, production deletion requires
-- explicit client / database owner authorization before execution.
--
-- Verified QA Test Record Details:
-- Table: quote_requests
-- ID: 2
-- Full Name: "QA Test User"
-- Phone: "551234567"
-- Email: "" (Null/Empty)
-- Details: "[QA-AUDIT-AUTOMATED-TEST] Verifying optional email quotation flow."
-- Created At: 2026-11-25T15:14:41.707Z
-- Real Customer Impact: NONE (No other records exist; no real emails were dispatched)
-- =============================================================================

BEGIN;

-- Preview record to be deleted
SELECT id, full_name, phone, details, created_at 
FROM quote_requests 
WHERE id = 2 AND full_name = 'QA Test User';

-- Targeted deletion
DELETE FROM quote_requests 
WHERE id = 2 
  AND full_name = 'QA Test User' 
  AND details LIKE '%[QA-AUDIT-AUTOMATED-TEST]%';

COMMIT;
