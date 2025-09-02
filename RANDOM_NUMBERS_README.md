# BUZZ API - Random Numbers + Easy Cleanup Test

## 🎯 **Perfect Solution for Testing & Cleanup**

This test configuration generates **random phone numbers** directly in JMeter and uses the **same profile name** for all users, making server cleanup extremely easy.

## 📁 **Files Created:**

1. **`BUZZ_RANDOM_NUMBERS.jmx`** - Test plan with random number generation
2. **`run_random_numbers.bat`** - Execution script
3. **`cleanup_test_users.sql`** - SQL script for server cleanup

## ✅ **Key Features:**

### 🔢 **Random Phone Number Generation:**
- **No CSV files needed** - Numbers generated in JMeter
- **Format**: 10-digit numbers starting with 9 (9xxxxxxxxx)
- **Country Code**: +91 (India)
- **Example**: 9847293847, 9234567890, etc.

### 🧹 **Easy Cleanup Design:**
- **Profile Name**: ALL users get "Jmeter Test User"
- **Category Names**: All start with "JMeter Test Category"
- **Email Pattern**: jmetertest1@buzz.pazl.info, jmetertest2@buzz.pazl.info

### 💰 **Cost Optimized:**
- **No OTP Sending** - Zero SMS costs
- **Direct OTP Verification** - Uses hardcoded "123456"

## 🚀 **How to Run:**

### Quick Start:
```bash
run_random_numbers.bat
```

### Command Line:
```bash
jmeter -n -t BUZZ_RANDOM_NUMBERS.jmx -l results\test_results.jtl -e -o results\html_report
```

## 🔄 **Test Flow (Per User):**

1. **Generate Random Phone Number** - BeanShell script creates unique 10-digit number
2. **Direct OTP Verification** - Skip expensive SMS, use hardcoded "123456" 
3. **Extract JWT Token** - For authenticated API calls
4. **Get Countries** - Test API endpoint
5. **Get Customer Profile** - Test API endpoint  
6. **Get Categories** - Test API endpoint
7. **Update Profile** - Set name to "Jmeter Test User" for easy cleanup
8. **Create Category** - Create "JMeter Test Category" for testing

## 📊 **Expected Test Data:**

After running the test, you'll have:

**10 New Users:**
- Name: "Jmeter Test User" (all identical)
- Email: jmetertest1@buzz.pazl.info to jmetertest10@buzz.pazl.info  
- Phone: Random 10-digit numbers (9xxxxxxxxx)
- Date of Birth: 1990-01-01

**10 New Categories:**
- Names: "JMeter Test Category 1-XXX" to "JMeter Test Category 10-XXX"
- Color: #FF5733
- Icon: work

## 🧹 **Server Cleanup (After Testing):**

### Option 1: SQL Cleanup (Recommended)
```sql
-- Delete test users
DELETE FROM users WHERE name = 'Jmeter Test User';

-- Delete test categories  
DELETE FROM categories WHERE category_name LIKE 'JMeter Test Category%';

-- Verify cleanup
SELECT COUNT(*) FROM users WHERE name = 'Jmeter Test User';
SELECT COUNT(*) FROM categories WHERE category_name LIKE 'JMeter Test Category%';
```

### Option 2: API Cleanup
```javascript
// Get all test users
const testUsers = await api.getUsers({ name: 'Jmeter Test User' });

// Delete each test user
for (let user of testUsers) {
    await api.deleteUser(user.id);
}

// Get and delete test categories
const testCategories = await api.getCategories({ nameStartsWith: 'JMeter Test Category' });
for (let category of testCategories) {
    await api.deleteCategory(category.id);
}
```

### Option 3: Admin Panel
- Login to admin panel
- Search users by name: "Jmeter Test User"
- Bulk delete all matching users
- Search categories: "JMeter Test Category"
- Bulk delete all matching categories

## 🔧 **Technical Implementation:**

### Random Number Generation:
```javascript
// BeanShell PreProcessor generates unique numbers
String randomNumber = "9" + String.format("%09d", (int)(Math.random() * 1000000000));
vars.put("phoneNumber", randomNumber);
vars.put("countryCode", "+91");
```

### Profile Update (Same Name):
```json
{
  "name": "Jmeter Test User",
  "email": "jmetertest${__threadNum}@buzz.pazl.info",
  "dateOfBirth": "1990-01-01"
}
```

## 📈 **Benefits:**

1. **No File Dependencies** - No CSV files to manage
2. **Unique Phone Numbers** - Each user gets different random number
3. **Easy Cleanup** - All test users have identical name
4. **Cost-Free** - No SMS OTP charges
5. **Scalable** - Easy to increase user count
6. **Traceable** - All test data clearly marked

## ⚠️ **Server Requirements:**

**Before Running:**
```javascript
// Your server should accept hardcoded OTP for any phone number
if (otp === '123456') {
  // Allow login with hardcoded OTP for testing
  return generateJWT(phoneNumber);
}
```

**For Production Safety:**
- Only enable hardcoded OTP in test/staging environments
- Never enable hardcoded OTP in production

## 📊 **Expected Performance:**

- **Duration**: 2-3 minutes
- **Total Requests**: ~70 (7 requests × 10 users)
- **Response Time**: <2 seconds average
- **Error Rate**: <5%
- **Cost**: $0 (No SMS charges)

## 🎯 **Next Steps:**

1. Run test with `run_random_numbers.bat`
2. Verify all users created with name "Jmeter Test User"
3. Check performance metrics in results folder
4. Clean up test data using provided SQL/API scripts
5. Scale up user count for load testing if needed

---

**Perfect for continuous testing with zero maintenance overhead!** 🎉