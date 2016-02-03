import sys
file = open(sys.argv[1], 'r')
# Python use Indent to determine block area
while True:
    line = file.readline()
    if not line: break
    print (line)
file.close()