@echo off
setlocal enabledelayedexpansion
echo.
echo ============================================================
echo  🚀 BUZZ COMPLETE STRESS TESTING SUITE - MASTER CONTROL
echo ============================================================
echo.
echo 📊 PROGRESSIVE LOAD TESTING APPROACH:
echo   ├── 🟢 PHASE 1: Validation (100 users)
echo   ├── 🟡 PHASE 2: Pre-Production (1,000 users)  
echo   └── 🔴 PHASE 3: Production Scale (10,000 users)
echo.
echo 🎯 COMPLETE API WORKFLOW (12 Steps per user):
echo   ├── Authentication: Send OTP → Verify OTP → Get Profile
echo   ├── Profile Mgmt: Update Profile Name
echo   ├── Category Ops: Create → Get Contacts → Add People → List
echo   ├── People Ops: Mute → Block Operations
echo   └── Data Retrieval: Update Category → List Categories → Call History
echo.
echo 💡 RECOMMENDED TESTING SEQUENCE:
echo   1️⃣  Start with 100 users to validate functionality
echo   2️⃣  Scale to 1,000 users for pre-production testing
echo   3️⃣  Finally test 10,000 users for production scale
echo.

:MAIN_MENU
echo.
echo ═══════════════════════════════════════════════════════════
echo                    🎛️  MAIN MENU
echo ═══════════════════════════════════════════════════════════
echo.
echo 📊 DATA GENERATION:
echo   [1] Generate 100 Users Data     (Validation Test)
echo   [2] Generate 1,000 Users Data   (Pre-Production Test)
echo   [3] Generate 10,000 Users Data  (Production Scale Test)
echo   [4] Generate ALL Test Data      (100 + 1K + 10K)
echo.
echo 🚀 TEST EXECUTION:
echo   [5] Run 100 Users Test          (🟢 Validation Phase)
echo   [6] Run 1,000 Users Test        (🟡 Pre-Production Phase)
echo   [7] Run 10,000 Users Test       (🔴 Production Scale Phase)
echo.
echo 🛠️  UTILITIES:
echo   [8] Check Test Data Files
echo   [9] Clean Up Test Results
echo   [A] View Test Results Summary
echo.
echo   [Q] Quit
echo.
set /p choice=📋 Enter your choice: 

if "%choice%"=="1" goto GEN_100
if "%choice%"=="2" goto GEN_1000  
if "%choice%"=="3" goto GEN_10000
if "%choice%"=="4" goto GEN_ALL
if "%choice%"=="5" goto RUN_100
if "%choice%"=="6" goto RUN_1000
if "%choice%"=="7" goto RUN_10000
if "%choice%"=="8" goto CHECK_FILES
if "%choice%"=="9" goto CLEANUP
if /i "%choice%"=="A" goto VIEW_RESULTS
if /i "%choice%"=="a" goto VIEW_RESULTS
if /i "%choice%"=="Q" goto QUIT
if /i "%choice%"=="q" goto QUIT

echo ❌ Invalid choice. Please try again.
goto MAIN_MENU

:GEN_100
echo.
echo 🟢 GENERATING 100 USERS VALIDATION DATA...
python generate_buzz_scaled_data.py --users 100
if errorlevel 1 (
    echo ❌ Error generating data. Make sure Python is installed.
    pause
)
pause
goto MAIN_MENU

:GEN_1000
echo.
echo 🟡 GENERATING 1,000 USERS PRE-PRODUCTION DATA...
python generate_buzz_scaled_data.py --users 1000
if errorlevel 1 (
    echo ❌ Error generating data. Make sure Python is installed.
    pause
)
pause
goto MAIN_MENU

:GEN_10000
echo.
echo 🔴 GENERATING 10,000 USERS PRODUCTION SCALE DATA...
python generate_buzz_scaled_data.py --users 10000
if errorlevel 1 (
    echo ❌ Error generating data. Make sure Python is installed.
    pause
)
pause
goto MAIN_MENU

:GEN_ALL
echo.
echo 🌟 GENERATING ALL TEST LEVELS DATA...
python generate_buzz_scaled_data.py --all
if errorlevel 1 (
    echo ❌ Error generating data. Make sure Python is installed.
    pause
)
pause
goto MAIN_MENU

