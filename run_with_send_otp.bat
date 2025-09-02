@echo off
echo.
echo =======================================================
echo  BUZZ API - With Send OTP (Debug Authentication)
echo =======================================================
echo.
echo Starting JMeter test with:
echo - 10 threads (different users)
echo - Random phone numbers (generated in JMeter)
echo - 1 loop (one-time execution)
echo - SEND OTP included (debug mode)
echo - Verify with hardcoded OTP: 123456
echo - Profile name: "Jmeter Test User" (for easy cleanup)
echo.
echo Test Flow:
echo 1. Generate random phone number (9xxxxxxxxx)
echo 2. Send OTP to phone number (SMS cost incurred)
echo 3. Wait 3 seconds
echo 4. Verify with hardcoded OTP: 123456
echo 5. Test all authenticated API endpoints
echo.
echo WARNING: This test will incur SMS costs!
echo.
pause

jmeter -n -t BUZZ_WITH_SEND_OTP.jmx -l results\with_send_otp_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_send_otp_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo Test completed! 
echo.
echo Check results:
echo - If OTP verification now works (200 OK), the issue was missing Send OTP
echo - If still fails (400 Bad Request), server doesn't accept 123456 as hardcoded OTP
echo - If authenticated calls work (200 OK), authentication flow is fixed
echo.
echo Results saved in results folder
echo.
pause