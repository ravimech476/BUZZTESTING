# JMeter GUI Quick Reference for BUZZ WebSocket Testing

## 🖥️ **How to Launch JMeter GUI**

### **Method 1: Using Launch Script (Recommended)**
```bash
# Navigate to your BUZZ testing directory
cd D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST

# Run the GUI launcher
launch_jmeter_gui.bat

# OR via master menu
run_buzz_testing_suite.bat
# Select [15] Launch JMeter GUI (Visual Interface)
```

### **Method 2: Direct JMeter Launch**
```bash
# Open Command Prompt, then:
jmeter
# OR
jmeter.bat
```

---

## 📂 **Loading Your BUZZ Test Plans**

### **Available Test Plans:**
1. **`BUZZ_WEBSOCKET_REALISTIC.jmx`** - Realistic user interactions (5 users)
2. **`BUZZ_CALL_STORM_STRESS_TEST.jmx`** - High-load stress test (120 users)
3. **`BUZZ_WEBSOCKET_PERSISTENT.jmx`** - Long-running connections (5 min)
4. **`BUZZ_WEBSOCKET_WORKING.jmx`** - Basic functional test (3 users)

### **How to Load:**
1. **File** → **Open**
2. **Navigate to**: `D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\`
3. **Select your desired .jmx file**

---

## 🎯 **Key GUI Features for WebSocket Testing**

### **Test Plan Structure (Left Panel):**
```
Test Plan
├── CSV Data Set Config (User data)
├── Thread Groups (Different user types)
│   ├── Heavy Callers
│   ├── Regular Callers  
│   └── Call Receivers
├── WebSocket Samplers
│   ├── Open WebSocket
│   ├── Write WebSocket (Send messages)
│   └── Read WebSocket (Receive responses)
└── Listeners (View results)
```

### **Important Components to Check:**

#### **📊 CSV Data Set Config:**
- **Filename**: Should point to your CSV file
- **Variable Names**: `userId,userName,phoneNumber,countryCode,targetUserId`
- **Recycle on EOF**: Should be checked
- **Sharing Mode**: Should be "All threads"

#### **👥 Thread Groups:**
- **Number of Threads**: Number of concurrent users
- **Ramp-up Period**: Time to start all users
- **Loop Count**: How many times each user repeats actions
- **Duration**: How long to run (for time-based tests)

#### **🌐 WebSocket Samplers:**
- **Server Name**: `buzz.pazl.info`
- **Port**: `5000`
- **Protocol**: `ws`
- **Path**: `/`

---

## 🔧 **Running Tests in GUI Mode**

### **Step 1: Verify Configuration**
1. **Check CSV file path** in CSV Data Set Config
2. **Verify WebSocket server details** in samplers
3. **Review thread group settings** for user count/timing

### **Step 2: Add Listeners (View Results)**
**Right-click Thread Group** → **Add** → **Listener** → Choose:
- **View Results Tree** - See individual requests/responses
- **Summary Report** - Overall statistics
- **Response Times Over Time** - Performance graphs
- **Active Threads Over Time** - Concurrency visualization

### **Step 3: Execute Test**
1. **Click Green Start button** (▶️) in toolbar
2. **Monitor real-time results** in listeners
3. **Watch for errors** in View Results Tree
4. **Stop test** with Red Stop button (⏹️) when done

---

## 📈 **Monitoring Test Execution**

### **View Results Tree (Most Important):**
- **Green entries** = Success ✅
- **Red entries** = Failures ❌
- **Click entries** to see request/response details
- **Look for WebSocket messages** in Response Data tab

### **Summary Report:**
- **# Samples** - Total requests sent
- **Average** - Average response time
- **Error %** - Percentage of failures
- **Throughput** - Requests per second

### **What to Look For:**
- **WebSocket connections**: Should show "101 Switching Protocols"
- **User registration**: Should show "200 OK" responses
- **Call messages**: Should see JSON call/response messages
- **Error patterns**: Check for timeout or connection issues

---

## 🐛 **Common Issues & Solutions**

### **CSV File Not Found:**
```
Error: CSV file not found
Solution: 
- Check CSV Data Set Config filename
- Ensure CSV file exists in test directory
- Use full path if needed
```

### **WebSocket Connection Failed:**
```
Error: Connection refused or timeout
Solution:
- Verify server is running on buzz.pazl.info:5000
- Check firewall/network settings
- Test server connectivity separately
```

### **No Response from Server:**
```
Error: Read timeout or empty responses
Solution:
- Check server logs for errors
- Verify message format in WebSocket samplers
- Increase timeout values if needed
```

---

## 💡 **GUI vs Command Line Benefits**

### **GUI Mode Advantages:**
- ✅ **Visual test plan editing**
- ✅ **Real-time monitoring**
- ✅ **Interactive debugging**
- ✅ **Easy configuration changes**
- ✅ **Immediate result viewing**

### **Command Line Advantages:**
- ✅ **Lower resource usage**
- ✅ **Better for automated testing**
- ✅ **Cleaner results (no GUI overhead)**
- ✅ **Easier for CI/CD integration**

---

## 🎯 **Best Practices for GUI Testing**

1. **Start Small**: Begin with basic test (3-5 users) before stress testing
2. **Use Listeners Sparingly**: Too many listeners can slow down GUI
3. **Monitor Resources**: GUI uses more CPU/memory than command line
4. **Save Frequently**: Save test plans after modifications
5. **Clear Results**: Clear old results before new test runs
6. **Check Logs**: Always review jmeter.log for detailed error info

---

## 🚀 **Quick Start Workflow**

1. **Launch GUI**: `launch_jmeter_gui.bat`
2. **Select test**: Choose realistic test for first run
3. **Add listener**: Add "View Results Tree" if not present
4. **Start test**: Click green play button
5. **Monitor**: Watch results in real-time
6. **Analyze**: Review successful/failed requests
7. **Stop**: Click stop button when satisfied
8. **Save**: Save any modifications made

Your JMeter GUI is now ready for interactive BUZZ WebSocket testing! 🎉
