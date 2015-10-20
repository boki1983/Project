package com.boki.xml;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class MySaxHandler extends DefaultHandler {

	static DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	private String content;

	// �ƥ�o�ͮɤ��������r��
	@Override
	public void characters(char[] ch, int start, int length)
			throws SAXException {
		content = new String(ch, start, length);
	}

	// ��ѪR�줸�����������Ү�Ĳ�o
	@Override
	public void endElement(String uri, String localName, String qName)
			throws SAXException {
		// �P�_�����ѪR���W��
		if ("title".equals(qName)) {
			System.out.println("���D: " + content);
		} else if ("author".equals(qName)) {
			System.out.println("�@��: " + content);
		} else if ("email".equals(qName)) {
			System.out.println("�q�l�l��: " + content);
		} else if ("body".equals(qName)) {
			System.out.println("���e: " + content);
		} else if ("date".equals(qName)) {
			System.out.println("�o����: " + content);
		}
	}

	// ��ѪR�줸�����}�l���Ү�Ĳ�o
	@Override
	public void startElement(String uri, String localName, String qName,
			Attributes attributes) throws SAXException {
		// �����W��article
		if ("article".equals(qName)) {
			System.out.println("\r\n���@�g�峹. ���ݤ���: "
					+ attributes.getValue("category") + ". ");
		}
	}

}
