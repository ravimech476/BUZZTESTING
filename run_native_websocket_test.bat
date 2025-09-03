@echo off
echo.
echo ============================================================
echo  BUZZ NATIVE WEBSOCKET PERFORMANCE TEST
echo ============================================================
echo.
echo 🌐 NATIVE WEBSOCKET TESTING CONFIGURATION:
echo   ├── WebSocket Server: buzz.pazl.info:3000
echo   ├── Test Type: Native WebSocket samplers
echo   ├── Concurrent Users: 10 WebSocket connections
echo   ├── Loop Count: 3 iterations per user
echo   ├── Ramp-up Time: 30 seconds
echo   ├── CSV Data File: websocket_test_users.csv
echo   └── Test Scope: Full WebSocket lifecycle testing
echo.
echo 📊 NATIVE WEBSOCKET TEST FLOW:
echo   ├── ✅ Open WebSocket Connection
echo   ├── 👤 Register User (type: register)
echo   ├── 📞 Trigger Call (request-response pattern)
echo   ├── ✅ Accept Call (userId as id field)
echo   ├── 👂 Monitor Call End Messages
echo   └── ❌ Close WebSocket Connection
echo.
echo 🔧 NATIVE SAMPLER ADVANTAGES:
echo   ├── No XML parsing issues
echo   ├── Built-in WebSocket protocol handling
echo   ├── Proper connection management
echo   ├── Request-response pattern matching
echo   ├── Automatic timeout handling
echo   └── Stable WebSocket state management
echo.
echo 📝 WEBSOCKET MESSAGE FORMATS (CSV data):
echo   ├── Register: {"type":"register","userId":"[FROM_CSV]"}
echo   ├── Call: {"type":"call","userId":"[FROM_CSV]","targetId":"[FROM_CSV]"}
echo   ├── Accept: {"type":"accept","userId":"[FROM_CSV]","targetId":"[FROM_CSV]","id":"[userId]"}
echo   └── Expected: registered, incoming_call, call_ended, call_accepted, call_rejected
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
    echo   ├── CSV data will be used for userId and targetUserId mapping
    echo   ├── Each user will call their assigned targetUserId
    echo   └── CSV data will be recycled for concurrent users
)
echo.
pause

echo.
echo 🚀 STARTING NATIVE WEBSOCKET PERFORMANCE TEST...
echo   📋 Using native WebSocket samplers for maximum stability
echo.

jmeter -n -t BUZZ_WEBSOCKET_NATIVE_FIXED.jmx ^
    -l results\native_websocket_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl ^
    -e -o results\native_html_report_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo ✅ NATIVE WEBSOCKET PERFORMANCE TEST COMPLETED!
echo.
echo 📊 RESULTS ANALYSIS:
echo   ├── JTL file: results\native_websocket_[timestamp].jtl
echo   ├── HTML Report: results\native_html_report_[timestamp]\
echo   ├── WebSocket Connection Logs: Check jmeter.log
echo   └── Native Performance Metrics: Available in HTML report
echo.
echo 🔍 KEY NATIVE WEBSOCKET METRICS:
echo   ├── WebSocket Connection Success Rate
echo   ├── User Registration Success Rate
echo   ├── Call Trigger Response Patterns
echo   ├── Average Message Latency
echo   ├── Request-Response Matching Success
echo   ├── Connection Stability
echo   └── Protocol-level Error Rates
echo.
echo 💡 NATIVE SAMPLER INSIGHTS:
echo   ├── Connection establishment reliability
echo   ├── Protocol handshake success rates
echo   ├── Message delivery confirmation
echo   ├── Pattern matching accuracy
echo   ├── Timeout handling effectiveness
echo   └── Connection cleanup success
echo.
echo 🎉 Native WebSocket Performance Testing Complete!
echo   Uses JMeter's built-in WebSocket protocol support!
echo.
pause