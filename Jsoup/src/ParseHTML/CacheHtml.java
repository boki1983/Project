package ParseHTML;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Scanner;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.WorkbookUtil;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


public class CacheHtml {
	static SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
	
	/**
	 * @param args
	 * @throws IOException 
	 */
	public static void main(String[] args) {
		
		try {
        	Scanner in = new Scanner(System.in);
        	
        	System.out.println("請輸入起日期(YYYYMMDD)");
        	
        	String startDateStr = in.nextLine();
        	
        	System.out.println("請輸入迄日期(YYYYMMDD)");
        	
        	String endDateStr = in.nextLine();
        	
        	in.close();
        	
        	System.out.println("Begin...");
        	
        	Calendar calStart = DateUtils.getCalendar(startDateStr);
        	
        	Calendar calEnd = DateUtils.getCalendar(endDateStr);
        	
        	String[] dateStrAry = DateUtils.getPeriodDate(calStart, calEnd);
        	
            String filename = sdf.format(new Date())+".xls";
            System.out.println("filename = " + filename);
            String filePath = "D:\\appledaily";
            
            //建立儲存檔案
            File tempFile = new File(filePath,filename);
            //建立Excel物件
            Workbook workbook = new HSSFWorkbook();
            String safeName = WorkbookUtil.createSafeSheetName("每日一句");
            
            //建立工作表
            Sheet sheet = workbook.createSheet(safeName);
            int rowIndex = 0;
            
        	for (String dateStr : dateStrAry) {

        		String strUrl = "http://www.appledaily.com.tw/index/dailyquote/date/" + dateStr;
        		try {
        			// URL 
                    URL url = new URL(strUrl);
                    Document doc = Jsoup.parse(url, 3000);
                    
                    //取回每日一句
                    Elements elements = doc.select("article .dphs");
                    
                  //建立工作列
                    Row row1 = sheet.createRow(rowIndex);
                    HSSFCell cell;
                    
                    for (Element element : elements) {
                    	String title = element.select(">p").html();
                    	String innerText = element.select(">h1").text();
                    	
                    	if (innerText.length() < 8) {
                    		System.out.println("停刊一日");
                    		continue;
                    	}
                    	
                    	String author = innerText.substring(0, innerText.length() - 8);
                    	String dailyStr =innerText.substring(innerText.length() - 8, innerText.length()); 
                    	
                    	System.out.println(dailyStr);
                    	System.out.println(title);
                    	System.out.println(author);
                    	
                    	cell = (HSSFCell) row1.createCell(0); 
                        cell.setCellValue(DateUtils.addSlash(dailyStr));
                        cell = (HSSFCell) row1.createCell(1);
                        cell.setCellValue(title);
                        cell = (HSSFCell) row1.createCell(2);
                        cell.setCellValue(author);
                    }
                    
                    //自動調整欄位寬度
                    sheet.autoSizeColumn(0);
                    sheet.autoSizeColumn(1);
                    sheet.autoSizeColumn(2);
                    
                    ++rowIndex;
            	// 儲存檔案
                FileOutputStream fileOut = new FileOutputStream(tempFile);
                workbook.write(fileOut);
                fileOut.close();
                
        		} catch (MalformedURLException mURLe) {
        			System.out.println(mURLe.toString());
        			continue;
        		} catch (IOException ioe) {
        			System.out.println(ioe.toString());
        			continue;
        		}
        	}
		} catch (Exception e) {
        		System.out.println(e.toString());
        	}
	}
}