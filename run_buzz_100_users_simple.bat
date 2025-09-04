@echo off
echo.
echo ============================================================
echo  BUZZ 100 USERS - COMPLETE WORKFLOW VALIDATION TEST
echo ============================================================
echo.
echo TEST CONFIGURATION:
echo   - 100 concurrent users
echo   - 1 minute ramp-up time
echo   - 15 minutes total test time
echo   - Complete 12-step API workflow
echo   - Target: 50+ TPS moderate load
echo.
echo COMPLETE API WORKFLOW (12 Steps):
echo   1. Send OTP           - User registration
echo   2. Verify OTP         - JWT token extraction
echo   3. Get Profile        - User data retrieval
echo   4. Update Profile     - Name = "Jmeter Test User"
echo   5. Create Category    - Extract category_id
echo   6. Get Contacts       - Buzz installed contacts
echo   7. Add People         - Add contacts to category
echo   8. Get People List    - Retrieve category people
echo   9A. Mute People       - Mute operations (2 hours)
echo   9B. Block People      - Block operations
echo   10. Update Category   - Category name update
echo   11. Get Categories    - List all categories
echo   12. Call History      - Incoming call history
echo.
echo TEST DATA FILES:
echo   - buzz_100_users.csv      (100 user records)
echo   - buzz_test_contacts.csv  (100 contact records)
echo.
echo EXPECTED RESULTS:
echo   - Response Time: ^<2s (95th percentile)
echo   - Peak TPS: 50+ requests/second  
echo   - Error Rate: ^<0.5%% overall
echo   - Success Rate: 99.5%%+ end-to-end
echo.
echo TEST IMPACT:
echo   - SMS: 100 OTP messages will be sent
echo   - DATABASE: 100 users + categories created
echo   - CONNECTIONS: 100 concurrent connections
echo.
pause

echo.
echo CHECKING TEST DATA FILES...
echo.

if not exist "buzz_100_users.csv" (
    echo ERROR: buzz_100_users.csv not found!
    echo Run generate_buzz_test_data.py to create test data
    pause
    exit /b 1
)

if not exist "buzz_test_contacts.csv" (
    echo ERROR: buzz_test_contacts.csv not found!
    echo Run generate_buzz_test_data.py to create test data
    pause
    exit /b 1
)

if not exist "BUZZ_100_USERS_COMPLETE_TEST.jmx" (
    echo ERROR: BUZZ_100_USERS_COMPLETE_TEST.jmx not found!
    pause
    exit /b 1
)

echo SUCCESS: All required files found
echo   - buzz_100_users.csv
echo   - buzz_test_contacts.csv
echo   - BUZZ_100_USERS_COMPLETE_TEST.jmx
echo.

echo CREATING RESULTS DIRECTORY...
mkdir results 2>nul
echo.

echo STARTING 100 USERS VALIDATION TEST...
echo.
echo TEST PHASES:
echo   - Phase 1 (0-1 min): Gradual ramp-up to 100 users
echo   - Phase 2 (1-10 min): Sustained 100 user load
echo   - Phase 3 (10-15 min): Natural test completion
echo.

echo LAUNCHING JMETER...
echo.

jmeter -n -t BUZZ_100_USERS_COMPLETE_TEST.jmx -l results\buzz_100_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_100_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo 100 USERS VALIDATION TEST COMPLETED!
echo.

echo RESULTS LOCATION:
for %%f in (results\buzz_100_users_*.jtl) do echo   JTL File: %%f
for %%f in (results\html_report_100_users_*) do echo   HTML Report: %%f\index.html
echo.

echo NEXT STEPS:
echo 1. Open HTML report to analyze results
echo 2. Check success rate (target: 99.5%%+)
echo 3. If successful, proceed to 1000 user test
echo 4. Clean up test data if needed
echo.

echo TEST COMPLETED!
pause
