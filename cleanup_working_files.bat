@echo off
echo ======================================
echo    BUZZ API - CLEANUP WORKING FILES
echo ======================================
echo.

echo This will remove all test/debug/intermediate files and keep only the working files needed for production testing.
echo.

echo FILES TO KEEP (WORKING/ESSENTIAL):
echo ✅ BUZZ_JWT_FIXED.jmx           - SetupThreadGroup solution 
echo ✅ BUZZ_SINGLE_THREAD.jmx       - Single thread solution (RECOMMENDED)
echo ✅ run_jwt_fixed.bat            - Runner for SetupThreadGroup  
echo ✅ run_single_thread.bat        - Runner for single thread (RECOMMENDED)
echo ✅ jwt_solution_menu.bat        - Interactive menu
echo ✅ README.md                    - Original documentation
echo ✅ TESTING_CHECKLIST.md        - Testing checklist
echo ✅ test_config.properties       - Configuration file
echo ✅ results\ directory          - Test results (will be preserved)
echo.

echo FILES TO REMOVE (TEST/DEBUG/INTERMEDIATE):
echo ❌ BUZZ_API_Stress_Test.jmx     - Original with errors
echo ❌ Auth_Only_Fixed.jmx          - Intermediate auth test  
echo ❌ Auth_Working_123456.jmx      - Intermediate auth test
echo ❌ BUZZ_Complete_Working.jmx    - Had XML errors
echo ❌ BUZZ_Light_Load_WORKING.jmx  - Had JWT sharing issues
echo ❌ BUZZ_Simple_Light_Load.jmx   - Intermediate version
echo ❌ DEBUG_Auth_Only.jmx          - Debug version
echo ❌ EXACT_CURL_MATCH.jmx         - Debug version
echo ❌ FIXED_JSON_FORMAT.jmx        - Intermediate version
echo ❌ ALTERNATIVE_JSON.jmx         - Alternative test
echo ❌ Manual_OTP_Test.jmx          - Debug version  
echo ❌ Simple_API_Test.jmx          - Original simple test
echo ❌ All debug batch files        - No longer needed
echo ❌ All intermediate .md files   - Keep only essential docs
echo.

set /p confirm=Proceed with cleanup? This will DELETE intermediate files! (y/n): 

if /i "%confirm%" neq "y" (
    echo Cleanup cancelled.
    pause
    exit
)

echo.
echo Starting cleanup...
echo.

REM Remove intermediate JMX files
if exist "BUZZ_API_Stress_Test.jmx" (
    echo Removing BUZZ_API_Stress_Test.jmx
    del "BUZZ_API_Stress_Test.jmx"
)
if exist "Auth_Only_Fixed.jmx" (
    echo Removing Auth_Only_Fixed.jmx  
    del "Auth_Only_Fixed.jmx"
)
if exist "Auth_Working_123456.jmx" (
    echo Removing Auth_Working_123456.jmx
    del "Auth_Working_123456.jmx"
)
if exist "BUZZ_Complete_Working.jmx" (
    echo Removing BUZZ_Complete_Working.jmx
    del "BUZZ_Complete_Working.jmx"
)
if exist "BUZZ_Light_Load_WORKING.jmx" (
    echo Removing BUZZ_Light_Load_WORKING.jmx
    del "BUZZ_Light_Load_WORKING.jmx"
)
if exist "BUZZ_Simple_Light_Load.jmx" (
    echo Removing BUZZ_Simple_Light_Load.jmx
    del "BUZZ_Simple_Light_Load.jmx"
)
if exist "DEBUG_Auth_Only.jmx" (
    echo Removing DEBUG_Auth_Only.jmx
    del "DEBUG_Auth_Only.jmx"
)
if exist "EXACT_CURL_MATCH.jmx" (
    echo Removing EXACT_CURL_MATCH.jmx
    del "EXACT_CURL_MATCH.jmx"
)
if exist "FIXED_JSON_FORMAT.jmx" (
    echo Removing FIXED_JSON_FORMAT.jmx
    del "FIXED_JSON_FORMAT.jmx"
)
if exist "ALTERNATIVE_JSON.jmx" (
    echo Removing ALTERNATIVE_JSON.jmx
    del "ALTERNATIVE_JSON.jmx"
)
if exist "Manual_OTP_Test.jmx" (
    echo Removing Manual_OTP_Test.jmx
    del "Manual_OTP_Test.jmx"
)
if exist "Simple_API_Test.jmx" (
    echo Removing Simple_API_Test.jmx
    del "Simple_API_Test.jmx"
)

