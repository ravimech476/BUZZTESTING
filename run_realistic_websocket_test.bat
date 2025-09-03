@echo off
echo.
echo ============================================================
echo  BUZZ REALISTIC WEBSOCKET INTERACTION TEST
echo ============================================================
echo.
echo REALISTIC BUZZ CALL FLOW SIMULATION:
echo   - CALLERS: 2 users who initiate calls
echo   - RECEIVERS: 2 users who listen and respond to calls  
echo   - MONITOR: 1 user for connection monitoring
echo   - REAL USER-TO-USER INTERACTIONS
echo.
echo HOW BUZZ ACTUALLY WORKS (Implemented Correctly):
echo   - User A triggers call to User B
echo   - User B receives incoming_call notification
echo   - User B decides: Accept (70%%) ^| Reject (20%%) ^| No Response (10%%)
echo   - If Accept: User A gets "call_accepted"
echo   - If Reject: User A gets "call_rejected"  
echo   - If No Response (5+ sec): User A gets "call_ended"
echo.
echo THREAD GROUP CONFIGURATION:
echo   - CALLERS (2 users x 5 calls each = 10 total calls)
echo   - RECEIVERS (2 users listening continuously for 60 seconds)
echo   - MONITOR (1 user sending heartbeats and handling pings)
echo   - Total Test Duration: ~60 seconds
echo   - All connections maintained throughout test
echo.
echo KEY IMPROVEMENTS FROM PREVIOUS TEST:
echo   - FIXED: Users don't call themselves anymore
echo   - FIXED: Real caller to receiver interaction flow
echo   - FIXED: Proper handling of 3 response scenarios
echo   - FIXED: Realistic human response times (1-4 seconds)
echo   - FIXED: Probability-based accept/reject decisions
echo   - ADDED: Comprehensive logging for call flows
echo   - ADDED: Ping frame handling in monitor thread
echo   - ADDED: Timeout scenario testing (no response)
echo.
echo EXPECTED CALL FLOW RESULTS:
echo   - ~7 calls should be ACCEPTED (70%%)
echo   - ~2 calls should be REJECTED (20%%)
echo   - ~1 call should TIMEOUT - no response (10%%)
echo   - All callers will see appropriate responses
echo   - Detailed logs will show actual user interactions
echo.
echo CSV FILE VALIDATION:
if not exist websocket_test_users.csv (
    echo   ERROR: websocket_test_users.csv not found!
    echo   - Please ensure CSV file exists in current directory
    echo   - Required format: phoneNumber,userId,targetUserId,userName
    echo   - Sample data should have valid user IDs for testing
    pause
    exit /b 1
) else (
    echo   CSV file found: websocket_test_users.csv
    echo   - CALLERS will use userId from CSV to make calls
    echo   - RECEIVERS will use userId from CSV to accept/reject
    echo   - Target mapping: User calls their assigned targetUserId
    echo   - Real user-to-user interaction will be simulated
)
echo.
echo WHAT TO LOOK FOR IN RESULTS:
echo   - "CALLER - Trigger Call" should succeed (HTTP 200)
echo   - "RECEIVER - Listen for Incoming Call" should capture calls
echo   - "RECEIVER - Accept Call" should send accept responses
echo   - "RECEIVER - Reject Call" should send reject responses
echo   - Some receivers will not respond (timeout simulation)
echo   - "CALLER - Listen for Response" should get proper responses
echo   - Log entries will show detailed call flow interactions
echo   - Success rates should reflect realistic call patterns
echo.
echo IMPORTANT NOTES:
echo   - This test simulates REAL user interactions
echo   - Callers actually wait for receiver responses
echo   - Receivers make realistic accept/reject decisions
echo   - Response times simulate human behavior (1-4 seconds)
echo   - Results will show actual BUZZ app usage patterns
echo   - Check jmeter.log for detailed call flow traces
echo.
pause

echo.
echo STARTING REALISTIC WEBSOCKET INTERACTION TEST...
echo   Simulating real BUZZ user call interactions
echo.

jmeter -n -t BUZZ_WEBSOCKET_REALISTIC.jmx ^
    -l results\realistic_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl ^
    -e -o results\realistic_report_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo REALISTIC WEBSOCKET INTERACTION TEST COMPLETED!
echo.
echo RESULTS ANALYSIS:
echo   - JTL file: results\realistic_[timestamp].jtl
echo   - HTML Report: results\realistic_report_[timestamp]\
echo   - Connection behavior logged in jmeter.log
echo   - Open HTML report for detailed interaction analysis
echo.
echo KEY SUCCESS METRICS TO VERIFY:
echo   - WebSocket Connection Success Rate (should be 100%% for all 5 users)
echo   - Call Trigger Success Rate (callers should successfully send calls)
echo   - Incoming Call Detection Rate (receivers should detect incoming calls)
echo   - Response Success Rate (receivers should successfully respond)
echo   - Response Reception Rate (callers should receive responses)
echo   - Response Distribution: ~70%% accept, ~20%% reject, ~10%% timeout
echo   - Log Quality: Clear caller to receiver interaction traces
echo.
echo WHAT SUCCESS LOOKS LIKE:
echo   - All 5 WebSocket connections established successfully
echo   - 10 total calls triggered by callers (2 users x 5 calls each)
echo   - All calls received by appropriate target users
echo   - Receivers respond with realistic accept/reject/timeout patterns
echo   - Callers receive appropriate call_accepted/call_rejected/call_ended responses
echo   - No "user calling themselves" scenarios
echo   - Ping frames handled without errors
echo   - Clean connection management throughout test
echo.
echo PERFORMANCE INSIGHTS YOU'LL GET:
echo   - Real-world BUZZ call success/failure patterns
echo   - Actual response times for call flows
echo   - User interaction quality under concurrent usage
echo   - WebSocket connection stability during real usage
echo   - Server performance with realistic call patterns
echo   - Any issues with call routing or response handling
echo.
echo Realistic WebSocket Interaction Test Complete!
echo   Your BUZZ app now tested with REAL user interaction patterns!
echo   Check the HTML report and logs for detailed call flow analysis
echo.
pause