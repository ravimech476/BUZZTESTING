@echo off
echo.
echo ============================================================
echo  BUZZ NATIVE WEBSOCKET SIMPLE TEST
echo ============================================================
echo.
echo 🌐 SIMPLE NATIVE WEBSOCKET CONFIGURATION:
echo   ├── WebSocket Server: buzz.pazl.info:3000
echo   ├── Test Type: Native WebSocket samplers (simplified)
echo   ├── Concurrent Users: 5 WebSocket connections
echo   ├── Loop Count: 2 iterations per user
echo   ├── Ramp-up Time: 15 seconds
echo   ├── CSV Data File: websocket_test_users.csv
echo   └── Test Scope: Core WebSocket functionality only
echo.
echo 📊 SIMPLIFIED WEBSOCKET TEST FLOW:
echo   ├── ✅ Open WebSocket Connection
echo   ├── 👤 Register User (type: register)
echo   ├── 📞 Trigger Call (simple write)
echo   ├── ✅ Accept Call (userId as id field)
echo   └── ❌ Close WebSocket Connection
echo.
echo 🔧 SIMPLIFICATION BENEFITS:
echo   ├── No XML parsing issues
echo   ├── Minimal configuration complexity
echo   ├── Basic listeners only
echo   ├── Reduced thread count for stability
echo   ├── Shorter test duration
echo   └── Focus on core WebSocket functionality
echo.
echo 📝 WEBSOCKET MESSAGE FORMATS (CSV data):
echo   ├── Register: {"type":"register","userId":"[FROM_CSV]"}
echo   ├── Call: {"type":"call","userId":"[FROM_CSV]","targetId":"[FROM_CSV]"}
echo   ├── Accept: {"type":"accept","userId":"[FROM_CSV]","targetId":"[FROM_CSV]","id":"[userId]"}
echo   └── Expected: Server responses will appear in View Results Tree
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
echo 🚀 STARTING SIMPLE NATIVE WEBSOCKET TEST...
echo   📋 Using simplified native WebSocket samplers
echo.

jmeter -n -t BUZZ_WEBSOCKET_NATIVE_SIMPLE.jmx ^
    -l results\simple_native_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl

echo.
echo ✅ SIMPLE NATIVE WEBSOCKET TEST COMPLETED!
echo.
echo 📊 RESULTS ANALYSIS:
echo   ├── JTL file: results\simple_native_[timestamp].jtl
echo   ├── Basic test results saved to JTL format
echo   ├── WebSocket Connection Logs: Check jmeter.log
echo   └── Open JTL file in JMeter GUI for detailed analysis
echo.
echo 🔍 BASIC WEBSOCKET METRICS TO CHECK:
echo   ├── WebSocket Connection Success Rate
echo   ├── User Registration Message Sending
echo   ├── Call Trigger Message Sending
echo   ├── Call Accept Message Sending
echo   ├── Connection Close Success
echo   └── Overall Sample Success Rate
echo.
echo 💡 NEXT STEPS:
echo   ├── Check jmeter.log for any WebSocket errors
echo   ├── Open JTL file in JMeter GUI View Results Tree
echo   ├── Verify WebSocket messages are being sent correctly
echo   ├── Monitor server responses in results tree
echo   └── If working, can increase users and loops
echo.
echo 🎉 Simple Native WebSocket Testing Complete!
echo   Basic functionality test - check results before scaling up!
echo.
pause