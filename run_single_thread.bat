@echo off
echo ======================================
echo    BUZZ API - SINGLE THREAD APPROACH
echo ======================================
echo.

echo ALTERNATIVE SOLUTION: Single Thread Group with OnceOnlyController
echo This approach eliminates JWT token sharing issues by keeping everything in one thread group.
echo.

echo ✅ OnceOnlyController: Auth runs once per thread (10 times total)
echo ✅ Same Thread Context: JWT token stays within same thread 
echo ✅ Simple ${JWT_TOKEN} reference: No global properties needed
echo ✅ Reliable token sharing: Guaranteed to work within thread
echo.

echo Test Structure:
echo 📁 Single Thread Group (10 users, 30s ramp-up, 3 loops)
echo   ├── 🔒 Authentication (Once per thread)  
echo   │   ├── Send OTP → Get JWT Token  
echo   │   └── JWT extracted as ${JWT_TOKEN}
echo   └── 🔄 API Calls (3 loops × 6 APIs = 18 per user)
echo       ├── Get Countries (with Bearer ${JWT_TOKEN})
echo       ├── Get App Config (with Bearer ${JWT_TOKEN})  
echo       ├── Get Customer Profile (with Bearer ${JWT_TOKEN})
echo       ├── Get Categories (with Bearer ${JWT_TOKEN})
echo       ├── Update Customer Profile (with Bearer ${JWT_TOKEN})
echo       └── Create Category (with Bearer ${JWT_TOKEN})
echo.

echo Expected Results:
echo ✅ 200 total requests (20 auth + 180 API calls)  
echo ✅ ^<5%% error rate = JWT tokens working perfectly
echo ✅ No more 403 Forbidden errors
echo.

REM Clean up results
if exist "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\single_thread.jtl" (
    del "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\single_thread.jtl"
)
if exist "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\single_thread_report" (
    rmdir /s /q "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\single_thread_report"
)

echo Starting SINGLE THREAD APPROACH test...
echo.

REM Change to JMeter directory 
cd /d "C:\apache-jmeter-5.6.3\bin"

REM Run the single thread test
jmeter -n -t "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\BUZZ_SINGLE_THREAD.jmx" -l "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\single_thread.jtl" -e -o "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\single_thread_report"

echo.
echo ======================================
echo SINGLE THREAD APPROACH COMPLETED!
echo ======================================
echo.
echo Check results at:
echo D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\single_thread_report\index.html
echo.
echo SUCCESS INDICATORS:
echo ✅ ~200 total requests completed
echo ✅ ^<5%% overall error rate = SUCCESS!
echo ✅ No 403 Forbidden errors = JWT tokens working
echo ✅ All 6 BUZZ APIs tested under load
echo.
echo If successful:
echo 🚀 BUZZ API stress testing is COMPLETE!
echo 🚀 Ready to scale to medium/heavy load
echo 🚀 Authentication + API integration WORKING!
echo.
pause
