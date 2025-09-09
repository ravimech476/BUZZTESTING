@echo off
echo.
echo ============================================================
echo  BUZZ 10 USERS - COMPLETE WORKFLOW VALIDATION TEST
echo ============================================================
echo.
echo TEST CONFIGURATION:
echo   - 10 concurrent users
echo   - 30 seconds ramp-up time
echo   - 5 minutes total test time
echo   - Complete 12-step API workflow
echo   - Target: 5-10 TPS moderate load
echo.
echo COMPLETE API WORKFLOW (12 Steps):
echo   1. Send OTP           - User registration
echo   2. Verify OTP         - JWT token extraction
echo   3. Get Profile        - User data retrieval
echo   4. Update Profile     - Personalized name update
echo   5. Create Category    - Extract category_id
echo   6. Get Contacts       - Buzz installed contacts
echo   7. Add People         - Add contacts to category
echo   8. Get People List    - Retrieve category people
echo   9A. Mute People       - Mute operations (1 hour)
echo   9B. Block People      - Block operations
echo   10. Update Category   - Category name update
echo   11. Get Categories    - List all categories
echo   12. Call History      - Incoming call history
echo.
echo TEST DATA FILES:
echo   - buzz_10_users.csv       (10 user records)
echo   - buzz_test_contacts.csv  (15 contact records)
echo.
echo EXPECTED RESULTS:
echo   - Response Time: ^<1s (95th percentile)
echo   - Peak TPS: 5-10 requests/second   
echo   - Error Rate: ^<1%% overall
echo   - Success Rate: 99%%+ end-to-end
echo.
echo TEST IMPACT:
echo   - SMS: 10 OTP messages will be sent
echo   - DATABASE: 10 users + categories created
echo   - CONNECTIONS: 10 concurrent connections
echo.
pause

echo.
echo CHECKING TEST DATA FILES...
echo.

if not exist "buzz_10_users.csv" (
    echo ERROR: buzz_10_users.csv not found!
    echo Please create this file with 10 user records
    pause
    exit /b 1
)

if not exist "buzz_test_contacts.csv" (
    echo ERROR: buzz_test_contacts.csv not found!
    echo Please create this file with contact records
    pause
    exit /b 1
)

if not exist "BUZZ_REAL10.jmx" (
    echo ERROR: BUZZ_REAL10.jmx not found!
    pause
    exit /b 1
)

echo SUCCESS: All required files found
echo   - buzz_10_users.csv
echo   - buzz_test_contacts.csv
echo   - BUZZ_10_USERS_COMPLETE_TEST.jmx
echo.

echo CREATING RESULTS DIRECTORY...
mkdir results 2>nul
echo.

echo STARTING 10 USERS VALIDATION TEST...
echo.
echo TEST PHASES:
echo   - Phase 1 (0-30s): Gradual ramp-up to 10 users
echo   - Phase 2 (30s-4m): Sustained 10 user load
echo   - Phase 3 (4-5m): Natural test completion
echo.

echo LAUNCHING JMETER...
echo.

jmeter -n -t BUZZ_REAL10.jmx -l results\buzz_10_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_10_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo 10 USERS VALIDATION TEST COMPLETED!
echo.

echo RESULTS LOCATION:
for %%f in (results\buzz_10_users_*.jtl) do echo   JTL File: %%f
for %%f in (results\html_report_10_users_*) do echo   HTML Report: %%f\index.html
echo.

echo NEXT STEPS:
echo 1. Open HTML report to analyze results
echo 2. Check success rate (target: 99%%+)
echo 3. If successful, proceed to higher load tests
echo 4. Clean up test data if needed
echo.

echo TEST COMPLETED!
pause