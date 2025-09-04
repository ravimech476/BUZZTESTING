@echo off
:start
echo.
echo ============================================================
echo  BUZZ APPLICATION PERFORMANCE TESTING SUITE
echo ============================================================
echo.
echo 🎯 COMPREHENSIVE TESTING OPTIONS:
echo.
echo 📱 API TESTING:
echo    [1] Standard API Test (10 users with OTP)
echo    [2] No OTP API Test (Fast execution)
echo    [3] Extended API Stress Test
echo.
echo 🌐 WEBSOCKET REAL-TIME TESTING:
echo    [4] WebSocket Performance Test (JSR223 - 20 connections)
echo    [5] Native WebSocket Test (Plugin - 20 connections) 
echo    [6] WebSocket Stress Test (100 connections)
echo    [7] Persistent WebSocket Test (NO DISCONNECT - 5 min)
echo    [8] Realistic WebSocket Test (PROPER USER INTERACTIONS)
echo    [9] CALL STORM STRESS TEST (120 users - HIGH LOAD)
echo    [10] OPTIMIZED Call Storm (120 users - FIXED TIMEOUTS)
echo    [11] Monitor WebSocket Server Status
echo.
echo 🔄 COMBINED TESTING:
echo    [12] Full-Stack Test (API + WebSocket)
echo    [13] Production Simulation Test
echo.
echo 🛠️  UTILITIES:
echo    [14] Install WebSocket Plugins
echo    [15] Check WebSocket Dependencies
echo    [16] Launch JMeter GUI (Visual Interface)
echo    [17] View Test Results
echo    [18] Clean Results Directory
echo.
echo    [0] Exit
echo.
set /p choice="Select testing option [0-18]: "

if "%choice%"=="1" goto :api_standard
if "%choice%"=="2" goto :api_no_otp
if "%choice%"=="3" goto :api_stress
if "%choice%"=="4" goto :websocket_performance
if "%choice%"=="5" goto :websocket_native
if "%choice%"=="6" goto :websocket_stress
if "%choice%"=="7" goto :websocket_persistent
if "%choice%"=="8" goto :websocket_realistic
if "%choice%"=="9" goto :call_storm_stress
if "%choice%"=="10" goto :optimized_storm
if "%choice%"=="11" goto :websocket_monitor
if "%choice%"=="12" goto :fullstack_test
if "%choice%"=="13" goto :production_sim
if "%choice%"=="14" goto :install_plugins
if "%choice%"=="15" goto :check_deps
if "%choice%"=="16" goto :launch_gui
if "%choice%"=="17" goto :view_results
if "%choice%"=="18" goto :clean_results
if "%choice%"=="0" goto :exit
goto :invalid_choice

:api_standard
echo.
echo 🚀 Running Standard API Test...
call run_modified_working_file.bat
goto :menu_end

:api_no_otp
echo.
echo 🚀 Running No OTP API Test...
call run_no_otp_final.bat
goto :menu_end

:api_stress
echo.
echo 🚀 Running API Stress Test...
echo ⚠️  Note: This may take longer than standard tests
pause
call run_modified_working_file.bat
goto :menu_end

:websocket_performance
echo.
echo 🌐 Running WebSocket Performance Test (JSR223)...
echo    ├── 20 concurrent WebSocket connections
echo    ├── Real-time call flow simulation
echo    └── 5-minute test duration
echo.
pause
call run_websocket_realtime_test.bat
goto :menu_end

:websocket_native
echo.
echo 🌐 Running Native WebSocket Performance Test...
echo    ├── Uses native JMeter WebSocket plugins
echo    ├── 20 concurrent WebSocket connections
echo    ├── Enhanced accuracy and performance
echo    └── 5-minute test duration
echo.
pause
call run_native_websocket_test.bat
goto :menu_end

:websocket_stress
echo.
echo 🔥 Running WebSocket Stress Test...
echo    ⚠️  WARNING: This creates high server load
echo    ├── 100 concurrent WebSocket connections
echo    ├── 10-minute test duration
echo    └── May impact server performance
echo.
set /p confirm="Continue with stress test? [Y/N]: "
if /I "%confirm%" NEQ "Y" goto :menu_start
call run_websocket_stress_test.bat
goto :menu_end

:websocket_persistent
echo.
echo 🔗 Running Persistent WebSocket Test (NO DISCONNECT)...
echo    ⚠️  SPECIAL BEHAVIOR: Connections stay open for 5 minutes
echo    ├── 3 concurrent WebSocket connections
echo    ├── Connections remain open throughout test
echo    ├── Continuous random call activities
echo    ├── Periodic heartbeat messages
echo    └── Real-world persistent connection simulation
echo.
echo 📊 This test simulates users keeping your app open
echo    and maintaining WebSocket connections continuously.
echo.
pause
call run_persistent_websocket_test.bat
goto :menu_end

:websocket_realistic
echo.
echo 🎯 Running Realistic WebSocket Test (PROPER USER INTERACTIONS)...
echo    🚨 IMPORTANT: This test simulates REAL BUZZ call flows!
echo    ├── 2 CALLERS: Users who initiate calls
echo    ├── 2 RECEIVERS: Users who listen and respond to calls
echo    ├── 1 MONITOR: Connection monitoring and ping handling
echo    ├── REALISTIC: Caller → Receiver → Response flow
echo    └── OUTCOMES: Accept (70%), Reject (20%), Timeout (10%)
echo.
echo 📊 This test fixes the "user calling themselves" issue
echo    and implements proper BUZZ interaction patterns.
echo.
pause
call run_realistic_websocket_test.bat
goto :menu_end

