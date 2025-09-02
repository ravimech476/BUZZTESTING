# BUZZ API STRESS TESTING - PRODUCTION READY FILES

## 🧹 **CLEANUP COMPLETED - PRODUCTION READY!**

After cleanup, only these essential working files remain:

## 🚀 **PRIMARY TESTING FILES (RECOMMENDED)**

### **Single Thread Group Approach (RECOMMENDED)**
- **`BUZZ_SINGLE_THREAD.jmx`** - Main test plan (simple & reliable)
- **`run_single_thread.bat`** - Execute the test
- **Why recommended:** Simple, reliable JWT token sharing within same thread

### **SetupThreadGroup Approach (ADVANCED)**  
- **`BUZZ_JWT_FIXED.jmx`** - Advanced test plan with global properties
- **`run_jwt_fixed.bat`** - Execute the advanced test
- **Why advanced:** Uses JMeter best practices but more complex

### **Interactive Menu**
- **`jwt_solution_menu.bat`** - Choose between both approaches

## 📋 **DOCUMENTATION & CONFIGURATION**
- **`README.md`** - Comprehensive testing guide
- **`TESTING_CHECKLIST.md`** - Pre/post test checklist
- **`test_config.properties`** - Configuration settings

## 📁 **RESULTS DIRECTORY**
- **`results/`** - All test results preserved

## 🎯 **RECOMMENDED WORKFLOW**

### **Quick Start:**
```bash
cd D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST
run_single_thread.bat
```

### **Interactive Start:**
```bash
cd D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST  
jwt_solution_menu.bat
```

## 📊 **EXPECTED SUCCESS RESULTS**

```
summary =    200 in 00:03:30 =    1.0/s Avg:  1200 Err:     3 (1.50%)
```

**Success Indicators:**
- **✅ ~200 total requests** (20 auth + 180 API calls)
- **✅ <5% error rate** (JWT tokens working properly)
- **✅ No 403 Forbidden errors** (Authorization working)
- **✅ All 6 BUZZ APIs tested** (Complete functionality)

## 🚀 **WHAT GETS TESTED**

### **Authentication Flow:**
1. **Send OTP** to 9344312970
2. **Verify OTP** with 123456  
3. **Extract JWT token** from response

### **6 BUZZ APIs (with JWT authorization):**
1. **GET** `/countries` - Country list
2. **GET** `/app-config` - App configuration
3. **GET** `/customer/profile` - User profile  
4. **GET** `/category` - Category list
5. **PUT** `/customer/profile` - Update profile
6. **POST** `/category` - Create category

### **Load Testing:**
- **10 concurrent users**
- **30-second ramp-up**  
- **3 loops per user**
- **Total: ~200 requests in 3-4 minutes**

## 🏆 **READY FOR PRODUCTION STRESS TESTING!**

Clean, focused, production-ready BUZZ API stress testing suite with working authentication and JWT token management.
