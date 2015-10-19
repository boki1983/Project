<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
    //  Attributes can also be set programatically using setAttribute(java.lang.String, java.lang.Object)
	// 注意是getAttribute而不是getParameter
	String action = (String)request.getAttribute("action");
    
	String id = (String)request.getAttribute("id");
	String name = (String)request.getAttribute("name");
	String englishName = (String)request.getAttribute("englishName");
	String age = (String)request.getAttribute("age");
	String sex = (String)request.getAttribute("sex");
	String birthday = (String)request.getAttribute("birthday");
	String description = (String)request.getAttribute("description");
	
	// 判斷是  新增作業  還是  修改作業，下面程式碼依此變數做對應處理
	boolean isEdit = "edit".equals(action);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><%= isEdit ? "修改人員資料" : "新增人員資料" %></title>
<style type="text/css">body, td{font-size:12px; }</style>
</head>
<body>

<script type="text/javascript" src="js/calendar.js"></script>

<form action="operatePerson.jsp" method="post">
<%-- 隱藏欄位  儲存action的值  --%>
<input type="hidden" name="action" value="<%= isEdit ? "save" : "add" %>">
<%-- 隱藏欄位  儲存id的值  --%>
<input type="hidden" name="id" value="<%= isEdit ? id : "" %>">

<fieldset>
	<legend><%= isEdit ? "修改人員資料" : "新增人員資料" %></legend>
	<table align=center>
		<tr>
			<td>姓名</td>
			<td><input type="text" name="name" value="<%= isEdit ? name : "" %>"/></td>
		</tr>
		<tr>
			<td>英文名</td>
			<td><input type="text" name="englishName"  value="<%= isEdit ? englishName : "" %>"/></td>
		</tr>
		<tr>
			<td>性別</td>
			<td>
				<input type="radio" name="sex" value="man" id="sex_male" <%= isEdit&&"man".equals(sex) ? "checked" : "" %> /><label for="sex_male">man</label>
				<input type="radio" name="sex" value="woman" id="sex_female" <%= isEdit&&"women".equals(sex) ? "checked" : "" %>/><label for="sex_female">woman</label>
			</td>
		</tr>
		<tr>
			<td>年齡</td>
			<td><input type="text" name="age" value="<%= isEdit ? age : "" %>" /></td>
		</tr>
		<tr>
			<td>生日</td>
			<td>
				<input type="text" name="birthday" onfocus="setday(birthday)" value="<%= isEdit ? birthday : "" %>"/>
				<img src="images/calendar.gif" onclick="setday(birthday);" />
			</td>
		</tr>
		<tr>
			<td>描述</td>
			<td><textarea name="description" ><%= isEdit ? description : "" %></textarea></td>
		</tr>
		<tr>
			<td></td>
			<td>
				<input type="submit" value="<%= isEdit ? "儲存" : "增加人員資訊" %>"/>
				<input type="button" value="返回" onclick="history.go(-1); " />
			</td>
		</tr>
	</table>
</fieldset>
</form>


</body>
</html>