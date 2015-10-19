package com.boki.i18n;

import java.text.DateFormat;
import java.text.NumberFormat;
import java.util.Date;

public class NumberI18N {

	public static void main(String[] args) {

		// ����榡
		String s1 = DateFormat.getDateInstance().format(new Date());
		// �ɶ��榡
		String s2 = DateFormat.getTimeInstance().format(new Date());
		// �ɶ�����榡
		String s3 = DateFormat.getDateTimeInstance().format(new Date());

		// �Ʀr�榡
		String n1 = NumberFormat.getInstance().format(10000.2345);
		// �f���榡
		String n2 = NumberFormat.getCurrencyInstance().format(23.34);
		// �ʤ���榡
		String n3 = NumberFormat.getPercentInstance().format(2345.0d);
	}
}
