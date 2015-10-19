<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:directive.page import="com.boki.Dao.EmployeeDAO"/>
<jsp:directive.page import="java.util.List"/>
<%
    //  Dao查出所有員工存在list理
	List employeeList = EmployeeDAO.listAllEmployees();
	//  list存到request屬性中
	request.setAttribute("employeeList", employeeList);
%>
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
		<table align=right>
			<tr>
				<td>
					<a href="addDepartment.jsp">增加部門</a>
					<a href="addEmployee.jsp">增加員工</a>
				</td>
			</tr>
		</table>
		<br />
		<br />
		<form action="operatePerson.jsp" method=get>
			<table bgcolor="#CCCCCC" cellspacing=1 cellpadding=5 width=100%>
				<tr bgcolor=#DDDDDD>
					<th></th>
					<th>ID</th>
					<th>姓名</th>
					<th>部門</th>
					<th>性別</th>
					<th>入職日期</th>
					<th>操作</th>
				</tr>
				
				<c:forEach items="${ employeeList }" var="employee">
					<tr bgcolor="#FFFFFF">
						<td><input type="checkbox" name="id" value="${ employee.id }" /></td>
						<td>${ employee.id }</td>
						<td>${ employee.name }</td>
						<td>${ employee.department.name }</td>
						<td>${ employee.sex }</td>
						<td>${ employee.employedDate }</td>
						<td>
							<a href="addEmployee.jsp?action=edit&id=${ employee.id }">修改</a>
							<a href="addEmployee.jsp?action=del&id=${ employee.id }"  >刪除</a>
						</td>
					</tr>
				</c:forEach>
				
			</table>
			<table align=left>
				<tr>
					<td>
						
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
