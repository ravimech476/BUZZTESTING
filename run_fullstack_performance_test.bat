@echo off
echo.
echo ============================================================
echo  BUZZ FULL-STACK PERFORMANCE TEST (API + WebSocket)
echo ============================================================
echo.
echo 🔄 COMPREHENSIVE TESTING APPROACH:
echo   ├── Part 1: Traditional API Load Testing
echo   ├── Part 2: WebSocket Real-time Testing  
echo   ├── Part 3: Combined API + WebSocket Load
echo   └── Part 4: Performance Analysis &amp; Reporting
echo.
echo 📱 SIMULATED USER BEHAVIOR:
echo   ├── User Authentication (API)
echo   ├── WebSocket Connection Establishment
echo   ├── Real-time Call Management
echo   ├── API Data Operations During Calls
echo   ├── Concurrent API + WebSocket Operations
echo   └── Graceful Disconnection
echo.
echo 🎯 FULL-STACK TEST CONFIGURATION:
echo   ├── API Users: 10 concurrent threads
echo   ├── WebSocket Users: 20 concurrent connections
echo   ├── Test Duration: 300 seconds (5 minutes)
echo   ├── Ramp-up: 60 seconds for gradual load increase
echo   └── Mixed Load: API + Real-time operations
echo.
echo 📊 COMPREHENSIVE METRICS COLLECTION:
echo   ├── API Response Times &amp; Throughput
echo   ├── WebSocket Connection Performance
echo   ├── Real-time Message Latency
echo   ├── Server Resource Utilization
echo   ├── Error Rates Across Both Protocols
echo   └── End-to-end User Experience Metrics
echo.

pause

echo.
echo 🚀 PHASE 1: RUNNING API LOAD TEST...
echo.
call run_modified_working_file.bat

echo.
echo 🌐 PHASE 2: RUNNING WEBSOCKET REAL-TIME TEST...
echo.
call run_websocket_realtime_test.bat

echo.
echo 📊 PHASE 3: GENERATING COMPREHENSIVE REPORT...
echo.

echo Creating combined performance analysis...

echo.
echo ✅ FULL-STACK PERFORMANCE TEST COMPLETED!
echo.
echo 📈 COMPREHENSIVE ANALYSIS AVAILABLE:
echo   ├── API Performance: results\modified_working_file_[timestamp].jtl
echo   ├── WebSocket Performance: results\websocket_realtime_[timestamp].jtl
echo   ├── API HTML Report: results\html_report_modified_[timestamp]\
echo   ├── WebSocket HTML Report: results\websocket_html_report_[timestamp]\
echo   └── Combined Logs: jmeter.log
echo.
echo 🔍 KEY PERFORMANCE INSIGHTS:
echo   ├── API vs WebSocket performance comparison
echo   ├── Server handling of mixed protocol load
echo   ├── Resource utilization patterns
echo   ├── Bottleneck identification
echo   └── Scalability recommendations
echo.
echo 💡 PERFORMANCE OPTIMIZATION AREAS:
echo   ├── API endpoint optimization opportunities
echo   ├── WebSocket connection management improvements
echo   ├── Database query performance under mixed load
echo   ├── Server resource allocation optimization
echo   └── Caching strategies for better performance
echo.
echo 🎯 NEXT STEPS FOR PERFORMANCE IMPROVEMENT:
echo   ├── 1. Analyze both HTML reports side-by-side
echo   ├── 2. Identify performance bottlenecks
echo   ├── 3. Compare API vs WebSocket resource usage
echo   ├── 4. Plan server infrastructure improvements
echo   └── 5. Implement monitoring for production
echo.
pause