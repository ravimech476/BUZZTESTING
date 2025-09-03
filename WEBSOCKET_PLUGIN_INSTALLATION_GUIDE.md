# JMeter WebSocket Plugin Installation Guide

## 🔧 Required WebSocket Plugins for JMeter

### **Option 1: JMeter WebSocket Samplers (Recommended)**

#### **Plugin Details:**
- **Name**: WebSocket Samplers by Peter Doornbosch
- **Purpose**: Native WebSocket support in JMeter
- **Components**: WebSocket Open Connection, WebSocket Request/Response samplers
- **Compatibility**: JMeter 5.0+

#### **Download & Installation:**

**Method 1: JMeter Plugins Manager (Easiest)**
1. Download JMeter Plugins Manager:
   ```
   https://jmeter-plugins.org/get/
   ```
2. Place `jmeter-plugins-manager-X.X.jar` in `JMETER_HOME/lib/ext/`
3. Restart JMeter
4. Go to `Options` → `Plugins Manager`
5. Search for "WebSocket" in Available plugins
6. Install: **"WebSocket Samplers by Peter Doornbosch"**

**Method 2: Direct Download**
```
Direct Download URL:
https://github.com/ptrd/jmeter-websocket-samplers/releases

Download: jmeter-websocket-samplers-X.X.X.jar
Place in: JMETER_HOME/lib/ext/
```

### **Option 2: Alternative WebSocket Plugin**

#### **Maciej Zaleski WebSocket Plugin:**
```
GitHub: https://github.com/maciejzaleski/JMeter-WebSocketSampler
JAR Download: https://github.com/maciejzaleski/JMeter-WebSocketSampler/releases
```

## 📥 Step-by-Step Installation

### **Step 1: Download JMeter Plugins Manager**
```bash
# Download URL
https://jmeter-plugins.org/get/

# File to download
jmeter-plugins-manager-1.10.jar (or latest version)
```

### **Step 2: Install Plugins Manager**
1. Copy `jmeter-plugins-manager-1.10.jar` to:
   ```
   [JMETER_HOME]/lib/ext/
   ```
2. Restart JMeter
3. Verify: You should see "Plugins Manager" under Options menu

### **Step 3: Install WebSocket Plugin**
1. Open JMeter
2. Go to `Options` → `Plugins Manager`
3. Click "Available Plugins" tab
4. Search for "WebSocket"
5. Check "WebSocket Samplers by Peter Doornbosch"
6. Click "Apply Changes and Restart JMeter"

### **Step 4: Verify Installation**
After restart, check if these samplers are available:
- WebSocket Open Connection
- WebSocket Request/Response Sampler  
- WebSocket Close Connection
- WebSocket Ping/Pong Sampler

## 🛠️ Alternative: Manual Plugin Installation

If Plugins Manager doesn't work, download manually:

### **Direct JAR Downloads:**

**1. Peter Doornbosch WebSocket Samplers:**
```
GitHub: https://github.com/ptrd/jmeter-websocket-samplers
Latest Release: https://github.com/ptrd/jmeter-websocket-samplers/releases/latest
File: jmeter-websocket-samplers-[version].jar
```

**2. Maciej Zaleski WebSocket Plugin:**
```
GitHub: https://github.com/maciejzaleski/JMeter-WebSocketSampler
Latest Release: https://github.com/maciejzaleski/JMeter-WebSocketSampler/releases/latest
File: JMeterWebSocketSampler-[version].jar
```

### **Installation Steps:**
1. Download the JAR file
2. Copy to `[JMETER_HOME]/lib/ext/`
3. Restart JMeter
4. WebSocket samplers will appear in Add → Sampler menu

## 📋 Required Dependencies

Some WebSocket plugins may require additional libraries:

### **Common Dependencies:**
```
# Often included with plugins, but if needed:
1. Java-WebSocket library
2. JSON processing libraries  
3. Apache Commons libraries (usually included with JMeter)
```

### **Check Dependencies:**
- Most WebSocket plugins are self-contained
- If you get ClassNotFoundException errors, check plugin documentation for additional JARs

## 🔄 Updated WebSocket Test Plan

Once plugins are installed, here's the improved approach:

### **WebSocket Test Structure:**
1. **WebSocket Open Connection** - Establishes WebSocket connection
2. **WebSocket Request/Response** - Sends messages and receives responses
3. **WebSocket Ping/Pong** - Tests connection health
4. **WebSocket Close Connection** - Properly closes connection

## 📦 Complete Installation Package

I'll create an installation script for you:
