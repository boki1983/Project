package com.boki.xml;

import java.io.File;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

public class JAXBDemoUnmarshal {

	public static void main(String[] args) {
		// �إ�xml����H�A���x�s�bD:\\J2EE\\SQL_statement\\�ؿ��U��test.xml�ɮ�
		File xmlFile = new File("D:\\J2EE\\SQL_statement\\test.xml");
		//�ŧiJAXBContext�W�U��ﹳ
		JAXBContext context;
		try {
			//�z�L���w�M�g�����إߤW�U��
			context = JAXBContext.newInstance(Article.class);
			
			//�z�L�W�U��إ�xml���java����HUnmarshaller
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
