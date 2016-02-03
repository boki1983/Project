# Python the best way to read a file is don't read it!!
import sys
for line in open(sys.argv[1], 'r'):
    print (line)