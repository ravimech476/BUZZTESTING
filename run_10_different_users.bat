@echo off
echo.
echo ================================================
echo  BUZZ API - 10 Different Users Test (OPTIMIZED)
echo ================================================
echo.
echo Starting JMeter test with:
echo - 10 threads (different users)
echo - 10 different mobile numbers with +91 prefix (CSV: test_mobile_numbers_with_prefix.csv)
echo - 1 loop (one-time execution)
echo - Hardcoded OTP: 123456
echo - Profile name: "Jmeter Test User" (for easy cleanup)
echo - Uses CSV file: test_mobile_numbers_with_prefix.csv
echo.
echo COST OPTIMIZATIONS APPLIED:
echo - REMOVED: Send OTP request (saves SMS costs)
echo - REMOVED: Create Category request (reduces test data)
echo - REMOVED: Wait timer (faster execution)
echo.
pause

jmeter -n -t BUZZ_SINGLE_THREAD_10_USERS.jmx -l results\single_thread_10_users_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo Test completed! Check the results folder for detailed reports.
echo.
echo SERVER CLEANUP:
echo - Delete all users with name: "Jmeter Test User"
echo - No categories created (optimization applied)
pause