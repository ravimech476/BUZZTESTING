@echo off
echo.
echo ============================================================
echo  BUZZ 10,000 USERS - COMPLETE WORKFLOW STRESS TEST
echo ============================================================
echo.
echo TEST CONFIGURATION:
echo   - 10,000 concurrent users
echo   - 300 seconds (5 minutes) ramp-up time
echo   - 30 minutes total test time
echo   - Complete 14-step API workflow
echo   - Target: 200-500 TPS extreme load
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
echo   - buzz_10k_users.csv       (10,000 user records)
echo   - buzz_test_contacts.csv   (10,000 contact records)
echo.
echo EXPECTED RESULTS:
echo   - Response Time: ^<3s (95th percentile)
echo   - Peak TPS: 200-500 requests/second    
echo   - Error Rate: ^<10%% (extreme stress tolerance)
echo   - Success Rate: 90%%+ end-to-end
echo.
echo EXTREME STRESS TEST IMPACT:
echo   - SMS: 10,000 OTP messages will be sent
echo   - DATABASE: 10,000 users + categories created
echo   - CONNECTIONS: 10,000 concurrent connections
echo   - LOAD: EXTREME stress test - ensure server scaling
echo.
echo WARNING: This is an EXTREME LOAD stress test!
echo Make sure the server infrastructure can handle 10,000 concurrent users.
echo Consider using load balancers and multiple server instances.
echo.
pause

echo.
echo GENERATING FRESH TEST DATA...
echo.

if exist "generate_buzz_10k_users_data.py" (
    echo Running Python data generator...
    python generate_buzz_10k_users_data.py
    echo.
) else (
    echo WARNING: Python data generator not found!
    echo Using existing CSV files if available...
    echo.
)

echo CHECKING TEST DATA FILES...
echo.

if not exist "buzz_10k_users.csv" (
    echo ERROR: buzz_10k_users.csv not found!
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

if not exist "BUZZ_REAL10000.jmx" (
    echo ERROR: BUZZ_10K_USERS_COMPLETE_TEST.jmx not found!
    echo Please ensure the JMeter test file is present
    pause
    exit /b 1
)

echo SUCCESS: All required files found
echo   - buzz_10k_users.csv
echo   - buzz_test_contacts.csv
echo   - BUZZ_10K_USERS_COMPLETE_TEST.jmx
echo.

echo CREATING RESULTS DIRECTORY...
mkdir results 2>nul
echo.

echo STARTING 10,000 USERS EXTREME STRESS TEST...
echo.
echo TEST PHASES:
echo   - Phase 1 (0-5m): Gradual ramp-up to 10,000 users
echo   - Phase 2 (5m-25m): Sustained 10,000 user load
echo   - Phase 3 (25-30m): Natural test completion
echo.
echo CRITICAL MONITORING RECOMMENDATIONS:
echo   - Watch server CPU usage across all instances
echo   - Monitor memory consumption and swap usage
echo   - Check database connection pools
echo   - Observe response times and error rates
echo   - Monitor network bandwidth utilization
echo   - Check disk I/O performance
echo.

echo LAUNCHING JMETER WITH EXTREME LOAD SETTINGS...
echo.

jmeter -n -t BUZZ_REAL10000.jmx -l results\buzz_10k_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_10k_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo 10,000 USERS EXTREME STRESS TEST COMPLETED!
echo.

echo RESULTS LOCATION:
for %%f in (results\buzz_10k_users_*.jtl) do echo   JTL File: %%f
for %%f in (results\html_report_10k_users_*) do echo   HTML Report: %%f\index.html
echo.

echo ANALYSIS CHECKLIST:
echo 1. Check overall success rate (target: 90%%+)
echo 2. Verify 95th percentile response time (target: ^<3s)
echo 3. Analyze error distribution by step
echo 4. Review throughput vs response time correlation
echo 5. Identify performance bottlenecks and scaling issues
echo 6. Check server resource utilization across all instances
echo 7. Analyze database performance under extreme load
echo 8. Review network and infrastructure performance
echo.

echo POST-TEST ACTIONS:
echo 1. Clean up test data (10,000 records)
echo 2. Review server logs for errors and warnings
echo 3. Document performance findings and bottlenecks
echo 4. Plan infrastructure scaling if required
echo 5. Optimize database queries and connections
echo 6. Consider implementing caching strategies
echo.

echo EXTREME STRESS TEST COMPLETED!
pause