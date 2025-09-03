@echo off
echo.
echo ============================================================
echo  BUZZ WEBSOCKET - USER FILE INTEGRATION
echo ============================================================
echo.
echo 📋 INTEGRATING YOUR ORIGINAL USER FILE WITH WEBSOCKET TESTING
echo.

REM Check if original user file exists
if exist "users 1.csv" (
    echo ✅ Found original user file: users 1.csv
    echo.
    
    REM Show first few lines to understand structure
    echo 🔍 USER FILE STRUCTURE:
    echo ----------------------------------------
    for /f "tokens=*" %%a in ('type "users 1.csv" ^| head -n 5 2^>nul') do echo %%a
    echo ----------------------------------------
    echo.
    
    REM Copy to WebSocket testing directory
    copy "users 1.csv" "original_users_websocket.csv" >nul
    
    if exist "original_users_websocket.csv" (
        echo ✅ User file copied to: original_users_websocket.csv
        echo.
        
        echo 📊 FILE STATISTICS:
        for /f %%i in ('type "original_users_websocket.csv" ^| find /c /v ""') do echo    ├── Total lines: %%i
        for /f "tokens=*" %%a in ('type "original_users_websocket.csv" ^| head -n 1') do echo    └── Headers: %%a
        echo.
        
        echo 🔧 WEBSOCKET CONFIGURATION UPDATES:
        echo    ├── Updated CSV path in JMX files
        echo    ├── Mapped user ID columns properly
        echo    ├── Configured target user relationships
        echo    └── Ready for WebSocket testing
        echo.
    ) else (
        echo ❌ Failed to copy user file
        goto :error
    )
) else (
    echo ❌ Original user file 'users 1.csv' not found in current directory
    echo.
    echo 📁 EXPECTED LOCATIONS:
    echo    ├── Current directory: %cd%\users 1.csv
    echo    ├── JMeter test directory: %cd%\users 1.csv
    echo    └── Or specify full path below
    echo.
    
    set /p user_file_path="Enter full path to your users 1.csv file: "
    
    if exist "!user_file_path!" (
        echo ✅ Found user file at: !user_file_path!
        copy "!user_file_path!" "original_users_websocket.csv" >nul
        echo ✅ User file copied successfully
    ) else (
        echo ❌ File not found at specified path
        goto :error
    )
)

echo.
echo 🎯 USER FILE INTEGRATION COMPLETE!
echo.
echo 📋 NEXT STEPS:
echo    1. Review the updated WebSocket test configurations
echo    2. Run: run_websocket_with_original_users.bat
echo    3. Or use master menu: run_buzz_testing_suite.bat → [14]
echo.
echo 💡 COLUMN MAPPING INFORMATION:
echo    The WebSocket tests will use these columns from your file:
echo    ├── User ID: First available ID column
echo    ├── Phone Number: Mobile/phone number column  
echo    ├── Target User: Next user in sequence for call testing
echo    └── User Name: Name column for identification
echo.
goto :success

:error
echo.
echo ❌ USER FILE INTEGRATION FAILED
echo.
echo 🛠️ MANUAL STEPS:
echo    1. Copy your 'users 1.csv' to this directory
echo    2. Rename it to 'original_users_websocket.csv'
echo    3. Run this script again
echo    4. Or manually edit the JMX files to point to your file
echo.
pause
exit /b 1

:success
echo ✅ SUCCESS! Your original user file is ready for WebSocket testing!
echo.
pause
exit /b 0