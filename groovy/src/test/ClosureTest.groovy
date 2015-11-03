package test

class ClosureTest {
	public static void main(args){
		List<Integer> list = [5,6,7]
		// A closure is defined via {para1, para2 -> code of the closure}
		list.each({line -> println line})
		list.each({println it})
		
		def max = { a, b ->
			a > b ? a : b
		}
		 
		def min = { a, b ->
			a < b ? a : b
		}
		def sqr = { x -> 
			x * x
		}
		println("max(1024,768) = ${max(1024, 768)}")
		println("min(1024,768) = ${min(1024, 768)}")
		println("sqr(3) = ${sqr(3)}")
	  }
}
