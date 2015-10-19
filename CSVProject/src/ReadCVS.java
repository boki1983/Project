
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.Charset;

import com.csvreader.CsvReader;

public class ReadCVS
{
	public static void main(String[] args)
	{
		ReadCVS rc = new ReadCVS();
		rc.run();
	}
	public void run()
	{
		String csvFile = "D://JAVA EE/myWorkSpace/CSVProject/stock.csv";
		
		CsvReader reader = null;
		
		try
		{
			//初始化CsvReader並指定列分隔符和字符編碼
			reader = new CsvReader(csvFile, ',', Charset.forName("BIG5"));
			
			int i = 0;
			while (reader.readRecord()) {
				String[] rl = reader.getValues();
				String[][] stock = new String[i+1][rl.length];
				
				for(int j = 0;j < rl.length; j++) {
				    stock[i][j] = rl[j].replaceAll(",", "") ;	
				} 
				
				System.out.println(stock[i][0] +" " + stock[i][1] +" " +stock[i][3] +" " + stock[i][4] +" " + stock[i][5] +" " + stock[i][6] +" " ); 
				i++;
			}
		} catch(FileNotFoundException e) {
			e.printStackTrace();
		}  catch(IOException e) {
			e.printStackTrace();
		}
		
		finally {
			if(reader != null) {
				//關閉CsvReader
				reader.close();
			}
		}
		System.out.println("Done");
	}
}


