<%@ page language="java"  contentType="text/html;charset=UTF-8"  %>
<%@ page import="java.sql.DriverManager"  %>
<%@ page import="java.sql.Connection"  %>
<%@ page import="java.sql.Statement"  %>
<%@ page import="java.sql.ResultSet"  %>
<jsp:directive.page  import="java.sql.Date" />
<jsp:directive.page  import="java.sql.Timestamp" />
<jsp:directive.page  import="java.sql.SQLException" />

<a href="addPerson.jsp">新增人員資料</a>
<%
    //  資料庫連接
    Connection conn = null;
    // Statement
    Statement stmt = null;
    //  resultSet
    ResultSet rs = null;
    
    try {
       //  註冊Driver
       DriverManager.registerDriver(new com.mysql.jdbc.Driver());
       //  獲得db connection
       conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/databaseWeb?unicode=true&characterEncoding=UTF-8", "root", "Ie@119653");
       //  獲得statement
       stmt = conn.createStatement();
       //  statement執行select敘述  傳回rs
       rs = stmt.executeQuery("select * from tb_person");
 %>
<form action="operatePerson.jsp" method=get>
			<table bgcolor="#CCCCCC" cellspacing=1 cellpadding=5 width=100%>
				<tr bgcolor=#DDDDDD>
					<th></th>
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
    //  檢察rs，rs.next() 傳回rs是否有下一筆。若有，取得下一筆並傳回true
    while (rs.next()) {
        // 取得id column轉成int
        int id = rs.getInt("id");
        //  取得age column轉成int
        int age = rs.getInt("age");
        //  取得name column轉成String
        String name = rs.getString("name");
        String englishName = rs.getString("english_name");
        String sex = rs.getString("sex");
        String description = rs.getString("description");
        //  取得birthday轉成Date
        Date birthday = rs.getDate("birthday");
        //  取得時間戳記轉成ts
        Timestamp createTime = rs.getTimestamp("create_time");
        
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        
        out.println("		<tr bgcolor=#FFFFFF>");
		out.println("	<td><input type=checkbox name=id value=" + id + "></td>");
		out.println("	<td>" + id + "</td>");
		out.println("	<td>" + name + "</td>");
		out.println("	<td>" + englishName + "</td>");
		out.println("	<td>" + sex + "</td>");
		out.println("	<td>" + age + "</td>");
		out.println("	<td>" + birthday + "</td>");
		out.println("	<td>" + description + "</td>");
		out.println("	<td>" + createTime + "</td>");
		out.println("	<td>");
		out.println("		<a href='operatePerson.jsp?action=del&id="
			+ id + "' onclick='return confirm(\"確定刪除該記錄？\")'>刪除</a>");
		out.println("		<a href='operatePerson.jsp?action=edit&id="
			+ id + "'>修改</a>");
		out.println("	</td>");
		out.println("		</tr>");
    }
 %>
</table>
<table align=left>
	<tr>
		<td>
			<input type='hidden'   value='del'   name='action'>
			<a href='#'
				onclick="">全選</a>
			<a href='#'
				onclick="">取消全選</a>
			<input type='submit'    onclick=""    value='刪除'>
			
			
		</td>
	</tr>
</table>
</form>
 
 <%
	}catch(SQLException e){
		out.println("發生了例外：" + e.getMessage());
		e.printStackTrace();
	}finally{
			// 關閉
			if(rs != null)
				rs.close();
			if(stmt != null)
				stmt.close();
			if(conn != null)
				conn.close();
	}
%>
	</body>
</html>
 