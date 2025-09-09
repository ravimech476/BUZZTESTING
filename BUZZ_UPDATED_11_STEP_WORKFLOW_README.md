# 🚀 BUZZ App Updated 11-Step API Workflow Testing Suite

## 📋 **Overview**

This is the **updated BUZZ App stress testing suite** with the new 11-step API workflow that includes **Address Update** and **Remove People** functionality. The test order has been reorganized to match your specific requirements.

## 🎯 **New 11-Step API Workflow**

### **Updated Test Sequence:**

1. **Send OTP** → `POST /buzz-api/send-otp`
2. **Verify OTP** → `POST /buzz-api/verify-otp` (Extract JWT token)
3. **Create Category** → `POST /buzz-api/category` (Extract category_id)
4. **Update Category** → `PUT /buzz-api/category`
5. **🆕 Update Address** → `POST /buzz-api/category/address/{id}` *(NEW)*
6. **Add People** → `POST /buzz-api/category/people`
7. **Mute & Block** → `PUT /buzz-api/category/people/{id}`
8. **View People History** → `GET /buzz-api/category/people/{id}`
9. **🆕 Remove People** → `DELETE /buzz-api/category/people/{id}` *(NEW)*
10. **Get Profile Data** → `GET /buzz-api/customer/profile`
11. **Update Profile Name** → `PUT /buzz-api/customer/profile`

## 🆕 **What's New**

### **✅ Added APIs:**
- **Step 5: Update Address API** - Adds address, city, state, pincode to categories
- **Step 9: Remove People API** - Removes people from categories

### **✅ Enhanced Features:**
- **Updated CSV structure** with address fields
- **Reorganized API sequence** per requirements
- **Enhanced JWT token handling** across all steps
- **Tamil Nadu geographic data** for realistic testing

## 📁 **New Files Created**

```
D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\
├── BUZZ_100_USERS_UPDATED_11_STEP_TEST.jmx          # Updated JMeter test plan
├── run_buzz_100_users_updated_11_step.bat           # Updated execution script
├── buzz_100_users_updated.csv                       # Updated CSV with address fields
├── buzz_100_users_updated_test.properties           # Updated configuration
├── generate_buzz_updated_test_data.py                # Data generator script
└── BUZZ_UPDATED_11_STEP_WORKFLOW_README.md          # This documentation
```

## 🔧 **API Implementation Status**

| Step | API Endpoint | Method | Backend Status | Frontend Status | JMeter Status |
|------|-------------|---------|----------------|-----------------|---------------|
| 1 | `/buzz-api/send-otp` | POST | ✅ Implemented | ✅ Implemented | ✅ Updated |
| 2 | `/buzz-api/verify-otp` | POST | ✅ Implemented | ✅ Implemented | ✅ Updated |
| 3 | `/buzz-api/category` | POST | ✅ Implemented | ✅ Implemented | ✅ Updated |
| 4 | `/buzz-api/category` | PUT | ✅ Implemented | ✅ Implemented | ✅ Updated |
| 5 | `/buzz-api/category/address/{id}` | POST | ✅ **Available** | ✅ **Available** | ✅ **Added** |
| 6 | `/buzz-api/category/people` | POST | ✅ Implemented | ✅ Implemented | ✅ Updated |
| 7 | `/buzz-api/category/people/{id}` | PUT | ✅ Implemented | ✅ Implemented | ✅ Updated |
| 8 | `/buzz-api/category/people/{id}` | GET | ✅ Implemented | ⚠️ Partial | ✅ Updated |
| 9 | `/buzz-api/category/people/{id}` | DELETE | ✅ **Available** | ❌ **Missing URL** | ✅ **Added** |
| 10 | `/buzz-api/customer/profile` | GET | ✅ Implemented | ✅ Implemented | ✅ Updated |
| 11 | `/buzz-api/customer/profile` | PUT | ✅ Implemented | ✅ Implemented | ✅ Updated |

## 📊 **Updated CSV Data Structure**

### **buzz_100_users_updated.csv:**
```csv
phoneNumber,countryCode,name,categoryName,updateCategoryName,address,city,state,pincode
7455123001,+91,JmeterUser00001,TestCategory00001,UpdatedCategory00001,123 Test Street 001,Chennai,Tamil Nadu,600001
```

