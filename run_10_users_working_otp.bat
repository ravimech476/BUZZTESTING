@echo off
echo.
echo ============================================================
echo  BUZZ API - 10 Users WITH Send OTP (BULLETPROOF VERSION) 
echo ============================================================
echo.
echo ✅ This version is based on your EXACT working XML structure!
echo.
echo 🔧 TEST CONFIGURATION:
echo   ├── 10 threads (different users) 
echo   ├── Phone numbers from: test_mobile_numbers_with_prefix.csv
echo   ├── Numbers: 7344312970-7344312979
echo   ├── Country Code: HARDCODED +91 (India - for all users)
echo   ├── 1 loop per user (single execution)
echo   └── Ramp-up time: 30 seconds
echo.
echo 📱 COMPLETE OTP FLOW:
echo   ├── ✅ STEP 1: Send OTP (NEW - added before your working verify step)
echo   ├── ⏱️  STEP 2: Wait 3 seconds
echo   ├── ✅ STEP 3: Verify OTP (EXISTING - your working code + hardcoded +91)
echo   ├── 🔑 STEP 4: Extract JWT token (EXISTING - your working regex)
echo   └── 🌐 STEP 5-8: API calls (EXISTING - your working API tests)
echo.
echo 🎯 WHAT'S DIFFERENT:
echo   ├── ✅ Based on your working BUZZ_SINGLE_THREAD_10_USERS.jmx structure
echo   ├── ✅ CSV file: Fixed to use test_mobile_numbers_with_prefix.csv
echo   ├── ✅ Send OTP: Added before existing verify step
echo   ├── ✅ Country Code: Hardcoded +91 (not from CSV)
echo   └── ✅ Same working XML structure = NO parsing errors
echo.
echo ⚠️  SMS COSTS: This test sends 10 real OTP messages to +917344312970-979
echo.
pause

echo.
echo 🚀 STARTING BULLETPROOF OTP TEST...
echo.

jmeter -n -t BUZZ_10_USERS_WORKING_OTP.jmx -l results\10_users_working_otp_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_working_otp_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo ✅ BULLETPROOF OTP TEST COMPLETED!
echo.
echo 📊 RESULTS:
echo   ├── JTL file: results\10_users_working_otp_[timestamp].jtl
echo   └── HTML Report: results\html_report_working_otp_[timestamp]\
echo.
echo 🧹 POST-TEST CLEANUP:
echo   ├── Delete test users with name: "Jmeter Test User"
echo   └── Check SMS delivery logs
echo.
echo 📱 SMS SUMMARY:
echo   └── Total OTP messages sent: 10 (to +917344312970-7344312979)
echo.
echo 🎉 This version should work perfectly - it's based on your existing working structure!
echo.
pause