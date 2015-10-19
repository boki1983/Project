<%@ page contentType="text/html; charset=UTF-8" %>
<jsp:directive.page import="java.sql.Date"/>
<jsp:directive.page import="com.boki.Dao.EmployeeDAO"/>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:directive.page import="java.util.List"/>
<jsp:directive.page import="com.boki.bean.Employee"/>
<jsp:directive.page import="com.boki.Dao.DepartmentDAO"/>
<jsp:directive.page import="com.boki.bean.Department"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	request.setCharacterEncoding("UTF-8");
	String action = request.getParameter("action");
	
	if("add".equals(action)){
		Department department = DepartmentDAO.find(Integer.parseInt(request.getParameter("departmentId")));
		Employee employee = new Employee();
		employee.setDepartment(department);
		employee.setName(request.getParameter("name"));
		employee.setSex(request.getParameter("sex"));
		employee.setEmployedDate(Date.valueOf(request.getParameter("employedDate")));
		
		System.out.println(employee.getEmployedDate());
		
		EmployeeDAO.insert(employee);
		
		response.sendRedirect("listEmployee.jsp");
		return;
	}

	List departmentList = DepartmentDAO.listDepartments();
	request.setAttribute("departmentList", departmentList);
	
	boolean isEdit = "edit".equals(action);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><%= isEdit ? "修改員工資料" : "新增員工資料" %></title>
<style type="text/css">body, td{font-size:12px; }</style>
</head>
<body>

<script type="text/javascript" src="js/calendar.js"></script>

<form action="addEmployee.jsp" method="post">

<input type="hidden" name="action" value="<%= isEdit ? "save" : "add" %>">
<input type="hidden" name="id" value="${ employee.id }">

<fieldset>
	<legend><%= isEdit ? "修改員工資料" : "新增員工資料" %></legend>
	<table align=center>
		<tr>
			<td>員工姓名</td>
			<td><input type="text" name="name" value="${ employee.name }"/></td>
		</tr>
		<tr>
			<td>所屬部門</td>
			<td>
				<select name="departmentId">
					<c:forEach items="${ departmentList }" var="department">
						<option value="${ department.id }">${ department.name }</option>
					</c:forEach>
				</select>
			</td>
		</tr>
		<tr>
			<td>性別</td>
			<td>
				<input type="radio" name="sex" value="male" id="sex_male" /><label for="sex_male">male</label>
				<input type="radio" name="sex" value="female" id="sex_female" /><label for="sex_female">female</label>
			</td>
		</tr>
		<tr>
			<td>到職日期</td>
			<td>
				<input type="text" name="employedDate" onfocus="setday(employedDate)" value="${ employee.employedDate }"/>
				<img src="images/calendar.gif" onclick="setday(employedDate);" />
			</td>
		</tr>
		<tr>
			<td></td>
			<td>
				<input type="submit" value="<%= isEdit ? "修改" : "新增" %>"/>
				<input type="button" value="回上頁" onclick="history.go(-1); " />
			</td>
		</tr>
	</table>
</fieldset>
</form>


</body>
</html>