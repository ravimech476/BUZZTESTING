#!/usr/bin/env python3
"""
BUZZ App Updated Test Data Generator
Generates CSV test data with new address fields for the updated 11-step API workflow
"""

import csv
import random
from datetime import datetime

# Configuration
USER_COUNT = 100
PHONE_BASE = 7455123000
COUNTRY_CODE = "+91"

# Tamil Nadu cities and pincodes
CITIES_DATA = [
    ("Chennai", "Tamil Nadu", "600001"),
    ("Coimbatore", "Tamil Nadu", "641001"), 
    ("Madurai", "Tamil Nadu", "625001"),
    ("Tiruchirappalli", "Tamil Nadu", "620001"),
    ("Salem", "Tamil Nadu", "636001"),
    ("Tirunelveli", "Tamil Nadu", "627001"),
    ("Erode", "Tamil Nadu", "638001"),
    ("Vellore", "Tamil Nadu", "632001"),
    ("Thanjavur", "Tamil Nadu", "613001"),
    ("Dindigul", "Tamil Nadu", "624001"),
    ("Thoothukudi", "Tamil Nadu", "628001"),
    ("Nagercoil", "Tamil Nadu", "629001"),
    ("Cuddalore", "Tamil Nadu", "607001"),
    ("Karur", "Tamil Nadu", "639001"),
    ("Sivakasi", "Tamil Nadu", "626001")
]

# Street name templates
STREET_TEMPLATES = [
    "Test Street",
    "Main Road", 
    "Gandhi Street",
    "Anna Nagar",
    "Park Road",
    "Temple Street",
    "Market Street",
    "Station Road",
    "College Road",
    "Hospital Street"
]

def generate_address(user_num):
    """Generate a realistic address for Tamil Nadu"""
    city_data = CITIES_DATA[user_num % len(CITIES_DATA)]
    city, state, base_pincode = city_data
    
    # Generate street address
    street_template = STREET_TEMPLATES[user_num % len(STREET_TEMPLATES)]
    house_num = 100 + user_num
    address = f"{house_num} {street_template} {user_num:03d}"
    
    # Generate pincode variation
    pincode_variation = user_num % 10
    pincode = base_pincode[:-1] + str(int(base_pincode[-1]) + pincode_variation)
    
    return address, city, state, pincode

def generate_updated_users_csv():
    """Generate updated CSV file with address fields"""
    filename = "buzz_100_users_updated.csv"
    
    print(f"🚀 Generating {filename} with address fields...")
    print(f"📊 Creating {USER_COUNT} user records")
    
    # Headers for updated CSV
    headers = [
        "phoneNumber", 
        "countryCode", 
        "name", 
        "categoryName", 
        "updateCategoryName",
        "address",
        "city", 
        "state",
        "pincode"
    ]
    
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        
        # Write headers
        writer.writerow(headers)
        
        # Generate user data
        for i in range(1, USER_COUNT + 1):
            phone_number = PHONE_BASE + i
            name = f"JmeterUser{i:05d}"
            category_name = f"TestCategory{i:05d}"
            update_category_name = f"UpdatedCategory{i:05d}"
            
            # Generate address components
            address, city, state, pincode = generate_address(i)
            
            # Write row
            row = [
                phone_number,
                COUNTRY_CODE,
                name,
                category_name,
                update_category_name,
                address,
                city,
                state,
                pincode
            ]
            
            writer.writerow(row)
    
    print(f"✅ Successfully created {filename}")
    print(f"📋 Headers: {', '.join(headers)}")
    print(f"👥 Total users: {USER_COUNT}")
    print(f"🏙️  Cities covered: {len(CITIES_DATA)}")
    return filename

def generate_contact_csv():
    """Generate contact CSV file (reusable from existing)"""
    filename = "buzz_test_contacts.csv"
    
    print(f"🚀 Generating {filename}...")
    
    headers = ["contactPhone", "contactName"]
    
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        
        # Write headers
        writer.writerow(headers)
        
        # Generate contact data
        contact_base = 9876543000
        for i in range(1, USER_COUNT + 1):
            contact_phone = contact_base + i
            contact_name = f"JmeterContact{i:03d}"
            
            row = [contact_phone, contact_name]
            writer.writerow(row)
    
    print(f"✅ Successfully created {filename}")
    return filename