:RUN_100
echo.
echo 🟢 STARTING 100 USERS VALIDATION TEST...
echo.
if not exist "buzz_100_users.csv" (
    echo ❌ ERROR: buzz_100_users.csv not found!
    echo 🛠️  Generate data first using option [1]
    pause
    goto MAIN_MENU
)
if not exist "buzz_test_contacts.csv" (
    echo ❌ ERROR: buzz_test_contacts.csv not found!
    echo 🛠️  Generate data first using option [1]
    pause
    goto MAIN_MENU
)
echo ✅ Starting 100 users validation test...
call run_buzz_100_users_test.bat
goto MAIN_MENU

:RUN_1000
echo.
echo 🟡 STARTING 1,000 USERS PRE-PRODUCTION TEST...
echo.
if not exist "buzz_1000_users.csv" (
    echo ❌ ERROR: buzz_1000_users.csv not found!
    echo 🛠️  Generate data first using option [2]
    pause
    goto MAIN_MENU
)
if not exist "buzz_test_contacts.csv" (
    echo ❌ ERROR: buzz_test_contacts.csv not found!
    echo 🛠️  Generate data first using option [2]
    pause
    goto MAIN_MENU
)

echo ⚠️  PRE-FLIGHT CONFIRMATION:
echo   ├── 📊 This will test 1,000 concurrent users
echo   ├── 📱 1,000 real OTP messages will be sent
echo   ├── 💰 Estimated SMS cost: $7.50 - $15.00
echo   ├── 🔥 High server load expected
echo   └── ⏱️  Test duration: ~30 minutes
echo.
set /p confirm=Are you ready to proceed? (y/n): 
if /i not "%confirm%"=="y" goto MAIN_MENU
call run_buzz_1000_users_test.bat
goto MAIN_MENU

:RUN_10000
echo.
echo 🔴 STARTING 10,000 USERS PRODUCTION SCALE TEST...
echo.
if not exist "buzz_10000_users.csv" (
    echo ❌ ERROR: buzz_10000_users.csv not found!
    echo 🛠️  Generate data first using option [3]
    pause
    goto MAIN_MENU
)
if not exist "buzz_test_contacts.csv" (
    echo ❌ ERROR: buzz_test_contacts.csv not found!
    echo 🛠️  Generate data first using option [3]
    pause
    goto MAIN_MENU
)

echo 🚨 CRITICAL WARNING - PRODUCTION SCALE TEST:
echo   ├── 📊 This will test 10,000 concurrent users
echo   ├── 📱 10,000 real OTP messages will be sent
echo   ├── 💰 Estimated SMS cost: $75 - $150
echo   ├── 🔥 EXTREME server load - monitor closely
echo   ├── 💾 Database will be heavily stressed
echo   ├── ⏱️  Test duration: ~45 minutes
echo   └── 🆘 Have server monitoring ready
echo.
echo 📋 PRE-FLIGHT CHECKLIST:
echo   [ ] Server monitoring tools active
echo   [ ] Database backup completed recently  
echo   [ ] Twilio account has sufficient balance
echo   [ ] Team notified of high-load test
echo   [ ] Ready to stop test if server becomes unstable
echo.
set /p confirm1=Have you completed the pre-flight checklist? (y/n): 
if /i not "%confirm1%"=="y" goto MAIN_MENU

set /p confirm2=Are you absolutely sure you want to proceed with 10K users? (y/n): 
if /i not "%confirm2%"=="y" goto MAIN_MENU

echo.
echo 🚀 PROCEEDING WITH 10,000 USERS PRODUCTION SCALE TEST...
call run_buzz_10k_complete_stress_test.bat
goto MAIN_MENU

:CHECK_FILES
echo.
echo 📋 CHECKING TEST DATA FILES...
echo ═══════════════════════════════════════════════════════════
echo.

echo 🟢 100 USERS VALIDATION TEST:
if exist "buzz_100_users.csv" (
    for /f %%i in ('find /c /v "" ^< buzz_100_users.csv') do set USER100_COUNT=%%i
    set /a USER100_ROWS=!USER100_COUNT!-1
    echo   ✅ buzz_100_users.csv found (!USER100_ROWS! users)
) else (
    echo   ❌ buzz_100_users.csv not found
)

if exist "BUZZ_100_USERS_COMPLETE_TEST.jmx" (
    echo   ✅ BUZZ_100_USERS_COMPLETE_TEST.jmx found
) else (
    echo   ❌ BUZZ_100_USERS_COMPLETE_TEST.jmx not found
)

echo.
echo 🟡 1,000 USERS PRE-PRODUCTION TEST:
if exist "buzz_1000_users.csv" (
    for /f %%i in ('find /c /v "" ^< buzz_1000_users.csv') do set USER1000_COUNT=%%i
    set /a USER1000_ROWS=!USER1000_COUNT!-1
    echo   ✅ buzz_1000_users.csv found (!USER1000_ROWS! users)
) else (
    echo   ❌ buzz_1000_users.csv not found
)

