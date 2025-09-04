@echo off
echo.
echo ============================================================
echo  🟢 BUZZ 100 USERS - QUICK START (VALIDATION TEST)
echo ============================================================
echo.

echo 📊 Checking if test data exists...

if not exist "buzz_100_users.csv" (
    echo ❌ buzz_100_users.csv not found. Generating now...
    echo.
    python generate_buzz_scaled_data.py --users 100
    if errorlevel 1 (
        echo ❌ Error generating data. Please check:
        echo   1. Python is installed and in PATH
        echo   2. generate_buzz_scaled_data.py exists
        pause
        exit /b 1
    )
    echo ✅ Data generation completed!
    echo.
)

if not exist "buzz_test_contacts.csv" (
    echo ❌ buzz_test_contacts.csv not found. Generating now...
    echo.
    python generate_buzz_scaled_data.py --users 100
    if errorlevel 1 (
        echo ❌ Error generating contacts data.
        pause
        exit /b 1
    )
    echo ✅ Contacts data generated!
    echo.
)

echo ✅ All required data files found!
echo.

echo 🚀 STARTING 100 USERS VALIDATION TEST...
echo.
echo 📊 TEST OVERVIEW:
echo   ├── Users: 100 concurrent users
echo   ├── Duration: ~15 minutes
echo   ├── APIs: 12 endpoints per user
echo   ├── SMS Cost: ~$1.50
echo   └── Purpose: Functionality validation
echo.

echo ⏰ Starting test execution...
call run_buzz_100_users_test.bat

echo.
echo 🎉 100 USERS TEST EXECUTION COMPLETED!
echo.
pause