def validate_csv_file(filename):
    """Validate generated CSV file"""
    print(f"🔍 Validating {filename}...")
    
    try:
        with open(filename, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            rows = list(reader)
            
            print(f"✅ File validation passed")
            print(f"📊 Rows: {len(rows)}")
            print(f"📋 Columns: {len(reader.fieldnames)}")
            
            # Show sample data
            if rows:
                print(f"📝 Sample record:")
                sample = rows[0]
                for key, value in sample.items():
                    print(f"   {key}: {value}")
                    
            return True
            
    except Exception as e:
        print(f"❌ Validation failed: {e}")
        return False

def generate_test_summary():
    """Generate test summary report"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    summary = f"""
==============================================================
📊 BUZZ UPDATED TEST DATA GENERATION SUMMARY
==============================================================

🕒 Generated: {timestamp}
🎯 Test Type: 11-Step API Workflow with Address Update & Remove People
👥 User Count: {USER_COUNT}
📱 Phone Range: {PHONE_BASE + 1} to {PHONE_BASE + USER_COUNT}

📋 NEW CSV STRUCTURE:
   ├── phoneNumber (Primary identifier)
   ├── countryCode (+91 for India)
   ├── name (JmeterUser00001-00100)
   ├── categoryName (TestCategory00001-00100)
   ├── updateCategoryName (UpdatedCategory00001-00100)
   ├── address (Street address with house number)
   ├── city (Tamil Nadu cities)
   ├── state (Tamil Nadu)
   └── pincode (Area-specific pincodes)

🆕 NEW API FEATURES SUPPORTED:
   ✅ Step 5: Update Address API
   ✅ Step 9: Remove People API
   ✅ Enhanced address validation
   ✅ Tamil Nadu geographic data

🏙️  GEOGRAPHIC COVERAGE:
   📍 Cities: {len(CITIES_DATA)} major Tamil Nadu cities
   📮 Pincodes: Area-specific with variations
   🏠 Addresses: Realistic street addresses

🔧 USAGE:
   1. Use with BUZZ_100_USERS_UPDATED_11_STEP_TEST.jmx
   2. Run via run_buzz_100_users_updated_11_step.bat
   3. Monitor results in HTML dashboard

⚠️  IMPORTANT NOTES:
   - Each user will create categories with addresses
   - Address update API will be tested for all users
   - People removal API will be validated
   - JWT authentication required for protected endpoints

==============================================================
"""
    
    print(summary)
    
    # Save summary to file
    with open("buzz_updated_test_data_summary.txt", "w") as f:
        f.write(summary)
    
    print("📄 Summary saved to: buzz_updated_test_data_summary.txt")

def main():
    """Main execution function"""
    print("🚀 BUZZ App Updated Test Data Generator")
    print("=" * 60)
    
    try:
        # Generate updated users CSV with address fields
        users_file = generate_updated_users_csv()
        validate_csv_file(users_file)
        
        print()
        
        # Generate contacts CSV
        contacts_file = generate_contact_csv()
        validate_csv_file(contacts_file)
        
        print()
        
        # Generate summary
        generate_test_summary()
        
        print()
        print("🎉 TEST DATA GENERATION COMPLETED SUCCESSFULLY!")
        print()
        print("📁 FILES CREATED:")
        print(f"   ✅ {users_file}")
        print(f"   ✅ {contacts_file}")
        print("   ✅ buzz_updated_test_data_summary.txt")
        print()
        print("🔄 NEXT STEPS:")
        print("   1. Run the updated JMeter test: run_buzz_100_users_updated_11_step.bat")
        print("   2. Monitor the 11-step API workflow execution")
        print("   3. Check HTML reports for new API performance")
        print("   4. Validate address update and people removal operations")
        
    except Exception as e:
        print(f"❌ Error during data generation: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
