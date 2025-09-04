import csv
import sys

def generate_users_csv(user_count, filename):
    """Generate user CSV with specified number of records"""
    
    print(f"Generating {filename} with {user_count:,} user records...")
    
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
                    print(f"  Generated {user_count_actual:,} records...")
                
                user_count_actual += 1
                
                if user_count_actual > user_count:
                    break
            
            if user_count_actual > user_count:
                break
    
    print(f"Successfully generated {user_count_actual-1:,} user records!")
    print(f"File saved: {filename}")
    return user_count_actual - 1

def generate_contacts_csv(contact_count=100):
    """Generate buzz_test_contacts.csv with contact records"""
    
    print(f"\nGenerating Contact Numbers CSV ({contact_count} contacts)...")
    
    with open('buzz_test_contacts.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        
        # Write header
        writer.writerow(['contactPhone', 'contactName'])
        
        contact_base = 9876543000
        
        for i in range(1, contact_count + 1):
            contact_phone = str(contact_base + i)
            contact_name = f"JmeterContact{i:03d}"
            
            writer.writerow([contact_phone, contact_name])
    
    print(f"Successfully generated {contact_count} contact records!")
    print("File saved: buzz_test_contacts.csv")
    return contact_count

def main():
    print("=" * 60)
    print("BUZZ STRESS TEST - DATA GENERATOR")
    print("=" * 60)
    print()
    
    # Check command line arguments
    if len(sys.argv) > 1:
        if sys.argv[1] == '--users' and len(sys.argv) > 2:
            try:
                user_count = int(sys.argv[2])
                if user_count in [100, 1000, 10000]:
                    print(f"Generating data for {user_count} users...")
                    filename = f'buzz_{user_count}_users.csv'
                    generate_users_csv(user_count, filename)
                    generate_contacts_csv(100)
                    print(f"\nData generation complete for {user_count} users!")
                    return
                else:
                    print("Error: Users must be 100, 1000, or 10000")
                    return
            except ValueError:
                print("Error: Invalid user count")
                return
        elif sys.argv[1] == '--all':
            print("Generating data for all test levels...")
            for user_count in [100, 1000, 10000]:
                print(f"\nGenerating {user_count} users...")
                filename = f'buzz_{user_count}_users.csv'
                generate_users_csv(user_count, filename)
            generate_contacts_csv(100)
            print("\nAll test data generated successfully!")
            return
    
    # Interactive mode
    print("Select test level to generate data:")
    print("  1. Validation Test (100 users)")
    print("  2. Pre-Production Test (1,000 users)")
    print("  3. Production Scale Test (10,000 users)")
    print("  4. All Test Levels")
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
                # Generate all levels
                print("\nGenerating data for all test levels...")
                for user_count in [100, 1000, 10000]:
                    print(f"\nGenerating {user_count} users...")
                    filename = f'buzz_{user_count}_users.csv'
                    generate_users_csv(user_count, filename)
                generate_contacts_csv(100)
                print("\n" + "=" * 60)
                print("ALL TEST DATA GENERATED SUCCESSFULLY!")
                print("=" * 60)
                print("Files created:")
                print("  - buzz_100_users.csv (100 users)")
                print("  - buzz_1000_users.csv (1,000 users)")
                print("  - buzz_10000_users.csv (10,000 users)")
                print("  - buzz_test_contacts.csv (100 contacts)")
                print()
                print("Ready to run tests:")
                print("  1. run_buzz_100_users_simple.bat")
                print("  2. run_buzz_1000_users_final.bat")
                print("  3. run_buzz_10k_users_final.bat")
                return
            else:
                print("Invalid choice. Please enter 1, 2, 3, or 4.")
        except (KeyboardInterrupt, EOFError):
            print("\nOperation cancelled by user.")
            return
    
    # Generate data for selected user count
    test_names = {100: "Validation Test", 1000: "Pre-Production Test", 10000: "Production Scale Test"}
    test_name = test_names.get(user_count, "Custom Test")
    
    print(f"\nGenerating {test_name} data...")
    print(f"Users: {user_count:,}")
    print(f"Contacts: 100")
    print()
    
    try:
        # Generate user CSV
        filename = f'buzz_{user_count}_users.csv'
        actual_users = generate_users_csv(user_count, filename)
        
        # Generate contacts CSV  
        actual_contacts = generate_contacts_csv(100)
        
        print("\n" + "=" * 60)
        print(f"{test_name.upper()} DATA GENERATED SUCCESSFULLY!")
        print("=" * 60)
        print(f"Total user records: {actual_users:,}")
        print(f"Total contact records: {actual_contacts}")
        print()
        print("Files created:")
        print(f"  - {filename}")
        print("  - buzz_test_contacts.csv")
        print()
        
        if user_count == 100:
            print("Next step: run_buzz_100_users_simple.bat")
        elif user_count == 1000:
            print("Next step: run_buzz_1000_users_final.bat")
        elif user_count == 10000:
            print("Next step: run_buzz_10k_users_final.bat")
        
        print()
        print("IMPORTANT REMINDERS:")
        print(f"  - {user_count:,} real SMS messages will be sent")
        print(f"  - Estimated SMS cost: ${(user_count * 0.0075):.2f} - ${(user_count * 0.015):.2f}")
        print(f"  - High database load expected")
        print(f"  - {user_count:,} concurrent connections")
        
    except Exception as e:
        print(f"ERROR: {str(e)}")
        print("Please check permissions and try again.")

if __name__ == "__main__":
    main()
