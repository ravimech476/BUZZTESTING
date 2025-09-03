@echo off
setlocal enabledelayedexpansion

echo.
echo ============================================================
echo  BUZZ WEBSOCKET SERVER MONITORING UTILITY
echo ============================================================
echo.
echo 📡 MONITORING WebSocket Server: buzz.pazl.info:3000
echo    Press Ctrl+C to stop monitoring
echo.

set "server=buzz.pazl.info"
set "port=3000" 
set "logfile=results\websocket_server_monitor.log"

REM Create log file with header
echo WebSocket Server Monitoring Log - %date% %time% > "%logfile%"
echo ================================================== >> "%logfile%"
echo. >> "%logfile%"

REM Initialize counters
set /a success_count=0
set /a failure_count=0
set /a total_checks=0

echo 🔄 Starting continuous monitoring...
echo    └── Results logged to: %logfile%
echo.

:monitor_loop

set /a total_checks+=1

REM Get current timestamp
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "timestamp=%dt:~0,4%-%dt:~4,2%-%dt:~6,2% %dt:~8,2%:%dt:~10,2%:%dt:~12,2%"

REM Test server connectivity using ping
ping -n 1 -w 3000 %server% >nul 2>&1

if !errorlevel! equ 0 (
    set /a success_count+=1
    set "status=✅ ONLINE "
    set "log_status=ONLINE"
) else (
    set /a failure_count+=1
    set "status=❌ OFFLINE"
    set "log_status=OFFLINE"
)

REM Calculate uptime percentage
set /a uptime_percent=(success_count * 100) / total_checks

REM Display current status
echo [%timestamp%] %status% - Server: %server%:%port% ^| Uptime: !uptime_percent!%% ^| Checks: %total_checks%

REM Log to file
echo [%timestamp%] %log_status% - Ping Response - Uptime: !uptime_percent!%% - Total Checks: %total_checks% >> "%logfile%"

REM Additional WebSocket-specific tests every 10 checks
set /a check_mod=total_checks %% 10
if !check_mod! equ 0 (
    echo.
    echo 🔍 Running detailed WebSocket connectivity test...
    
    REM Try to establish a basic WebSocket connection test using PowerShell
    powershell -Command "try { $client = New-Object Net.Sockets.TcpClient; $client.ReceiveTimeout = 3000; $client.SendTimeout = 3000; $client.Connect('%server%', %port%); $client.Close(); Write-Output 'TCP_SUCCESS' } catch { Write-Output 'TCP_FAILED' }" > temp_ws_test.txt
    
    set /p ws_test_result=<temp_ws_test.txt
    del temp_ws_test.txt >nul 2>&1
    
    if "!ws_test_result!"=="TCP_SUCCESS" (
        echo    └── ✅ WebSocket port %port% is accessible
        echo [%timestamp%] WEBSOCKET_PORT_TEST - SUCCESS - Port %port% accessible >> "%logfile%"
    ) else (
        echo    └── ❌ WebSocket port %port% is not accessible
        echo [%timestamp%] WEBSOCKET_PORT_TEST - FAILED - Port %port% not accessible >> "%logfile%"
    )
    echo.
)

REM Wait 5 seconds before next check
timeout /t 5 /nobreak >nul

goto :monitor_loop

REM This won't be reached in normal operation (Ctrl+C will terminate)
:end_monitoring
echo.
echo 📊 MONITORING SUMMARY:
echo    ├── Total Checks: %total_checks%
echo    ├── Successful: %success_count%
echo    ├── Failed: %failure_count%
echo    ├── Uptime: !uptime_percent!%%
echo    └── Log File: %logfile%
echo.
pause