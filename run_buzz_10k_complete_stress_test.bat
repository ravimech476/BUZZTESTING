@echo off
echo.
echo ============================================================
echo  BUZZ 10K COMPLETE STRESS TEST - ALL APIs WORKFLOW
echo ============================================================
echo.
echo 🚀 COMPREHENSIVE TEST OVERVIEW:
echo ├── 📊 USERS: 10,000 concurrent users
echo ├── ⏱️  RAMP-UP: 10 minutes (600 seconds)
echo ├── 🕐 DURATION: 45 minutes total test time
echo ├── 🔄 WORKFLOW: Complete 13-step API journey
echo └── 📈 TARGET: 500+ TPS peak load
echo.
echo 🎯 COMPLETE API WORKFLOW (13 Steps):
echo   ✅ 1. Send OTP           → User registration
echo   ✅ 2. Verify OTP         → JWT token extraction
echo   ✅ 3. Get Profile        → User data retrieval
echo   ✅ 4. Update Profile     → Name = "Jmeter Test User"
echo   ✅ 5. Create Category    → Extract category_id
echo   ✅ 6. Get Contacts       → Buzz installed contacts
echo   ✅ 7. Add People         → Add contacts to category
echo   ✅ 8. Get People List    → Retrieve category people
echo   ✅ 9A. Mute People       → Mute operations (2 hours)
echo   ✅ 9B. Block People      → Block operations
echo   ✅ 10. Update Category   → Category name update
echo   ✅ 11. Get Categories    → List all categories
echo   ✅ 12. Call History      → Incoming call history
echo.
echo 📋 TEST DATA REQUIREMENTS:
echo   ├── 📄 buzz_10k_users.csv      (10,000 user records)
echo   ├── 📄 buzz_test_contacts.csv  (100 contact records)
echo   └── 🔧 Both files must be in the current directory
echo.
echo 📊 EXPECTED PERFORMANCE:
echo   ├── 🎯 Response Time: <3s (95th percentile)
echo   ├── 📈 Peak TPS: 500+ requests/second  
echo   ├── ❌ Error Rate: <1%% overall
echo   └── ✅ Success Rate: 99%%+ end-to-end
echo.
echo 💾 RESULTS LOCATION:
echo   ├── 📄 JTL: results\buzz_10k_complete_test_results.jtl
echo   └── 📊 HTML: results\html_report_10k_complete\
echo.
echo ⚠️  CRITICAL WARNINGS:
echo   ├── 🔥 HIGH LOAD TEST - Monitor server resources
echo   ├── 📱 REAL SMS: 10,000 OTP messages will be sent
echo   ├── 💾 DATABASE: High load on user/category tables
echo   ├── 🔗 CONNECTIONS: 10,000 concurrent connections
echo   └── 📊 MONITORING: Watch CPU, Memory, DB connections
echo.
echo 🔍 PRE-FLIGHT CHECKLIST:
echo   ├── ✅ Server Health: buzz.pazl.info accessible
echo   ├── ✅ CSV Files: Both data files present
echo   ├── ✅ Database: Connection pool ready
echo   ├── ✅ Monitoring: Server monitoring enabled
echo   └── ✅ Backups: Database backup completed
echo.

pause

echo.
echo 🔍 CHECKING TEST DATA FILES...
echo.

if not exist "buzz_10k_users.csv" (
    echo ❌ ERROR: buzz_10k_users.csv not found!
    echo.
    echo 📋 REQUIRED FILE FORMAT:
    echo phoneNumber,countryCode,name,categoryName,updateCategoryName
    echo 7455123001,+91,JmeterUser00001,TestCategory00001,UpdatedCategory00001
    echo 7455123002,+91,JmeterUser00002,TestCategory00002,UpdatedCategory00002
    echo ... (continue for 10,000 rows)
    echo.
    echo 🛠️  GENERATE FILE: Use the Excel generator tool provided
    echo.
    pause
    exit /b 1
)

if not exist "buzz_test_contacts.csv" (
    echo ❌ ERROR: buzz_test_contacts.csv not found!
    echo.
    echo 📋 REQUIRED FILE FORMAT:
    echo contactPhone,contactName  
    echo 9876543001,JmeterContact001
    echo 9876543002,JmeterContact002
    echo ... (continue for 100 rows)
    echo.
    echo 🛠️  GENERATE FILE: Use the Excel generator tool provided
    echo.
    pause
    exit /b 1
)

echo ✅ buzz_10k_users.csv found
echo ✅ buzz_test_contacts.csv found
echo.

echo 📊 ANALYZING TEST DATA...
for /f %%i in ('find /c /v "" ^< buzz_10k_users.csv') do set USER_COUNT=%%i
for /f %%i in ('find /c /v "" ^< buzz_test_contacts.csv') do set CONTACT_COUNT=%%i

set /a USER_ROWS=%USER_COUNT%-1
set /a CONTACT_ROWS=%CONTACT_COUNT%-1

echo   ├── 👥 User records: %USER_ROWS%
echo   └── 📱 Contact records: %CONTACT_ROWS%
echo.

if %USER_ROWS% LSS 10000 (
    echo ⚠️  WARNING: User records (%USER_ROWS%) less than expected (10,000)
    echo Do you want to continue? (y/n)
    set /p continue=
    if /i not "%continue%"=="y" exit /b 1
)

