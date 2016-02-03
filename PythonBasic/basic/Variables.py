# do not need explicit declaration to reserve memory space
counter = 100          # An integer assignment
miles   = 1000.0       # A floating point
name    = "John"       # A string

print(counter)
print(miles)
print(name)

a, b, c = 1, 2, "john"

print(a)
print(b)
print(c)


var1 = 1
var2 = 10
# delete the reference to a number object
del var1, var2

# Strings
str = 'Hello World!'

print(str)          # Prints complete string
print(str[0])       # Prints first character of the string
print(str[2:5])     # Prints characters starting from 3rd to 5th
print(str[2:])      # Prints string starting from 3rd character
print(str * 2)      # Prints string two times
print(str + "TEST") # Prints concatenated string
