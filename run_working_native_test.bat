@echo off
echo.
echo ============================================================
echo  BUZZ WORKING NATIVE WEBSOCKET TEST
echo ============================================================
echo.
echo 🌐 CORRECTED NATIVE WEBSOCKET CONFIGURATION:
echo   ├── WebSocket Server: buzz.pazl.info:5000 (HARDCODED - no variables)
echo   ├── Test Type: Native WebSocket samplers (FIXED)
echo   ├── Concurrent Users: 3 WebSocket connections (reduced for testing)
echo   ├── Loop Count: 1 iteration per user
echo   ├── Ramp-up Time: 10 seconds
echo   ├── CSV Data File: websocket_test_users.csv
echo   └── Test Scope: Working WebSocket functionality
echo.
echo 🔧 FIXES APPLIED:
echo   ├── ✅ Fixed: Port number variable resolution issue
echo   ├── ✅ Fixed: Hardcoded server and port values
echo   ├── ✅ Added: Explicit read operations for responses
echo   ├── ✅ Reduced: Thread count for stability testing
echo   ├── ✅ Improved: Timing between operations
echo   └── ✅ Added: Response pattern matching
echo.
echo 📊 ENHANCED WEBSOCKET TEST FLOW:
echo   ├── ✅ Open WebSocket Connection (hardcoded buzz.pazl.info:5000)
echo   ├── 👤 Register User + Read Response
echo   ├── 📞 Trigger Call + Read Response  
echo   ├── ✅ Accept Call + Read Response
echo   └── ❌ Close WebSocket Connection
echo.
echo 📝 WEBSOCKET MESSAGE FORMATS (CSV data):
echo   ├── Register: {"type":"register","userId":"[FROM_CSV]"}
echo   ├── Call: {"type":"call","userId":"[FROM_CSV]","targetId":"[FROM_CSV]"}
echo   ├── Accept: {"type":"accept","userId":"[FROM_CSV]","targetId":"[FROM_CSV]","id":"[userId]"}
echo   └── Expected: registered, incoming_call, call_accepted, call_rejected, call_ended
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
echo 🚀 STARTING WORKING NATIVE WEBSOCKET TEST...
echo   📋 Using corrected native WebSocket samplers
echo.

jmeter -n -t BUZZ_WEBSOCKET_WORKING.jmx ^
    -l results\working_native_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl

echo.
echo ✅ WORKING NATIVE WEBSOCKET TEST COMPLETED!
echo.
echo 📊 RESULTS ANALYSIS:
echo   ├── JTL file: results\working_native_[timestamp].jtl
echo   ├── Test results saved to JTL format
echo   ├── WebSocket Connection Logs: Check jmeter.log
echo   └── Open JTL file in JMeter GUI for detailed analysis
echo.
echo 🔍 KEY SUCCESS METRICS TO CHECK:
echo   ├── WebSocket Connection Success Rate (should be 100%%)
echo   ├── User Registration Success (should see "registered" responses)
echo   ├── Call Trigger Success (should see server responses)
echo   ├── Message Send/Receive Success 
echo   ├── Connection Close Success
echo   └── Overall Sample Success Rate
echo.
echo 💡 WHAT TO LOOK FOR IN RESULTS:
echo   ├── "Open WebSocket" should succeed (no port number errors)
echo   ├── "Register User" should send successfully
echo   ├── "Read Registration Response" should capture server response
echo   ├── "Trigger Call" should send successfully
echo   ├── "Read Call Response" should capture call-related messages
echo   ├── "Accept Call" should send successfully
echo   ├── "Read Accept Response" should capture acceptance response
echo   └── "Close WebSocket" should close cleanly
echo.
echo 🎉 Working Native WebSocket Test Complete!
echo   Fixed the variable resolution issue - check for successful connections!
echo.
pause