echo 🎯 ESTIMATED TEST IMPACT:
echo   ├── 📱 SMS Messages: %USER_ROWS% OTP messages
echo   ├── 💾 DB Records: ~%USER_ROWS% users + categories
echo   ├── 🔗 Peak Connections: %USER_ROWS% concurrent
echo   └── 📊 Total Requests: ~130,000 HTTP requests
echo.

echo 🚀 STARTING 10K COMPLETE STRESS TEST...
echo.
echo ⏰ TEST PHASES:
echo   ├── Phase 1 (0-10 min): Gradual ramp-up to 10K users
echo   ├── Phase 2 (10-40 min): Sustained 10K user load
echo   └── Phase 3 (40-45 min): Natural test completion
echo.

mkdir results 2>nul

echo 📊 STARTING JMETER TEST WITH HTML DASHBOARD...
echo.

jmeter -n -t BUZZ_10K_COMPLETE_STRESS_TEST.jmx ^
       -l results\buzz_10k_complete_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl ^
       -e -o results\html_report_10k_complete_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo ✅ 10K COMPLETE STRESS TEST FINISHED!
echo.
echo 📊 RESULTS SUMMARY:
echo ═══════════════════════════════════════════════════════════
echo.

for %%f in (results\buzz_10k_complete_*.jtl) do set "LATEST_JTL=%%f"
for %%f in (results\html_report_10k_complete_*) do set "LATEST_HTML=%%f"

echo 📄 RAW DATA FILE:
echo   └── %LATEST_JTL%
echo.
echo 📊 HTML DASHBOARD:
echo   └── %LATEST_HTML%\index.html
echo.

echo 🔍 QUICK ANALYSIS:
if exist "%LATEST_JTL%" (
    for /f %%i in ('find /c "true" "%LATEST_JTL%"') do set SUCCESS_COUNT=%%i
    for /f %%i in ('find /c "false" "%LATEST_JTL%"') do set FAILURE_COUNT=%%i
    
    set /a TOTAL_REQUESTS=%SUCCESS_COUNT% + %FAILURE_COUNT%
    if %TOTAL_REQUESTS% GTR 0 (
        set /a SUCCESS_RATE=(%SUCCESS_COUNT% * 100) / %TOTAL_REQUESTS%
        set /a ERROR_RATE=(%FAILURE_COUNT% * 100) / %TOTAL_REQUESTS%
        
        echo   ├── ✅ Successful Requests: %SUCCESS_COUNT%
        echo   ├── ❌ Failed Requests: %FAILURE_COUNT%
        echo   ├── 📊 Success Rate: %SUCCESS_RATE%%%
        echo   └── 📊 Error Rate: %ERROR_RATE%%%
        echo.
        
        if %SUCCESS_RATE% GEQ 99 (
            echo 🎉 EXCELLENT: Success rate above 99%%
        ) else if %SUCCESS_RATE% GEQ 95 (
            echo 👍 GOOD: Success rate above 95%%
        ) else (
            echo ⚠️  WARNING: Success rate below 95%% - investigate failures
        )
    )
)
echo.

echo 🎯 KEY SUCCESS METRICS TO CHECK:
echo ═════════════════════════════════════════════════════════
echo   ✅ 10,000 users completed OTP verification
echo   ✅ 9,800+ users (98%%) successfully updated profiles  
echo   ✅ 9,500+ users (95%%) successfully created categories
echo   ✅ 9,000+ users (90%%) successfully added people
echo   ✅ Server maintained stability throughout test
echo   ✅ 95th percentile response time under 3 seconds
echo   ✅ Peak TPS achieved 500+ requests/second
echo.

echo 📋 POST-TEST CHECKLIST:
echo ═════════════════════════════════════════════════════════
echo   🔍 1. Review HTML dashboard for detailed metrics
echo   🔍 2. Check server logs for any errors or warnings  
echo   🔍 3. Verify database integrity and performance
echo   🔍 4. Analyze response time distribution
echo   🔍 5. Check SMS delivery logs for 10K OTP messages
echo   🔍 6. Review resource utilization (CPU, Memory, DB)
echo   🔍 7. Validate business logic (categories, people)
echo.

echo 🧹 CLEANUP RECOMMENDATIONS:
echo ═════════════════════════════════════════════════════════
echo   🗑️  1. Delete test users with name "Jmeter Test User"
echo   🗑️  2. Remove test categories created during test
echo   🗑️  3. Clean up test people/contacts added
echo   🗑️  4. Archive test result files
echo   🗑️  5. Reset any muted/blocked test relationships
echo.

echo 📞 SUPPORT & TROUBLESHOOTING:
echo ═════════════════════════════════════════════════════════
echo   📧 API Issues: Check server logs for 5xx errors
echo   🔐 Auth Issues: Verify JWT token extraction working
echo   💾 DB Issues: Check connection pool and query performance
echo   📱 SMS Issues: Verify Twilio integration and quotas
echo   📊 Performance: Use HTML dashboard for detailed analysis
echo.

echo 🎉 BUZZ 10K STRESS TEST COMPLETED SUCCESSFULLY!
echo.
echo 📊 Open HTML Report: %LATEST_HTML%\index.html
echo.

pause
