-- =====================================================
-- BUZZ API Test Data Cleanup Script
-- =====================================================
-- Run this after JMeter testing to clean up test data
-- 
-- IMPORTANT: Only run this on test/staging databases!
-- =====================================================

-- Check test data before deletion
SELECT 'Test Users Found:', COUNT(*) as user_count 
FROM users 
WHERE name = 'Jmeter Test User';

SELECT 'Test Categories Found:', COUNT(*) as category_count 
FROM categories 
WHERE category_name LIKE 'JMeter Test Category%';

-- Show sample test users (first 5)
SELECT 'Sample Test Users:' as info;
SELECT id, name, email, phone_number, created_at 
FROM users 
WHERE name = 'Jmeter Test User' 
LIMIT 5;

-- Show sample test categories (first 5)  
SELECT 'Sample Test Categories:' as info;
SELECT id, category_name, category_color, created_at 
FROM categories 
WHERE category_name LIKE 'JMeter Test Category%' 
LIMIT 5;

-- =====================================================
-- CLEANUP COMMANDS (Uncomment to execute)
-- =====================================================

-- Step 1: Delete test categories first (if they have foreign key dependencies)
-- DELETE FROM categories WHERE category_name LIKE 'JMeter Test Category%';

-- Step 2: Delete test users
-- DELETE FROM users WHERE name = 'Jmeter Test User';

-- Step 3: Clean up any related data (adjust table names as per your schema)
-- DELETE FROM user_sessions WHERE user_id IN (SELECT id FROM users WHERE name = 'Jmeter Test User');
-- DELETE FROM user_preferences WHERE user_id IN (SELECT id FROM users WHERE name = 'Jmeter Test User');
-- DELETE FROM call_logs WHERE user_id IN (SELECT id FROM users WHERE name = 'Jmeter Test User');

-- =====================================================
-- VERIFICATION QUERIES (Run after cleanup)
-- =====================================================

-- Verify all test data is removed
-- SELECT 'Remaining Test Users:', COUNT(*) FROM users WHERE name = 'Jmeter Test User';
-- SELECT 'Remaining Test Categories:', COUNT(*) FROM categories WHERE category_name LIKE 'JMeter Test Category%';

-- =====================================================
-- USAGE INSTRUCTIONS:
-- =====================================================
-- 1. First run the SELECT queries to see what test data exists
-- 2. Uncomment and run the DELETE statements one by one
-- 3. Run verification queries to confirm cleanup
-- 4. Adjust table/column names to match your database schema
-- =====================================================