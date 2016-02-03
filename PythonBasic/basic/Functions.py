# Defining a Function
# Function definition is here
def printme( stri ):
    "This prints a passed string into this function"
    print(stri)
    return;

# Now you can call printme function
printme("I'm first call to user defined function!")
printme("Again second call to the same function")

#Pass by reference vs value
# Function definition is here
def changeme( mylist ):
    "This changes a passed list into this function"
    mylist.append([1,2,3,4]);
    print("Values inside the function: ", mylist)
    return

# Now you can call changeme function
mylist = [10,20,30];
changeme( mylist );
print("Values outside the function: ", mylist)


# Function definition is here
def changeme1( mylist ):
    "This changes a passed list into this function"
    mylist = [1,2,3,4]; # This would assig new reference in mylist
    print("Values inside the function: ", mylist)
    return

# Now you can call changeme function
mylist = [10,20,30];
changeme1( mylist );
print("Values outside the function: ", mylist)

#Keyword arguments
def printmeKey( stri ):
    "This prints a passed string into this function"
    print(stri)
    return;

# Now you can call printme function
printmeKey( stri = "My string")

# Default arguments
# Function definition is here
def printinfo( name, age = 35 ):
    "This prints a passed info into this function"
    print("Name: ", name)
    print("Age ", age)
    return;

# Now you can call printinfo function
printinfo( age=50, name="miki" )
printinfo( name="miki" )

# Variable-length arguments
# Function definition is here
def printinfoVariable( arg1, *vartuple ):
    "This prints a variable passed arguments"
    print("Output is: ")
    print(arg1)
    for var in vartuple:
        print(var)
        return;

# Now you can call printinfo function
printinfoVariable( 10 )
printinfoVariable( 70, 60, 50 )

#Anonymous Functions
# Function definition is here
sumAnony = lambda arg1, arg2: arg1 + arg2;

# Now you can call sum as a function
print("Value of total : ", sumAnony( 10, 20 ))
print("Value of total : ", sumAnony( 20, 20 ))

# return Statement
# Function definition is here
def sumRet( arg1, arg2 ):
    # Add both the parameters and return them."
    total = arg1 + arg2
    print("Inside the function : ", total)
    return total;

# Now you can call sum function
total = sumRet( 10, 20 );
print("Outside the function : ", total)
