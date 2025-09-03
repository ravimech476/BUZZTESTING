@echo off
echo.
echo ============================================================
echo  JMETER WEBSOCKET PLUGIN INSTALLER
echo ============================================================
echo.
echo 🔧 This script will help you install WebSocket plugins for JMeter
echo.

REM Check if JMeter is installed
where jmeter >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: JMeter not found in PATH
    echo Please install JMeter first and add it to your system PATH
    echo Download from: https://jmeter.apache.org/download_jmeter.cgi
    pause
    exit /b 1
)

REM Get JMeter home directory
for /f "tokens=*" %%i in ('where jmeter') do set JMETER_CMD=%%i
for %%i in ("%JMETER_CMD%") do set JMETER_BIN=%%~dpi
set JMETER_HOME=%JMETER_BIN:~0,-5%
set JMETER_LIB_EXT=%JMETER_HOME%\lib\ext

echo ✅ JMeter found at: %JMETER_HOME%
echo 📁 Plugin directory: %JMETER_LIB_EXT%
echo.

REM Create lib/ext directory if it doesn't exist
if not exist "%JMETER_LIB_EXT%" (
    echo 📁 Creating lib/ext directory...
    mkdir "%JMETER_LIB_EXT%"
)

echo 🌐 WEBSOCKET PLUGIN INSTALLATION OPTIONS:
echo.
echo [1] Download JMeter Plugins Manager (Recommended)
echo [2] Direct Download WebSocket Samplers Plugin
echo [3] View Installation Instructions Only
echo [4] Check Current Plugin Status
echo [0] Exit
echo.
set /p choice="Select installation option [0-4]: "

if "%choice%"=="1" goto :install_plugins_manager
if "%choice%"=="2" goto :download_websocket_plugin
if "%choice%"=="3" goto :show_instructions
if "%choice%"=="4" goto :check_plugin_status
if "%choice%"=="0" goto :exit
goto :invalid_choice

:install_plugins_manager
echo.
echo 📦 INSTALLING JMETER PLUGINS MANAGER...
echo.
echo 🔗 Download URL: https://jmeter-plugins.org/get/
echo 📄 File needed: jmeter-plugins-manager-1.10.jar (or latest)
echo.
echo 🔧 AUTOMATIC DOWNLOAD ATTEMPT...

REM Try to download using PowerShell
powershell -Command "try { Invoke-WebRequest -Uri 'https://jmeter-plugins.org/get/' -OutFile 'jmeter-plugins-manager.jar' -ErrorAction Stop; Write-Output 'DOWNLOAD_SUCCESS' } catch { Write-Output 'DOWNLOAD_FAILED' }" > temp_download.txt

set /p download_result=<temp_download.txt
del temp_download.txt >nul 2>&1

if "%download_result%"=="DOWNLOAD_SUCCESS" (
    echo ✅ Plugins Manager downloaded successfully
    
    REM Move to JMeter lib/ext directory
    move jmeter-plugins-manager.jar "%JMETER_LIB_EXT%\" >nul 2>&1
    
    if exist "%JMETER_LIB_EXT%\jmeter-plugins-manager.jar" (
        echo ✅ Plugins Manager installed successfully!
        echo.
        echo 📋 NEXT STEPS:
        echo    1. Restart JMeter
        echo    2. Go to Options → Plugins Manager
        echo    3. Search for "WebSocket Samplers"
        echo    4. Install "WebSocket Samplers by Peter Doornbosch"
        echo    5. Restart JMeter again
        echo.
    ) else (
        echo ❌ Failed to move plugins manager to JMeter directory
        goto :manual_instructions
    )
) else (
    echo ❌ Automatic download failed
    goto :manual_instructions
)
goto :install_complete

:download_websocket_plugin
echo.
echo 🌐 WEBSOCKET PLUGIN DIRECT DOWNLOAD...
echo.
echo 🔗 WebSocket Samplers Plugin URLs:
echo    GitHub: https://github.com/ptrd/jmeter-websocket-samplers
echo    Releases: https://github.com/ptrd/jmeter-websocket-samplers/releases
echo.
echo 📄 File to download: jmeter-websocket-samplers-[version].jar
echo 📁 Save location: %JMETER_LIB_EXT%\
echo.
echo 🔧 MANUAL DOWNLOAD REQUIRED:
echo    1. Open: https://github.com/ptrd/jmeter-websocket-samplers/releases
echo    2. Download latest jmeter-websocket-samplers-X.X.X.jar
echo    3. Copy to: %JMETER_LIB_EXT%\
echo    4. Restart JMeter
echo.
set /p open_url="Open download page in browser? [Y/N]: "
if /I "%open_url%"=="Y" start https://github.com/ptrd/jmeter-websocket-samplers/releases
goto :install_complete

