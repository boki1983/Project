<%@ page language="java" import="java.util.*" pageEncoding="BIG5"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>Closure  ³¬¥]</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type="text/javascript"  src="scripts/jquery-1.4.js"></script>
	<script>
	$(function() {
	   var local = 1;
	   window.setInterval(function() {
	       $("#display").append("<div> At " + new Date() + " local = " + local + "</div>");
	       local++;
	   }, 3000); 
	});
	</script>

  </head>
  
  <body>
    <div id="display" ></div>
  </body>
</html>
