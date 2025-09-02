# BUZZ API - 10 Different Users Test Setup

## Files Created

1. **test_mobile_numbers.csv** - Contains 10 different mobile numbers for testing
2. **BUZZ_SINGLE_THREAD_10_USERS.jmx** - Modified JMeter test plan
3. **run_10_different_users.bat** - Batch file to run the test

## Test Configuration

✅ **Single Thread Group**: 10 users  
✅ **Different Mobile Numbers**: Each user uses a unique mobile number  
✅ **One-time Execution**: Loop count = 1  
✅ **Hardcoded OTP**: 123456  
✅ **Ramp-up Time**: 30 seconds  

## Mobile Numbers Used
- 9344312970 to 9344312979 (with +91 country code)

## How to Run

### Option 1: Using Batch File (Recommended)
```
run_10_different_users.bat
```

### Option 2: Command Line
```
jmeter -n -t BUZZ_SINGLE_THREAD_10_USERS.jmx -l results\test_results.jtl -e -o results\html_report
```

### Option 3: GUI Mode (for editing/debugging)
```
jmeter -t BUZZ_SINGLE_THREAD_10_USERS.jmx
```

## Test Flow (Each User)

1. **Send OTP** - Using unique mobile number from CSV
2. **Verify OTP** - Using hardcoded OTP (123456)
3. **Extract JWT Token** - For subsequent API calls
4. **Get Countries** - API call with JWT
5. **Get Customer Profile** - API call with JWT  
6. **Get Categories** - API call with JWT
7. **Update Customer Profile** - API call with JWT
8. **Create Category** - API call with JWT

## Key Features

- **CSV Data Configuration**: Automatically assigns different mobile numbers to each thread
- **OnceOnlyController**: Authentication happens only once per thread
- **JWT Token Extraction**: Automatically extracts and uses JWT tokens
- **Result Collection**: Includes View Results Tree and Summary Report
- **Think Time**: Random delays between requests (1-1.5 seconds)

## Important Notes

⚠️ **Before Running:**
- Ensure all 10 mobile numbers (9344312970-9344312979) are valid test numbers
- Confirm the hardcoded OTP (123456) works with your server
- Make sure the server can handle 10 concurrent users

⚠️ **Server Requirements:**
- OTP verification should accept "123456" for test numbers
- JWT tokens should have sufficient expiration time
- All API endpoints should be accessible

## Results Location
- **JTL File**: `results\single_thread_10_users_[timestamp].jtl`
- **HTML Report**: `results\html_report_[timestamp]\`

## Troubleshooting

**If test fails:**
1. Check if mobile numbers are valid
2. Verify OTP "123456" is accepted by server
3. Ensure server is running and accessible
4. Check JWT token extraction regex
5. Verify API endpoints are working

**Common Issues:**
- CSV file path issues: Ensure `test_mobile_numbers.csv` is in the same directory
- JWT token not extracted: Check server response format
- Authentication failures: Verify OTP hardcoding on server side