if exist "BUZZ_1000_USERS_COMPLETE_TEST.jmx" (
    echo   ✅ BUZZ_1000_USERS_COMPLETE_TEST.jmx found
) else (
    echo   ❌ BUZZ_1000_USERS_COMPLETE_TEST.jmx not found
)

echo.
echo 🔴 10,000 USERS PRODUCTION SCALE TEST:
if exist "buzz_10000_users.csv" (
    for /f %%i in ('find /c /v "" ^< buzz_10000_users.csv') do set USER10000_COUNT=%%i
    set /a USER10000_ROWS=!USER10000_COUNT!-1
    echo   ✅ buzz_10000_users.csv found (!USER10000_ROWS! users)
) else (
    echo   ❌ buzz_10000_users.csv not found
)

if exist "BUZZ_10K_COMPLETE_STRESS_TEST.jmx" (
    echo   ✅ BUZZ_10K_COMPLETE_STRESS_TEST.jmx found
) else (
    echo   ❌ BUZZ_10K_COMPLETE_STRESS_TEST.jmx not found
)

echo.
echo 📱 SHARED CONTACT DATA:
if exist "buzz_test_contacts.csv" (
    for /f %%i in ('find /c /v "" ^< buzz_test_contacts.csv') do set CONTACT_COUNT=%%i
    set /a CONTACT_ROWS=!CONTACT_COUNT!-1
    echo   ✅ buzz_test_contacts.csv found (!CONTACT_ROWS! contacts)
) else (
    echo   ❌ buzz_test_contacts.csv not found
)

echo.
pause
goto MAIN_MENU

:CLEANUP
echo.
echo 🧹 CLEANING UP TEST RESULTS...
echo ═══════════════════════════════════════════════════════════
echo.
echo ⚠️  This will delete all test result files (.jtl and HTML reports)
echo.
set /p confirm=Are you sure you want to clean up all test results? (y/n): 
if /i not "%confirm%"=="y" goto MAIN_MENU

echo.
echo 🗑️  Cleaning up result files...

if exist "results\*.jtl" (
    del /q "results\*.jtl" 2>nul
    echo   ✅ Deleted JTL result files
)

for /d %%i in ("results\html_report_*") do (
    if exist "%%i" (
        rmdir /s /q "%%i" 2>nul
        echo   ✅ Deleted HTML report: %%i
    )
)

echo.
echo ✅ CLEANUP COMPLETED!
echo.
pause
goto MAIN_MENU

:VIEW_RESULTS
echo.
echo 📊 TEST RESULTS SUMMARY...
echo ═══════════════════════════════════════════════════════════
echo.

echo 📄 AVAILABLE JTL FILES:
if exist "results\*.jtl" (
    for %%f in ("results\*.jtl") do (
        echo   📄 %%f
    )
) else (
    echo   ❌ No JTL result files found
)

echo.
echo 📊 AVAILABLE HTML REPORTS:
if exist "results\html_report_*" (
    for /d %%f in ("results\html_report_*") do (
        echo   📊 %%f\index.html
    )
) else (
    echo   ❌ No HTML reports found
)

echo.
echo 💡 TIP: HTML reports provide the most comprehensive analysis
echo    Open index.html files in your web browser for detailed metrics
echo.
pause
goto MAIN_MENU

:QUIT
echo.
echo 👋 BUZZ STRESS TESTING SUITE - SESSION COMPLETE
echo.
echo 📋 SUMMARY OF AVAILABLE OPERATIONS:
echo   ├── 🟢 100 Users: Validation testing
echo   ├── 🟡 1,000 Users: Pre-production scale testing
echo   ├── 🔴 10,000 Users: Production scale testing
echo   └── 🛠️  Complete workflow: 12 API endpoints per user
echo.
echo 💡 RECOMMENDED WORKFLOW:
echo   1. Generate data for desired test level
echo   2. Run tests progressively: 100 → 1,000 → 10,000
echo   3. Review HTML reports after each test
echo   4. Fix any issues before scaling up
echo.
echo 📞 SUPPORT:
echo   ├── 📊 Performance Issues: Check HTML dashboard
echo   ├── 🔧 API Issues: Review server logs
echo   ├── 📱 SMS Issues: Verify Twilio integration
echo   └── 💾 Data Issues: Re-generate CSV files
echo.
echo 🎉 Thank you for using BUZZ Stress Testing Suite!
echo.
pause
exit /b 0