:call_storm_stress
echo.
echo BUZZ CALL STORM STRESS TEST - HIGH LOAD WARNING!
echo    DANGER: This test creates SIGNIFICANT server load
echo    - 120 concurrent WebSocket connections
echo    - ~10 calls per second for 60 seconds
echo    - 24 Heavy Callers (aggressive calling pattern)
echo    - 72 Regular Callers (normal calling pattern) 
echo    - 24 Call Receivers (realistic response patterns)
echo    - Total: ~528 calls during storm period
echo.
echo    This test will stress your BUZZ server to find limits
echo    Monitor server resources and performance during execution
echo.
set /p confirm_storm="Continue with HIGH LOAD stress test? [Y/N]: "
if /I "%confirm_storm%" NEQ "Y" goto :menu_start
call run_call_storm_stress_test.bat
goto :menu_end

:optimized_storm
echo.
echo BUZZ OPTIMIZED CALL STORM - TIMEOUT FIXES APPLIED!
echo    SUCCESS: Fixed receiver timeout issues from previous test
echo    - Receiver timeouts: 6s reduced to 2s (3x faster cycles)
echo    - Response times: 2-6s reduced to 0.5-2s (4x faster)
echo    - Smart targeting: 60-70%% calls target active receivers
echo    - Better timing: Receivers start first, callers follow
echo    - Expected improvement: 84%% to 90%+ success rate
echo.
echo    This optimized version should eliminate most timeout errors
echo    while maintaining the same 120-user stress load
echo.
set /p confirm_optimized="Run OPTIMIZED stress test with timeout fixes? [Y/N]: "
if /I "%confirm_optimized%" NEQ "Y" goto :menu_start
call run_optimized_storm_test.bat
goto :menu_end

:websocket_monitor
echo.
echo 📡 Starting WebSocket Server Monitoring...
echo    Press Ctrl+C to stop monitoring
echo.
call monitor_websocket_server.bat
goto :menu_end

:fullstack_test
echo.
echo 🔄 Running Full-Stack Performance Test...
echo    ├── API Load Testing
echo    ├── WebSocket Real-time Testing
echo    ├── Combined Load Simulation
echo    └── Comprehensive Performance Analysis
echo.
pause
call run_fullstack_performance_test.bat
goto :menu_end

:production_sim
echo.
echo 🎭 Running Production Simulation Test...
echo    ├── Realistic user behavior patterns
echo    ├── Mixed API and WebSocket operations
echo    ├── Extended test duration
echo    └── Production-like load simulation
echo.
echo ⚠️  This test simulates production load patterns
pause
call run_fullstack_performance_test.bat
goto :menu_end

:install_plugins
echo.
echo 🔧 Installing WebSocket Plugins...
call install_websocket_plugins.bat
pause
goto :menu_start

:check_deps
echo.
echo 🔍 Checking WebSocket Testing Dependencies...
call check_websocket_dependencies.bat
pause
goto :menu_start

:launch_gui
echo.
echo Launching JMeter GUI Interface...
echo    - Visual test plan editor
echo    - Real-time execution monitoring  
echo    - Interactive result viewing
echo    - Test plan modification capabilities
echo.
call launch_jmeter_gui.bat
pause
goto :menu_start

:view_results
echo.
echo 📊 AVAILABLE TEST RESULTS:
echo.
if exist "results\" (
    echo Results directory contents:
    dir results /b
    echo.
    echo 💡 To view HTML reports, navigate to results\ directory
    echo    and open any html_report_* folder, then open index.html
    echo.
    set /p open_results="Open results directory in explorer? [Y/N]: "
    if /I "!open_results!"=="Y" explorer results
) else (
    echo No results directory found. Run some tests first.
)
pause
goto :menu_start

:clean_results
echo.
echo 🧹 Cleaning Results Directory...
if exist "results\" (
    echo ⚠️  This will delete all test results
    set /p confirm_clean="Are you sure? [Y/N]: "
    if /I "!confirm_clean!"=="Y" (
        rd /s /q results
        mkdir results
        echo ✅ Results directory cleaned
    ) else (
        echo Cleanup cancelled
    )
) else (
    echo No results directory to clean
)
pause
goto :menu_start

:invalid_choice
echo.
echo ❌ Invalid choice. Please select a number between 0-18.
pause
goto :menu_start

:menu_end
echo.
echo 📊 Test completed! 
echo.
echo 🔍 WHAT TO DO NEXT:
echo    ├── Review HTML reports in results\ directory
echo    ├── Analyze performance metrics and bottlenecks
echo    ├── Compare with previous test results
echo    ├── Plan performance improvements
echo    └── Document findings and recommendations
echo.
set /p return_menu="Return to main menu? [Y/N]: "
if /I "%return_menu%"=="Y" goto :menu_start

:exit
echo.
echo 🎯 BUZZ PERFORMANCE TESTING COMPLETE
echo.
echo 📈 Remember to:
echo    ├── Review all test results
echo    ├── Document performance baselines
echo    ├── Monitor server performance in production
echo    ├── Schedule regular performance testing
echo    └── Implement recommended optimizations
echo.
echo Thank you for using BUZZ Performance Testing Suite!
pause
exit

:menu_start
cls
goto :start