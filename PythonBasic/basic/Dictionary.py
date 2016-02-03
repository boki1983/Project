#Accessing Values in Dictionary
dict1 = {'Name': 'Zara', 'Age': 7, 'Class': 'First'};

print("dict['Name']: ", dict1['Name'])
print("dict['Age']: ", dict1['Age'])

#Updating Dictionary
dict1['Age'] = 8; # update existing entry
dict1['School'] = "DPS School"; # Add new entry


print("dict['Age']: ", dict1['Age'])
print("dict['School']: ", dict1['School'])

# When duplicate keys encountered during assignment, the last assignment wins.
dict2 = {'Name': 'Zara', 'Age': 7, 'Name': 'Manni'};

print("dict['Name']: ", dict2['Name'])