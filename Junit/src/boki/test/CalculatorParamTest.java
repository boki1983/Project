package boki.test;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.Collection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import boki.funtion.Calculator;

// @RunWith 標註使用的runner是org.junit.runners.Parameterized
@RunWith(value=Parameterized.class)
public class CalculatorParamTest {
	// 方法必須是公開、無參數、傳回一個 Collection，
	// 當中每個元素必須是一個一維陣列，陣列中第一個元素放預期值，之後參數值一、參數值二
	@Parameterized.Parameters
    public static Collection<Integer[]> getParameters() {
        return Arrays.asList(
            new Integer[][] {
                {5, 3, 2}, //expected, para1, para2
                {3, 1, 2}, //expected, para1, para2
                {2, 1, 1},  //expected, para1, para2
            }
        );
    }
    
    private int expected;
    private int para1;
    private int para2;
    
    public CalculatorParamTest(int expected, int para1, int para2) {
        this.expected = expected;
        this.para1 = para1;
        this.para2 = para2;
    }

    // 操作應該在指定的時間到達前完成，否則測試失敗
    @Test(timeout = 2000)
    public void testPlus() {
        Calculator calculator = new Calculator();
        int result = calculator.plus(para1, para2);
        assertEquals(expected, result);
    }
}
