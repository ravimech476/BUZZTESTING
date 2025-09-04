@echo off
echo.
echo ============================================================
echo  BUZZ 10,000 USERS - PRODUCTION STRESS TEST
echo ============================================================
echo.
echo TEST CONFIGURATION:
echo   - 10,000 concurrent users
echo   - 10 minute ramp-up time
echo   - 45 minutes total test time
echo   - Complete 12-step API workflow
echo   - Target: 1000+ TPS sustained load
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
echo   - buzz_10k_users.csv      (10,000 user records)
echo   - buzz_test_contacts.csv  (100 contact records)
echo.
echo EXPECTED RESULTS:
echo   - Response Time: ^<5s (95th percentile)
echo   - Peak TPS: 1000+ requests/second  
echo   - Error Rate: ^<2%% overall
echo   - Success Rate: 98%%+ end-to-end
echo.
echo CRITICAL STRESS TEST IMPACT:
echo   - SMS: 10,000 OTP messages will be sent (~$70-150 cost)
echo   - DATABASE: 10,000 users + categories created
echo   - CONNECTIONS: 10,000 concurrent connections
echo   - SERVER LOAD: MAXIMUM CPU/memory usage
echo   - NETWORK: High bandwidth utilization
echo   - MONITORING: Critical infrastructure stress testing
echo.
echo WARNING: This is a MAXIMUM LOAD stress test!
echo Only run this test:
echo   - On dedicated test environment
echo   - During planned maintenance windows  
echo   - With infrastructure team monitoring
echo   - After successful 1000-user validation
echo.
pause

echo.
echo CHECKING TEST DATA FILES...
echo.

if not exist "buzz_10k_users.csv" (
    echo ERROR: buzz_10k_users.csv not found!
    echo.
    echo SOLUTION: Generate 10K user data
    echo   python generate_buzz_10k_data.py
    echo   OR
    echo   python generate_buzz_scaled_data.py --users 10000 --filename buzz_10k_users.csv
    echo.
    pause
    exit /b 1
)

if not exist "buzz_test_contacts.csv" (
    echo ERROR: buzz_test_contacts.csv not found!
    echo.
    echo SOLUTION: Use existing file or generate contacts
    echo   python generate_buzz_scaled_data.py --contacts 100 --filename buzz_test_contacts.csv
    echo.
    pause
    exit /b 1
)

if not exist "BUZZ_10K_COMPLETE_STRESS_TEST.jmx" (
    echo ERROR: BUZZ_10K_COMPLETE_STRESS_TEST.jmx not found!
    pause
    exit /b 1
)

echo SUCCESS: All required files found
echo   - buzz_10k_users.csv
echo   - buzz_test_contacts.csv
echo   - BUZZ_10K_COMPLETE_STRESS_TEST.jmx
echo.

echo CREATING RESULTS DIRECTORY...
mkdir results 2>nul
echo.

echo ============================================================
echo  FINAL WARNING - MAXIMUM STRESS TEST
echo ============================================================
echo.
echo This test will cause SIGNIFICANT impact:
echo.
echo FINANCIAL IMPACT:
echo   - 10,000 SMS messages (~$70-150 depending on provider)
echo   - High server resource costs during test
echo.
echo TECHNICAL IMPACT:
echo   - Maximum server load for 45+ minutes
echo   - 10,000+ database records created
echo   - Potential service disruption if limits exceeded
echo   - Network bandwidth saturation possible
echo.
echo PREREQUISITES:
echo   - Dedicated test environment (NOT production)
echo   - Infrastructure team on standby
echo   - Server monitoring tools active
echo   - Database backup completed
echo   - Successful 1000-user test validation
echo.
echo EMERGENCY STOP:
echo   - Press Ctrl+C to abort test if needed
echo   - Monitor server resources continuously
echo   - Be ready to scale down if issues occur
echo.

set /p confirm1="Do you have infrastructure team approval for 10K stress test? (y/n): "
if /i not "%confirm1%"=="y" (
    echo Test cancelled - Infrastructure approval required.
    pause
    exit /b 0
)

set /p confirm2="Is this a dedicated test environment (NOT production)? (y/n): "
if /i not "%confirm2%"=="y" (
    echo Test cancelled - Use dedicated test environment only.
    pause
    exit /b 0
)

set /p confirm3="Are you ready to spend $70-150 on SMS costs? (y/n): "
if /i not "%confirm3%"=="y" (
    echo Test cancelled - SMS costs not approved.
    pause
    exit /b 0
)

echo.
echo FINAL CONFIRMATION: Starting 10,000 user stress test in 10 seconds...
echo Press Ctrl+C now to cancel, or wait to proceed.
timeout /t 10

echo.
echo STARTING 10,000 USERS MAXIMUM STRESS TEST...
echo.
echo TEST PHASES:
echo   - Phase 1 (0-10 min): Gradual ramp-up to 10,000 users
echo   - Phase 2 (10-35 min): Sustained 10,000 user load
echo   - Phase 3 (35-45 min): Natural test completion
echo.
echo CRITICAL: Monitor server resources throughout test!
echo.

echo LAUNCHING JMETER WITH 10,000 USERS...
echo Start monitoring: CPU, Memory, Network, Database connections
echo.

