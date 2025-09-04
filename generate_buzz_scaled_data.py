import csv
import sys
import argparse

def generate_users_csv(user_count, filename):
    """Generate user CSV with specified number of records"""
    
    print(f"🚀 Generating {filename} with {user_count:,} user records...")
    
    # Phone number ranges for better distribution
    if user_count <= 100:
        phone_ranges = [{"start": 7455123001, "count": user_count, "prefix": "745"}]
    elif user_count <= 1000:
        phone_ranges = [
            {"start": 7455123001, "count": min(250, user_count), "prefix": "745"},
            {"start": 8755234001, "count": min(250, max(0, user_count - 250)), "prefix": "875"}, 
            {"start": 9655345001, "count": min(250, max(0, user_count - 500)), "prefix": "965"},
            {"start": 6555456001, "count": max(0, user_count - 750), "prefix": "655"}
        ]
    else:  # 10K users
        phone_ranges = [
            {"start": 7455123001, "count": 2500, "prefix": "745"},
            {"start": 8755234001, "count": 2500, "prefix": "875"}, 
            {"start": 9655345001, "count": 2500, "prefix": "965"},
            {"start": 6555456001, "count": user_count - 7500, "prefix": "655"}
        ]
    
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        
        # Write header
        writer.writerow(['phoneNumber', 'countryCode', 'name', 'categoryName', 'updateCategoryName'])
        
        user_count_actual = 1
        
        for range_info in phone_ranges:
            if range_info["count"] <= 0:
                continue
                
            for i in range(range_info["count"]):
                phone_number = str(range_info["start"] + i)
                country_code = "+91"
                name = f"JmeterUser{user_count_actual:05d}"
                category_name = f"TestCategory{user_count_actual:05d}"
                update_category_name = f"UpdatedCategory{user_count_actual:05d}"
                
                writer.writerow([phone_number, country_code, name, category_name, update_category_name])
                
                if user_count_actual % 1000 == 0:
                    print(f"  ✅ Generated {user_count_actual:,} records...")
                
                user_count_actual += 1
                
                if user_count_actual > user_count:
                    break
            
            if user_count_actual > user_count:
                break
    
    print(f"✅ Successfully generated {user_count_actual-1:,} user records!")
    print(f"📄 File saved: {filename}")
    return user_count_actual - 1

