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
    
    //  ㄧ计(ン)
    function WhoAmI() {
        return this.handle;
    }
    
    o1.identify = WhoAmI;
    
    //  ㊣windowン   function Context = window
    alert(WhoAmI());
    // ㊣o1.identufy疭┦(WhoAmI)  function Context = o1   
    alert(o1.identify());
    // call()ㄧ计琌┮Τㄧ计篶Α  材ま计function Contextン材ま计funticon肚把计
    alert(WhoAmI.call(o2));
    // apply()ㄧ计琌┮Τㄧ计篶Α  材ま计function Contextン材ま计funticon肚把计(ゲ斗琌皚)
    alert(WhoAmI.apply(o3));
    // notice: o3吏挂跑计㊣function
    alert(o1.identify.call(o3));
    
    </script>
  </head>
  
  <body>
    This is my JSP page. <br>
  </body>
</html>
