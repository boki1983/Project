package test
// The meta object protocol allows to add dynamically at runtime methods and properties.
class AnyMethodExecutor {
	def map
	
	Object getProperty (String property){
	  println "Setting this propery"
	  return 5;
	}
	
	void setProperty (String property, Object o){
	  println "Hallo"
	}
	
	def methodMissing (String name, args){
	  def s = name.toUpperCase();
	  if (s.startsWith("HELLO"))
	  {
		println "This method stats with Hello. Full name $name"
	  } else {
		println "This method is missing"
	  }
	}
	
	public static void main (args){
	  def test = new AnyMethodExecutor ();
	  test.hall();
	  test.helloMethod();
	  test.Hallo();
	  // call setProperty
	  test.test= 5;
	  // call getProperty
	  println test.test;
	  
	}
}
