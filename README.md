# BUZZ API Stress Test Suite

## Overview
This comprehensive JMeter test suite is designed to perform stress testing on the BUZZ app backend API endpoints. The test plan simulates real-world usage patterns and gradually increases load to identify performance bottlenecks.

## Test Architecture

### **API Endpoints Tested:**

1. **Authentication Flow**
   - POST `/send-otp` - Send OTP for user verification
   - POST `/verify-otp` - Verify OTP and obtain JWT token

2. **Core Application APIs**
   - GET `/countries` - Fetch country list
   - GET `/app-config` - Get application configuration
   - GET `/customer/profile` - Get user profile
   - PUT `/customer/profile` - Update user profile
   - PUT `/customer/fcm` - Update FCM token

3. **Category Management**
   - GET `/category` - Get categories
   - POST `/category` - Create new category
   - GET `/category/{id}` - Get specific category
   - POST `/category/people` - Add people to category

4. **Communication Features**
   - POST `/buzz-call` - Make buzz call
   - POST `/buzz-invite` - Send buzz invite
   - GET `/buzz-installed-contacts` - Get installed contacts
   - GET `/incoming-call-history` - Get call history

5. **Logging & Analytics**
   - POST `/save-app-logs` - Save application logs
   - POST `/save-exception-error` - Report errors

## Test Scenarios

### **1. Authentication Setup (1 User)**
- Sets up JWT token for subsequent authenticated requests
- Sends OTP and verifies it
- Extracts JWT token for use in other thread groups

### **2. Light Load Test (50 Users)**
- **Duration**: ~5 minutes
- **Ramp-up**: 60 seconds
- **Loops**: 5 per user
- **Target**: Basic functionality testing under normal load

### **3. Medium Load Test (100 Users)**
- **Duration**: ~20 minutes
- **Ramp-up**: 120 seconds
- **Loops**: 10 per user
- **Target**: Sustained load testing with mixed API calls

### **4. Heavy Load Test (200 Users)**
- **Duration**: ~1 hour
- **Ramp-up**: 300 seconds (5 minutes)
- **Loops**: 15 per user
- **Target**: High load testing with maximum realistic concurrent users

### **5. Extreme Load Test (500 Users) - DISABLED BY DEFAULT**
- **Duration**: ~2+ hours
- **Ramp-up**: 600 seconds (10 minutes)
- **Loops**: 20 per user
- **Target**: Breaking point testing - USE WITH CAUTION

## Prerequisites

1. **JMeter Installation**
   - Download Apache JMeter 5.6.3 or higher
   - Add JMeter to your PATH environment variable

2. **Server Requirements**
   - BUZZ API server should be running on `https://buzz.pazl.info:5000`
   - Database should be accessible and properly configured
   - Ensure adequate server resources (CPU, RAM, Network)

3. **Test Environment**
   - Minimum 8GB RAM on testing machine
   - Stable internet connection
   - Sufficient disk space for result files

## Configuration

### **Environment Variables (Configurable in Test Plan)**
```
BASE_URL = https://buzz.pazl.info
API_PATH = /buzz-api
TEST_PHONE_NUMBER = 9876543210 (Change this for your test)
TEST_COUNTRY_CODE = +91
```

### **Authentication Settings**
- The test uses a real phone number for OTP testing
- **Important**: Update `TEST_PHONE_NUMBER` before running tests
- JWT token is automatically extracted and reused

## How to Run

### **Method 1: GUI Mode (Recommended for Development)**
```bash
# Navigate to JMeter installation directory
cd /path/to/jmeter/bin

# Launch JMeter GUI
jmeter -t "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\BUZZ_API_Stress_Test.jmx"

# Run test from GUI:
# 1. Update TEST_PHONE_NUMBER in User Defined Variables
# 2. Enable/disable thread groups as needed
# 3. Click Start button
```

### **Method 2: Command Line Mode (Recommended for Production)**
```bash
# Navigate to JMeter installation directory
cd /path/to/jmeter/bin

# Run complete test suite
jmeter -n -t "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\BUZZ_API_Stress_Test.jmx" -l "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\test_results.jtl" -e -o "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\html_report"

# Run specific thread groups only
jmeter -n -t "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\BUZZ_API_Stress_Test.jmx" -l "D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\results\light_test.jtl" -Jthread.group.name="2. Light Load Test"
```