def generate_contacts_csv(contact_count=100):
    """Generate buzz_test_contacts.csv with contact records"""
    
    print(f"\n📱 Generating Contact Numbers CSV ({contact_count} contacts)...")
    
    with open('buzz_test_contacts.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        
        # Write header
        writer.writerow(['contactPhone', 'contactName'])
        
        contact_base = 9876543000
        
        for i in range(1, contact_count + 1):
            contact_phone = str(contact_base + i)
            contact_name = f"JmeterContact{i:03d}"
            
            writer.writerow([contact_phone, contact_name])
    
    print(f"✅ Successfully generated {contact_count} contact records!")
    print("📄 File saved: buzz_test_contacts.csv")
    return contact_count

def generate_test_properties(user_count):
    """Generate JMeter properties file based on user count"""
    
    # Configure test parameters based on user count
    if user_count <= 100:
        ramp_time = 60
        duration = 900  # 15 minutes
        target_tps = 50
        response_time_target = 2000
        test_level = "validation"
    elif user_count <= 1000:
        ramp_time = 300  # 5 minutes
        duration = 1800  # 30 minutes  
        target_tps = 300
        response_time_target = 3000
        test_level = "pre_production"
    else:  # 10K users
        ramp_time = 600  # 10 minutes
        duration = 2700  # 45 minutes
        target_tps = 500
        response_time_target = 3000
        test_level = "production_scale"
    
    properties_content = f"""# BUZZ {user_count} Users Stress Test - JMeter Configuration
# =============================================
# Test Level: {test_level}
# Generated for: {user_count:,} concurrent users

# Thread Group Settings
threads={user_count}
rampup={ramp_time}
duration={duration}
loops=1

# Server Configuration  
server.host=buzz.pazl.info
server.protocol=https
server.port=443

# Test Data Files
main.csv=buzz_{user_count}_users.csv
contacts.csv=buzz_test_contacts.csv

# Performance Targets (Based on {user_count} users)
response.time.target={response_time_target}
error.rate.target=1.0
throughput.target={target_tps}

# Authentication Settings
otp.default=123456
jwt.expiry=3600

# Logging Configuration
log.level=INFO
log.response.data=false
log.sampler.data=true

# Report Configuration
generate.dashboard=true
report.title=BUZZ {user_count} Users Stress Test Results
report.output.dir=results/html_report_{user_count}_users

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

# Test Level Specific Settings
test.level={test_level}
test.user.count={user_count}
test.expected.sms.cost={(user_count * 0.0075):.2f}
test.expected.requests={user_count * 12}

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
    
    properties_filename = f'buzz_{user_count}_users_test.properties'
    with open(properties_filename, 'w', encoding='utf-8') as f:
        f.write(properties_content)
    
    print(f"\n⚙️ Generated JMeter properties file!")
    print(f"📄 File saved: {properties_filename}")

def main():
    parser = argparse.ArgumentParser(description='Generate BUZZ test data for different scale levels')
    parser.add_argument('--users', type=int, choices=[100, 1000, 10000], 
                        help='Number of users to generate (100, 1000, or 10000)')
    parser.add_argument('--all', action='store_true', 
                        help='Generate data for all test levels (100, 1000, 10000)')
    
    args = parser.parse_args()
    
    print("=" * 70)
    print("🚀 BUZZ SCALED STRESS TEST - DATA GENERATOR")
    print("=" * 70)
    print()
    
    if args.all:
        # Generate data for all test levels
        test_levels = [
            (100, "Validation Test"),
            (1000, "Pre-Production Test"), 
            (10000, "Production Scale Test")
        ]
        
        for user_count, test_name in test_levels:
            print(f"📊 Generating {test_name} data ({user_count:,} users)...")
            print("─" * 50)
            
            # Generate user CSV
            filename = f'buzz_{user_count}_users.csv'
            actual_users = generate_users_csv(user_count, filename)
            
            # Generate properties file
            generate_test_properties(user_count)
            print()
        
        # Generate contacts CSV once (shared across all tests)
        generate_contacts_csv(100)
        
        print("\n" + "=" * 70)
        print("✅ ALL TEST LEVELS GENERATED SUCCESSFULLY!")
        print("=" * 70)
        print()
        print("📋 FILES CREATED:")
        print("  ├── 📄 buzz_100_users.csv (100 users)")
        print("  ├── 📄 buzz_1000_users.csv (1,000 users)")
        print("  ├── 📄 buzz_10000_users.csv (10,000 users)")
        print("  ├── 📱 buzz_test_contacts.csv (100 contacts)")
        print("  ├── ⚙️  buzz_100_users_test.properties")
        print("  ├── ⚙️  buzz_1000_users_test.properties")
        print("  └── ⚙️  buzz_10000_users_test.properties")
        print()
        print("🎯 EXECUTION SEQUENCE:")
        print("  1. 🟢 VALIDATION: run_buzz_100_users_test.bat")
        print("  2. 🟡 PRE-PRODUCTION: run_buzz_1000_users_test.bat") 
        print("  3. 🔴 PRODUCTION SCALE: run_buzz_10k_complete_stress_test.bat")
        
    elif args.users:
        # Generate data for specific user count
        user_count = args.users
        test_names = {100: "Validation Test", 1000: "Pre-Production Test", 10000: "Production Scale Test"}
        test_name = test_names.get(user_count, "Custom Test")
        
        print(f"📋 Generating {test_name} data:")
        print(f"  ├── 📊 Users: {user_count:,}")
        print(f"  ├── 📱 Contacts: 100")
        print(f"  └── ⚙️  Configuration: Optimized for {user_count} users")
        print()
        
        try:
            # Generate user CSV
            filename = f'buzz_{user_count}_users.csv'
            actual_users = generate_users_csv(user_count, filename)
            
            # Generate contacts CSV
            actual_contacts = generate_contacts_csv(100)
            
            # Generate properties file
            generate_test_properties(user_count)
            
            print("\n" + "=" * 70)
            print(f"✅ {test_name.upper()} DATA GENERATED SUCCESSFULLY!")
            print("=" * 70)
            print(f"📊 Total user records: {actual_users:,}")
            print(f"📱 Total contact records: {actual_contacts}")
            print()
            print("📋 NEXT STEPS:")
            if user_count == 100:
                print("  1. ✅ Run validation test: run_buzz_100_users_test.bat")
                print("  2. 📊 Review results before scaling to 1000 users")
            elif user_count == 1000:  
                print("  1. ✅ Run pre-production test: run_buzz_1000_users_test.bat")
                print("  2. 📊 Review results before scaling to 10K users")
            else:  # 10000
                print("  1. ✅ Run production test: run_buzz_10k_complete_stress_test.bat")
                print("  2. 📊 Monitor server resources closely")
            print()
            print("⚠️ IMPORTANT REMINDERS:")
            print(f"  ├── 📱 {user_count:,} real SMS messages will be sent")
            print(f"  ├── 💰 Estimated SMS cost: ${(user_count * 0.0075):.2f} - ${(user_count * 0.015):.2f}")
            print(f"  ├── 💾 High database load expected")
            print(f"  └── 🔗 {user_count:,} concurrent connections")
            
        except Exception as e:
            print(f"❌ ERROR: {str(e)}")
            print("Please check permissions and try again.")
            sys.exit(1)
    
    else:
        # Interactive mode
        print("📋 Select test level to generate data:")
        print("  1. 🟢 Validation Test (100 users)")
        print("  2. 🟡 Pre-Production Test (1,000 users)")  
        print("  3. 🔴 Production Scale Test (10,000 users)")
        print("  4. 🌟 All Test Levels")
        print()
        
        while True:
            try:
                choice = input("Enter your choice (1-4): ").strip()
                if choice == '1':
                    user_count = 100
                    break
                elif choice == '2':
                    user_count = 1000
                    break
                elif choice == '3':
                    user_count = 10000
                    break
                elif choice == '4':
                    # Generate all
                    args.all = True
                    main()
                    return
                else:
                    print("❌ Invalid choice. Please enter 1, 2, 3, or 4.")
            except KeyboardInterrupt:
                print("\n\n❌ Operation cancelled by user.")
                sys.exit(0)
        
        # Set args.users and call main again
        args.users = user_count
        main()

if __name__ == "__main__":
    main()
