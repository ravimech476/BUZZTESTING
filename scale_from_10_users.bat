@echo off
echo.
echo ============================================================
echo  ALTERNATIVE: SCALE UP FROM 10-USER WORKING FILE
echo ============================================================
echo.

if not exist "BUZZ_SINGLE_THREAD_10_USERS.jmx" (
    echo ERROR: BUZZ_SINGLE_THREAD_10_USERS.jmx not found!
    echo This is your definitely working JMX file.
    pause
    exit /b 1
)

echo Creating BUZZ_1000_FROM_10_USERS.jmx from your 10-user working file...

copy "BUZZ_SINGLE_THREAD_10_USERS.jmx" "BUZZ_1000_FROM_10_USERS.jmx"

echo Scaling from 10 to 1000 users...
powershell -Command "& {$content = Get-Content 'BUZZ_1000_FROM_10_USERS.jmx' -Raw; $content = $content -replace 'num_threads\">10<', 'num_threads\">1000<'; $content = $content -replace 'ramp_time\">30<', 'ramp_time\">300<'; $content = $content -replace 'test_mobile_numbers_with_prefix.csv', 'buzz_1000_users.csv'; Set-Content 'BUZZ_1000_FROM_10_USERS.jmx' -Value $content -NoNewline}"

echo.
echo Testing scaled JMX file...
jmeter -n -t BUZZ_1000_FROM_10_USERS.jmx -l test_10_scaled.jtl >nul 2>&1
if %errorlevel%==0 (
    echo SUCCESS: BUZZ_1000_FROM_10_USERS.jmx works!
    del test_10_scaled.jtl 2>nul
    echo.
    echo Ready to run: Use this file in run_buzz_1000_users_working.bat
    echo Just change the JMX filename from BUZZ_1000_USERS_WORKING.jmx to BUZZ_1000_FROM_10_USERS.jmx
) else (
    echo The scaling approach failed too.
)

echo.
echo RECOMMENDATION: Use JMeter GUI method
echo 1. launch_jmeter_gui.bat
echo 2. Open your working BUZZ_SINGLE_THREAD_10_USERS.jmx
echo 3. Modify thread count to 1000
echo 4. Save as new file
echo 5. Test the GUI-created file

pause
