@echo off
echo.
echo =====================================
echo  BUZZ API - WORKING VERSION (UPDATED)
echo =====================================
echo.
echo Starting JMeter test with:
echo - 10 threads (different users)
echo - PREDEFINED mobile numbers (CSV: 9344312970-9344312979)
echo - Country code: +91 (static)
echo - 1 loop (one-time execution)
echo - Send OTP included (SMS cost)
echo - Hardcoded OTP: 123456
echo - Profile name: "Jmeter Test User" (ALL SAME - easy cleanup)
echo.
echo Test Flow:
echo 1. Read predefined phone number from CSV
echo 2. Send OTP to phone number (SMS cost)
echo 3. Wait 3 seconds
echo 4. Verify with hardcoded OTP: 123456 (WORKS with predefined numbers!)
echo 5. Get JWT token
echo 6. Test all authenticated API endpoints
echo 7. Update profile to: "Jmeter Test User"
echo.
echo FEATURES:
echo - Uses server-approved test numbers (no random generation issues)
echo - All users get same name "Jmeter Test User" for easy cleanup
echo - Complete authentication flow with Send OTP
echo - Should have low error rate (like before)
echo.
echo UPDATED: Profile name changed to "Jmeter Test User" for easy cleanup!
echo.
pause

jmeter -n -t BUZZ_SINGLE_THREAD_10_USERS.jmx -l results\working_updated_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_working_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo Test completed! 
echo.
echo SERVER CLEANUP:
echo - Delete all users with name: "Jmeter Test User"
echo - Delete all categories starting with: "Test Category"
echo.
echo This should work perfectly with low error rate!
echo.
pause