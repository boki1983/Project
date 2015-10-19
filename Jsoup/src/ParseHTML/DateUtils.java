package ParseHTML;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Scanner;


public class DateUtils {
	static SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
    
    public static Calendar getCalendar(String calStr) {
    	
    	Calendar cal = Calendar.getInstance();
    	
    	cal.set(Integer.parseInt(calStr.substring(0, 4)), 
        		Integer.parseInt(calStr.substring(4, 6))-1, 
        		Integer.parseInt(calStr.substring(6, 8))
        );
    	return cal;
    }
    
	public static String[] getPeriodDate(Calendar startCal, Calendar endCal) {
    	String[] dateStrAry = {};
    	int index = 0;
    	
    	StringBuffer sb = new StringBuffer();
    	
    	while (endCal.compareTo(startCal) >= 0) {
    		sb.append(sdf.format(startCal.getTime()));
    		sb.append(";");
    		
    		startCal.add(Calendar.DAY_OF_YEAR, 1);
    	}
    	
    	if (sb != null && sb.length() != 0) {
    		String dateStr = sb.toString();
    		dateStr = dateStr.substring(0, dateStr.length() - 1);
    		dateStrAry = dateStr.split(";");
    	}
    	
    	return dateStrAry;
    }
	
	public static String addSlash(String str) {
		String addStr = "";
		addStr = str.substring(0, 4) + "/" + str.substring(4, 6) + "/" + str.substring(6, 8);
		
		return addStr;
	}

    public static void main(String[] args) throws IOException {
    	try {
        	Scanner in = new Scanner(System.in);
        	
        	System.out.println("請輸入起日期(YYYYMMDD)");
        	
        	String startDateStr = in.nextLine();
        	
        	System.out.println("請輸入迄日期(YYYYMMDD)");
        	
        	String endDateStr = in.nextLine();
        	
        	in.close();
        	
        	System.out.println("Begin");
        	
        	Calendar calStart = getCalendar(startDateStr);
        	
        	Calendar calEnd = getCalendar(endDateStr);
        	
        	System.out.println("Set over");
        	
        	String[] dateStrAry = getPeriodDate(calStart, calEnd);
        	
        	for (String dateStr : dateStrAry) {
        		System.out.println(dateStr);
        	}
    	} catch (Exception e) {
    		System.out.println(e.toString());
    	}
    }
}
