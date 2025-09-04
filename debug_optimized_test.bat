@echo off
echo.
echo DEBUG: Testing Optimized JMeter Execution
echo.
echo Current directory: %CD%
echo.
echo Checking if BUZZ_CALL_STORM_OPTIMIZED.jmx exists...
if exist BUZZ_CALL_STORM_OPTIMIZED.jmx (
    echo ✅ JMX file found
    echo File size:
    dir BUZZ_CALL_STORM_OPTIMIZED.jmx
) else (
    echo ❌ JMX file NOT found
    echo Available JMX files:
    dir *.jmx
)
echo.
echo Testing JMeter command...
echo.
echo About to run: jmeter -n -t BUZZ_CALL_STORM_OPTIMIZED.jmx -l results\debug_test.jtl
echo.
pause
echo.
echo Running JMeter...
jmeter -n -t BUZZ_CALL_STORM_OPTIMIZED.jmx -l results\debug_test.jtl
echo.
echo JMeter execution completed with exit code: %ERRORLEVEL%
echo.
pause