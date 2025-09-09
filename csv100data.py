#!/usr/bin/env python3
"""
BUZZ Test Data Generator for 100 Users
Creates CSV files for JMeter testing with random test data
Every run generates fresh data and overwrites existing files
"""

import csv
import random

def generate_random_phone(existing, prefix="9876"):
    """Generate unique random 10-digit phone numbers starting with prefix"""
    while True:
        phone = prefix + "".join([str(random.randint(0, 9)) for _ in range(6)])
        if phone not in existing:
            existing.add(phone)
            return phone

def generate_buzz_100_users():
    """Generate 100 users CSV file for BUZZ testing"""
    users_data = [
        ["phoneNumber", "countryCode", "name", "categoryName", "updateCategoryName"]
    ]
    
    # Extended categories for 100 users
    categories = [
        ("Family Group", "Updated Family"),
        ("Work Team", "Updated Work"),
        ("Friends Circle", "Updated Friends"),
        ("Emergency Contacts", "Updated Emergency"),
        ("Neighbors", "Updated Neighbors"),
        ("Business Partners", "Updated Business"),
        ("School Friends", "Updated School"),
        ("Relatives", "Updated Relatives"),
        ("Gym Buddies", "Updated Gym"),
        ("Travel Group", "Updated Travel"),
        ("College Friends", "Updated College"),
        ("Office Team", "Updated Office"),
        ("Sports Club", "Updated Sports"),
        ("Music Band", "Updated Music"),
        ("Photography Club", "Updated Photography"),
        ("Book Club", "Updated Books"),
        ("Cooking Group", "Updated Cooking"),
        ("Gaming Squad", "Updated Gaming"),
        ("Hiking Group", "Updated Hiking"),
        ("Volunteer Team", "Updated Volunteer"),
        ("Dance Class", "Updated Dance"),
        ("Yoga Group", "Updated Yoga"),
        ("Tech Community", "Updated Tech"),
        ("Art Circle", "Updated Art"),
        ("Running Club", "Updated Running"),
        ("Business Network", "Updated Network"),
        ("Investment Club", "Updated Investment"),
        ("Study Group", "Updated Study"),
        ("Startup Team", "Updated Startup"),
        ("Marketing Team", "Updated Marketing"),
        ("Sales Team", "Updated Sales"),
        ("HR Team", "Updated HR"),
        ("IT Support", "Updated IT"),
        ("Finance Team", "Updated Finance"),
        ("Operations Team", "Updated Operations"),
        ("Customer Service", "Updated Customer"),
        ("Development Team", "Updated Development"),
        ("Design Team", "Updated Design"),
        ("QA Team", "Updated QA"),
        ("Project Team", "Updated Project"),
        ("Research Group", "Updated Research"),
        ("Training Team", "Updated Training"),
        ("Consulting Group", "Updated Consulting"),
        ("Advisory Board", "Updated Advisory"),
        ("Executive Team", "Updated Executive"),
        ("Board Members", "Updated Board"),
        ("Investors", "Updated Investors"),
        ("Mentors", "Updated Mentors"),
        ("Partners", "Updated Partners"),
        ("Clients", "Updated Clients"),
        ("Vendors", "Updated Vendors"),
        ("Suppliers", "Updated Suppliers"),
        ("Contractors", "Updated Contractors"),
        ("Freelancers", "Updated Freelancers"),
        ("Consultants", "Updated Consultants"),
        ("Alumni Network", "Updated Alumni"),
        ("Industry Contacts", "Updated Industry"),
        ("Media Contacts", "Updated Media"),
        ("Government Relations", "Updated Government"),
        ("Legal Team", "Updated Legal"),
        ("Compliance Team", "Updated Compliance"),
        ("Security Team", "Updated Security"),
        ("Facilities Team", "Updated Facilities"),
        ("Procurement Team", "Updated Procurement"),
        ("Logistics Team", "Updated Logistics"),
        ("Supply Chain", "Updated Supply"),
        ("Quality Team", "Updated Quality"),
        ("Safety Team", "Updated Safety"),
        ("Environmental Team", "Updated Environmental"),
        ("Sustainability Team", "Updated Sustainability"),
        ("Innovation Team", "Updated Innovation"),
        ("Strategy Team", "Updated Strategy"),
        ("Planning Team", "Updated Planning"),
        ("Analytics Team", "Updated Analytics"),
        ("Data Science Team", "Updated Data"),
        ("AI/ML Team", "Updated AI"),
        ("Cloud Team", "Updated Cloud"),
        ("Infrastructure Team", "Updated Infrastructure"),
        ("Network Team", "Updated Network"),
        ("Database Team", "Updated Database"),
        ("DevOps Team", "Updated DevOps"),
        ("Mobile Team", "Updated Mobile"),
        ("Web Team", "Updated Web"),
        ("Frontend Team", "Updated Frontend"),
        ("Backend Team", "Updated Backend"),
        ("Full Stack Team", "Updated FullStack"),
        ("API Team", "Updated API"),
        ("Integration Team", "Updated Integration"),
        ("Testing Team", "Updated Testing"),
        ("Automation Team", "Updated Automation"),
        ("Performance Team", "Updated Performance"),
        ("Monitoring Team", "Updated Monitoring"),
        ("Support Team", "Updated Support"),
        ("Maintenance Team", "Updated Maintenance"),
        ("Documentation Team", "Updated Documentation"),
        ("Training Team", "Updated Training"),
        ("Knowledge Team", "Updated Knowledge"),
        ("Communication Team", "Updated Communication"),
        ("Event Team", "Updated Event"),
        ("Community Team", "Updated Community"),
        ("Social Media Team", "Updated Social"),
        ("Content Team", "Updated Content"),
        ("Creative Team", "Updated Creative"),
        ("Brand Team", "Updated Brand"),
        ("Product Team", "Updated Product"),
        ("User Experience Team", "Updated UX"),
        ("User Interface Team", "Updated UI")
    ]
    
    used_numbers = set()
    for i in range(100):
        phone = generate_random_phone(used_numbers)
        country_code = "+91"
        name = f"JMeter User {i+1}"
        category_name, update_category_name = categories[i]
        users_data.append([phone, country_code, name, category_name, update_category_name])
    
    # Always overwrite existing file
    with open('buzz_100_users.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerows(users_data)
    
    print("✅ Generated buzz_100_users.csv with 100 fresh random user records")

def generate_buzz_test_contacts():
    """Generate contact numbers CSV file for testing"""
    contacts_data = [["contactPhone", "contactName"]]
    
    used_numbers = set()
    for i in range(1, 101):  # Generate 100 contacts
        contact_phone = generate_random_phone(used_numbers)
        contact_name = f"Test Contact {i}"
        contacts_data.append([contact_phone, contact_name])
    
    # Always overwrite existing file
    with open('buzz_test_contacts.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerows(contacts_data)
    
    print("✅ Generated buzz_test_contacts.csv with 100 fresh random contact records")

def validate_files():
    """Validate the generated CSV files"""
    try:
        with open('buzz_100_users.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            users_rows = list(reader)
            if len(users_rows) == 101:  # 100 users + header
                print("✅ buzz_100_users.csv validation passed")
            else:
                print(f"❌ buzz_100_users.csv has {len(users_rows)-1} rows (expected 100)")
        
        with open('buzz_test_contacts.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            contacts_rows = list(reader)
            if len(contacts_rows) == 101:  # 100 contacts + header
                print("✅ buzz_test_contacts.csv validation passed")
            else:
                print(f"❌ buzz_test_contacts.csv has {len(contacts_rows)-1} rows (expected 100)")
    except Exception as e:
        print(f"❌ Validation error: {e}")

def show_sample_data():
    """Show sample data from generated files"""
    print("\n📋 Sample Data Preview:")
    print("-" * 50)
    
    try:
        with open('buzz_100_users.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            rows = list(reader)
            print("👤 Users Sample (first 3 records):")
            for i, row in enumerate(rows[:4]):
                if i == 0:
                    print(f"   Header: {row}")
                else:
                    print(f"   User {i}: {row}")
        
        print()
        
        with open('buzz_test_contacts.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            rows = list(reader)
            print("📞 Contacts Sample (first 3 records):")
            for i, row in enumerate(rows[:4]):
                if i == 0:
                    print(f"   Header: {row}")
                else:
                    print(f"   Contact {i}: {row}")
    except Exception as e:
        print(f"❌ Error reading sample data: {e}")

def main():
    print("🚀 BUZZ 100 Users Test Data Generator")
    print("=" * 60)
    print("Generating fresh test data for JMeter 100 users test...")
    print("⚠️  This will OVERWRITE existing CSV files!")
    print()
    
    generate_buzz_100_users()
    generate_buzz_test_contacts()
    
    print("\n📊 Validating generated files...")
    validate_files()
    
    show_sample_data()
    
    print("\n🎯 Test Data Generation Complete!")
    print("Generated Files:")
    print("  📄 buzz_100_users.csv       - 100 random test users")
    print("  📄 buzz_test_contacts.csv   - 100 random test contacts")
    print("\n💡 Tips:")
    print("  - All phone numbers are unique within each file")
    print("  - Data is randomly generated each time")
    print("  - Files are UTF-8 encoded for international support")
    print("  - Ready for JMeter 100 users load testing")

if __name__ == "__main__":
    main()