@echo off
echo.
echo ============================================================
echo  LAUNCH JMETER GUI - BUZZ WEBSOCKET TESTS
echo ============================================================
echo.
echo Available Test Plans:
echo   [1] Realistic WebSocket Test (Proper User Interactions)
echo   [2] Call Storm Stress Test (120 users - HIGH LOAD) 
echo   [3] OPTIMIZED Call Storm (120 users - FIXED TIMEOUTS)
echo   [4] Persistent WebSocket Test (NO DISCONNECT)
echo   [5] Basic Working Test (3 users - Functional)
echo   [6] Open JMeter GUI without loading test
echo   [0] Exit
echo.
set /p choice="Select test plan to open in JMeter GUI [0-6]: "

if "%choice%"=="1" goto :realistic_gui
if "%choice%"=="2" goto :storm_gui
if "%choice%"=="3" goto :optimized_gui
if "%choice%"=="4" goto :persistent_gui
if "%choice%"=="5" goto :working_gui
if "%choice%"=="6" goto :empty_gui
if "%choice%"=="0" goto :exit
goto :invalid

:realistic_gui
echo.
echo Opening Realistic WebSocket Test in JMeter GUI...
echo   - Proper caller-receiver interactions
echo   - Real user behavior simulation
echo   - 5 concurrent users with realistic patterns
echo.
jmeter -t BUZZ_WEBSOCKET_REALISTIC.jmx
goto :end

:storm_gui
echo.
echo Opening Call Storm Stress Test in JMeter GUI...
echo   WARNING: This is a HIGH LOAD test plan
echo   - 120 concurrent users
echo   - Intensive calling patterns
echo   - Stress testing configuration
echo.
jmeter -t BUZZ_CALL_STORM_STRESS_TEST.jmx
goto :end

:optimized_gui
echo.
echo Opening OPTIMIZED Call Storm Test in JMeter GUI...
echo   SUCCESS: This version has TIMEOUT FIXES applied
echo   - Reduced receiver timeouts from 6s to 2s
echo   - Faster response times (0.5-2s vs 2-6s)
echo   - Smart targeting (60-70%% calls target receivers)
echo   - Expected 90%+ success rate (up from 84%%)
echo.
jmeter -t BUZZ_CALL_STORM_OPTIMIZED.jmx
goto :end

:persistent_gui
echo.
echo Opening Persistent WebSocket Test in JMeter GUI...
echo   - Connections stay open for 5 minutes
echo   - Continuous activities
echo   - Long-running connection testing
echo.
jmeter -t BUZZ_WEBSOCKET_PERSISTENT.jmx
goto :end

:working_gui
echo.
echo Opening Basic Working Test in JMeter GUI...
echo   - Simple functional verification
echo   - 3 users with basic call flow
echo   - Good for debugging and validation
echo.
jmeter -t BUZZ_WEBSOCKET_WORKING.jmx
goto :end

:empty_gui
echo.
echo Opening JMeter GUI without any test plan...
echo   - Empty JMeter interface
echo   - Load test plans manually via File > Open
echo.
jmeter
goto :end

:invalid
echo.
echo Invalid choice. Please select a number between 0-6.
pause
goto start

:exit
echo.
echo Goodbye!
goto :end

:start
goto :top

:top
@echo off
echo.
echo ============================================================
echo  LAUNCH JMETER GUI - BUZZ WEBSOCKET TESTS
echo ============================================================
echo.
echo Available Test Plans:
echo   [1] Realistic WebSocket Test (Proper User Interactions)
echo   [2] Call Storm Stress Test (120 users - HIGH LOAD) 
echo   [3] OPTIMIZED Call Storm (120 users - FIXED TIMEOUTS)
echo   [4] Persistent WebSocket Test (NO DISCONNECT)
echo   [5] Basic Working Test (3 users - Functional)
echo   [6] Open JMeter GUI without loading test
echo   [0] Exit
echo.
set /p choice="Select test plan to open in JMeter GUI [0-6]: "

if "%choice%"=="1" goto :realistic_gui
if "%choice%"=="2" goto :storm_gui
if "%choice%"=="3" goto :optimized_gui
if "%choice%"=="4" goto :persistent_gui
if "%choice%"=="5" goto :working_gui
if "%choice%"=="6" goto :empty_gui
if "%choice%"=="0" goto :exit
goto :invalid

:end
echo.
echo JMeter GUI session ended.
pause