package boki.test;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.junit.runners.model.Statement;

// BlockJUnit4ClassRunner 執行測試的方式是以Statement block為單位
// 實現了 Chain of Responsibility 模式
// 想在執行測試時，加入額外的職責，可以繼承Statement類別
public class PrePostTestStatement extends Statement {
	private Statement invoker;
    private Object target;
    private List<Method> preMethods = new ArrayList<Method>();
    private List<Method> postMethods = new ArrayList<Method>();
    
    public PrePostTestStatement(Statement invoker, Object target) {
        this.invoker = invoker;
        this.target = target;
    }
    
    @Override
    public void evaluate() throws Throwable {
        for(Method method : preMethods) {
            method.invoke(target, null);
        }

        Throwable throwable = null;
        try {
            invoker.evaluate(); // 記得呼叫下一個Statement
        }
        catch(Throwable t) {
            throwable = t;
        }

        for(Method method : postMethods) {
            method.invoke(target, null);
        }
        if(throwable != null) {
            throw throwable;
        }
    }
    
    public void addPre(Method method) {
        preMethods.add(method);
    }
    
    public void addPost(Method method) {
        postMethods.add(method);
    }
}