### **Method 3: Gradual Testing (Recommended)**
```bash
# Step 1: Run Authentication Setup + Light Load only
# Enable: 1. Authentication Setup + 2. Light Load Test
# Disable: All others

# Step 2: If Light Load passes, run Medium Load
# Enable: 1. Authentication Setup + 3. Medium Load Test
# Disable: All others

# Step 3: If Medium Load passes, run Heavy Load
# Enable: 1. Authentication Setup + 4. Heavy Load Test
# Disable: All others

# Step 4: Only if all previous tests pass, consider Extreme Load
# Enable: 1. Authentication Setup + 5. Extreme Load Test
# Disable: All others
```

## Monitoring During Tests

### **Key Metrics to Monitor**

1. **Server-Side Monitoring**
   - CPU Usage (should stay below 80%)
   - Memory Usage (RAM & available memory)
   - Database connections & query performance
   - Network I/O and bandwidth usage
   - Application logs for errors

2. **JMeter Metrics**
   - Response Time (Average, 90th, 95th, 99th percentile)
   - Throughput (requests per second)
   - Error Rate (should be < 1%)
   - Active Threads over time

3. **Database Monitoring**
   - Connection pool utilization
   - Query execution times
   - Slow query logs
   - Lock waits and deadlocks

## Expected Performance Benchmarks

### **Acceptable Performance**
- **Average Response Time**: < 500ms for GET requests
- **Average Response Time**: < 1000ms for POST requests
- **95th Percentile**: < 2000ms
- **Error Rate**: < 0.5%
- **Throughput**: > 100 requests/second

### **Warning Signs**
- Response times > 2000ms consistently
- Error rate > 1%
- Memory usage > 85%
- Database connection pool exhaustion

### **Stop Test Immediately If**
- Error rate > 5%
- Server becomes unresponsive
- Database crashes or becomes unavailable
- Response times > 10 seconds

## Results Analysis

### **Generated Reports**
1. **HTML Dashboard Report** - `results/html_report/index.html`
2. **Summary Report** - `results/summary_report.jtl`
3. **Detailed Results** - `results/detailed_results.jtl`
4. **Response Time Graph** - `results/response_time_graph.jtl`

### **Key Areas to Analyze**
1. **Response Time Trends** - Look for degradation over time
2. **Error Patterns** - Identify which APIs fail first
3. **Throughput Saturation** - Find the maximum sustainable load
4. **Resource Utilization** - Identify bottlenecks

## Troubleshooting

### **Common Issues**

1. **Authentication Fails**
   - Update TEST_PHONE_NUMBER to a valid number
   - Ensure OTP service is working
   - Check if JWT extraction regex is correct

2. **High Error Rate**
   - Check server logs for specific errors
   - Verify database connectivity
   - Ensure all required services are running

3. **Poor Performance**
   - Check server resources (CPU, RAM, disk I/O)
   - Verify database performance
   - Check network latency between test machine and server

4. **JMeter Issues**
   - Increase JMeter heap size: `export JVM_ARGS="-Xms1g -Xmx4g"`
   - Check JMeter logs for memory issues
   - Reduce number of concurrent threads if needed

## Safety Recommendations

1. **Start Small**: Always begin with Light Load Test
2. **Monitor Continuously**: Watch server resources during tests
3. **Have Rollback Plan**: Be prepared to stop tests if issues arise
4. **Test in Stages**: Don't jump directly to Extreme Load
5. **Backup Data**: Ensure database backups before extensive testing
6. **Notify Team**: Inform other developers before running heavy tests

## Post-Test Actions

1. **Clean Up Test Data**: Remove test categories, logs, and contacts created during testing
2. **Archive Results**: Store test results with timestamps for comparison
3. **Document Findings**: Record performance bottlenecks and recommendations
4. **Update Configurations**: Modify server settings based on findings

## Contact & Support

- **Created By**: JMeter Stress Test Generator
- **Date**: 2025-09-01
- **Version**: 1.0
- **Test Plan File**: `BUZZ_API_Stress_Test.jmx`

For questions or issues with this test suite, check the JMeter logs and server logs for detailed error information.
