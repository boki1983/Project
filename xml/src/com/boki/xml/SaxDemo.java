package com.boki.xml;

import java.io.File;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

public class SaxDemo {

	public static void main(String[] args) {
		// 建立解析的xml文件對象，其儲存在D:\\J2EE\\SQL_statement\\article.xml目錄下的article.xml檔案
		File xmlFile = new File("D:\\J2EE\\SQL_statement\\article.xml");
		// 建立一個 SAXParserFactory對像. 透過單例模式建立
		SAXParserFactory factory = SAXParserFactory.newInstance();
		try {
			// 建立SAXParser對像
			SAXParser parser = factory.newSAXParser();
			// 解析檔案,並定義解析時的事件處理
			parser.parse(xmlFile, new MySaxHandler());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
