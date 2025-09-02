@echo off
echo.
echo =====================================
echo  BUZZ API - EXACT WORKING STRUCTURE + RANDOM NUMBERS
echo =====================================
echo.
echo Starting JMeter test with:
echo - 10 threads (different users)
echo - RANDOM mobile numbers (generated in JMeter - 9xxxxxxxxx)
echo - Country code: +91 (static)
echo - 1 loop (one-time execution)
echo - Send OTP included (SMS cost)
echo - Hardcoded OTP: 123456
echo - Profile name: "Jmeter Test User" (ALL SAME - easy cleanup)
echo.
echo STRUCTURE: Copied EXACT working structure from run_10_different_users.bat
echo ONLY CHANGES: CSV replaced with random generation + profile name updated
echo.
echo This should work like run_10_different_users.bat but with random numbers!
echo.
pause

jmeter -n -t BUZZ_EXACT_WORKING_STRUCTURE.jmx -l results\exact_working_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_exact_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo Test completed! 
echo.
echo SERVER CLEANUP:
echo - Delete all users with name: "Jmeter Test User"
echo - Delete all categories starting with: "Test Category"
echo.
pause