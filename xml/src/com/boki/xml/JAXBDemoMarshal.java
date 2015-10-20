package com.boki.xml;

import java.io.File;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

public class JAXBDemoMarshal {

	public static void main(String[] args) {
		// 建立xml文件對象，其儲存在D:\\J2EE\\SQL_statement\\目錄下的test.xml檔案
		File xmlFile = new File("D:\\J2EE\\SQL_statement\\test.xml");
		//宣告JAXBContext上下文對像
		JAXBContext context;
		try {
			//透過指定映射的類建立上下文
			context = JAXBContext.newInstance(Article.class);
			//透過上下文建立java轉化xml的對象Marshaller
    		Marshaller m = context.createMarshaller();
   			//建立xml中的資料
			Article article = new Article();
			article.setAuthor("boki");
			article.setDate("2010/01/01");
			article.setEmail("boki@yahoo.com");
			article.setTitle("XML");
			//將java對像轉化到xml
			m.marshal(article, xmlFile);
			
		} catch (JAXBException e) {
			e.printStackTrace();
		}

	}

}
