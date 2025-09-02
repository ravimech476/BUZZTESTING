@echo off
echo ======================================
echo    BUZZ API - WORKING LIGHT LOAD TEST
echo ======================================
echo.

echo ✅ Authentication CONFIRMED WORKING (0%% errors)
echo ✅ Using the SAME successful authentication pattern
echo ✅ Adding 6 BUZZ APIs with JWT token authorization
echo ✅ 10 users × 3 loops × 6 APIs = 180+ total API calls
echo.

echo Test Flow:
echo 1. Authentication (1 user) → Get JWT token (WORKING pattern)
echo 2. Wait 5 seconds → Let authentication complete
echo 3. Light Load (10 users) → Test 6 BUZZ APIs with JWT token
echo.

echo APIs being tested:
echo - GET /countries (country list)
echo - GET /app-config (app configuration)  
echo - GET /customer/profile (user profile)
echo - GET /category (categories list)
echo - PUT /customer/profile (update profile)
echo - POST /category (create category)
echo.

REM Clean up results
if exist "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\working_light_load.jtl" (
    echo Cleaning old results...
    del "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\working_light_load.jtl"
)
if exist "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\working_light_load_report" (
    rmdir /s /q "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\working_light_load_report"
)

echo Starting WORKING LIGHT LOAD test...
echo.

REM Change to JMeter directory 
cd /d "C:\Program Files\apache-jmeter-5.6.3\bin"

REM Run the working light load test
jmeter -n -t "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\WORKING_LIGHT_LOAD.jmx" -l "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\working_light_load.jtl" -e -o "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\working_light_load_report"

echo.
echo ======================================
echo WORKING LIGHT LOAD TEST COMPLETED!
echo ======================================
echo.
echo Check results at:
echo D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\working_light_load_report\index.html
echo.
echo EXPECTED RESULTS:
echo ✅ Authentication: 2 requests, 0%% errors (confirmed working)
echo ✅ API Tests: 180+ requests, ^<5%% error rate = SUCCESS
echo ✅ Total: ~182 requests completed  
echo ✅ Response times: ^<2000ms average
echo.
echo SUCCESS CRITERIA:
echo ✅ ^<5%% total error rate = Ready for medium load (25 users)
echo ⚠️  5-10%% error rate = Some APIs have issues, but acceptable
echo ❌ ^>10%% error rate = Need to debug specific failing APIs
echo.
echo If successful, next steps:
echo 🚀 Medium Load Test (25 users, 450+ requests)
echo 🚀 Heavy Load Test (50 users, 900+ requests)
echo 🚀 Production-ready BUZZ API stress testing!
echo.
pause
