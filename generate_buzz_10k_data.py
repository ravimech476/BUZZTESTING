import csv
import sys

def generate_main_users_csv():
    """Generate buzz_10k_users.csv with 10,000 user records"""
    
    print("🚀 Generating BUZZ 10K Users CSV...")
    print("📊 Creating 10,000 user records...")
    
    # Phone number ranges for better distribution
    phone_ranges = [
        {"start": 7455123001, "count": 2500, "prefix": "745"},
        {"start": 8755234001, "count": 2500, "prefix": "875"}, 
        {"start": 9655345001, "count": 2500, "prefix": "965"},
        {"start": 6555456001, "count": 2500, "prefix": "655"}
    ]
    
    with open('buzz_10k_users.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        
        # Write header
        writer.writerow(['phoneNumber', 'countryCode', 'name', 'categoryName', 'updateCategoryName'])
        
        user_count = 1
        
        for range_info in phone_ranges:
            for i in range(range_info["count"]):
                phone_number = str(range_info["start"] + i)
                country_code = "+91"
                name = f"JmeterUser{user_count:05d}"
                category_name = f"TestCategory{user_count:05d}"
                update_category_name = f"UpdatedCategory{user_count:05d}"
                
                writer.writerow([phone_number, country_code, name, category_name, update_category_name])
                
                if user_count % 1000 == 0:
                    print(f"  ✅ Generated {user_count:,} records...")
                
                user_count += 1
    
    print(f"✅ Successfully generated {user_count-1:,} user records!")
    print(f"📄 File saved: buzz_10k_users.csv")
    return user_count - 1

def generate_contacts_csv():
    """Generate buzz_test_contacts.csv with 100 contact records"""
    
    print("\n📱 Generating Contact Numbers CSV...")
    
    with open('buzz_test_contacts.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        
        # Write header
        writer.writerow(['contactPhone', 'contactName'])
        
        contact_base = 9876543000
        
        for i in range(1, 101):  # Generate 100 contacts
            contact_phone = str(contact_base + i)
            contact_name = f"JmeterContact{i:03d}"
            
            writer.writerow([contact_phone, contact_name])
    
    print("✅ Successfully generated 100 contact records!")
    print("📄 File saved: buzz_test_contacts.csv")
    return 100

def generate_test_properties():
    """Generate JMeter properties file"""
    
    properties_content = """# BUZZ 10K Stress Test - JMeter Configuration
# =============================================

# Thread Group Settings
threads=10000
rampup=600
duration=2700
loops=1

# Server Configuration  
server.host=buzz.pazl.info
server.protocol=https
server.port=443

# Test Data Files
main.csv=buzz_10k_users.csv
contacts.csv=buzz_test_contacts.csv

# Performance Targets
response.time.target=3000
error.rate.target=1.0
throughput.target=500

# Authentication Settings
otp.default=123456
jwt.expiry=3600

# Logging Configuration
log.level=INFO
log.response.data=false
log.sampler.data=true

# Report Configuration
generate.dashboard=true
report.title=BUZZ 10K Stress Test Results
report.output.dir=results/html_report_10k_complete

# CSV Configuration
csv.delimiter=,
csv.quoted.data=true
csv.recycle=false
csv.stop.thread=true

# HTTP Configuration
http.implementation=HttpClient4
http.connection.timeout=30000
http.response.timeout=30000
http.keepalive=true

# Assertion Configuration
assert.response.code=200
assert.response.text="status":true
assert.json.path=$.status

# API Endpoint Configuration
api.send_otp=/buzz-api/send-otp
api.verify_otp=/buzz-api/verify-otp
api.profile=/buzz-api/customer/profile
api.category=/buzz-api/category
api.category_people=/buzz-api/category/people
api.contacts=/buzz-api/buzz-installed-contacts
api.call_history=/buzz-api/incoming-call-history

# Database Monitoring (if applicable)
db.monitor=true
db.connection.pool.monitor=true
db.query.timeout=30000

# Performance Monitoring
monitor.cpu=true
monitor.memory=true
monitor.network=true
monitor.response.times=true

# Cleanup Configuration
cleanup.test.users=true
cleanup.test.categories=true
cleanup.test.people=true
"""
    
    with open('buzz_10k_test.properties', 'w', encoding='utf-8') as f:
        f.write(properties_content)
    
    print("\n⚙️ Generated JMeter properties file!")
    print("📄 File saved: buzz_10k_test.properties")

def main():
    print("=" * 60)
    print("🚀 BUZZ 10K STRESS TEST - DATA GENERATOR")
    print("=" * 60)
    print()
    print("📋 This script will generate:")
    print("  ├── 📄 buzz_10k_users.csv (10,000 user records)")
    print("  ├── 📱 buzz_test_contacts.csv (100 contact records)")  
    print("  └── ⚙️ buzz_10k_test.properties (JMeter config)")
    print()
    
    try:
        # Generate main users CSV
        user_count = generate_main_users_csv()
        
        # Generate contacts CSV  
        contact_count = generate_contacts_csv()
        
        # Generate properties file
        generate_test_properties()
        
        print("\n" + "=" * 60)
        print("✅ ALL FILES GENERATED SUCCESSFULLY!")
        print("=" * 60)
        print(f"📊 Total user records: {user_count:,}")
        print(f"📱 Total contact records: {contact_count}")
        print()
        print("📋 NEXT STEPS:")
        print("  1. ✅ Copy files to JMeter test directory")
        print("  2. 🔧 Run: run_buzz_10k_complete_stress_test.bat")
        print("  3. 📊 Monitor server performance during test")
        print("  4. 📈 Review HTML dashboard results")
        print()
        print("⚠️ IMPORTANT REMINDERS:")
        print("  ├── 📱 10,000 real SMS messages will be sent")
        print("  ├── 💾 High database load expected")
        print("  ├── 🔗 10,000 concurrent connections")
        print("  └── 📊 Monitor server resources closely")
        print()
        
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        print("Please check permissions and try again.")
        sys.exit(1)

if __name__ == "__main__":
    main()
