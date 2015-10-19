<%@ page language="java" pageEncoding="UTF-8"
	contentType="text/html;charset=UTF-8"%>
<%@ page import="java.sql.DriverManager"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.Statement"%>
<jsp:directive.page import="java.sql.ResultSet" />
<jsp:directive.page import="java.sql.SQLException" />
<jsp:directive.page import="java.sql.PreparedStatement"/>
<jsp:directive.page import="java.text.SimpleDateFormat"/>
<jsp:directive.page import="java.sql.Timestamp"/>
<jsp:directive.page import="java.sql.Date"/>
<%!
	/** MySQL中的單引號(')需要轉換成\'  */
	public String forSQL(String sql){
		return sql.replace("'", "\\'");
	}
%>
<%
	request.setCharacterEncoding("UTF-8");

	String name = request.getParameter("name");
	String englishName = request.getParameter("englishName");
	String age = request.getParameter("age");
	String birthday = request.getParameter("birthday");
	String sex = request.getParameter("sex");
	String description = request.getParameter("description");
	
	String action = request.getParameter("action");

	if("add".equals(action)){

		// INSERT SQL 敘述
		String sql = "INSERT INTO tb_person " +
					" ( name, english_name, " +
					"   age, sex, birthday,  " +
					"   description ) values " +
					" ( '" + forSQL(name) + "', '" + forSQL(englishName) + "', " +
					"   '" + age + "', '" + sex + "', '" + birthday + "', " +
					"   '" + forSQL(description) + "' ) " ;
		//  id會自己+1，ts會new Date()
		
		Connection conn = null;
		Statement stmt = null;
		int result = 0;
		
		try{
			DriverManager.registerDriver(new com.mysql.jdbc.Driver());
			conn = DriverManager.getConnection(
							"jdbc:mysql://localhost:3306/databaseWeb?characterEncoding=UTF-8", 
							"root",  "Ie@119653");
		    //  建立statement
			stmt = conn.createStatement();
			
			// 執行新增SQL語法，回傳新增幾筆
			result = stmt.executeUpdate(sql);
			
		}catch(SQLException e){
			out.println("執行SQL\"" + sql + "\"時發生例外：" + e.getMessage());
			return;
		}finally{
			if(stmt != null)	stmt.close();
			if(conn != null)	conn.close();
		}
		
		out.println("<html><style>body{font-size:12px; line-height:25px; }</style><body>");
		out.println(result + " 條記錄被新增到資料庫中");
		out.println("<a href='listPerson.jsp'>返回人員列表</a>");
		
		// 輸出SQL
		out.println("<br/><br/>執行的SQL敘述為： <br/>" + sql);
		
		return;
		
	}
	else if("del".equals(action)){
		
		//  取一個或多個id值
		String[] id = request.getParameterValues("id");
		if (id == null || id.length == 0) {	out.println("沒有勾選任何行 "); 	return;	}
		//  組成SQL條件
		String condition = "";
		
		for(int i=0; i<id.length; i++){
			if(i == 0)	condition = "" + id[i];
			else		condition += ", " + id[i];
		}
		//  組成SQL語法(in)
		String sql = "DELETE FROM tb_person WHERE id IN (" + condition + ") ";		
		
		Connection conn = null;
		Statement stmt = null;
		
		try {
		    //  獲得驅動
			DriverManager.registerDriver(new com.mysql.jdbc.Driver());
			//  獲得連接
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/databaseWeb?characterEncoding=UTF-8", 
				"root",  "Ie@119653");
			//  建立Statement
			stmt = conn.createStatement();
			
			// 執行SQL
			int result = stmt.executeUpdate(sql);
	
			out.println("<html><style>body{font-size:12px; line-height:25px; }</style><body>");
			out.println(result + "  條記錄被刪除");
			out.println("<a href='listPerson.jsp'>傳回人員列表</a>");
			
			// 將SQL輸出
			out.println("<br/><br/>執行的SQL語法為：<br/>" + sql);
			
		}catch(SQLException e){
			out.println("執行SQL\"" + sql + "\"時發生例外：" + e.getMessage());
			e.printStackTrace();
		}finally{
			if(stmt != null)	stmt.close();
			if(conn != null)	conn.close();
		}
	}
	else if("edit".equals(action)){
		
		String id = request.getParameter("id");
		//  修改前須要先去DB撈出此筆資料
		String sql = "SELECT * FROM tb_person WHERE id = " + id;
		
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		try{
		     //  獲得驅動
			DriverManager.registerDriver(new com.mysql.jdbc.Driver());
			//  獲得連接
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/databaseWeb?characterEncoding=UTF-8", 
				"root",  "Ie@119653");
			//  建立Statement
			stmt = conn.createStatement();
			//  執行查詢欲修改資料
			rs = stmt.executeQuery(sql);
	        //  Moves the cursor froward one row from its current position. 
	        //  A ResultSet cursor is initially positioned before the first row
			if(rs.next()){
				// 將查詢屬性放到對應request中
				request.setAttribute("id", rs.getString("id"));
				request.setAttribute("name", rs.getString("name"));
				request.setAttribute("englishName", rs.getString("english_name"));
				request.setAttribute("age", rs.getString("age"));
				request.setAttribute("sex", rs.getString("sex"));
				request.setAttribute("birthday", rs.getString("birthday"));
				request.setAttribute("description", rs.getString("description"));
				
				request.setAttribute("action", action);
				
				//  轉到修改頁面
				request.getRequestDispatcher("/addPerson.jsp").forward(request, response);
			}
			else{
				// 沒有資料
				out.println("沒有找到id為 " + id + " 的資料");
			}
		}catch(SQLException e){
			out.println("執行SQL\"" + sql + "\"時發生例外：" + e.getMessage());
			e.printStackTrace();
		}finally{
			if(rs != null)		rs.close();
			if(stmt != null)	stmt.close();
			if(conn != null)	conn.close();
		}
	}
