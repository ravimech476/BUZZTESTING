@echo off
echo.
echo ============================================================
echo  BUZZ 10 USERS - UPDATED 11-STEP API WORKFLOW TEST
echo ============================================================
echo.
echo TEST CONFIGURATION:
echo   - 10 concurrent users (Quick validation test)
echo   - 30 seconds ramp-up time
echo   - 5 minutes total test time
echo   - NEW 11-step API workflow with Address Update and Remove People
echo   - Target: Fast validation and debugging
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
echo   - buzz_10_users_updated.csv   (10 user records with address fields)
echo   - buzz_test_contacts.csv      (100 contact records - reused)
echo.
echo PURPOSE:
echo   ✅ Quick API validation before scaling to 100+ users
echo   ✅ Debug new APIs (Update Address ^& Remove People)
echo   ✅ Verify JWT token flow across all 11 steps
echo   ✅ Test workflow timing and dependencies
echo.
echo EXPECTED RESULTS:
echo   - Response Time: ^<1s (95th percentile) - Light load
echo   - Peak TPS: 10+ requests/second  
echo   - Error Rate: ^<0.1%% overall
echo   - Success Rate: 100%% end-to-end (all 10 users)
echo.
echo TEST IMPACT (MINIMAL):
echo   - SMS: Only 10 OTP messages will be sent
echo   - DATABASE: 10 users + categories + addresses created
echo   - CONNECTIONS: 10 concurrent connections
echo   - COST: ~$0.075 (very low cost)
echo.
pause

echo.
echo CHECKING TEST DATA FILES...
echo.

if not exist "buzz_10_users_updated.csv" (
    echo ERROR: buzz_10_users_updated.csv not found!
    echo This file should contain 10 users with address fields
    pause
    exit /b 1
)

if not exist "buzz_test_contacts.csv" (
    echo ERROR: buzz_test_contacts.csv not found!
    echo Contact data is required for people operations
    pause
    exit /b 1
)

if not exist "BUZZ_10_USERS_UPDATED_11_STEP_TEST.jmx" (
    echo ERROR: BUZZ_10_USERS_UPDATED_11_STEP_TEST.jmx not found!
    pause
    exit /b 1
)

echo SUCCESS: All required files found
echo   ✅ buzz_10_users_updated.csv (10 users with address fields)
echo   ✅ buzz_test_contacts.csv
echo   ✅ BUZZ_10_USERS_UPDATED_11_STEP_TEST.jmx
echo.

echo VALIDATING CSV STRUCTURE...
echo.
findstr /C:"phoneNumber,countryCode,name,categoryName,updateCategoryName,address,city,state,pincode" buzz_10_users_updated.csv >nul
if %errorlevel% equ 0 (
    echo ✅ CSV header validation passed
) else (
    echo ❌ CSV header validation failed - incorrect format
    pause
    exit /b 1
)

echo VALIDATING USER COUNT...
for /f %%i in ('type buzz_10_users_updated.csv ^| find /c /v ""') do set lines=%%i
set /a usercount=%lines%-1
echo   Total users in CSV: %usercount%
if %usercount% equ 10 (
    echo ✅ User count validation passed
) else (
    echo ❌ Expected 10 users, found %usercount%
    pause
    exit /b 1
)

echo CREATING RESULTS DIRECTORY...
mkdir results 2>nul
echo.

echo STARTING 10 USERS UPDATED 11-STEP WORKFLOW TEST...
echo.
echo TEST PHASES:
echo   - Phase 1 (0-30 sec): Gradual ramp-up to 10 users
echo   - Phase 2 (30 sec-5 min): Sustained 10 user load with full 11-step workflow
echo.

echo API EXECUTION ORDER (per user):
echo   1. Send OTP → 2. Verify OTP → 3. Create Category → 4. Update Category
echo   5. Update Address → 6. Add People → 7. Mute ^& Block → 8. View People History  
echo   9. Remove People → 10. Get Profile → 11. Update Profile
echo.

echo EXPECTED EXECUTION TIME:
echo   - Per user workflow: ~10-15 seconds
echo   - Total test duration: ~5 minutes
echo   - All users should complete successfully
echo.

echo LAUNCHING JMETER (10 USERS VALIDATION)...
echo.

jmeter -n -t BUZZ_10_USERS_UPDATED_11_STEP_TEST.jmx -l results\buzz_10_users_updated_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.jtl -e -o results\html_report_10_users_updated_%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

echo.
echo 10 USERS UPDATED 11-STEP WORKFLOW TEST COMPLETED!
echo.

echo RESULTS LOCATION:
for %%f in (results\buzz_10_users_updated_*.jtl) do echo   JTL File: %%f
for %%f in (results\html_report_10_users_updated_*) do echo   HTML Report: %%f\index.html
echo.

echo KEY VALIDATION POINTS:
echo 1. ✅ Step 5 - Update Address API: Check success rate ^& response format
echo 2. ✅ Step 9 - Remove People API: Check deletion functionality
echo 3. ✅ JWT Token Flow: Verify token extraction ^& reuse across steps 3-11
echo 4. ✅ Category-People Lifecycle: Create → Add → Mute/Block → View → Remove
echo 5. ✅ Address Data: Verify Tamil Nadu cities ^& pincodes are processed
echo.

echo DEBUGGING CHECKLIST:
echo □ All 10 users completed 11 steps successfully
echo □ No authentication failures (Steps 3-11)
echo □ Address update payload correctly formatted
echo □ People removal returns proper response
echo □ Category ID extraction working
echo □ People ID extraction working
echo □ Response times under 2 seconds per step
echo.

echo NEXT STEPS:
echo 1. Open HTML report: %%f\index.html
echo 2. Check success rates: Should be 100%% for all steps
echo 3. Validate new APIs: Steps 5 ^& 9 performance
echo 4. If successful → Scale to 100 users test
echo 5. If errors → Debug individual API calls
echo 6. Clean up test data when done
echo.

echo SUCCESS CRITERIA FOR 10 USERS:
echo - Overall Success Rate: 100%% (all 110 API calls successful)
echo - Response Times: ^<2s for all APIs
echo - No JWT authentication errors
echo - No database connection issues
echo - New APIs (Address ^& Remove People) working correctly
echo.

echo 10-USER VALIDATION TEST COMPLETED!
echo This test validates the 11-step workflow before scaling up.
pause