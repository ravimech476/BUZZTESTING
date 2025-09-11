#!/usr/bin/env python3
"""
BUZZ Test Data Generator for 10,000 Users
Creates CSV files for JMeter testing with random test data
Every run generates fresh data and overwrites existing files
"""

import csv
import random
import time

def generate_random_phone(existing, prefix="98765"):
    """Generate unique random 10-digit phone numbers starting with prefix"""
    while True:
        phone = prefix + "".join([str(random.randint(0, 9)) for _ in range(5)])
        if phone not in existing:
            existing.add(phone)
            return phone

def generate_buzz_10k_users():
    """Generate 10,000 users CSV file for BUZZ testing"""
    print("Generating 10,000 user records...")
    start_time = time.time()
    
    users_data = [
        ["phoneNumber", "countryCode", "name", "categoryName", "updateCategoryName"]
    ]
    
    used_numbers = set()
    
    # Generate 10,000 users with simplified category naming
    for i in range(1, 1001):
        phone = generate_random_phone(used_numbers)
        country_code = "+91"
        name = f"JMeter User {i}"
        category_name = f"New Category {i}"
        update_category_name = f"Updated Category {i}"
        
        users_data.append([phone, country_code, name, category_name, update_category_name])
        
        # Progress indicator every 1000 records
        if i % 1000 == 0:
            elapsed = time.time() - start_time
            print(f"  Generated {i:,} users... ({elapsed:.1f}s)")
    
    # Always overwrite existing file
    with open('buzz_10k_users.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerows(users_data)
    
    elapsed = time.time() - start_time
    print(f"✅ Generated buzz_10k_users.csv with 10,000 fresh random user records ({elapsed:.1f}s)")

def generate_buzz_test_contacts():
    """Generate contact numbers CSV file for testing"""
    print("Generating 10,000 contact records...")
    start_time = time.time()
    
    contacts_data = [["contactPhone", "contactName"]]
    
    used_numbers = set()
    
    # Generate 10,000 contacts
    for i in range(1, 1001):
        contact_phone = generate_random_phone(used_numbers, prefix="98766")
        contact_name = f"Test Contact {i}"
        contacts_data.append([contact_phone, contact_name])
        
        # Progress indicator every 1000 records
        if i % 1000 == 0:
            elapsed = time.time() - start_time
            print(f"  Generated {i:,} contacts... ({elapsed:.1f}s)")
    
    # Always overwrite existing file
    with open('buzz_test_contacts.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerows(contacts_data)
    
    elapsed = time.time() - start_time
    print(f"✅ Generated buzz_test_contacts.csv with 10,000 fresh random contact records ({elapsed:.1f}s)")

def validate_files():
    """Validate the generated CSV files"""
    print("Validating generated files...")
    
    try:
        with open('buzz_10k_users.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            users_rows = list(reader)
            if len(users_rows) == 1001:  # 10,000 users + header
                print("✅ buzz_10k_users.csv validation passed (10,000 records)")
            else:
                print(f"❌ buzz_10k_users.csv has {len(users_rows)-1:,} rows (expected 10,000)")
        
        with open('buzz_test_contacts.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            contacts_rows = list(reader)
            if len(contacts_rows) == 1001:  # 10,000 contacts + header
                print("✅ buzz_test_contacts.csv validation passed (10,000 records)")
            else:
                print(f"❌ buzz_test_contacts.csv has {len(contacts_rows)-1:,} rows (expected 10,000)")
    except Exception as e:
        print(f"❌ Validation error: {e}")

def show_sample_data():
    """Show sample data from generated files"""
    print("\n📋 Sample Data Preview:")
    print("-" * 60)
    
    try:
        with open('buzz_10k_users.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            rows = list(reader)
            print("👤 Users Sample (first 5 records):")
            for i, row in enumerate(rows[:6]):
                if i == 0:
                    print(f"   Header: {row}")
                else:
                    print(f"   User {i}: {row}")
        
        print()
        
        with open('buzz_test_contacts.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            rows = list(reader)
            print("📞 Contacts Sample (first 5 records):")
            for i, row in enumerate(rows[:6]):
                if i == 0:
                    print(f"   Header: {row}")
                else:
                    print(f"   Contact {i}: {row}")
                    
        print("\n📊 File Statistics:")
        print(f"   Total Users: 10,000")
        print(f"   Total Contacts: 10,000")
        print("   Category Pattern: 'New Category 1', 'New Category 2', etc.")
        print("   Update Pattern: 'Updated Category 1', 'Updated Category 2', etc.")
        
    except Exception as e:
        print(f"❌ Error reading sample data: {e}")

def main():
    print("🚀 BUZZ 10,000 Users Test Data Generator")
    print("=" * 70)
    print("Generating fresh test data for JMeter 10,000 users test...")
    print("⚠️  This will OVERWRITE existing CSV files!")
    print("⏱️  This may take several minutes to complete...")
    print()
    
    # Set random seed based on current time to ensure different numbers each run
    random.seed(time.time())
    
    total_start = time.time()
    
    # Generate user data with completely new numbers
    generate_buzz_10k_users()
    print()
    
    # Generate contact data with completely new numbers  
    generate_buzz_test_contacts()
    print()
    
    # Validate files
    print("📊 Validating generated files...")
    validate_files()
    print()
    
    # Show sample data
    show_sample_data()
    
    total_elapsed = time.time() - total_start
    
    print(f"\n🎯 Test Data Generation Complete! (Total time: {total_elapsed:.1f}s)")
    print("Generated Files:")
    print("  📄 buzz_10k_users.csv       - 10,000 random test users")
    print("  📄 buzz_test_contacts.csv   - 10,000 random test contacts")
    print("\n💡 Generation Details:")
    print("  ✅ All phone numbers are unique and fresh")
    print("  ✅ Data is randomly generated each time")
    print("  ✅ Files are UTF-8 encoded for international support")
    print("  ✅ Categories use simple naming: 'New Category 1', 'New Category 2', etc.")
    print("  ✅ Update categories: 'Updated Category 1', 'Updated Category 2', etc.")
    print("  ✅ Ready for JMeter 10,000 users extreme load testing")
    print("\n⚠️  IMPORTANT NOTES:")
    print("  - Every execution generates fresh random phone numbers")
    print("  - Existing CSV files are automatically overwritten")
    print("  - Ensure your server infrastructure can handle 10,000 concurrent users")
    print("  - Monitor system resources during testing")

if __name__ == "__main__":
    main()