@echo off
echo.
echo ============================================================
echo  BUZZ 100 USERS - UPDATED 11-STEP API WORKFLOW TEST
echo ============================================================
echo.
echo TEST CONFIGURATION:
echo   - 100 concurrent users
echo   - 1 minute ramp-up time
echo   - 15 minutes total test time
echo   - NEW 11-step API workflow with Address Update and Remove People
echo   - Target: 50+ TPS moderate load
echo.
echo UPDATED API WORKFLOW (11 Steps):
echo   1. Send OTP           - User registration
echo   2. Verify OTP         - JWT token extraction  
echo   3. Create Category    - Extract category_id
echo   4. Update Category    - Category name update
echo   5. Update Address     - NEW: Address details (address, city, state, pincode)
echo   6. Add People         - Add contacts to category
echo   7. Mute ^& Block       - Mute operations (2 hours) ^& Block operations
echo   8. View People History- Retrieve category people
echo   9. Remove People      - NEW: Delete people from category
echo   10. Get Profile Data  - User data retrieval
echo   11. Update Profile    - Name = "Jmeter Test User"
echo.
echo TEST DATA FILES:
echo   - buzz_100_users_updated.csv  (100 user records with address fields)
echo   - buzz_test_contacts.csv      (100 contact records)
echo.
echo NEW FEATURES ADDED:
echo   ✅ Update Address API - POST /buzz-api/category/address/{id}
echo   ✅ Remove People API  - DELETE /buzz-api/category/people/{id}
echo   ✅ Enhanced CSV data with address fields
echo   ✅ Proper API sequencing as per requirements
echo.
echo EXPECTED RESULTS:
echo   - Response Time: ^<2s (95th percentile)
echo   - Peak TPS: 50+ requests/second  
echo   - Error Rate: ^<0.5%% overall
echo   - Success Rate: 99.5%%+ end-to-end
echo.
echo TEST IMPACT:
echo   - SMS: 100 OTP messages will be sent
echo   - DATABASE: 100 users + categories + addresses created
echo   - CONNECTIONS: 100 concurrent connections
echo.
pause

echo.
echo CHECKING TEST DATA FILES...
echo.

if not exist "buzz_100_users_updated.csv" (
    echo ERROR: buzz_100_users_updated.csv not found!
    echo This file should contain phoneNumber,countryCode,name,categoryName,updateCategoryName,address,city,state,pincode
    pause
    exit /b 1
)

if not exist "buzz_test_contacts.csv" (
    echo ERROR: buzz_test_contacts.csv not found!
    echo Run generate_buzz_test_data.py to create test data
    pause
    exit /b 1
)

if not exist "BUZZ_100_USERS_UPDATED_11_STEP_TEST.jmx" (
    echo ERROR: BUZZ_100_USERS_UPDATED_11_STEP_TEST.jmx not found!
    pause
    exit /b 1
)

echo SUCCESS: All required files found
echo   ✅ buzz_100_users_updated.csv (with address fields)
echo   ✅ buzz_test_contacts.csv
echo   ✅ BUZZ_100_USERS_UPDATED_11_STEP_TEST.jmx
echo.

echo VALIDATING CSV STRUCTURE...
echo.
findstr /C:"phoneNumber,countryCode,name,categoryName,updateCategoryName,address,city,state,pincode" buzz_100_users_updated.csv >nul
if %errorlevel% equ 0 (
    echo ✅ CSV header validation passed
) else (
    echo ❌ CSV header validation failed - incorrect format
    echo Expected: phoneNumber,countryCode,name,categoryName,updateCategoryName,address,city,state,pincode
    pause
    exit /b 1
)

echo CREATING RESULTS DIRECTORY...
mkdir results 2>nul
echo.

echo STARTING 100 USERS UPDATED 11-STEP WORKFLOW TEST...
echo.
echo TEST PHASES:
echo   - Phase 1 (0-1 min): Gradual ramp-up to 100 users
echo   - Phase 2 (1-10 min): Sustained 100 user load with full 11-step workflow
echo   - Phase 3 (10-15 min): Natural test completion
echo.

echo API EXECUTION ORDER:
echo   1. Send OTP → 2. Verify OTP → 3. Create Category → 4. Update Category
echo   5. Update Address → 6. Add People → 7. Mute ^& Block → 8. View People History  
echo   9. Remove People → 10. Get Profile → 11. Update Profile
echo.

echo LAUNCHING JMETER...
echo.

jmeter -n -t BUZZ_100_USERS_UPDATED_11_STEP_TEST.jmx -l results\buzz_100_users_updated_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_100_users_updated_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo 100 USERS UPDATED 11-STEP WORKFLOW TEST COMPLETED!
echo.

echo RESULTS LOCATION:
for %%f in (results\buzz_100_users_updated_*.jtl) do echo   JTL File: %%f
for %%f in (results\html_report_100_users_updated_*) do echo   HTML Report: %%f\index.html
echo.

echo KEY METRICS TO CHECK:
echo 1. Step 5 - Update Address API success rate
echo 2. Step 9 - Remove People API success rate  
echo 3. Overall 11-step workflow completion rate
echo 4. Response times for new address operations
echo 5. JWT token extraction and reuse across all steps
echo.

echo NEXT STEPS:
echo 1. Open HTML report to analyze results
echo 2. Check success rate for new APIs (target: 99.5%%+)
echo 3. Validate address update functionality
echo 4. Verify people removal operations
echo 5. If successful, proceed to 1000 user test with updated workflow
echo 6. Clean up test data if needed
echo.

echo NEW API VALIDATION:
echo - Address Update: Check for successful POST to /buzz-api/category/address/{id}
echo - Remove People: Check for successful DELETE to /buzz-api/category/people/{id}
echo - JWT Authentication: Verify token usage across all authenticated endpoints
echo.

echo TEST COMPLETED WITH UPDATED 11-STEP WORKFLOW!
pause