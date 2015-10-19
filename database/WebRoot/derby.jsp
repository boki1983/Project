<%@ page language="java" pageEncoding="UTF-8"%>
<!-- derby.jar裡面package的class  -->
<jsp:directive.page import="org.apache.derby.jdbc.EmbeddedDriver"/>
<jsp:directive.page import="java.sql.DriverManager"/>
<jsp:directive.page import="java.sql.Connection"/>
<jsp:directive.page import="java.sql.Statement"/>
<jsp:directive.page import="java.sql.ResultSet"/>
<jsp:directive.page import="java.sql.SQLException"/>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>My JSP 'derby.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<style type="text/css">td, div{font-size:12px; } div{line-height:22px; }</style>
  </head>
  
  <body>
<%
	//  Drops a driver from the DriverManager's list. Applets can only deregister drivers from their own classloaders. 
	DriverManager.deregisterDriver(new EmbeddedDriver());

	//  Attempts to establish a connection to the given database URL
	Connection conn = DriverManager.getConnection("jdbc:derby:D:\\J2EE\\DB_derby;create=true");
	
	//  Creates a Statement object for sending SQL statements to the database.
	Statement stmt = conn.createStatement();
	
	try{
		// create table TB_TEST
		String sql = (" create table TB_TEST "
					+ " ( id integer GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1), "
					+ "   ip varchar(100), "
					+ "   host varchar(100), "
					+ "   date timestamp, "
					+ "   primary key(id) )");

		System.out.println(sql);

		stmt.executeUpdate(sql); 		
					
		out.println("<div>表tb_test不存在。建立表tb_test成功</div>");
		System.out.println("<div>表tb_test不存在。建立表tb_test成功</div>");
		
	}catch(Exception e){
		out.println("<div>表tb_test已存在</div>");
		System.out.println("<div>" + e.getMessage() + "</div>");
	}
	
	try{
		//  插入一筆資料
		int rows = stmt.executeUpdate(" insert into tb_test ( ip, host, date ) "
			+ " values ('" + request.getRemoteAddr() + "', '" + request.getServerName() + "', current_timestamp ) ");
		
		out.println("<div>新插入 "+ rows + "  行資料</div>");
		System.out.println("<div>新插入 "+ rows + "  行資料</div>");
	} catch (Exception e) {
		out.println("<div>插入資料失敗。原因：" + e.getMessage() + ". </div>");
		System.out.println("<div>插入資料失敗。原因：" + e.getMessage() + ". </div>");
	}
	
	// 獲得所有記錄
	try {
		ResultSet rs = stmt.executeQuery(" select * from tb_test ");
		
		out.println("<table border=1>");
	out.println("	<tr>");
	out.println("		<td width=100 align=center>存取次序</td>");
	out.println("		<td width=200 align=center>存取者 IP 地址</td>");
	out.println("		<td width=200 align=center>使用的功能變數名稱</td>");
	out.println("		<td width=200 align=center>存取日期</td>");
	out.println("	</tr>");
	//  迴圈檢察所有dataSet
	while(rs != null && rs.next()){
		out.println("	<tr>");
		out.println("		<td align=center>" + rs.getInt("id") + "</td>");
		out.println("		<td align=center>" + rs.getString("ip") + "</td>");
		out.println("		<td align=center>" + rs.getString("host") + "</td>");
		out.println("		<td align=center>" + rs.getTimestamp("date") + "</td>");
		out.println("	</tr>");
	}
	out.println("</table>");
	
	if(rs != null)
		rs.close();
	if(stmt != null)
		stmt.close();
	if(conn != null)
		conn.close(); 
		
	} catch (Exception e) {
		out.println("<div>查詢失敗。原因："+ e.getMessage() + ". </div>");
	}
	
	
%>
  </body>
</html>
