# coding=UTF-8
# Everything is object in python
# Built-in type
print (type(1))      # 1 是什麼型態？
print (type(1L))     # 加上 L 呢？
print (type(111111111111111111111111111111111)) # 太長的整數會自動使用 long 型態
print (type(3.14))   # 浮點數是 float 型態
print (type(True))   # 布林值是 bool 型態
print (type(3 + 4j)) # 支援複數的 complex 型態
print (2 ** 100)     # 2 的 100 次方

# / => division
# // => floor division
print(10/3)
print(10//3)
print(10/3.0)
print(10//3.0)
 

# float bias
print(repr(1.0 - 0.8))
print(1.0-0.8)

# using Decimal to calculate float
import decimal
a = decimal.Decimal('1.0')
b = decimal.Decimal('0.8')
print (a - b)

