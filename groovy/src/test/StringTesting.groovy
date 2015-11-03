package test

class StringTesting {
	public static void main(String[] args) {
/*		def name = "John"
		def s1 = "Hello $name" // $name will be replaced
		def s2 = 'Hello $name' // $name will not be replaced
		println s1
		println s2
		println s1.getClass().getName();
		println s2.getClass().getName();*/
		
		// metaprogramming : extended a defined class by adding new method/funciton
		String.metaClass.hello = { println "Hello ${delegate}" }
		"John".hello()  // Say Hello to John
		"Steve Jobs".hello()
	  }
}
