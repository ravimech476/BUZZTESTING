@echo off
echo.
echo ================================================
echo  BUZZ API - 10 Users (NO OTP SEND - COST SAVING)
echo ================================================
echo.
echo Starting JMeter test with:
echo - 10 threads (different users)
echo - 10 different mobile numbers
echo - 1 loop (one-time execution)
echo - Hardcoded OTP: 123456
echo - NO OTP SENDING (saves costs!)
echo.
echo Test Flow:
echo 1. Direct OTP Verification (skip SMS costs)
echo 2. Get JWT Token
echo 3. Test all API endpoints
echo.
pause

jmeter -n -t BUZZ_NO_OTP_SEND.jmx -l results\no_otp_send_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_no_otp_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo Test completed! Check the results folder for detailed reports.
echo Cost savings: No SMS OTP charges incurred!
pause