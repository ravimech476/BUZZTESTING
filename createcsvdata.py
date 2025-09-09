#!/usr/bin/env python3
"""
BUZZ Test Data Generator
Creates CSV files for JMeter testing with random test data
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

def generate_buzz_10_users():
    """Generate 10 users CSV file for BUZZ testing"""
    users_data = [
        ["phoneNumber", "countryCode", "name", "categoryName", "updateCategoryName"]
    ]

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
        ("Travel Group", "Updated Travel")
    ]

    used_numbers = set()
    for i in range(10):
        phone = generate_random_phone(used_numbers)
        country_code = "+91"
        name = f"JMeter User {i+1}"
        category_name, update_category_name = categories[i]
        users_data.append([phone, country_code, name, category_name, update_category_name])

    # Always overwrite
    with open('buzz_10_users.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerows(users_data)

    print("✅ Generated buzz_10_users.csv with 10 random user records")

def generate_buzz_test_contacts():
    """Generate contact numbers CSV file for testing"""
    contacts_data = [["contactPhone", "contactName"]]

    used_numbers = set()
    for i in range(1, 21):
        contact_phone = generate_random_phone(used_numbers)
        contact_name = f"Test Contact {i}"
        contacts_data.append([contact_phone, contact_name])

    with open('buzz_test_contacts.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerows(contacts_data)

    print("✅ Generated buzz_test_contacts.csv with 20 random contact records")

def validate_files():
    """Validate the generated CSV files"""
    try:
        with open('buzz_10_users.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            users_rows = list(reader)
            if len(users_rows) == 11:
                print("✅ buzz_10_users.csv validation passed")
            else:
                print(f"❌ buzz_10_users.csv has {len(users_rows)-1} rows (expected 10)")

        with open('buzz_test_contacts.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            contacts_rows = list(reader)
            if len(contacts_rows) == 21:
                print("✅ buzz_test_contacts.csv validation passed")
            else:
                print(f"❌ buzz_test_contacts.csv has {len(contacts_rows)-1} rows (expected 20)")
    except Exception as e:
        print(f"❌ Validation error: {e}")

def main():
    print("🚀 BUZZ Test Data Generator")
    print("=" * 50)
    print("Generating fresh test data for JMeter test...\n")

    generate_buzz_10_users()
    generate_buzz_test_contacts()

    print("\n📊 Validating generated files...")
    validate_files()

    print("\n🎯 Test Data Generation Complete!")
    print("Generated Files:")
    print("  📄 buzz_10_users.csv       - 10 random test users")
    print("  📄 buzz_test_contacts.csv  - 20 random test contacts")

if __name__ == "__main__":
    main()
