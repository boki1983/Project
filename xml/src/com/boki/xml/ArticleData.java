package com.boki.xml;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlRootElement;

//�ڤ��������ҦW��articles
@XmlRootElement(name = "articles")
public class ArticleData {

	//articles�����U���h��article����
	List<Article> article = new ArrayList<Article>();

	public List<Article> getArticle() {
		return article;
	}

	public void setArticle(List<Article> article) {
		this.article = article;
	}

	public static void main(String[] args) {

		// �إ�xml����H�A���x�s�bE�Ъ��ڥؿ��U��article.xml�ɮ�
		File xmlFile = new File("D:\\J2EE\\SQL_statement\\article.xml");
		// �ŧiJAXBContext�W�U��ﹳ
		JAXBContext context;
		try {
			// �z�L���w�M�g�����إߤW�U��
			context = JAXBContext.newInstance(ArticleData.class);
			// �z�L�W�U��إ�xml���java����HUnmarshaller
			Unmarshaller u = context.createUnmarshaller();
			// �Nxml����ഫ��java�ﹳ
			ArticleData data = (ArticleData) u.unmarshal(xmlFile);
			// ��o�Ҧ���article���
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
