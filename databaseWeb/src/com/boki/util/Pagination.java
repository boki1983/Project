package com.boki.util;

public class Pagination {

	/**
	 * @param pageNum    目前頁數
	 * @param pageCount    總頁數
	 * @param recordCount    總記錄數
	 * @param pageUrl    頁面 URL
	 * @return 
	 */
	public static String getPagination(int pageNum, int pageCount,
			int recordCount, String pageUrl) {
        //  URL字串中有包含"?" 回傳URL，沒有的話在最後加上"?"
		String url = pageUrl.contains("?") ? pageUrl : pageUrl + "?";
		//  URL最後加上"&"
		if(!url.endsWith("?") && !url.endsWith("&")){
			url += "&";
		}

		StringBuffer buffer = new StringBuffer();
		buffer.append("第 " + pageNum + "/" + pageCount + " 頁 共 " + recordCount
				+ " 筆記錄 ");
        //  如果是第一頁就只顯示文字不做成hyberlink
		buffer.append(pageNum == 1 ? " 第一頁 " : " <a href='" + url
				+ "pageNum=1'>第一頁</a> ");
		buffer.append(pageNum == 1 ? " 上一頁 " : " <a href='" + url + "pageNum="
				+ (pageNum - 1) + "'>上一頁</a> ");
	    //  如果是最後一頁就只顯示文字不做成hyberlink
		buffer.append(pageNum == pageCount ? " 下一頁 " : " <a href='" + url
				+ "pageNum=" + (pageNum + 1) + "'>下一頁</a> ");
		buffer.append(pageNum == pageCount ? " 最後一頁 " : " <a href='" + url
				+ "pageNum=" + pageCount + "'>最後一頁</a> ");

		buffer.append(" 到 <input type='text' ");
		buffer.append("  name='boki_goto_input' ");
		buffer.append("  style='width:25px; text-align:center; '> 頁 ");
		buffer.append(" <input type='button'");
		buffer.append("  name='boki_goto_button' value='Go'>");

		buffer.append("<script language='javascript'>");
		buffer.append("function boki_enter(){");
		//  按enter(keyCode == 13)
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
		buffer.append("		alert('頁數必須為數字');	");
		buffer.append("		return;");
		buffer.append("	}");
		buffer.append("	if(num<1 || num>" + pageCount + "){");
		buffer.append("		alert('頁數必須大於 1，且小於總頁數 " + pageCount + " ');	");
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
