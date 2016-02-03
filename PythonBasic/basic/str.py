# coding=UTF-8
# python2. Encoding declaration: tell python interpreter that this file is encoded by UTF-8, default is ASCII 
print ('hello! world!')
print ('哈囉  世界')

# python2. all string is an instance of str, and viewed as Byte sequence of str 
text = '測試'
print (type(text)) 
print (len(text))

# Using Unicode 
text = u'測試'
print (type(text)) 
print (len(text)) 

#continuation character
total = 'item_one ' + \
        'item_two ' + \
        'item_three '
        
print (total) 

#triple quotes are used to span the string across multiple lines
paragraph = """This is a paragraph. It is
made up of multiple lines and sentences."""

print (paragraph) 
