@echo off
echo.
echo ============================================================
echo  GENERATE 1000 USER TEST DATA - QUICK SETUP
echo ============================================================
echo.

echo Generating 1000 user test data...
echo.

echo [1/2] Generating buzz_1000_users.csv...
python generate_buzz_scaled_data.py --users 1000 --filename buzz_1000_users.csv
if %errorlevel%==0 (
    echo ✅ SUCCESS: buzz_1000_users.csv generated
) else (
    echo ❌ FAILED: Could not generate 1000 user data
    echo Please check if Python is installed and try manually:
    echo python generate_buzz_scaled_data.py --users 1000 --filename buzz_1000_users.csv
    pause
    exit /b 1
)

echo.
echo [2/2] Checking buzz_test_contacts.csv...
if exist "buzz_test_contacts.csv" (
    echo ✅ SUCCESS: buzz_test_contacts.csv already exists
) else (
    echo Generating buzz_test_contacts.csv...
    python generate_buzz_scaled_data.py --contacts 100 --filename buzz_test_contacts.csv
    if %errorlevel%==0 (
        echo ✅ SUCCESS: buzz_test_contacts.csv generated
    ) else (
        echo ❌ WARNING: Could not generate contacts file
    )
)

echo.
echo ============================================================
echo  CHECKING JMX FILE COMPATIBILITY
echo ============================================================
echo.

echo Testing BUZZ_1000_USERS_COMPLETE_TEST.jmx...
jmeter -n -t BUZZ_1000_USERS_COMPLETE_TEST.jmx -l test_validation_1000.jtl -J iterations=1 >nul 2>&1
if %errorlevel%==0 (
    echo ✅ SUCCESS: BUZZ_1000_USERS_COMPLETE_TEST.jmx is valid
    del test_validation_1000.jtl 2>nul
) else (
    echo ❌ ERROR: BUZZ_1000_USERS_COMPLETE_TEST.jmx has XML corruption
    echo.
    echo SOLUTION: Creating working 1000-user JMX from your working 10-user file...
    echo.
    
    if exist "BUZZ_SINGLE_THREAD_10_USERS.jmx" (
        echo Creating BUZZ_1000_USERS_WORKING.jmx from working file...
        copy "BUZZ_SINGLE_THREAD_10_USERS.jmx" "BUZZ_1000_USERS_WORKING.jmx"
        
        echo.
        echo ⚠️  MANUAL STEP REQUIRED:
        echo 1. Open JMeter GUI: launch_jmeter_gui.bat
        echo 2. Open: BUZZ_1000_USERS_WORKING.jmx
        echo 3. Find "Thread Group" in left panel
        echo 4. Change "Number of Threads" from 10 to 1000
        echo 5. Change "Ramp-up Period" from 30 to 300 (5 minutes)
        echo 6. Save file (Ctrl+S)
        echo 7. Run: run_buzz_1000_users_working.bat
        echo.
    ) else (
        echo ❌ ERROR: No working JMX file found to copy from
    )
)

echo.
echo ============================================================
echo  SETUP SUMMARY
echo ============================================================
echo.

if exist "buzz_1000_users.csv" echo ✅ buzz_1000_users.csv ready
if exist "buzz_test_contacts.csv" echo ✅ buzz_test_contacts.csv ready
if exist "BUZZ_1000_USERS_COMPLETE_TEST.jmx" (
    echo ✅ BUZZ_1000_USERS_COMPLETE_TEST.jmx exists
) else (
    echo ⚠️  Use BUZZ_1000_USERS_WORKING.jmx instead
)

echo.
echo READY TO RUN 1000 USER TEST!
echo.
echo Choose your option:
echo   A) If JMX validation passed: run_buzz_1000_users_simple.bat  
echo   B) If JMX needs fixing: Follow manual steps above first
echo.

pause
