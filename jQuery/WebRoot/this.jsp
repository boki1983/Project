<%@ page language="java" import="java.util.*" pageEncoding="BIG5"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>Function Context Example</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">

    <script>
    var o1= {handle : 'o1'};
    var o2= {handle : 'o2'};
    var o3= {handle : 'o3'};
    window.handle = 'window';
    
    //  ���(�@�Ū���)
    function WhoAmI() {
        return this.handle;
    }
    
    o1.identify = WhoAmI;
    
    //  �I�swindow����   function Context = window
    alert(WhoAmI());
    // �I�so1.identufy�S��(�YWhoAmI)  function Context = o1   
    alert(o1.identify());
    // call()��ƬO�Ҧ���ƫغc��  �Ĥ@�Ӥ޼Ƭ�function Context����A�ĤG�Ӥ޼Ƭ�funticon�ǤJ�Ѽ�
    alert(WhoAmI.call(o2));
    // apply()��ƬO�Ҧ���ƫغc��  �Ĥ@�Ӥ޼Ƭ�function Context����A�ĤG�Ӥ޼Ƭ�funticon�ǤJ�Ѽ�(�����O�}�C)
    alert(WhoAmI.apply(o3));
    // notice: ����o3�@�������ܼƩI�sfunction
    alert(o1.identify.call(o3));
    
    </script>
  </head>
  
  <body>
    This is my JSP page. <br>
  </body>
</html>
