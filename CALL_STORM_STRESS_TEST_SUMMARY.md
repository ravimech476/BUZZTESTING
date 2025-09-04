# BUZZ Call Storm Stress Test - Implementation Summary

## 🚀 **Files Created**

1. **`stress_test_users_120.csv`** - 120-user dataset for stress testing
2. **`BUZZ_CALL_STORM_STRESS_TEST.jmx`** - JMeter stress test implementation  
3. **`run_call_storm_stress_test.bat`** - Execution script with monitoring
4. **Updated `run_buzz_testing_suite.bat`** - Added option [9] for stress test

---

## 🎯 **Stress Test Implementation**

### **Call Initiation Storm Scenario (120 Users)**

**Timeline:**
- **0-30s**: Setup Phase - All users connect and register
- **30-90s**: Storm Phase - Intensive calling begins
- **Total Duration**: 90 seconds

**Call Volume:**
- **Target Rate**: 10 calls per second system-wide  
- **Total Expected Calls**: ~528 calls in 60 seconds
- **Concurrent Connections**: 120 WebSocket connections

---

## 👥 **Thread Group Distribution**

### **1. Heavy Callers (24 users - 20%)**
- **Behavior**: Aggressive calling pattern
- **Call Rate**: Every 2-4 seconds  
- **Total Calls**: 10 calls × 24 users = 240 calls
- **Target Selection**: Random from 120-user pool
- **Start Time**: 30 seconds (after setup)

### **2. Regular Callers (72 users - 60%)**  
- **Behavior**: Normal calling pattern
- **Call Rate**: Every 6-10 seconds
- **Total Calls**: 4 calls × 72 users = 288 calls  
- **Target Selection**: Random from 120-user pool
- **Start Time**: 30 seconds (after setup)

### **3. Call Receivers (24 users - 20%)**
- **Behavior**: Listen and respond continuously
- **Duration**: 90 seconds total
- **Response Patterns**: 70% Accept, 20% Reject, 10% Timeout
- **Response Time**: 2-6 seconds (human-like delays)
- **Start Time**: Immediate (listen from beginning)

---

## 🎲 **Random Target Selection Logic**

### **Implementation:**
```groovy
// Each caller picks random target from userId range 384-503
def randomTarget
do {
    randomTarget = minUserId + new Random().nextInt(maxUserId - minUserId + 1)
} while (randomTarget == currentUserId) // Prevent self-calling
```

### **Realistic Stress Scenarios:**
- **Popular targets** may receive 10+ simultaneous calls
- **Call distribution** varies randomly across users
- **Server load testing** with unpredictable patterns
- **Database stress** with rapid user lookups

---

## 📊 **Expected Performance Metrics**

### **Connection Metrics:**
- **120 concurrent WebSocket connections**
- **Connection success rate**: Target 100%
- **Connection stability**: No drops during storm

### **Call Performance:**
- **~528 total calls** triggered during storm
- **~10 calls/second** sustained rate
- **Call setup time**: Target <2 seconds under load
- **Server response time**: Target <1 second

### **Response Distribution:**
- **~369 calls accepted** (70% of 528)
- **~106 calls rejected** (20% of 528)  
- **~53 calls timeout** (10% of 528)

---

## 🔥 **Stress Load Characteristics**

### **Peak Load Moments:**
```
Simultaneous Activities:
├── 24 Heavy Callers making calls every 2-4 seconds
├── 72 Regular Callers making calls every 6-10 seconds  
├── 24 Receivers processing incoming calls
├── Random target distribution creating hotspots
└── Server processing 10+ messages per second
```

### **Resource Stress Points:**
- **WebSocket Connection Pool**: 120 concurrent connections
- **Message Processing**: 600+ messages during storm
- **Database Queries**: Rapid user lookups and status checks
- **Memory Usage**: Connection state management
- **CPU Load**: Message routing and call processing

---

## 🎯 **How to Execute**

### **Option 1: Direct Execution**
```bash
run_call_storm_stress_test.bat
```

### **Option 2: Via Master Menu**
```bash
run_buzz_testing_suite.bat
# Select option [9] CALL STORM STRESS TEST (120 users - HIGH LOAD)
```

### **Prerequisites:**
- **CSV File**: `stress_test_users_120.csv` (created automatically)
- **Server Ready**: BUZZ WebSocket server running on buzz.pazl.info:5000
- **JMeter Plugins**: WebSocket samplers installed

---

## ⚠️ **WARNING - High Load Test**

### **Server Impact:**
- **Significant CPU usage** during storm period
- **High memory consumption** for connection management
- **Database load** from rapid user operations
- **Network throughput** stress from message volume

### **Monitoring Recommendations:**
- **Watch server resources** during test execution
- **Monitor WebSocket connection limits**
- **Check database performance** and query response times
- **Observe memory usage patterns**

---

## 📈 **Success Criteria**

### **Minimum Performance Targets:**
- ✅ **All 120 users connect successfully** (100% connection rate)
- ✅ **>95% call trigger success** (~500+ of 528 calls sent)
- ✅ **<3 second average call setup** time during peak load
- ✅ **No connection drops** during storm period
- ✅ **Server stability** maintained throughout test

### **Optimal Performance Targets:**
- 🎯 **<1.5 second average call setup** time
- 🎯 **>98% call success rate** end-to-end
- 🎯 **<1 second server response** time during peak
- 🎯 **Graceful handling** of overload scenarios

---

## 🔍 **Post-Test Analysis**

### **Key Insights You'll Gain:**
- **Maximum concurrent call capacity** of your server
- **Performance degradation patterns** under high load
- **Bottlenecks** in call routing and WebSocket handling  
- **Resource utilization** during peak usage periods
- **Connection stability** under sustained load
- **Database performance** with rapid lookups

### **Results Available:**
- **HTML Performance Report**: Detailed graphs and metrics
- **JTL Data File**: Raw performance data for analysis
- **JMeter Logs**: Error patterns and system behavior
- **Response Time Analysis**: Call setup and processing times

---

## 🎉 **Implementation Complete**

Your **BUZZ Call Storm Stress Test** is ready to execute! This implementation will push your WebSocket server to its limits and provide critical insights into your system's capacity for handling high-volume concurrent calling scenarios.

The test simulates realistic **New Year's Eve** or **emergency event** calling patterns where many users attempt to make calls simultaneously, giving you production-ready stress testing capabilities.
