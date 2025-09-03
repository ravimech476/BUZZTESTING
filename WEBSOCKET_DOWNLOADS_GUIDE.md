# 📦 WebSocket Plugin Downloads & Installation Guide

## 🎯 What You Need to Download

### **Required: JMeter WebSocket Plugins**

#### **Option 1: JMeter Plugins Manager (Easiest Method)**

**Step 1: Download Plugins Manager**
```
📥 Download URL: https://jmeter-plugins.org/get/
📄 File Name: jmeter-plugins-manager-1.10.jar (or latest version)
💾 File Size: ~2MB
```

**Step 2: Installation Location**
```
📁 Copy to: [JMETER_HOME]/lib/ext/
📍 Example: C:\apache-jmeter-5.6.3\lib\ext\jmeter-plugins-manager-1.10.jar
```

**Step 3: Install WebSocket Plugin via Manager**
1. Restart JMeter after copying the plugins manager
2. Go to `Options` → `Plugins Manager`
3. Click "Available Plugins" tab
4. Search for "WebSocket"
5. Select "WebSocket Samplers by Peter Doornbosch"
6. Click "Apply Changes and Restart JMeter"

---

#### **Option 2: Direct WebSocket Plugin Download**

**Primary Plugin (Recommended):**
```
🔗 GitHub: https://github.com/ptrd/jmeter-websocket-samplers
📥 Direct Releases: https://github.com/ptrd/jmeter-websocket-samplers/releases
📄 File Pattern: jmeter-websocket-samplers-X.X.X.jar
💾 File Size: ~500KB
📁 Install Location: [JMETER_HOME]/lib/ext/
```

**Alternative Plugin:**
```
🔗 GitHub: https://github.com/maciejzaleski/JMeter-WebSocketSampler
📥 Direct Releases: https://github.com/maciejzaleski/JMeter-WebSocketSampler/releases
📄 File Pattern: JMeterWebSocketSampler-X.X.jar
💾 File Size: ~300KB
📁 Install Location: [JMETER_HOME]/lib/ext/
```

---

## 🚀 Quick Installation Commands

### **Method 1: Automated Installation (Windows)**
```batch
# Run our installer script
install_websocket_plugins.bat

# This will:
# 1. Detect your JMeter installation
# 2. Download the plugins manager
# 3. Install it to the correct location
# 4. Provide further instructions
```

### **Method 2: Manual Installation Steps**
```batch
# 1. Find your JMeter installation directory
where jmeter

# 2. Navigate to lib/ext directory
cd "[JMETER_HOME]\lib\ext"

# 3. Download plugins manager
# Visit: https://jmeter-plugins.org/get/
# Save: jmeter-plugins-manager-1.10.jar

# 4. Copy to lib/ext directory
copy jmeter-plugins-manager-1.10.jar "[JMETER_HOME]\lib\ext\"

# 5. Restart JMeter and use Plugins Manager
```

---

## 📋 Verification Steps

### **Check Installation Success:**
1. **Restart JMeter completely**
2. **Check for Plugins Manager:**
   - Look for `Options` → `Plugins Manager` in menu
3. **Check for WebSocket Samplers:**
   - Right-click Thread Group → `Add` → `Sampler`
   - Look for these options:
     - ✅ WebSocket Open Connection
     - ✅ WebSocket Request/Response Sampler  
     - ✅ WebSocket Ping/Pong Sampler
     - ✅ WebSocket Close Connection

### **Expected File Structure:**
```
[JMETER_HOME]/
├── bin/
│   └── jmeter.bat
└── lib/
    └── ext/
        ├── jmeter-plugins-manager-1.10.jar
        └── jmeter-websocket-samplers-X.X.X.jar
```

---

## 🛠️ Alternative: Use JSR223 Approach (No Plugins Needed)

If you can't install plugins, you can use our JSR223-based approach:

### **Advantages of JSR223 Approach:**
- ✅ No additional plugins required
- ✅ Uses built-in JMeter capabilities
- ✅ Works on any JMeter installation
- ✅ Full WebSocket functionality

