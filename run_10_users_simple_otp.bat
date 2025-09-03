@echo off
echo.
echo ============================================================
echo  BUZZ API - 10 Users with Send OTP (SIMPLE VERSION) 
echo ============================================================
echo.
echo This is the SIMPLE/BACKUP version based on your working JMX pattern
echo.
echo 🔧 TEST CONFIGURATION:
echo   ├── 10 threads (different users) 
echo   ├── Phone numbers from: test_mobile_numbers_with_prefix.csv
echo   ├── Numbers: 7344312970-7344312979 (only phone numbers used)
echo   ├── Country Code: HARDCODED +91 (India - for all users)
echo   ├── 1 loop per user (single execution)
echo   └── Ramp-up time: 30 seconds
echo.
echo 📱 COMPLETE OTP FLOW:
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
echo   ├── PUT  /customer/profile (name = "Jmeter Test User")
echo   └── GET  /customer/profile (verify update)
echo.
echo ⚠️  SMS COSTS: This test sends 10 real OTP messages to +917344312970-979
echo.
pause

echo.
echo 🚀 STARTING SIMPLE OTP TEST...
echo.

jmeter -n -t BUZZ_10_USERS_SIMPLE_OTP.jmx -l results\10_users_simple_otp_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_simple_otp_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo ✅ SIMPLE OTP TEST COMPLETED!
echo.
echo 📊 Check the results folder for detailed reports.
echo 🧹 Remember to delete test users with name: "Jmeter Test User"
echo 📱 Total SMS messages sent: 10 (to +917344312970-7344312979)
echo.
pause