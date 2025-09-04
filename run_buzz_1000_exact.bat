@echo off
echo.
echo ============================================================
echo  BUZZ 1000 USERS - EXACT WORKING CONFIGURATION
echo ============================================================
echo.
echo TEST CONFIGURATION:
echo   - 1,000 concurrent users
echo   - 5 minute ramp-up time (300 seconds)
echo   - 30 minutes total test time (1800 seconds)
echo   - Complete 12-step API workflow
echo   - Target: 300+ TPS sustained load
echo.
pause

echo.
echo CHECKING REQUIRED FILES...
echo.

if not exist "buzz_1000_users.csv" (
    echo ERROR: buzz_1000_users.csv not found!
    echo This file contains your 1000 user test data.
    pause
    exit /b 1
)

if not exist "buzz_test_contacts.csv" (
    echo ERROR: buzz_test_contacts.csv not found!
    pause
    exit /b 1
)

if not exist "BUZZ_1000_USERS_EXACT.jmx" (
    echo ERROR: BUZZ_1000_USERS_EXACT.jmx not found!
    echo This file should have been created from your working 100-user version.
    pause
    exit /b 1
)

echo SUCCESS: All files found
echo   - buzz_1000_users.csv
echo   - buzz_test_contacts.csv  
echo   - BUZZ_1000_USERS_EXACT.jmx
echo.

mkdir results 2>nul

echo CRITICAL WARNING: This will send 1,000 SMS messages!
echo Estimated cost: $7-15 USD
echo.
set /p confirm="Proceed with 1000-user test? (y/n): "
if /i not "%confirm%"=="y" (
    echo Test cancelled.
    pause
    exit /b 0
)

echo.
echo LAUNCHING 1000 USERS TEST...
echo Based on your proven working 100-user configuration.
echo.

jmeter -n -t BUZZ_1000_USERS_EXACT.jmx -l results\buzz_1000_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_1000_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo 1000 USERS TEST COMPLETED!
echo.

for %%f in (results\buzz_1000_users_*.jtl) do echo JTL: %%f
for %%f in (results\html_report_1000_users_*) do echo HTML: %%f\index.html

echo.
echo ANALYSIS REQUIRED:
echo 1. Check success rate (target: 99%+)
echo 2. Verify response times (target: under 3s)  
echo 3. Review throughput (target: 300+ TPS)
echo 4. Monitor server performance during test
echo.

pause
