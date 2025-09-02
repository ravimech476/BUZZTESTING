@echo off
echo.
echo =======================================================
echo  BUZZ API - Random Numbers + Easy Cleanup Test
echo =======================================================
echo.
echo Starting JMeter test with:
echo - 10 threads (different users)
echo - Random phone numbers (generated in JMeter)
echo - 1 loop (one-time execution)  
echo - Hardcoded OTP: 123456
echo - Profile name: "Jmeter Test User" (for easy cleanup)
echo - NO OTP SENDING (saves costs!)
echo.
echo Test Features:
echo - Random 10-digit phone numbers starting with 9
echo - All users get same name for easy server cleanup
echo - No CSV files needed
echo - Categories prefixed with "JMeter Test"
echo.
pause

jmeter -n -t BUZZ_RANDOM_NUMBERS.jmx -l results\random_numbers_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_random_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo Test completed! 
echo.
echo CLEANUP INSTRUCTIONS:
echo - Delete all users with name: "Jmeter Test User"
echo - Delete all categories starting with: "JMeter Test Category"
echo - Check results folder for detailed reports
echo.
pause