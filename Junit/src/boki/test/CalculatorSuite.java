package boki.test;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

// 透過Suite執行測試多個case
@RunWith(value = Suite.class)
// 指定要測試的suite class
@SuiteClasses(value={CalculatorTest.class, CalculatorParamTest.class})
public class CalculatorSuite {

}
