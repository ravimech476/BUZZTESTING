# BUZZ WebSocket Real-Time Performance Testing Guide

## Overview

This testing suite provides comprehensive WebSocket performance testing for the BUZZ real-time calling application. It tests the complete WebSocket lifecycle including connection management, real-time messaging, call flows, and server performance under load.

## 🌐 WebSocket Architecture Understanding

### BUZZ WebSocket Server Details:
- **Server URL**: `ws://buzz.pazl.info:3000`  
- **Protocol**: WebSocket (ws://)
- **Framework**: Node.js with ws library
- **Real-time Features**: User registration, call management, heartbeat monitoring

### Key WebSocket Message Types:
1. **register** - User registration on WebSocket
2. **heartbeat** - Connection health monitoring  
3. **call** - Call initiation
4. **accept/reject** - Call response handling
5. **end_call** - Call termination
6. **connection_check** - Connection validation

## 📁 Test Files Structure

```
D:\JMETER_TESTING\BUZZ_APP_STRESS_TEST\
├── BUZZ_WEBSOCKET_REALTIME_TEST.jmx          # Basic WebSocket sampler test
├── BUZZ_WEBSOCKET_JSR223_TEST.jmx            # Advanced JSR223 WebSocket test  
├── websocket_test_users.csv                   # Test user data
├── websocket_test_config.properties          # Configuration parameters
├── run_websocket_realtime_test.bat           # Standard WebSocket test
├── run_websocket_stress_test.bat             # High-load stress test
├── run_fullstack_performance_test.bat        # Combined API + WebSocket test
└── results\                                  # Test results directory
```

## 🚀 Quick Start Guide

### 1. Standard WebSocket Performance Test
```bash
# Run real-time WebSocket functionality test
run_websocket_realtime_test.bat

# Configuration:
# - 20 concurrent WebSocket connections
# - 5-minute test duration
# - Complete call flow simulation
```

### 2. High-Load Stress Test  
```bash
# Run WebSocket server stress test
run_websocket_stress_test.bat

# Configuration:
# - 100 concurrent WebSocket connections  
# - 10-minute test duration
# - Server capacity testing
```

### 3. Full-Stack Performance Test
```bash
# Run combined API + WebSocket test
run_fullstack_performance_test.bat

# Tests both API endpoints and WebSocket functionality
# Simulates realistic user behavior patterns
```

## 📊 Test Scenarios Covered

### WebSocket Connection Testing
- ✅ Connection establishment performance
- ✅ Connection stability under load
- ✅ Connection timeout handling
- ✅ Reconnection capabilities
- ✅ Concurrent connection limits

### Real-Time Messaging Testing  
- 📨 Message delivery latency
- 📨 Message ordering preservation
- 📨 Message loss detection
- 📨 Broadcast message performance
- 📨 Message queuing under load

### Call Flow Testing
- 📞 Call initiation performance
- 📞 Call acceptance/rejection flows
- 📞 Call termination handling
- 📞 Multiple simultaneous calls
- 📞 Call state management

### Heartbeat & Health Monitoring
- 💓 Ping/pong mechanism testing
- 💓 Connection health validation
- 💓 Automatic reconnection testing
- 💓 Timeout and recovery testing
- 💓 Connection state tracking

## ⚙️ Configuration Parameters

### Basic Test Configuration
```properties
# Standard test settings
websocket.server=buzz.pazl.info
websocket.port=3000
test.concurrent.users=20
test.duration=300
```

### Stress Test Configuration
```properties
# High-load test settings
stress.concurrent.users=100
stress.duration=600
stress.ramp.time=120
```

### Performance Thresholds
```properties
# Success criteria
performance.connection.success.rate=95
performance.message.latency.ms=500
performance.call.setup.time.ms=2000
```

## 📈 Performance Metrics

### Key WebSocket Metrics
1. **Connection Success Rate** - % of successful WebSocket connections
2. **Message Latency** - Average time for message delivery
3. **Call Setup Time** - Time from call initiation to acceptance
4. **Heartbeat Response Time** - Ping/pong round-trip time
5. **Connection Stability** - % uptime during test duration
6. **Throughput** - Messages per second handling capacity

### Real-Time Performance Targets
- Connection Success Rate: >95%
- Message Latency: <500ms  
- Call Setup Time: <2 seconds
- Heartbeat Response: <100ms
- Connection Stability: >99%

## 🔧 Troubleshooting Guide

### Common Issues & Solutions

#### WebSocket Connection Failures
```
Problem: WebSocket connections failing to establish
Solution: 
1. Verify server is running on buzz.pazl.info:3000
2. Check firewall settings for WebSocket traffic
3. Validate WebSocket URL format
4. Review server logs for connection limits
```

#### High Latency Issues
```
Problem: Message delivery taking too long
Solution:
1. Check network connectivity to server
2. Monitor server CPU/memory usage
3. Reduce concurrent user count
4. Implement connection pooling
```

#### Connection Drops During Test
```
Problem: WebSocket connections dropping randomly
Solution:
1. Increase connection timeout values
2. Implement heartbeat mechanism
3. Check for network instability
4. Review server resource limits
```

## 📊 Results Analysis

### HTML Report Analysis
The test generates comprehensive HTML reports with:
- Connection establishment metrics
- Message latency distributions  
- Error rate analysis
- Performance over time graphs
- Resource utilization trends

### Key Report Sections to Review
1. **Summary Report** - Overall test performance
2. **Response Times Over Time** - Latency trends
3. **Transactions per Second** - Throughput analysis
4. **Error Analysis** - Failure patterns
5. **Server Performance** - Resource utilization

### Performance Optimization Recommendations
Based on results, consider:
- WebSocket connection pooling
- Message queuing optimization
- Server resource scaling
- Network infrastructure improvements
- Application-level caching

## 🛠️ Advanced Configuration

### Custom Test Scenarios
You can modify the JMX files to add:
- Custom message types
- Different call flow patterns  
- Variable load patterns
- Extended duration tests
- Custom assertions and validations

### Integration with CI/CD
```bash
# Example Jenkins pipeline integration
jmeter -n -t BUZZ_WEBSOCKET_JSR223_TEST.jmx \
    -l results/websocket_test.jtl \
    -e -o results/html_report \
    -JCONCURRENT_USERS=${CONCURRENT_USERS} \
    -JTEST_DURATION=${TEST_DURATION}
```

## 📞 Support & Contact

For technical support with WebSocket testing:
- Review jmeter.log for detailed error information
- Check server-side WebSocket logs
- Monitor network connectivity during tests
- Validate test data and configuration files

## 🎯 Best Practices

1. **Start Small** - Begin with low concurrent users and increase gradually
2. **Monitor Server** - Watch server resources during testing
3. **Validate Data** - Ensure test user data is valid
4. **Regular Testing** - Run tests regularly to catch performance degradation
5. **Documentation** - Document test results and performance baselines

---

**Note**: This WebSocket testing suite is specifically designed for the BUZZ real-time calling application and tests the complete WebSocket implementation including user registration, call management, and real-time messaging capabilities.