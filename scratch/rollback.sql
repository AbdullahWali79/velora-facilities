
-- ROLLBACK SCRIPT FOR VELORA ELITE DATABASE FIXES
-- Generated at 2026-11-25T16:47:21.876Z

UPDATE site_settings 
SET contact_info_working_hours = 'Monday – Saturday: 8:00 AM – 8:00 PM'
WHERE id = 1;

-- To restore legacy services order or state:
-- See scratch/backup_pre_fix.json for complete row copies.
