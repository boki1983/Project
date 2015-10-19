<!doctype html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>jQuery UI Resizable - Default functionality</title>
  <link rel="stylesheet" href="<c:url value="../jquery/development-bundle/themes/ui-darkness/jquery-ui.css"/>" />
  <script src="<c:url value="../jquery/js/jquery-1.9.1.js"/>"></script>
  <script src="<c:url value="../jquery/js/jquery-ui-1.10.1.custom.js"/>"></script>
  <style>
  #resizable { width: 150px; height: 150px; padding: 0.5em; }
  #resizable h3 { text-align: center; margin: 0; }
  </style>
  <script>
  $(function() {
    $( "#resizable" ).resizable();
  });
  </script>
</head>
<body>

<div id="outlet" >
<div id="resizable" class="ui-widget-content">
  <h3 class="ui-widget-header">Resizable</h3>
</div>
</div>
 
</body>
</html>