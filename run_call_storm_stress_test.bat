@echo off
echo.
echo ============================================================
echo  BUZZ CALL INITIATION STORM - STRESS TEST (120 USERS)
echo ============================================================
echo.
echo CALL STORM STRESS TEST CONFIGURATION:
echo   - Total Users: 120 users from stress_test_users_120.csv
echo   - Test Pattern: Call Initiation Storm (30-60 second peak)
echo   - Random Target Selection: Each caller picks random targets
echo   - Call Rate Target: 10 calls per second system-wide
echo   - Duration: 90 seconds total (30s setup + 60s storm)
echo.
echo THREAD GROUP DISTRIBUTION:
echo   - HEAVY CALLERS: 24 users (20%%) - 10 calls each = 240 calls
echo   - REGULAR CALLERS: 72 users (60%%) - 4 calls each = 288 calls  
echo   - CALL RECEIVERS: 24 users (20%%) - Listen and respond
echo   - TOTAL EXPECTED CALLS: ~528 calls in 60 seconds
echo.
echo STORM TIMELINE:
echo   - 0-30s: All users connect and register (Setup Phase)
echo   - 30-90s: Call Initiation Storm begins
echo   - Heavy Callers: Call every 2-4 seconds (aggressive)
echo   - Regular Callers: Call every 6-10 seconds (normal)
echo   - Receivers: Listen continuously, respond realistically
echo.
echo CALL FLOW PATTERNS:
echo   - Random Target Selection: Users call random targets from pool
echo   - Response Patterns: 70%% Accept, 20%% Reject, 10%% Timeout
echo   - Human Response Times: 2-6 second delays
echo   - Real Stress Conditions: Multiple users calling same targets
echo.
echo CSV FILE VALIDATION:
if not exist stress_test_users_120.csv (
    echo   ERROR: stress_test_users_120.csv not found!
    echo   - File should contain 120 users with format:
    echo   - userId,userName,phoneNumber,countryCode,targetUserId
    echo   - Users should have IDs 384-503 for random targeting
    pause
    exit /b 1
) else (
    echo   CSV file found: stress_test_users_120.csv
    echo   - Heavy Callers will use first 24 users for aggressive calling
    echo   - Regular Callers will use next 72 users for normal calling
    echo   - Receivers will use last 24 users for listening/responding
    echo   - All users can be targeted randomly by any caller
)
echo.
echo STRESS TEST OBJECTIVES:
echo   - Find maximum concurrent call capacity
echo   - Test server stability under call storm conditions
echo   - Measure response degradation during peak load
echo   - Identify bottlenecks in call routing system
echo   - Test WebSocket connection stability under stress
echo.
echo EXPECTED STRESS SCENARIOS:
echo   - Popular Target Overload: Some users may receive 10+ simultaneous calls
echo   - Connection Saturation: 120 concurrent WebSocket connections
echo   - Message Queue Stress: 10+ messages per second sustained
echo   - Database Load: Rapid user lookups and status updates
echo   - Network Throughput: High WebSocket message volume
echo.
echo KEY PERFORMANCE INDICATORS TO MONITOR:
echo   - Connection Success Rate (Target: 100%% for all 120 users)
echo   - Call Trigger Success Rate (Target: >95%% of ~528 calls)
echo   - Average Call Setup Time (Target: <2 seconds under load)
echo   - Server Response Time (Target: <1 second during storm)
echo   - Call Acceptance Rate (Target: ~70%% following response patterns)
echo   - System Stability (Target: No connection drops during stress)
echo.
echo WARNING - HIGH LOAD TEST:
echo   This test will create significant load on your BUZZ server
echo   - 120 concurrent WebSocket connections
echo   - ~10 calls per second for 60 seconds
echo   - High message throughput and database activity
echo   - Monitor server resources during test execution
echo.
pause

echo.
echo STARTING BUZZ CALL INITIATION STORM STRESS TEST...
echo   Preparing 120 users for call storm simulation
echo.

jmeter -n -t BUZZ_CALL_STORM_STRESS_TEST.jmx ^
    -l results\call_storm_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl ^
    -e -o results\call_storm_report_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo BUZZ CALL INITIATION STORM STRESS TEST COMPLETED!
echo.
echo STRESS TEST RESULTS ANALYSIS:
echo   - JTL File: results\call_storm_[timestamp].jtl  
echo   - HTML Report: results\call_storm_report_[timestamp]\
echo   - Server performance data logged in jmeter.log
echo   - Open HTML report for detailed stress analysis
echo.
echo CRITICAL SUCCESS METRICS TO VERIFY:
echo   - Connection Establishment: All 120 users should connect successfully
echo   - Call Volume Achievement: ~528 calls should be triggered total
echo   - Storm Performance: 10 calls/second sustained during peak
echo   - Response Distribution: ~70%% accept, 20%% reject, 10%% timeout
echo   - Server Stability: No connection drops or server errors
echo   - Response Times: Call setup times under stress conditions
echo.
echo STRESS TEST INSIGHTS YOU'LL GAIN:
echo   - Maximum concurrent call capacity of your BUZZ server
echo   - Performance degradation patterns under high load
echo   - Bottlenecks in call routing and WebSocket handling
echo   - Server resource utilization during peak usage
echo   - Connection stability under sustained high load
echo   - Database performance with rapid user lookups
echo.
echo POST-TEST ANALYSIS RECOMMENDATIONS:
echo   - Review HTML report graphs for performance patterns
echo   - Check jmeter.log for any error patterns or warnings
echo   - Monitor server logs for resource usage and errors
echo   - Identify performance bottlenecks from response time data
echo   - Document maximum sustainable call rate for capacity planning
echo   - Plan optimizations based on identified stress points
echo.
echo NEXT STEPS FOR SCALING:
echo   If this 120-user storm test succeeds:
echo   - Consider testing with 200-500 users for higher load
echo   - Test longer duration storms (5-10 minutes)
echo   - Add geographic distribution for network stress
echo   - Test recovery scenarios after overload conditions
echo.
echo BUZZ Call Storm Stress Test Complete!
echo   Your server has been tested under realistic high-load conditions
echo   Check the results to understand your system's stress capacity
echo.
pause