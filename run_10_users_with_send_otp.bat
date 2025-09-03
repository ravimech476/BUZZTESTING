@echo off
echo.
echo ============================================================
echo  BUZZ API - 10 Different Users Test (WITH SEND OTP) 
echo ============================================================
echo.
echo Starting JMeter test with COMPLETE OTP FLOW:
echo.
echo 🔧 TEST CONFIGURATION:
echo   ├── 10 threads (different users) 
echo   ├── Phone numbers from: test_mobile_numbers_with_prefix.csv
echo   ├── Numbers: 7344312970-7344312979 (only phone numbers used)
echo   ├── Country Code: HARDCODED +91 (for all users)
echo   ├── 1 loop per user (single execution)
echo   ├── Profile name: "Jmeter Test User"
echo   └── Ramp-up time: 30 seconds
echo.
echo 📱 OTP FLOW INCLUDED:
echo   ├── ✅ STEP 1: Send OTP to each phone number (+91 prefix)
echo   ├── ⏱️  STEP 2: Wait 3 seconds for OTP processing  
echo   ├── ✅ STEP 3: Verify OTP with hardcoded "123456"
echo   └── 🔑 STEP 4: Extract JWT token for API testing
echo.
echo 🌐 API ENDPOINTS TESTED:
echo   ├── POST /send-otp (SMS will be sent!)
echo   ├── POST /verify-otp  
echo   ├── GET  /countries
echo   ├── GET  /customer/profile
echo   ├── GET  /category
echo   ├── PUT  /customer/profile
echo   └── GET  /customer/profile (verify update)
echo.
echo ⚠️  IMPORTANT NOTES:
echo   ├── 🚨 SMS COSTS: This test WILL send real OTPs (10 SMS)
echo   ├── 📞 Phone numbers: Using numbers 7344312970-7344312979
echo   ├── 🌍 Country Code: HARDCODED +91 (India)
echo   ├── 🔢 OTP: All tests use hardcoded OTP "123456" 
echo   └── 🧹 Cleanup: Delete users with name "Jmeter Test User"
echo.
echo Expected results: ~70 total requests (7 per user × 10 users)
echo Expected SMS: 10 messages to +917344312970, +917344312971, etc.
echo.
pause

echo.
echo 🚀 STARTING JMETER TEST...
echo.

jmeter -n -t BUZZ_10_USERS_WITH_SEND_OTP.jmx -l results\10_users_with_send_otp_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_10_users_otp_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo ✅ TEST COMPLETED!
echo.
echo 📊 RESULTS LOCATION:
echo   ├── JTL file: results\10_users_with_send_otp_[timestamp].jtl
echo   └── HTML Report: results\html_report_10_users_otp_[timestamp]\
echo.
echo 🧹 POST-TEST CLEANUP REQUIRED:
echo   ├── Delete all test users with name: "Jmeter Test User"
echo   ├── Check SMS delivery logs
echo   └── Review any failed authentications
echo.
echo 📱 SMS SUMMARY:
echo   └── Total OTP messages sent: 10 (to +917344312970 - +917344312979)
echo.
pause