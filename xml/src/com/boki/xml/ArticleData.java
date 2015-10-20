package com.boki.xml;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlRootElement;

//根元素的標籤名為articles
@XmlRootElement(name = "articles")
public class ArticleData {

	//articles元素下有多個article元素
	List<Article> article = new ArrayList<Article>();

	public List<Article> getArticle() {
		return article;
	}

	public void setArticle(List<Article> article) {
		this.article = article;
	}

	public static void main(String[] args) {

		// 建立xml文件對象，其儲存在E碟的根目錄下的article.xml檔案
		File xmlFile = new File("D:\\J2EE\\SQL_statement\\article.xml");
		// 宣告JAXBContext上下文對像
		JAXBContext context;
		try {
			// 透過指定映射的類建立上下文
			context = JAXBContext.newInstance(ArticleData.class);
			// 透過上下文建立xml轉化java的對象Unmarshaller
			Unmarshaller u = context.createUnmarshaller();
			// 將xml資料轉換成java對像
			ArticleData data = (ArticleData) u.unmarshal(xmlFile);
			// 獲得所有的article資料
			List<Article> articles = data.getArticle();
			for (Article a : articles) {
				System.out.println("-------------------------");
				System.out.println(a.getAuthor());
				System.out.println(a.getDate());
				System.out.println(a.getEmail());
				System.out.println(a.getTitle());
			}
		} catch (JAXBException e) {
			e.printStackTrace();
		}
	}
}
