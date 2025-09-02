@echo off
echo.
echo =======================================================
echo  BUZZ API - Send OTP Debug (Simple Version - FIXED)
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
echo 5. Test authenticated API endpoints
echo.
echo FIXED: XML compatibility issues resolved!
echo WARNING: This test WILL incur SMS costs!
echo.
pause

jmeter -n -t BUZZ_SEND_OTP_SIMPLE.jmx -l results\send_otp_simple_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_simple_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo Test completed! 
echo.
echo Check results:
echo - Send OTP: 200 OK = SMS sent successfully
echo - Verify OTP: 200 OK = Authentication works with 123456
echo - Verify OTP: 400 Bad Request = Server rejects hardcoded OTP
echo - Profile/Category calls: 200 OK = JWT authentication working
echo - Profile/Category calls: 403 Forbidden = JWT not extracted properly
echo.
echo Results saved in results folder
echo.
pause