### **New Fields Added:**
- **address**: Street address with house number
- **city**: Tamil Nadu cities (Chennai, Coimbatore, etc.)
- **state**: Tamil Nadu
- **pincode**: Area-specific PIN codes

## 🚀 **Quick Start Guide**

### **1. Generate Updated Test Data**
```bash
python generate_buzz_updated_test_data.py
```

### **2. Run Updated 11-Step Test**
```bash
run_buzz_100_users_updated_11_step.bat
```

### **3. Monitor Results**
- Check console output for real-time progress
- Review HTML report: `results/html_report_100_users_updated_[timestamp]/index.html`
- Validate new API performance metrics

## 🎯 **Test Configuration**

### **Thread Group Settings:**
- **Users**: 100 concurrent users
- **Ramp-up**: 60 seconds (1 minute)
- **Duration**: 900 seconds (15 minutes)
- **Loops**: 1 complete workflow per user

### **Performance Targets:**
- **Response Time**: <2s (95th percentile)
- **Throughput**: 50+ TPS
- **Success Rate**: 99.5%+ overall
- **Error Rate**: <0.5%

## 🔍 **Key Validation Points**

### **New API Validation:**
1. **Address Update (Step 5)**:
   - Successful POST to `/buzz-api/category/address/{category_id}`
   - Proper address field validation
   - Tamil Nadu geographic data accuracy

2. **Remove People (Step 9)**:
   - Successful DELETE to `/buzz-api/category/people/{category_id}`
   - Proper people ID extraction and usage
   - Clean removal validation

### **JWT Token Flow:**
- Token extraction in Step 2 (Verify OTP)
- Token usage in Steps 3-11 (all authenticated endpoints)
- Token persistence throughout workflow

## ⚠️ **Frontend Updates Needed**

### **Missing Frontend URL Constant:**
The Remove People API is implemented in the backend but missing from frontend URL constants:

**File**: `D:\Currentprojectbuzz\BUZZ_APP_FRONT_END\lib\data\api\url.dart`

**Add this line**:
```dart
static const String RemovePeople = '$baseUrl/category/people';
```

## 📈 **Expected Results**

### **Success Criteria:**
- ✅ All 11 API steps execute successfully
- ✅ Address update operations complete (95%+ success)
- ✅ People removal operations complete (90%+ success)
- ✅ JWT authentication works across all steps
- ✅ Overall workflow completion rate >99%

### **Performance Metrics:**
- **Step 1-2 (Auth)**: <1s response time
- **Step 3-5 (Category + Address)**: <2s response time
- **Step 6-9 (People Ops)**: <2s response time
- **Step 10-11 (Profile)**: <1s response time

## 🔄 **Scaling to Higher Loads**

After successful 100-user validation:

1. **Update 1000-user test** with new workflow
2. **Update 10K-user test** with new workflow
3. **Monitor database performance** with address operations
4. **Validate SMS delivery** across all test levels

## 🧹 **Post-Test Cleanup**

### **Database Cleanup Required:**
```sql
-- Clean up test addresses
DELETE FROM category_addresses WHERE category_id IN 
  (SELECT id FROM categories WHERE name LIKE 'TestCategory%');

-- Clean up test categories
DELETE FROM categories WHERE name LIKE 'TestCategory%' OR name LIKE 'UpdatedCategory%';

-- Clean up test users
DELETE FROM users WHERE name LIKE 'JmeterUser%';
```

## 📊 **Monitoring Dashboard**

### **Key Metrics to Watch:**
1. **API Response Times**: Per-step breakdown
2. **Error Distribution**: By API endpoint
3. **Throughput Patterns**: TPS over time
4. **Success Rates**: Per API and overall
5. **JWT Token Usage**: Authentication flow
6. **New API Performance**: Address & Remove People operations

## 🎉 **Benefits of Updated Workflow**

1. **✅ Complete API Coverage**: All required endpoints tested
2. **✅ Realistic User Journey**: Matches actual app usage patterns
3. **✅ Address Management**: Tests location-based features
4. **✅ People Management**: Tests complete contact lifecycle
5. **✅ Production Readiness**: Validates end-to-end functionality

---

## 🚀 **Ready to Test!**

Your BUZZ application now has a **comprehensive 11-step API workflow test** that covers all required functionality including the newly added Address Update and People Removal operations. 

**Start testing with the updated workflow and monitor the enhanced API coverage!**