jmeter -n -t BUZZ_10K_COMPLETE_STRESS_TEST.jmx -l results\buzz_10k_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_10k_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo 10,000 USERS MAXIMUM STRESS TEST COMPLETED!
echo.

echo RESULTS LOCATION:
for %%f in (results\buzz_10k_users_*.jtl) do echo   JTL File: %%f
for %%f in (results\html_report_10k_users_*) do echo   HTML Report: %%f\index.html
echo.

echo IMMEDIATE CRITICAL ANALYSIS REQUIRED:
echo =====================================
echo.
echo 1. PERFORMANCE ANALYSIS (Priority 1):
echo    - Open HTML report immediately
echo    - Check success rate (target: 98%%+ for stress test)
echo    - Verify response times (acceptable: ^<5s 95th percentile)
echo    - Analyze throughput (target: 1000+ req/sec sustained)
echo.
echo 2. INFRASTRUCTURE IMPACT ASSESSMENT:
echo    - Review server resource usage during test
echo    - Check for any service degradation
echo    - Verify system stability post-test
echo    - Document maximum capacity reached
echo.
echo 3. ERROR PATTERN ANALYSIS:
echo    - Identify failure points and bottlenecks
echo    - Check for rate limiting or timeout issues
echo    - Review database connection pool usage
echo    - Analyze network bandwidth utilization
echo.

echo STRESS TEST SUCCESS CRITERIA:
echo =============================
echo.
echo ACCEPTABLE PERFORMANCE (Stress Test Passing):
echo   ✅ Success Rate: 98%%+ (lower than production due to stress)
echo   ✅ Response Time: ^<5s (95th percentile)
echo   ✅ Throughput: 1000+ req/sec sustained
echo   ✅ No complete service failures
echo   ✅ System recovery within 5 minutes post-test
echo.
echo PRODUCTION READINESS INDICATORS:
echo   🚀 Success Rate: 99%%+ would indicate excellent scalability
echo   🚀 Response Time: ^<3s would show production-ready performance  
echo   🚀 Throughput: 1500+ req/sec shows room for growth
echo   🚀 Zero critical failures shows robust architecture
echo.

echo MANDATORY POST-TEST CLEANUP:
echo ============================
echo.
echo CRITICAL - Clean up immediately to prevent production issues:
echo.
echo 1. DATABASE CLEANUP (HIGH PRIORITY):
echo    DELETE FROM users WHERE name = 'Jmeter Test User';
echo    DELETE FROM categories WHERE name LIKE 'Test%%';
echo    DELETE FROM user_contacts WHERE created_by IN (test_user_ids);
echo    TRUNCATE test-related tables if applicable;
echo.
echo 2. SMS/OTP MONITORING:
echo    - Verify 10,000 SMS messages delivery status
echo    - Check SMS service rate limiting impact
echo    - Calculate actual SMS costs incurred
echo    - Monitor for any delivery failures
echo.
echo 3. SYSTEM HEALTH CHECK:
echo    - Verify all services returned to normal operation
echo    - Check error logs for any persistent issues
echo    - Validate database performance post-cleanup
echo    - Monitor memory usage for potential leaks
echo.

echo CAPACITY PLANNING RESULTS:
echo ==========================
echo.
echo Based on 10K user stress test results:
echo.
echo PRODUCTION CAPACITY RECOMMENDATIONS:
echo   - Maximum safe concurrent users: [Analyze from results]
echo   - Recommended production limit: [80%% of max capacity]
echo   - Server scaling triggers: [Response time thresholds]
echo   - Database optimization needs: [Based on bottlenecks found]
echo.
echo INFRASTRUCTURE SCALING PLAN:
echo   - CPU scaling thresholds: [Based on peak usage]
echo   - Memory requirements: [Based on peak usage]
echo   - Database connection pool sizing
echo   - Load balancer configuration needs
echo.

echo NEXT STEPS BASED ON RESULTS:
echo ============================
echo.
echo IF SUCCESS RATE ≥ 98%% AND RESPONSE TIMES ^< 5s:
echo   ✅ ARCHITECTURE READY for high-scale production
echo   ✅ Can handle 10K+ concurrent users safely
echo   ✅ Excellent scalability demonstrated
echo   ✅ Proceed with production deployment confidence
echo.
echo IF SUCCESS RATE ^< 98%% OR SLOW RESPONSE TIMES:
echo   ⚠️  Maximum capacity reached - optimization needed
echo   🔍 Critical bottlenecks identified
echo   🛠️ Infrastructure scaling required before production
echo   📊 Use results for capacity planning and optimization
echo.
echo IF CRITICAL FAILURES OCCURRED:
echo   ❌ Major architectural issues identified
echo   🚨 Infrastructure team consultation required
echo   🔧 Significant optimization needed
echo   🔄 Re-architect before production deployment
echo.

echo 10,000 USERS STRESS TEST ANALYSIS CRITICAL!
echo.
echo IMMEDIATE ACTION: Open HTML report and begin analysis
echo CLEANUP: Run database cleanup scripts immediately
echo MONITORING: Continue system monitoring for next 2 hours
echo.

pause
