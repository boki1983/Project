package com.boki.xml;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class DomDemo {

	public static void main(String[] args) {
		// 建立解析的xml文件對象，其儲存在D:\\J2EE\\SQL_statement\\目錄下的article.xml檔案
		File xmlFile = new File("D:\\J2EE\\SQL_statement\\article.xml");
		// 宣告一個 DocumentBuilder對像. 抽像類，不能直接建構，可以透過 DocumentFactory 來建構。
		DocumentBuilder builder = null;
		// 宣告一個 DocumentBuilderFactory對像. 透過單例模式建立
		DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
		// 取得預設的 DocumentBuilder.
		try {
			// Creates a new instance of a javax.xml.parsers.DocumentBuilder using the currently configured parameters.
			builder = builderFactory.newDocumentBuilder();
			// 解析檔案
			Document document = builder.parse(xmlFile);
			// 獲得根元素
			Element root = document.getDocumentElement();
			System.out.println("根元素：" + root.getNodeName());
			// 獲得根元素下的子節點
			NodeList childNodes = root.getChildNodes();
			// 檢查這些子節點
			for (int i = 0; i < childNodes.getLength(); i++) {
				// 對每個子節點進行判斷
				Node node = childNodes.item(i);
				// 如果節點的名稱為"article"
				if ("article".equals(node.getNodeName())) {
					// 輸出article元素屬性category
					System.out.println("\r\n找到一篇文章. 所屬分類: "
							+ node.getAttributes().getNamedItem("category")
									.getNodeValue() + ". ");
					// 獲得<article>元素下的所有節點
					NodeList nodeDetail = node.getChildNodes();
					// 檢查<article>元素下的所有節點
					for (int j = 0; j < nodeDetail.getLength(); j++) {
						// 獲得<article>元素每一個節點
						Node detail = nodeDetail.item(j);
						// 根據節點名稱解析資料
						if ("title".equals(detail.getNodeName()))
							System.out
									.println("標題: " + detail.getTextContent());
						else if ("author".equals(detail.getNodeName()))
							System.out
									.println("作者: " + detail.getTextContent());
						else if ("email".equals(detail.getNodeName()))
							System.out.println("電子郵件: "
									+ detail.getTextContent());
						else if ("date".equals(detail.getNodeName()))
							System.out.println("發表日期: "
									+ detail.getTextContent());
					}
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
