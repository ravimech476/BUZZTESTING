@echo off
echo.
echo =====================================
echo  BUZZ API - Predefined Numbers (FIXED)
echo =====================================
echo.
echo Starting JMeter test with:
echo - 10 threads (different users)
echo - PREDEFINED phone numbers (9344312970-9344312979)
echo - 1 loop (one-time execution)
echo - Hardcoded OTP: 123456
echo - Profile name: "Jmeter Test User" (for easy cleanup)
echo - NO SMS COSTS (using predefined test numbers)
echo.
echo FIXED ISSUES:
echo - Uses server-approved test numbers (not random)
echo - Should have much lower error rate
echo - No SMS charges incurred
echo.
pause

jmeter -n -t BUZZ_PREDEFINED_NUMBERS.jmx -l results\predefined_numbers_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_predefined_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo Test completed! 
echo.
echo Expected Results:
echo - Error rate should be much lower (less than 10%%)
echo - OTP verification should work (200 OK)
echo - All authenticated API calls should succeed
echo - All users will have name: "Jmeter Test User"
echo.
echo Results saved in results folder
echo.
pause