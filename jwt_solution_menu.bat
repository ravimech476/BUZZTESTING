@echo off
echo ======================================
echo    JWT TOKEN SHARING - SOLUTION MENU
echo ======================================
echo.

echo PROBLEM IDENTIFIED:
echo ✅ Authentication: 100%% working (0%% errors)
echo ❌ API Calls: 403 Forbidden (JWT token not applied)
echo.

echo ROOT CAUSE: JWT token extracted in one thread group but not available to second thread group
echo.

echo SOLUTION OPTIONS:
echo.
echo 1. SETUP THREAD + GLOBAL PROPERTIES  - Advanced approach with BeanShell
echo    ✅ Uses SetupThreadGroup to run auth first
echo    ✅ Sets JWT as global property for all threads
echo    ✅ More complex but follows JMeter best practices
echo.
echo 2. SINGLE THREAD GROUP               - Simple and reliable approach  
echo    ✅ OnceOnlyController runs auth once per thread
echo    ✅ JWT token stays within same thread context
echo    ✅ Simpler configuration, guaranteed to work
echo.
echo 3. VIEW PREVIOUS RESULTS             - Check the 403 Forbidden errors
echo.
echo 4. MANUAL CURL TEST                  - Verify JWT token manually
echo.

set /p choice=Choose solution approach (1-4): 

if "%choice%"=="1" (
    echo.
    echo Running SETUP THREAD + GLOBAL PROPERTIES approach...
    call run_jwt_fixed.bat
) else if "%choice%"=="2" (
    echo.
    echo Running SINGLE THREAD GROUP approach...
    call run_single_thread.bat
) else if "%choice%"=="3" (
    echo.
    echo Opening previous test results...
    start "Test Results" "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\light_load_working_report\index.html"
    echo.
    echo CHECK THE ERRORS TAB:
    echo - You should see 150 × "403/Forbidden" errors
    echo - All API calls failed with "Authorization required"
    echo - This confirms JWT token was not applied to requests
    echo.
    pause
) else if "%choice%"=="4" (
    echo.
    echo Testing JWT token manually with curl...
    echo.
    echo STEP 1: Get JWT token
    curl -X POST https://buzz.pazl.info/buzz-api/verify-otp ^
      -H "Content-Type: application/json" ^
      -d "{\"phoneNumber\":\"9344312970\",\"countryCode\":\"+91\",\"otp\":\"123456\"}"
    echo.
    echo.
    echo STEP 2: Copy the token from above and test API call
    echo Example: curl -H "Authorization: Bearer YOUR_JWT_TOKEN" https://buzz.pazl.info/buzz-api/countries
    echo.
    echo If manual curl with JWT works but JMeter fails, it confirms the token sharing issue.
    echo.
    pause
) else (
    echo Invalid choice. Please run again.
    pause
)

echo.
echo ======================================
echo EXPECTED SUCCESS CRITERIA:
echo ======================================
echo.
echo ✅ ~180-200 total requests completed
echo ✅ ^<5%% overall error rate  
echo ✅ No 403 Forbidden errors
echo ✅ All 6 BUZZ APIs responding with JWT token
echo ✅ Good response times (^<2000ms average)
echo.
echo If successful: BUZZ API stress testing is COMPLETE! 🎉
echo.
pause
