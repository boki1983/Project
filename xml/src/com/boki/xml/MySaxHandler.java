package com.boki.xml;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class MySaxHandler extends DefaultHandler {

	static DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	private String content;

	// 事件發生時元素中的字符
	@Override
	public void characters(char[] ch, int start, int length)
			throws SAXException {
		content = new String(ch, start, length);
	}

	// 當解析到元素的結束標籤時觸發
	@Override
	public void endElement(String uri, String localName, String qName)
			throws SAXException {
		// 判斷元素解析的名稱
		if ("title".equals(qName)) {
			System.out.println("標題: " + content);
		} else if ("author".equals(qName)) {
			System.out.println("作者: " + content);
		} else if ("email".equals(qName)) {
			System.out.println("電子郵件: " + content);
		} else if ("body".equals(qName)) {
			System.out.println("內容: " + content);
		} else if ("date".equals(qName)) {
			System.out.println("發表日期: " + content);
		}
	}

	// 當解析到元素的開始標籤時觸發
	@Override
	public void startElement(String uri, String localName, String qName,
			Attributes attributes) throws SAXException {
		// 元素名為article
		if ("article".equals(qName)) {
			System.out.println("\r\n找到一篇文章. 所屬分類: "
					+ attributes.getValue("category") + ". ");
		}
	}

}
