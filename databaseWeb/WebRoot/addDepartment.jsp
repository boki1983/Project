<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:directive.page import="com.boki.Dao.DepartmentDAO"/>
<jsp:directive.page import="com.boki.bean.Department"/>
<jsp:directive.page import="java.util.List"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	request.setCharacterEncoding("UTF-8");
	String action = request.getParameter("action");
	//  form動做為新增
	if("add".equals(action)){
	    //  資料封裝到Department物件中
		Department department = new Department();
		department.setName(request.getParameter("name"));
		//  透過DAO執行新增
		DepartmentDAO.insert(department);
	}
	else if("del".equals(action)){
	    //  透過DAO進行刪除
		DepartmentDAO.delete(new Integer(request.getParameter("id")));
	}
	else if("edit".equals(action)){
		Department department = DepartmentDAO.find(new Integer(request.getParameter("id")));
		request.setAttribute("department", department);
	}
	else if("save".equals(action)){
	    //  找出欲進行修改該筆資料
		Department department = DepartmentDAO.find(new Integer(request.getParameter("id")));
		department.setName(request.getParameter("name"));
		//  透過DAO進行修改
		DepartmentDAO.save(department);
	}
    //  查出Department所有資料
	List departmentList = DepartmentDAO.listDepartments();
	request.setAttribute("departmentList", departmentList);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新建部門</title>
<style type="text/css">body, td{font-size:12px; }</style>
</head>
<body>

<table>
	<tr>
		<th>部門Id</th>
		<th>部門名稱</th>
	</tr>
	<c:forEach items="${ departmentList }" var="department">
		<tr>
			<td>${ department.name }</td>
			<td>
				<a href='addDepartment.jsp?action=edit&id=${ department.id }'>修改部門</a>
				<a href='addDepartment.jsp?action=del&id=${ department.id }'>刪除部門</a>
			</td>
		</tr>
	</c:forEach>
</table>

<form action="addDepartment.jsp" method="post">
<input type="hidden" name="action" value="${ param.action == 'edit' ? 'save' : 'add' }">
<input type="hidden" name="id" value="${ param.id }">
<fieldset>
	<legend>${ param.action == 'edit' ? '修改' : '新增' }</legend>
	<table align=center>
		<tr>
			<td>部門名稱</td>
			<td><input type="text" name="name" value="${ department.name }"/></td>
		</tr>
		<tr>
			<td></td>
			<td>
				<input type="submit" value="送交"/>
				<input type="button" value="新增一筆部門資料" onclick="location='addDepartment.jsp'" />
				<input type="button" value="顯示所有員工資料" onclick="location='listEmployee.jsp'" />
			</td>
		</tr>
	</table>
</fieldset>
</form>

</body>
</html>