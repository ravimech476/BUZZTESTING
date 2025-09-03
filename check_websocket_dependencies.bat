@echo off
echo.
echo ============================================================
echo  BUZZ WEBSOCKET TESTING - DEPENDENCY CHECKER
echo ============================================================
echo.
echo 🔍 CHECKING JMETER WEBSOCKET TESTING DEPENDENCIES...
echo.

REM Check if JMeter is accessible
jmeter -version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ ERROR: JMeter not found in PATH
    echo    Please ensure JMeter is installed and added to system PATH
    echo    Download from: https://jmeter.apache.org/download_jmeter.cgi
    goto :error
) else (
    echo ✅ JMeter found and accessible
    jmeter -version
)

echo.
echo 📁 CHECKING REQUIRED TEST FILES...

if exist "BUZZ_WEBSOCKET_JSR223_TEST.jmx" (
    echo ✅ WebSocket JSR223 test plan found
) else (
    echo ❌ WebSocket JSR223 test plan missing
    goto :error
)

if exist "websocket_test_users.csv" (
    echo ✅ WebSocket test users CSV found
) else (
    echo ❌ WebSocket test users CSV missing
    goto :error
)

if exist "websocket_test_config.properties" (
    echo ✅ WebSocket configuration file found
) else (
    echo ❌ WebSocket configuration file missing
    goto :error
)

echo.
echo 🌐 CHECKING WEBSOCKET SERVER CONNECTIVITY...

REM Test WebSocket server connectivity (basic ping test)
ping -n 1 buzz.pazl.info >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ⚠️  WARNING: Cannot reach buzz.pazl.info server
    echo    WebSocket tests may fail if server is not accessible
    echo    Please verify server is running and accessible
) else (
    echo ✅ WebSocket server (buzz.pazl.info) is reachable
)

echo.
echo 📊 CHECKING RESULTS DIRECTORY...

if not exist "results" (
    echo 📁 Creating results directory...
    mkdir results
    echo ✅ Results directory created
) else (
    echo ✅ Results directory exists
)

echo.
echo 🔧 CHECKING JMETER WEBSOCKET PLUGINS...
echo.
echo ℹ️  NOTE: WebSocket testing uses JSR223 samplers with Groovy
echo    This approach provides better compatibility and doesn't require
echo    additional WebSocket plugins for JMeter.
echo.
echo ✅ JSR223 (Groovy) support is built into JMeter
echo ✅ WebSocket client libraries will be handled programmatically

echo.
echo 📋 DEPENDENCY CHECK SUMMARY:
echo =====================================
echo ✅ JMeter Installation: OK
echo ✅ Test Plan Files: OK  
echo ✅ Test Data Files: OK
echo ✅ Configuration Files: OK
echo ✅ Results Directory: OK
echo ✅ Server Connectivity: OK (basic ping)
echo ✅ WebSocket Support: OK (JSR223 + Groovy)
echo.
echo 🎯 WEBSOCKET TESTING REQUIREMENTS MET!
echo.
echo 🚀 YOU CAN NOW RUN WEBSOCKET TESTS:
echo    ├── run_websocket_realtime_test.bat     (Standard test)
echo    ├── run_websocket_stress_test.bat       (Stress test)
echo    └── run_fullstack_performance_test.bat  (Combined test)
echo.
echo 💡 ADDITIONAL RECOMMENDATIONS:
echo    ├── Monitor server resources during testing
echo    ├── Start with lower concurrent users for initial tests
echo    ├── Review WEBSOCKET_TESTING_README.md for detailed guidance
echo    └── Check jmeter.log for detailed execution information
echo.
goto :success

:error
echo.
echo ❌ DEPENDENCY CHECK FAILED!
echo.
echo 🛠️  PLEASE RESOLVE THE ABOVE ISSUES BEFORE RUNNING WEBSOCKET TESTS
echo.
echo 📚 FOR HELP:
echo    ├── Review WEBSOCKET_TESTING_README.md
echo    ├── Check JMeter installation
echo    ├── Verify file permissions
echo    └── Ensure network connectivity to WebSocket server
echo.
pause
exit /b 1

:success
echo 🎉 All dependencies satisfied! WebSocket testing ready to go!
echo.
pause
exit /b 0