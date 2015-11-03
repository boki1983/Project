package test

class FileTest {
	public static void main (args){
		def stats = new File('stats.log')
		
	   stats.withWriter {
		   println it.class.name
		   println it instanceof BufferedWriter
		   println it instanceof Writer
	   }
	   
	   stats.eachLine { line ->
		 println line
	   }
	}
}
