package com.boki.xml;

import java.io.File;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

public class SaxDemo {

	public static void main(String[] args) {
		// �إ߸ѪR��xml����H�A���x�s�bD:\\J2EE\\SQL_statement\\article.xml�ؿ��U��article.xml�ɮ�
		File xmlFile = new File("D:\\J2EE\\SQL_statement\\article.xml");
		// �إߤ@�� SAXParserFactory�ﹳ. �z�L��ҼҦ��إ�
		SAXParserFactory factory = SAXParserFactory.newInstance();
		try {
			// �إ�SAXParser�ﹳ
			SAXParser parser = factory.newSAXParser();
			// �ѪR�ɮ�,�éw�q�ѪR�ɪ��ƥ�B�z
			parser.parse(xmlFile, new MySaxHandler());
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