### **Advantages of Native Plugin Approach:**
- ✅ Better performance and accuracy
- ✅ Native WebSocket protocol compliance
- ✅ Enhanced debugging capabilities
- ✅ Proper ping/pong support
- ✅ Better connection management

---

## 🎯 Test File Comparison

### **Tests Available:**

| Test File | Plugin Required | Performance | Accuracy | Setup Complexity |
|-----------|----------------|-------------|-----------|------------------|
| `BUZZ_WEBSOCKET_JSR223_TEST.jmx` | ❌ No | Good | Good | Low |
| `BUZZ_WEBSOCKET_NATIVE_TEST.jmx` | ✅ Yes | Excellent | Excellent | Medium |

### **Execution Scripts:**

| Script | Plugin Required | Description |
|--------|----------------|-------------|
| `run_websocket_realtime_test.bat` | ❌ No | JSR223 approach |
| `run_native_websocket_test.bat` | ✅ Yes | Native plugin approach |
| `install_websocket_plugins.bat` | N/A | Plugin installer |

---

## 🚨 Troubleshooting Common Issues

### **Issue 1: Plugins Manager Not Appearing**
```
❌ Problem: Options → Plugins Manager not visible
✅ Solution: 
   1. Verify plugins manager JAR is in lib/ext/
   2. Restart JMeter completely
   3. Check JMeter version (5.0+ required)
   4. Check file permissions
```

### **Issue 2: WebSocket Samplers Not Available**
```
❌ Problem: WebSocket samplers not in Add → Sampler menu
✅ Solution:
   1. Install via Plugins Manager first
   2. Restart JMeter after installation
   3. Check for plugin conflicts
   4. Verify plugin JAR file integrity
```

### **Issue 3: Connection Failures**
```
❌ Problem: WebSocket connections failing
✅ Solution:
   1. Verify server URL: ws://buzz.pazl.info:3000
   2. Check firewall settings
   3. Test server connectivity: ping buzz.pazl.info
   4. Use JSR223 approach as fallback
```

### **Issue 4: Plugin Download Failures**
```
❌ Problem: Cannot download plugins automatically
✅ Solution:
   1. Manual download from GitHub links above
   2. Check internet connectivity
   3. Try different browser/download method
   4. Use alternative plugin (Maciej Zaleski)
```

---

## 🔧 Manual Download Links

### **Direct Download Links (Latest Versions):**

**Plugins Manager:**
- https://jmeter-plugins.org/get/
- Backup: https://repo1.maven.org/maven2/kg/apc/jmeter-plugins-manager/

**WebSocket Samplers:**
- https://github.com/ptrd/jmeter-websocket-samplers/releases/latest
- Alternative: https://github.com/maciejzaleski/JMeter-WebSocketSampler/releases/latest

**Installation Files Created:**
- `install_websocket_plugins.bat` - Automated installer
- `check_websocket_dependencies.bat` - Dependency checker
- `run_native_websocket_test.bat` - Native plugin test runner

---

## 📞 Support & Next Steps

### **After Installation:**
1. **Run dependency check:** `check_websocket_dependencies.bat`
2. **Test with native plugin:** `run_native_websocket_test.bat`
3. **Compare performance:** Run both JSR223 and native tests
4. **Use master menu:** `run_buzz_testing_suite.bat` → Option [10] for installation

### **If Installation Fails:**
- Use JSR223 approach: `run_websocket_realtime_test.bat`
- Check troubleshooting section above
- Review JMeter logs for error details
- Contact support with specific error messages

---

## 🎉 Summary

**What to Download:**
1. **jmeter-plugins-manager-1.10.jar** (2MB) from https://jmeter-plugins.org/get/
2. **WebSocket Samplers plugin** via Plugins Manager (automatic)

**Where to Install:**
- Copy to: `[JMETER_HOME]/lib/ext/`
- Restart JMeter after installation

**How to Test:**
- Use `install_websocket_plugins.bat` for automated setup
- Run `run_native_websocket_test.bat` for best performance
- Fallback to `run_websocket_realtime_test.bat` if plugins fail

**Expected Result:**
- Superior WebSocket testing performance and accuracy
- Native WebSocket protocol compliance
- Enhanced debugging and monitoring capabilities