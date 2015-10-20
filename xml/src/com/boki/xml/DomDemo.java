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
		// �إ߸ѪR��xml����H�A���x�s�bD:\\J2EE\\SQL_statement\\�ؿ��U��article.xml�ɮ�
		File xmlFile = new File("D:\\J2EE\\SQL_statement\\article.xml");
		// �ŧi�@�� DocumentBuilder�ﹳ. �⹳���A���ઽ���غc�A�i�H�z�L DocumentFactory �ӫغc�C
		DocumentBuilder builder = null;
		// �ŧi�@�� DocumentBuilderFactory�ﹳ. �z�L��ҼҦ��إ�
		DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
		// ���o�w�]�� DocumentBuilder.
		try {
			// Creates a new instance of a javax.xml.parsers.DocumentBuilder using the currently configured parameters.
			builder = builderFactory.newDocumentBuilder();
			// �ѪR�ɮ�
			Document document = builder.parse(xmlFile);
			// ��o�ڤ���
			Element root = document.getDocumentElement();
			System.out.println("�ڤ����G" + root.getNodeName());
			// ��o�ڤ����U���l�`�I
			NodeList childNodes = root.getChildNodes();
			// �ˬd�o�Ǥl�`�I
			for (int i = 0; i < childNodes.getLength(); i++) {
				// ��C�Ӥl�`�I�i��P�_
				Node node = childNodes.item(i);
				// �p�G�`�I���W�٬�"article"
				if ("article".equals(node.getNodeName())) {
					// ��Xarticle�����ݩ�category
					System.out.println("\r\n���@�g�峹. ���ݤ���: "
							+ node.getAttributes().getNamedItem("category")
									.getNodeValue() + ". ");
					// ��o<article>�����U���Ҧ��`�I
					NodeList nodeDetail = node.getChildNodes();
					// �ˬd<article>�����U���Ҧ��`�I
					for (int j = 0; j < nodeDetail.getLength(); j++) {
						// ��o<article>�����C�@�Ӹ`�I
						Node detail = nodeDetail.item(j);
						// �ھڸ`�I�W�ٸѪR���
						if ("title".equals(detail.getNodeName()))
							System.out
									.println("���D: " + detail.getTextContent());
						else if ("author".equals(detail.getNodeName()))
							System.out
									.println("�@��: " + detail.getTextContent());
						else if ("email".equals(detail.getNodeName()))
							System.out.println("�q�l�l��: "
									+ detail.getTextContent());
						else if ("date".equals(detail.getNodeName()))
							System.out.println("�o����: "
									+ detail.getTextContent());
					}
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
