<%@ page language="java" pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.ResultSet" %>
<jsp:directive.page import="java.sql.Date"/>
<jsp:directive.page import="java.sql.Timestamp"/>
<jsp:directive.page import="java.sql.SQLException"/>
<jsp:directive.page import="com.boki.util.DbManager"/>
<jsp:directive.page import="java.sql.PreparedStatement"/>
<jsp:directive.page import="com.boki.util.Pagination"/>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP 'listPerson.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<style type="text/css">body, td, th, input {font-size:12px; text-align:center; }</style>
  </head>
  <body>
<%
    // 一頁顯示10條記錄
	final int pageSize = 10;	
    // 目前頁數，預設為1
	int pageNum = 1; 			
	// 總頁數，預設為1
	int pageCount = 1;			
    // 總筆數
	int recordCount = 0;		
	
	try{
		// 取得第幾頁
		pageNum = Integer.parseInt(request.getParameter("pageNum"));
	}catch(Exception e){}
	
	String sql = null;
	
	Connection conn = null;
	PreparedStatement preStmt = null;
	ResultSet rs = null;
	
	try{
		sql = "SELECT count(*) FROM tb_person ";
		
		recordCount = DbManager.getCount(sql);
		
		// 計算共幾頁
		pageCount = ( recordCount + pageSize - 1 ) / pageSize;
		// 本頁從startRecord行開始
		int startRecord = ( pageNum - 1) * pageSize;
		
		// MySQL  limit語法  配合分頁
		sql = "SELECT * FROM tb_person LIMIT ?, ? ";
		//  第二次查詢
		conn = DbManager.getConnection();
		// 查出第?頁的結果集
		preStmt = conn.prepareStatement(sql);
		//  設訂第幾頁，一頁幾筆
		DbManager.setParams(preStmt, startRecord, pageSize);
		rs = preStmt.executeQuery();
%>
 <form action="operatePerson.jsp" method=get>
  <table bgcolor="#CCCCCC" cellspacing=1 cellpadding=5 width=100%>
  	<tr bgcolor=#DDDDDD>
  		<th>ID</th>
  		<th>姓名</th>
  		<th>英文名</th>
  		<th>性別</th>
  		<th>年齡</th>
  		<th>生日</th>
  		<th>備註</th>
  		<th>記錄建立時間</th>
  		<th>操作</th>
  	</tr>
<%
		// 查詢結果集
		while(rs.next()){
			
			int id = rs.getInt("id");	
			int age = rs.getInt("age");
			
			String name = rs.getString("name");	
			String englishName = rs.getString("english_name");
			String sex = rs.getString("sex");
			String description = rs.getString("description");
			// 獲得Date類型，只有日期無時間
			Date birthday = rs.getDate("birthday");
			// 獲得	Timestamp類型，有日期與時間
			Timestamp createTime = rs.getTimestamp("create_time"); 
	
			out.println("		<tr bgcolor=#FFFFFF>");
			out.println("			<td>" + id + "</td>");
			out.println("			<td>" + name + "</td>");
			out.println("			<td>" + englishName + "</td>");
			out.println("			<td>" + sex + "</td>");
			out.println("			<td>" + age + "</td>");
			out.println("			<td>" + birthday + "</td>");
			out.println("			<td>" + description + "</td>");
			out.println("			<td>" + createTime + "</td>");
			out.println("			<td>");
			out.println("				<a href='operatePerson.jsp?action=del&id=" + id + "' onclick='return confirm(\"確定刪除資料\"); '>刪除</a>");
			out.println("				<a href='operatePerson.jsp?action=edit&id=" + id + "'>修改</a>");
			out.println("			</td>");
			out.println("		</tr>");
		}
%>
  </table>
  <table align=right>
  <tr>
  <td> 
  <!-- 輸出上一頁  下一頁  第幾頁  共幾頁  共幾筆等 -->
      <%= Pagination.getPagination(pageNum, pageCount, recordCount, request.getRequestURI()) %> 
  </td>
  </tr>
  </table>
  <br/><br/><br/>
  <table align=left><tr><td>SQL: <%= sql %> </td></tr></table>
  </form>
<%
	}catch(SQLException e){
		out.println("執行SQL：" + sql + "  時發生例外：" + e.getMessage());
		e.printStackTrace();
	}finally{
		if(rs != null)	rs.close();
		if(preStmt != null)	preStmt.close();
		if(conn != null)	conn.close();
	}
%>
  </body>
</html>