REM Remove debug batch files  
if exist "configure_test.bat" (
    echo Removing configure_test.bat
    del "configure_test.bat"
)
if exist "configure_test_simple.bat" (
    echo Removing configure_test_simple.bat
    del "configure_test_simple.bat"
)
if exist "debug_*.bat" (
    echo Removing debug batch files
    del "debug_*.bat"
)
if exist "find_jmeter.bat" (
    echo Removing find_jmeter.bat
    del "find_jmeter.bat"
)
if exist "manual_*.bat" (
    echo Removing manual test files
    del "manual_*.bat"
)
if exist "run_auth_*.bat" (
    echo Removing intermediate auth runners
    del "run_auth_*.bat"
)
if exist "run_buzz_stress_menu.bat" (
    echo Removing old menu
    del "run_buzz_stress_menu.bat"
)
if exist "run_clean_*.bat" (
    echo Removing cleanup runners
    del "run_clean_*.bat"
)
if exist "run_complete_*.bat" (
    echo Removing intermediate runners
    del "run_complete_*.bat"
)
if exist "run_debug_*.bat" (
    echo Removing debug runners
    del "run_debug_*.bat"
)
if exist "run_exact_*.bat" (
    echo Removing exact curl runners
    del "run_exact_*.bat"
)
if exist "run_fixed_*.bat" (
    echo Removing intermediate fixed runners
    del "run_fixed_*.bat"
)
if exist "run_gradual_*.bat" (
    echo Removing gradual test runners
    del "run_gradual_*.bat"
)
if exist "run_light_load_*.bat" (
    echo Removing intermediate light load runners
    del "run_light_load_*.bat"
)
if exist "run_simple_*.bat" (
    echo Removing simple test runners
    del "run_simple_*.bat"
)
if exist "run_step*.bat" (
    echo Removing step runners
    del "run_step*.bat"
)
if exist "run_timestamped_*.bat" (
    echo Removing timestamped runners
    del "run_timestamped_*.bat"
)
if exist "test_*.bat" (
    echo Removing test batch files
    del "test_*.bat"
)

REM Remove intermediate documentation
if exist "AUTHENTICATION_DEBUG.md" (
    echo Removing AUTHENTICATION_DEBUG.md
    del "AUTHENTICATION_DEBUG.md"
)
if exist "BREAKTHROUGH_STATUS.md" (
    echo Removing BREAKTHROUGH_STATUS.md  
    del "BREAKTHROUGH_STATUS.md"
)
if exist "JWT_TOKEN_SOLUTION_STATUS.md" (
    echo Removing JWT_TOKEN_SOLUTION_STATUS.md
    del "JWT_TOKEN_SOLUTION_STATUS.md"
)
if exist "TESTING_STATUS.md" (
    echo Removing TESTING_STATUS.md
    del "TESTING_STATUS.md"
)

REM Remove other intermediate files
if exist "Fixed_*.xml" (
    echo Removing fixed XML files
    del "Fixed_*.xml"
)

echo.
echo ======================================
echo CLEANUP COMPLETED!
echo ======================================
echo.

echo REMAINING FILES (WORKING/PRODUCTION):
dir /b *.jmx 2>nul
dir /b *.bat 2>nul  
dir /b *.md 2>nul
dir /b *.properties 2>nul

echo.
echo PRODUCTION-READY FILES:
echo.
echo 🚀 RECOMMENDED FOR TESTING:
echo   └── run_single_thread.bat     (Simple, reliable JWT token sharing)
echo   └── BUZZ_SINGLE_THREAD.jmx    (Single thread group approach)
echo.
echo 🔧 ALTERNATIVE ADVANCED:
echo   └── run_jwt_fixed.bat         (SetupThreadGroup approach)  
echo   └── BUZZ_JWT_FIXED.jmx        (Global properties approach)
echo.
echo 📋 INTERACTIVE:
echo   └── jwt_solution_menu.bat     (Choose between approaches)
echo.
echo 📁 DOCUMENTATION:
echo   └── README.md                 (Original comprehensive guide)
echo   └── TESTING_CHECKLIST.md     (Pre/post test checklist)
echo   └── test_config.properties   (Configuration settings)
echo.
echo Ready for production BUZZ API stress testing! 🎉
echo.
pause
