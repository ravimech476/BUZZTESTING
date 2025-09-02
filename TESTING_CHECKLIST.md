# BUZZ API Stress Testing Checklist

## Pre-Test Checklist

### **Environment Preparation**
- [ ] **Server Health Check**
  - [ ] BUZZ API server is running on https://buzz.pazl.info:5000
  - [ ] Database is accessible and responding
  - [ ] All required services (Redis, WebSocket) are running
  - [ ] Server has adequate resources (CPU < 50%, RAM < 70%, Disk space > 20%)

- [ ] **JMeter Setup**
  - [ ] JMeter 5.6.3+ is installed and accessible
  - [ ] JMETER_HOME environment variable is set
  - [ ] Java 8+ is installed and configured
  - [ ] Test machine has minimum 8GB RAM available

- [ ] **Test Configuration**
  - [ ] Updated `TEST_PHONE_NUMBER` in test plan to valid number
  - [ ] Verified `BASE_URL` and `API_PATH` are correct
  - [ ] Confirmed authentication flow works manually
  - [ ] Results directory is created and writable

### **Team Coordination**
- [ ] **Notifications Sent**
  - [ ] Informed development team about upcoming stress test
  - [ ] Notified operations team about expected load
  - [ ] Scheduled test during low-traffic period
  - [ ] Set up monitoring dashboards and alerts

- [ ] **Backup & Safety**
  - [ ] Database backup completed (if testing on shared environment)
  - [ ] Rollback plan documented
  - [ ] Emergency contact list prepared
  - [ ] Server monitoring tools configured

### **Test Plan Verification**
- [ ] **Thread Group Configuration**
  - [ ] Authentication setup enabled (1 user)
  - [ ] Light load test enabled for first run (50 users)
  - [ ] Medium/Heavy load tests disabled initially
  - [ ] Extreme load test remains disabled

- [ ] **API Endpoints**
  - [ ] All critical API endpoints included in test
  - [ ] Authentication headers configured correctly
  - [ ] Request/response validation added
  - [ ] Error handling scenarios included

## During Test Monitoring

### **Server Metrics to Watch**
- [ ] **System Resources**
  - [ ] CPU usage (warn if > 80%, stop if > 95%)
  - [ ] Memory usage (warn if > 85%, stop if > 95%)
  - [ ] Disk I/O (monitor for bottlenecks)
  - [ ] Network bandwidth utilization

- [ ] **Application Metrics**
  - [ ] Response time trends
  - [ ] Error rate (stop test if > 5%)
  - [ ] Active database connections
  - [ ] API request queue length

- [ ] **Database Performance**
  - [ ] Query execution times
  - [ ] Connection pool utilization
  - [ ] Lock waits and deadlocks
  - [ ] Slow query log entries

### **JMeter Metrics to Monitor**
- [ ] **Performance Indicators**
  - [ ] Average response time < 2000ms
  - [ ] 95th percentile < 3000ms
  - [ ] Throughput stability
  - [ ] Error rate < 1%

- [ ] **Test Progress**
  - [ ] Thread ramp-up proceeding as planned
  - [ ] No memory errors in JMeter
  - [ ] Results being written to files
  - [ ] No connection timeouts

## Stop Test Immediately If:
- [ ] **Critical Issues**
  - [ ] Server error rate > 5%
  - [ ] Database becomes unresponsive
  - [ ] Server CPU > 95% for more than 5 minutes
  - [ ] Memory usage > 95%
  - [ ] Application crashes or becomes unresponsive

- [ ] **Performance Degradation**
  - [ ] Response times > 10 seconds consistently
  - [ ] Complete loss of service
  - [ ] Database connection exhaustion
  - [ ] Disk space < 5%

## Post-Test Checklist

### **Immediate Actions**
- [ ] **Test Cleanup**
  - [ ] Stop all JMeter processes
  - [ ] Verify server returns to normal operation
  - [ ] Check for any stuck processes or connections
  - [ ] Monitor server recovery time

- [ ] **Data Collection**
  - [ ] HTML test reports generated successfully
  - [ ] Results files (.jtl) saved and accessible
  - [ ] Server logs collected during test period
  - [ ] Database performance logs archived

### **Results Analysis**
- [ ] **Performance Analysis**
  - [ ] Response time trends analyzed
  - [ ] Throughput patterns documented
  - [ ] Error patterns identified and categorized
  - [ ] Resource utilization peaks noted

- [ ] **Bottleneck Identification**
  - [ ] Slowest API endpoints identified
  - [ ] Resource bottlenecks documented (CPU, RAM, DB, Network)
  - [ ] Scalability limits determined
  - [ ] Breaking point identified (if reached)

### **Reporting & Documentation**
- [ ] **Test Summary Report**
  - [ ] Test configuration documented
  - [ ] Key performance metrics summarized
  - [ ] Bottlenecks and issues identified
  - [ ] Recommendations for improvements

- [ ] **Action Items**
  - [ ] Performance optimization tasks created
  - [ ] Infrastructure scaling recommendations
  - [ ] Code optimization opportunities identified
  - [ ] Follow-up testing scheduled

### **Data Cleanup**
- [ ] **Test Data Removal**
  - [ ] Test categories created during testing removed
  - [ ] Test user accounts cleaned up
  - [ ] Temporary logs and files purged
  - [ ] Database test data cleared (if applicable)

- [ ] **Archive Results**
  - [ ] Test results archived with timestamp
  - [ ] Performance baseline updated
  - [ ] Historical comparison data updated
  - [ ] Results shared with stakeholders

## Expected Results by Test Level

### **Light Load Test (50 users)**
- **Expected**: All APIs respond < 1000ms, 0% error rate, smooth ramp-up
- **Action if Failed**: Fix issues before proceeding to medium load

### **Medium Load Test (100 users)**
- **Expected**: 95% APIs respond < 2000ms, < 1% error rate, stable throughput
- **Action if Failed**: Optimize bottlenecks before heavy load testing

### **Heavy Load Test (200 users)**
- **Expected**: Some performance degradation acceptable, < 2% error rate
- **Action if Failed**: Major optimization needed before production scaling

### **Extreme Load Test (500 users)**
- **Purpose**: Find breaking point, expect failures
- **Expected**: System may fail - document failure points for capacity planning

## Emergency Contacts

- **Development Team Lead**: [Name, Phone, Email]
- **Operations/DevOps**: [Name, Phone, Email]
- **Database Administrator**: [Name, Phone, Email]
- **System Administrator**: [Name, Phone, Email]

## Common Issues & Solutions

### **High Error Rate**
1. Check server logs for specific error messages
2. Verify database connectivity and performance
3. Check for resource exhaustion (connections, memory)
4. Reduce load and investigate root cause

### **Poor Performance**
1. Monitor server resource utilization
2. Check database query performance
3. Verify network latency and bandwidth
4. Review application logs for bottlenecks

### **Test Failures**
1. Verify JMeter configuration and heap settings
2. Check test machine resources
3. Validate test data and authentication
4. Review network connectivity between test machine and server

## Notes
- Always start with light load and progressively increase
- Document everything for future reference
- Share results with the entire team
- Use findings to improve system performance and scalability
- Schedule regular stress testing as part of your release process
