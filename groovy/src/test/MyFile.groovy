package test

/*
 * Writes a files to the console
 */
public class MyFile{
  public static void main(def args){
    // Write just the content of the file to the console
    File file = new File("D:/CR/CR142.txt")
    file.eachLine{ line -> println line }
    // adds a line number in front of each line to the console
    def lineNumber = 0;
    file = new File("D:/CR/CR142.txt")
    file.eachLine{ line -> 
      lineNumber++
      println "$lineNumber: $line" 
    }
  }
}