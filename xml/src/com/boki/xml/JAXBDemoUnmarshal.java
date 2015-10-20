package com.boki.xml;

import java.io.File;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

public class JAXBDemoUnmarshal {

	public static void main(String[] args) {
		// 建立xml文件對象，其儲存在D:\\J2EE\\SQL_statement\\目錄下的test.xml檔案
		File xmlFile = new File("D:\\J2EE\\SQL_statement\\test.xml");
		//宣告JAXBContext上下文對像
		JAXBContext context;
		try {
			//透過指定映射的類建立上下文
			context = JAXBContext.newInstance(Article.class);
			
			//透過上下文建立xml轉化java的對象Unmarshaller
			Unmarshaller u = context.createUnmarshaller();
			Article article = (Article)u.unmarshal(xmlFile);
			System.out.println(article.getAuthor());
			System.out.println(article.getDate());
			System.out.println(article.getEmail());
			System.out.println(article.getTitle());
		} catch (JAXBException e) {
			e.printStackTrace();
		}

	}

}
