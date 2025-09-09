@echo off
echo.
echo ============================================================
echo  BUZZ 100 USERS - COMPLETE WORKFLOW STRESS TEST
echo ============================================================
echo.
echo TEST CONFIGURATION:
echo   - 100 concurrent users
echo   - 60 seconds ramp-up time
echo   - 10 minutes total test time
echo   - Complete 14-step API workflow
echo   - Target: 20-50 TPS high load
echo.
echo COMPLETE API WORKFLOW (14 Steps):
echo   1. Send OTP           - User registration
echo   2. Verify OTP         - JWT token extraction
echo   3. Get Profile        - User data retrieval
echo   4. Update Profile     - Personalized name update
echo   5. Buzz Contacts      - Get installed contacts
echo   6. Create Category    - Extract category_id
echo   7. Update Category    - Category modification
echo   8. Add People         - Add contacts to category
echo   9. Mute People        - Mute operations
echo   10. Block People      - Block operations
echo   11. View People       - Contact details retrieval
echo   12. Remove People     - Remove from category
echo   13. Call History      - Incoming call history
echo   14. Get Categories    - List all categories
echo.
echo TEST DATA FILES:
echo   - buzz_100_users.csv       (100 user records)
echo   - buzz_test_contacts.csv   (100 contact records)
echo.
echo EXPECTED RESULTS:
echo   - Response Time: ^<2s (95th percentile)
echo   - Peak TPS: 20-50 requests/second    
echo   - Error Rate: ^<5%% (stress test tolerance)
echo   - Success Rate: 95%%+ end-to-end
echo.
echo STRESS TEST IMPACT:
echo   - SMS: 100 OTP messages will be sent
echo   - DATABASE: 100 users + categories created
echo   - CONNECTIONS: 100 concurrent connections
echo   - LOAD: High stress test - monitor server resources
echo.
echo WARNING: This is a HIGH LOAD stress test!
echo Make sure the server can handle 100 concurrent users.
echo.
pause

echo.
echo GENERATING FRESH TEST DATA...
echo.

if exist "generate_buzz_100_users_data.py" (
    echo Running Python data generator...
    python generate_buzz_100_users_data.py
    echo.
) else (
    echo WARNING: Python data generator not found!
    echo Using existing CSV files if available...
    echo.
)

echo CHECKING TEST DATA FILES...
echo.

if not exist "buzz_100_users.csv" (
    echo ERROR: buzz_100_users.csv not found!
    echo Please run the data generator first
    pause
    exit /b 1
)

if not exist "buzz_test_contacts.csv" (
    echo ERROR: buzz_test_contacts.csv not found!
    echo Please run the data generator first
    pause
    exit /b 1
)

if not exist "BUZZ_100_USERS_COMPLETE_TEST.jmx" (
    echo ERROR: BUZZ_100_USERS_COMPLETE_TEST.jmx not found!
    echo Please ensure the JMeter test file is present
    pause
    exit /b 1
)

echo SUCCESS: All required files found
echo   - buzz_100_users.csv
echo   - buzz_test_contacts.csv
echo   - BUZZ_REAL100.jmx
echo.

echo CREATING RESULTS DIRECTORY...
mkdir results 2>nul
echo.

echo STARTING 100 USERS STRESS TEST...
echo.
echo TEST PHASES:
echo   - Phase 1 (0-60s): Gradual ramp-up to 100 users
echo   - Phase 2 (60s-8m): Sustained 100 user load
echo   - Phase 3 (8-10m): Natural test completion
echo.
echo MONITORING RECOMMENDATIONS:
echo   - Watch server CPU usage
echo   - Monitor memory consumption
echo   - Check database connections
echo   - Observe response times
echo.

echo LAUNCHING JMETER...
echo.

jmeter -n -t BUZZ_REAL100.jmx -l results\buzz_100_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_100_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo 100 USERS STRESS TEST COMPLETED!
echo.

echo RESULTS LOCATION:
for %%f in (results\buzz_100_users_*.jtl) do echo   JTL File: %%f
for %%f in (results\html_report_100_users_*) do echo   HTML Report: %%f\index.html
echo.

echo ANALYSIS CHECKLIST:
echo 1. Check overall success rate (target: 95%%+)
echo 2. Verify 95th percentile response time (target: ^<2s)
echo 3. Analyze error distribution by step
echo 4. Review throughput vs response time correlation
echo 5. Identify any performance bottlenecks
echo 6. Check server resource utilization
echo.

echo POST-TEST ACTIONS:
echo 1. Clean up test data if needed
echo 2. Review server logs for errors
echo 3. Document performance findings
echo 4. Plan optimization if required
echo.

echo STRESS TEST COMPLETED!
pause