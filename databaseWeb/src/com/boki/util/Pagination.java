package com.boki.util;

public class Pagination {

	/**
	 * @param pageNum    �ثe����
	 * @param pageCount    �`����
	 * @param recordCount    �`�O����
	 * @param pageUrl    ���� URL
	 * @return 
	 */
	public static String getPagination(int pageNum, int pageCount,
			int recordCount, String pageUrl) {
        //  URL�r�ꤤ���]�t"?" �^��URL�A�S�����ܦb�̫�[�W"?"
		String url = pageUrl.contains("?") ? pageUrl : pageUrl + "?";
		//  URL�̫�[�W"&"
		if(!url.endsWith("?") && !url.endsWith("&")){
			url += "&";
		}

		StringBuffer buffer = new StringBuffer();
		buffer.append("�� " + pageNum + "/" + pageCount + " �� �@ " + recordCount
				+ " ���O�� ");
        //  �p�G�O�Ĥ@���N�u��ܤ�r������hyberlink
		buffer.append(pageNum == 1 ? " �Ĥ@�� " : " <a href='" + url
				+ "pageNum=1'>�Ĥ@��</a> ");
		buffer.append(pageNum == 1 ? " �W�@�� " : " <a href='" + url + "pageNum="
				+ (pageNum - 1) + "'>�W�@��</a> ");
	    //  �p�G�O�̫�@���N�u��ܤ�r������hyberlink
		buffer.append(pageNum == pageCount ? " �U�@�� " : " <a href='" + url
				+ "pageNum=" + (pageNum + 1) + "'>�U�@��</a> ");
		buffer.append(pageNum == pageCount ? " �̫�@�� " : " <a href='" + url
				+ "pageNum=" + pageCount + "'>�̫�@��</a> ");

		buffer.append(" �� <input type='text' ");
		buffer.append("  name='boki_goto_input' ");
		buffer.append("  style='width:25px; text-align:center; '> �� ");
		buffer.append(" <input type='button'");
		buffer.append("  name='boki_goto_button' value='Go'>");

		buffer.append("<script language='javascript'>");
		buffer.append("function boki_enter(){");
		//  ��enter(keyCode == 13)
		buffer.append("	if(event.keyCode == 13){");
		buffer.append("		boki_goto();");
		buffer.append("		return false;");
		buffer.append("	}");
		buffer.append("	return true;");
		buffer.append("} ");
		buffer.append("function boki_goto(){");
		buffer
				.append("	var numText = document.getElementsByName('boki_goto_input')[0].value;");
		buffer.append("	var num = parseInt(numText, 10);");
		buffer.append("	if(!num){");
		buffer.append("		alert('���ƥ������Ʀr');	");
		buffer.append("		return;");
		buffer.append("	}");
		buffer.append("	if(num<1 || num>" + pageCount + "){");
		buffer.append("		alert('���ƥ����j�� 1�A�B�p���`���� " + pageCount + " ');	");
		buffer.append("		return;");
		buffer.append("	}");
		buffer.append("	location='" + url + "pageNum=' + num;");
		buffer.append("}");
		buffer
				.append("document.getElementsByName('boki_goto_input')[0].onkeypress = boki_enter;");
		buffer
				.append("document.getElementsByName('boki_goto_button')[0].onclick = boki_goto;");
		buffer.append("</script>");

		return buffer.toString();
	}
}
