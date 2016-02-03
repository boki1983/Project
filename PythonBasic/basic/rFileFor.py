import sys
file = open(sys.argv[1], 'r')
for line in file.readlines():
    print (line)
file.close()
