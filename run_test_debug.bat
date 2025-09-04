@echo off
echo ============================================================
echo  DEBUG - BUZZ 100 USERS TEST
echo ============================================================
echo.

echo Testing file existence...
if exist "buzz_100_users.csv" (
    echo ✅ buzz_100_users.csv exists
) else (
    echo ❌ buzz_100_users.csv missing
)

if exist "buzz_test_contacts.csv" (
    echo ✅ buzz_test_contacts.csv exists
) else (
    echo ❌ buzz_test_contacts.csv missing
)

if exist "BUZZ_100_USERS_COMPLETE_TEST.jmx" (
    echo ✅ BUZZ_100_USERS_COMPLETE_TEST.jmx exists
) else (
    echo ❌ BUZZ_100_USERS_COMPLETE_TEST.jmx missing
)

echo.
echo Testing JMeter access...
jmeter -version
if %errorlevel%==0 (
    echo ✅ JMeter accessible
) else (
    echo ❌ JMeter not accessible
)

echo.
echo Creating results directory...
mkdir results 2>nul
echo ✅ Results directory ready

echo.
echo Current directory contents:
dir *.csv *.jmx

echo.
echo All checks passed! You can run: run_buzz_100_users_test.bat
pause
