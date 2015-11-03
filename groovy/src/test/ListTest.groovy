package test

class ListTest {
	public static void main(args){
		// assign list is similar to assign array in java
		List list1 = [1, 2]
		list1 += [3, 4, 5]
		list1 << 6
 
		println("list size = ${list1.size()}") // => 6
 
		println("${list1 == [1, 2, 3] + [4, 5, 6]}") // => true
 
		list1.each {
			println it
		}
		// use Range : continuous number
		List list2 = 1..6
		println("${list1 == list2}") // => true
		
		(1..10).each { print it }
		('a'..'z').each { print it }
	}
}
