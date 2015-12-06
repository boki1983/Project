package boki.funtion;

public class Calculator {
	public int plus(int op1, int op2) {
        return op1 + op2;
    }
	public int minus(int op1, int op2) {
		return op1 - op2;
    }
	public int divide(int op1, int op2) {
		return op1 / op2;
    }
	public int multiply(int op1, int op2) {
		return op1 * op2;
    }
	
	public int lagPlus(int op1, int op2) throws InterruptedException {
		Thread.sleep(2000);
        return op1 + op2;
    }
}
