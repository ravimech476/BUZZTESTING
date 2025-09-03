@echo off
echo.
echo ============================================================
echo  BUZZ WEBSOCKET REAL-TIME PERFORMANCE TEST (CORRECTED)
echo ============================================================
echo.
echo 🌐 WEBSOCKET TESTING CONFIGURATION:
echo   ├── WebSocket Server: ws://buzz.pazl.info:3000
echo   ├── Test Type: Real-time WebSocket functionality
echo   ├── Concurrent Users: 20 WebSocket connections
echo   ├── Test Duration: 5 minutes (300 seconds)
echo   ├── Ramp-up Time: 60 seconds
echo   ├── CSV Data File: websocket_test_users.csv
echo   └── Test Scope: Full WebSocket lifecycle testing
echo.
echo 📊 CSV DATA CONFIGURATION:
echo   ├── CSV File: websocket_test_users.csv
echo   ├── Required Columns: phoneNumber,userId,targetUserId,userName
echo   ├── Data Source: userId and targetUserId read from CSV
echo   ├── User Pairing: Each user calls their assigned targetUserId
echo   ├── Data Recycling: Enabled (reuses CSV data for long tests)
echo   └── Sample CSV Format:
echo       phoneNumber,userId,targetUserId,userName
echo       7344312970,384,385,Jmeter Test User
echo       7344312971,385,386,Jmeter Test User
echo.
echo 🔄 CORRECTED WEBSOCKET TEST SCENARIOS (Flutter Code Compliant):
echo   ├── ✅ WebSocket Connection Establishment
echo   ├── 👤 User Registration (REQUIRED FIRST - type: register)
echo   ├── 📞 Call Triggering (type: call, userId, targetId) - FROM CSV
echo   ├── ✅ Call Accept/Reject (type: accept/reject, userId, targetId, id)
echo   ├── ⏱️  Real-time Message Latency Testing
echo   ├── 🔚 Call End Monitoring (listen for call_ended messages)
echo   └── 🔍 Connection Health Monitoring
echo.
echo 📊 EXPECTED REAL-TIME METRICS:
echo   ├── WebSocket connection success rate
echo   ├── User registration success rate
echo   ├── Call setup success rate (using CSV userId -> targetUserId)
echo   ├── Message delivery latency (ms)
echo   ├── Call accept/reject response time
echo   └── Connection stability under load
echo.
echo 🎯 REAL-TIME PERFORMANCE TARGETS:
echo   ├── Connection Success Rate: ^>95%%
echo   ├── Registration Success Rate: ^>98%%
echo   ├── Call Setup Success Rate: ^>90%%
echo   ├── Message Latency: ^<500ms
echo   ├── Call Response Time: ^<2 seconds
echo   └── Connection Stability: ^>99%%
echo.
echo 🚨 FLUTTER CODE COMPLIANCE NOTES:
echo   ├── Registration MUST happen before any calls
echo   ├── Call messages match exact Flutter format
echo   ├── Accept/Reject messages include call ID
echo   ├── Monitors for proper response message types
echo   ├── Handles "Target not available" scenarios
echo   ├── UserId and TargetId loaded from CSV file
echo   └── Listens for call_ended messages (no send)
echo.
echo 📝 CORRECTED WEBSOCKET MESSAGE FORMATS (with CSV data):
echo   ├── Register: {"type":"register","userId":"[FROM_CSV]"}
echo   ├── Call: {"type":"call","userId":"[FROM_CSV]","targetId":"[FROM_CSV]"}
echo   ├── Accept: {"type":"accept","userId":"[FROM_CSV]","targetId":"[FROM_CSV]","id":"[userId]"}
echo   ├── Reject: {"type":"reject","userId":"[FROM_CSV]","targetId":"[FROM_CSV]","id":"[userId]"}
echo   └── Expected Responses: registered, incoming_call, call_ended, call_accepted, call_rejected
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
echo 🚀 STARTING CORRECTED BUZZ WEBSOCKET REAL-TIME PERFORMANCE TEST...
echo   📋 Using CSV data for userId and targetUserId mapping
echo.

jmeter -n -t BUZZ_WEBSOCKET_JSR223_TEST.jmx ^
    -l results\websocket_realtime_corrected_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl ^
    -e -o results\websocket_html_report_corrected_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2% ^
    -JCONCURRENT_USERS=20 ^
    -JTEST_DURATION=300 ^
    -JWEBSOCKET_URL=ws://buzz.pazl.info:3000 ^
    -JCSV_FILE=websocket_test_users.csv ^
    -JCSV_VARIABLES=phoneNumber,userId,targetUserId,userName

echo.
echo ✅ CORRECTED WEBSOCKET REAL-TIME PERFORMANCE TEST COMPLETED!
echo.
echo 📊 RESULTS ANALYSIS:
echo   ├── JTL file: results\websocket_realtime_corrected_[timestamp].jtl
echo   ├── HTML Report: results\websocket_html_report_corrected_[timestamp]\
echo   ├── WebSocket Connection Logs: Check jmeter.log
echo   ├── CSV Data Usage: Check for userId/targetUserId mapping success
echo   └── Real-time Performance Metrics: Available in HTML report
echo.
echo 🔍 KEY METRICS TO ANALYZE:
echo   ├── WebSocket Connection Success Rate
echo   ├── User Registration Success Rate (Must be ~100%%)
echo   ├── Call Trigger Success Rate (CSV userId to targetUserId)
echo   ├── Average Message Latency
echo   ├── Call Accept/Reject Response Times
echo   ├── 95th Percentile Response Time
echo   ├── Error Rate and Connection Drops
echo   ├── CSV Data Utilization Rate
echo   └── Throughput (Messages/Second)
echo.
echo 💡 FLUTTER CODE COMPLIANCE INSIGHTS:
echo   ├── Registration step completion rate
echo   ├── Call ID extraction and usage success
echo   ├── Proper message format compliance
echo   ├── Expected response message handling
echo   ├── Call flow completion rates
echo   ├── CSV userId/targetUserId mapping accuracy
echo   └── Server response consistency
echo.
echo 📋 CSV DATA INSIGHTS:
echo   ├── Check if all CSV userIds were successfully registered
echo   ├── Verify targetUserIds are valid and reachable
echo   ├── Monitor "Target not available" message rates
echo   ├── Analyze call success rate between CSV-defined pairs
echo   └── Review data recycling effectiveness for long tests
echo.
echo 🎉 Corrected WebSocket Real-time Performance Testing Complete!
echo   Now matches your Flutter app's WebSocket implementation exactly!
echo   Uses CSV data for realistic userId/targetUserId calling patterns!
echo.
pause