/* 	else if("save".equals(action)){  //  儲存資料
		//  取得儲存資料的id
		String id = request.getParameter("id");
		
		String sql = "UPDATE tb_person SET " +
					" 	name = '" + forSQL(name) + "', " +
					" 	english_name = '" + forSQL(englishName) + "', " +
					" 	sex = '" + sex + "', " +
					"	age = '" + age + "', " +
					" 	birthday = '" + birthday + "', " +
					" 	description = '" + forSQL(description) + "' " +
					" WHERE id = " + id;
		
		Connection conn = null;
		Statement stmt = null;
		try{
			DriverManager.registerDriver(new com.mysql.jdbc.Driver());
			//  獲得連接
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/databaseWeb?characterEncoding=UTF-8", 
				"root",  "Ie@119653");
			
			stmt = conn.createStatement();
			
			// 執行修改語法，取得update筆數
			int result = stmt.executeUpdate(sql);
	
			out.println("<html><style>body{font-size:12px; line-height:25px; }</style><body>");
			//  判斷修改行數，正常情況是1筆
			if(result == 0)		out.println("影響筆數為0，修改失敗。 ");   //  沒有資料被修改
			else	out.println(result + " 條記錄被修改");   //  修改行數
			
			out.println("<a href='listPerson.jsp'>傳回人員列表</a>");
			
			// 輸出SQL
			out.println("<br/><br/>執行的SQL語法為： <br/>" + sql);
			
		}catch(SQLException e){
			out.println("執行SQL\"" + sql + "\"時發生例外：" + e.getMessage());
			e.printStackTrace();
		}finally{
			if(stmt != null)	stmt.close();
			if(conn != null)	conn.close();
		}
	} */
	else if("save".equals(action)){  //  儲存資料
		String id = request.getParameter("id");
		//  使用prepareStatement
		String sql = "UPDATE tb_person SET name = ?, english_name = ?, sex = ?, age = ?, birthday = ?, description = ? WHERE id = ? ";
		
		Connection conn = null;
		PreparedStatement preStmt = null;
		
		try{
			DriverManager.registerDriver(new com.mysql.jdbc.Driver());
			//  獲得連接
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/databaseWeb?characterEncoding=UTF-8", 
				"root",  "Ie@119653");
			//  預先編譯的帶參數SQL語法
			preStmt = conn.prepareStatement(sql);
			
			preStmt.setString(1, forSQL(name));
			preStmt.setString(2, forSQL(englishName));
			preStmt.setString(3, sex);
			preStmt.setInt(4, Integer.parseInt(age));
			preStmt.setDate(5, new Date(new SimpleDateFormat("yyyy-MM-dd").parse(birthday).getTime()));
			preStmt.setString(6, forSQL(description));
			preStmt.setInt(7, Integer.parseInt(id));
			
			// 執行SLQ語法
			// 使用prepareStatement.executeUpdate() 不需傳SQL字串當參數  已經編譯好
			int result = preStmt.executeUpdate();
	
			out.println("<html><style>body{font-size:12px; line-height:25px; }</style><body>");
			
			//  判斷修改行數，正常情況是1筆
			if(result == 0)		out.println("影響筆數為0，修改失敗。 ");   //  沒有資料被修改
			else	out.println(result + " 條記錄被修改");   //  修改行數
			
			out.println("<a href='listPerson.jsp'>傳回人員列表</a>");
			
			// 輸出SQL
			out.println("<br/><br/>執行的SQL語法為： <br/>" + sql);
			
		}catch(SQLException e){
			out.println("執行SQL\"" + sql + "\"時發生例外：" + e.getMessage());
			e.printStackTrace();
		}finally{
			if(preStmt != null)	preStmt.close();
			if(conn != null)	conn.close();
		}
	}

%>
