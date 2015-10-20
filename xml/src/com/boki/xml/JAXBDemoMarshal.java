package com.boki.xml;

import java.io.File;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

public class JAXBDemoMarshal {

	public static void main(String[] args) {
		// �إ�xml����H�A���x�s�bD:\\J2EE\\SQL_statement\\�ؿ��U��test.xml�ɮ�
		File xmlFile = new File("D:\\J2EE\\SQL_statement\\test.xml");
		//�ŧiJAXBContext�W�U��ﹳ
		JAXBContext context;
		try {
			//�z�L���w�M�g�����إߤW�U��
			context = JAXBContext.newInstance(Article.class);
			//�z�L�W�U��إ�java���xml����HMarshaller
    		Marshaller m = context.createMarshaller();
   			//�إ�xml�������
			Article article = new Article();
			article.setAuthor("boki");
			article.setDate("2010/01/01");
			article.setEmail("boki@yahoo.com");
			article.setTitle("XML");
			//�Njava�ﹳ��ƨ�xml
			m.marshal(article, xmlFile);
			
		} catch (JAXBException e) {
			e.printStackTrace();
		}

	}

}
