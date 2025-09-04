@echo off
echo ============================================================
echo  JMETER PATH DIAGNOSTIC CHECK
echo ============================================================
echo.

echo Checking if JMeter is in PATH...
jmeter -version >nul 2>&1
if %errorlevel%==0 (
    echo ✅ SUCCESS: JMeter is accessible via PATH
    jmeter -version
    echo.
    echo You can run: run_buzz_100_users_test.bat
) else (
    echo ❌ ERROR: JMeter not found in PATH
    echo.
    echo SEARCHING for JMeter installations...
    echo.
    
    echo Checking common locations:
    if exist "C:\apache-jmeter*" (
        echo ✅ Found: C:\apache-jmeter*
        for /d %%i in ("C:\apache-jmeter*") do echo   - %%i
    )
    if exist "D:\apache-jmeter*" (
        echo ✅ Found: D:\apache-jmeter*
        for /d %%i in ("D:\apache-jmeter*") do echo   - %%i
    )
    if exist "C