@echo off
echo.
echo =====================================
echo  BUZZ API - FINAL PERFECT VERSION
echo =====================================
echo.
echo Starting JMeter test with:
echo - 10 threads (different users)
echo - RANDOM phone numbers (generated in JMeter)
echo - Country code: +91 (static)
echo - 1 loop (one-time execution)
echo - Send OTP included (SMS cost)
echo - Hardcoded OTP: 123456
echo - Profile name: "Jmeter Test User" (ALL SAME - easy cleanup)
echo.
echo Test Flow:
echo 1. Generate random phone number (9xxxxxxxxx)
echo 2. Send OTP to phone number (SMS cost)
echo 3. Wait 3 seconds
echo 4. Verify with hardcoded OTP: 123456
echo 5. Test all authenticated API endpoints
echo 6. Update profile to: "Jmeter Test User"
echo.
echo FEATURES:
echo - No CSV files needed (random generation)
echo - All users get same name for easy cleanup
echo - Complete authentication flow
echo.
pause

jmeter -n -t BUZZ_FINAL_PERFECT.jmx -l results\final_perfect_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_final_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo Test completed! 
echo.
echo CLEANUP:
echo - Delete all users with name: "Jmeter Test User"
echo - Delete categories starting with: "JMeter Test Category"
echo.
pause