:show_instructions
echo.
echo 📋 WEBSOCKET PLUGIN INSTALLATION INSTRUCTIONS:
echo.
echo 🎯 METHOD 1: Using JMeter Plugins Manager (Recommended)
echo    1. Download: https://jmeter-plugins.org/get/
echo    2. Copy jmeter-plugins-manager-X.X.jar to: %JMETER_LIB_EXT%\
echo    3. Restart JMeter
echo    4. Go to Options → Plugins Manager
echo    5. Install "WebSocket Samplers by Peter Doornbosch"
echo    6. Restart JMeter
echo.
echo 🎯 METHOD 2: Direct Plugin Download
echo    1. Visit: https://github.com/ptrd/jmeter-websocket-samplers/releases
echo    2. Download: jmeter-websocket-samplers-[version].jar
echo    3. Copy to: %JMETER_LIB_EXT%\
echo    4. Restart JMeter
echo.
echo 🎯 METHOD 3: Alternative Plugin
echo    1. Visit: https://github.com/maciejzaleski/JMeter-WebSocketSampler/releases
echo    2. Download: JMeterWebSocketSampler-[version].jar
echo    3. Copy to: %JMETER_LIB_EXT%\
echo    4. Restart JMeter
echo.
goto :install_complete

:check_plugin_status
echo.
echo 🔍 CHECKING PLUGIN STATUS...
echo.
echo 📁 JMeter lib/ext directory: %JMETER_LIB_EXT%
echo.
echo 📦 INSTALLED PLUGINS:
if exist "%JMETER_LIB_EXT%\" (
    dir /b "%JMETER_LIB_EXT%\*.jar" | findstr /I "websocket\|plugin"
    if errorlevel 1 (
        echo    No WebSocket plugins found
    )
) else (
    echo ❌ lib/ext directory not found
)
echo.
echo 💡 EXPECTED WEBSOCKET PLUGIN FILES:
echo    ├── jmeter-plugins-manager-X.X.jar (for plugin management)
echo    ├── jmeter-websocket-samplers-X.X.X.jar (WebSocket samplers)
echo    └── JMeterWebSocketSampler-X.X.jar (alternative plugin)
echo.
goto :install_complete

:manual_instructions
echo.
echo 📋 MANUAL INSTALLATION REQUIRED:
echo.
echo 🔧 STEP 1: Download Plugins Manager
echo    1. Visit: https://jmeter-plugins.org/get/
echo    2. Download: jmeter-plugins-manager-1.10.jar
echo    3. Copy to: %JMETER_LIB_EXT%\
echo.
echo 🔧 STEP 2: Install WebSocket Plugin  
echo    1. Restart JMeter
echo    2. Go to Options → Plugins Manager
echo    3. Search "WebSocket" in Available Plugins
echo    4. Install "WebSocket Samplers by Peter Doornbosch"
echo    5. Restart JMeter again
echo.
goto :install_complete

:invalid_choice
echo.
echo ❌ Invalid choice. Please select 0-4.
pause
goto :start

:install_complete
echo.
echo 🎯 INSTALLATION PROCESS INFORMATION PROVIDED!
echo.
echo 📋 VERIFICATION STEPS:
echo    1. Restart JMeter after installing plugins
echo    2. Right-click Thread Group → Add → Sampler
echo    3. Look for WebSocket samplers:
echo       ├── WebSocket Open Connection
echo       ├── WebSocket Request/Response Sampler
echo       ├── WebSocket Ping/Pong Sampler
echo       └── WebSocket Close Connection
echo.
echo 🚀 AFTER PLUGIN INSTALLATION:
echo    1. Use the native WebSocket test plan: BUZZ_WEBSOCKET_NATIVE_TEST.jmx
echo    2. Or continue with JSR223 approach: BUZZ_WEBSOCKET_JSR223_TEST.jmx
echo.
echo 💡 If plugins don't appear, check:
echo    ├── JMeter version compatibility (5.0+)
echo    ├── JAR file in correct lib/ext directory
echo    ├── JMeter fully restarted
echo    └── No error messages in jmeter.log
echo.
pause

:exit
exit /b 0

:start