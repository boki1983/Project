package boki.test;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

import boki.funtion.Calculator;

//使用JUnit 3.x撰寫測試，必須繼承TestCase，TestCase類別繼承自Assert類別
// JUnit 4.x支援標註  不用再繼承TestCase類別
public class CalculatorTest {
	private Calculator calculator;
	
	// @Before可用來標示每個測試方法開始前要執行的操作
	@Before
    public void setUp() {
        calculator = new Calculator();
    }

	// @After可用來標示每個測試方法完成後要執行的操作
	@After
	public void tearDown() {
        calculator = null;
    }

    public void preTestPlus() {
    	System.out.println("preTestPlus");
    }
    
    public void postTestPlus() {
    	System.out.println("postTestPlus");
    }
	
    // 在testPlus執行前先執行preTestPlus
    @PreTest("preTestPlus")
    // 在testPlus執行後再執行postTestPlus
    @PostTest("postTestPlus")
	// JUnit 4中會自動找出有標註@Test的方法並執行
	@Test(timeout = 2)
    public void testPlus() {
        int expected = 5;
        int result = calculator.plus(3, 2);
        //assertEquals()方法用來斷言兩個指定值是否相同
        assertEquals(expected, result);
    }
   
	@Test(timeout = 2)
    public void testMinus() {
        int expected = 1;
        int result = calculator.minus(3, 2);
        assertEquals(expected, result);
    }

	// 使用@Ignore來標註某個測試尚未撰寫完畢
    @Ignore("Calculator 尚未定義 multiply")
    @Test
    public void testMultiply() {
    }
    
    @Test(timeout = 1000)
    public void testLagPlus() throws InterruptedException {
        int expected = 5;
        int result = calculator.lagPlus(3, 2);
        assertEquals(expected, result);
    }
    
    public static void main(String[] args) {
        Result result = JUnitCore.runClasses(CalculatorTest.class);
        // getFailures()傳回的List中包括Failure，代表一些測試失敗的資訊
        for(Failure failure : result.getFailures()) {
             System.out.print(failure.getTestHeader() +
                    "： " + failure.getMessage());
        }
    }
}
