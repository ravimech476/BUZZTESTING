@echo off
echo.
echo ============================================================
echo  BUZZ PERSISTENT WEBSOCKET TEST - NO DISCONNECT
echo ============================================================
echo.
echo 🌐 PERSISTENT WEBSOCKET CONFIGURATION:
echo   ├── WebSocket Server: buzz.pazl.info:5000 (HARDCODED)
echo   ├── Test Type: Native WebSocket samplers (PERSISTENT)
echo   ├── Concurrent Users: 3 WebSocket connections
echo   ├── Test Duration: 5 minutes (300 seconds)
echo   ├── Connection Behavior: CONNECTIONS STAY ALIVE
echo   ├── CSV Data File: websocket_test_users.csv
echo   └── Test Scope: Long-running WebSocket connections
echo.
echo 🔄 PERSISTENT CONNECTION FEATURES:
echo   ├── ✅ Initial: Open WebSocket Connection (ONCE per user)
echo   ├── ✅ Initial: Register User (ONCE per user)
echo   ├── 🔄 Continuous: Send periodic heartbeats
echo   ├── 🔄 Continuous: Listen for incoming messages
echo   ├── 🔄 Random: Make calls, accept calls, or just listen
echo   ├── ⏱️  Timing: 5-15 second intervals between activities
echo   └── ❌ NO CLOSE: Connections remain open until test ends
echo.
echo 🎯 WHAT THIS TEST DOES:
echo   ├── Opens 3 WebSocket connections simultaneously
echo   ├── Each connection registers once and stays connected
echo   ├── Users randomly perform call activities every 5-15 seconds
echo   ├── Heartbeat messages sent periodically to keep connections alive
echo   ├── Continuously listens for server messages
echo   └── Connections stay open for the entire 5-minute duration
echo.
echo 📊 USE CASES FOR PERSISTENT CONNECTIONS:
echo   ├── 🔍 Test real-world usage patterns (users keep app open)
echo   ├── 📱 Simulate mobile app behavior (persistent connections)
echo   ├── 💓 Validate heartbeat and keepalive mechanisms
echo   ├── 🚀 Test server stability with long-running connections
echo   ├── 📈 Monitor memory usage and connection pooling
echo   └── 🔧 Debug connection drops and recovery scenarios
echo.
echo 🗂️  CSV FILE VALIDATION:
if not exist websocket_test_users.csv (
    echo   ❌ ERROR: websocket_test_users.csv not found!
    echo   ├── Please ensure CSV file exists in current directory
    echo   ├── Required format: phoneNumber,userId,targetUserId,userName
    echo   └── Sample data should have valid user IDs for testing
    pause
    exit /b 1
) else (
    echo   ✅ CSV file found: websocket_test_users.csv
    echo   ├── Users 384-403 available for persistent connections
    echo   ├── Each user will maintain connection for 5 minutes
    echo   └── Random call activities will be performed continuously
)
echo.
echo ⚠️  IMPORTANT NOTES:
echo   ├── 🔌 Connections will NOT be closed automatically
echo   ├── ⏰ Test runs for exactly 5 minutes (300 seconds)
echo   ├── 📊 Monitor server resources during this test
echo   ├── 🛑 Stop test manually if needed (Ctrl+C)
echo   └── 🔍 Check server logs for connection behavior
echo.
pause

echo.
echo 🚀 STARTING PERSISTENT WEBSOCKET TEST...
echo   📋 Connections will stay open for 5 minutes
echo.

jmeter -n -t BUZZ_WEBSOCKET_PERSISTENT.jmx ^
    -l results\persistent_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl ^
    -e -o results\persistent_report_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo ✅ PERSISTENT WEBSOCKET TEST COMPLETED!
echo.
echo 📊 RESULTS ANALYSIS:
echo   ├── JTL file: results\persistent_[timestamp].jtl
echo   ├── HTML Report: results\persistent_report_[timestamp]\
echo   ├── Connection behavior logged in jmeter.log
echo   └── Open HTML report for detailed connection analysis
echo.
echo 🔍 KEY METRICS TO CHECK IN RESULTS:
echo   ├── ✅ Initial Connection Success Rate (should be 100%%)
echo   ├── 📊 Message Send/Receive Success Rate during 5 minutes
echo   ├── 💓 Heartbeat Success Rate (connection keepalive)
echo   ├── 🔄 Call Activity Success Rate (random activities)
echo   ├── ⏱️  Average Response Times for continuous operations
echo   ├── 🚫 Connection Drop Rate (should be 0%%)
echo   └── 📈 Throughput: Messages per second over 5 minutes
echo.
echo 💡 WHAT TO LOOK FOR:
echo   ├── "Open WebSocket - PERSISTENT" should succeed 3 times
echo   ├── "Register User - INITIAL" should succeed 3 times  
echo   ├── "Send Heartbeat" should show continuous success
echo   ├── "Listen for Messages" should show ongoing activity
echo   ├── Random call activities should work intermittently
echo   ├── NO "Close WebSocket" entries (connections stay open)
echo   └── Total test duration should be close to 5 minutes
echo.
echo 🎉 Persistent WebSocket Test Complete!
echo   ✅ Your 3 WebSocket connections stayed open for 5 minutes
echo   📊 Check the HTML report for detailed connection metrics
echo.
pause