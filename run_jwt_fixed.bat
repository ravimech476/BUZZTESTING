@echo off
echo ======================================
echo    BUZZ API - JWT TOKEN SHARING FIXED
echo ======================================
echo.

echo ISSUE IDENTIFIED: JWT Token not reaching API calls
echo ✅ Authentication: 100%% success (0%% errors) 
echo ❌ API calls: 403 Forbidden (JWT token not applied)
echo.

echo SOLUTION APPLIED:
echo ✅ SetupThreadGroup: Auth runs FIRST and completes before APIs
echo ✅ BeanShell PostProcessor: Sets JWT as global property  
echo ✅ Global Property Access: ${__P(GLOBAL_JWT_TOKEN)} in headers
echo ✅ Proper thread synchronization: Auth → Wait → APIs
echo.

echo Expected Results:
echo ✅ Authentication: 2 requests, 0%% errors
echo ✅ API calls: 180 requests, ^<5%% errors (with proper JWT token)
echo ✅ Total: ~182 requests with ^<5%% overall error rate
echo.

REM Clean up results
if exist "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\jwt_fixed.jtl" (
    del "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\jwt_fixed.jtl"
)
if exist "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\jwt_fixed_report" (
    rmdir /s /q "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\jwt_fixed_report"
)

echo Starting JWT TOKEN SHARING FIXED test...
echo.

REM Change to JMeter directory 
cd /d "C:\apache-jmeter-5.6.3\bin"

REM Run the JWT fixed test
jmeter -n -t "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\BUZZ_JWT_FIXED.jmx" -l "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\jwt_fixed.jtl" -e -o "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\jwt_fixed_report"

echo.
echo ======================================
echo JWT TOKEN SHARING TEST COMPLETED!
echo ======================================
echo.
echo Check results at:
echo D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\jwt_fixed_report\index.html
echo.
echo SUCCESS INDICATORS:
echo ✅ ^<5%% overall error rate = JWT token working perfectly!
echo ✅ ~182 total requests = Full light load test completed
echo ✅ No more 403 Forbidden errors = Authorization headers working
echo ✅ Good response times = APIs performing well under load
echo.
echo If successful (^<5%% errors):
echo 🚀 Ready for MEDIUM LOAD testing (25 users)
echo 🚀 Ready for HEAVY LOAD testing (50 users)
echo 🚀 BUZZ API stress testing COMPLETE SUCCESS!
echo.
pause
