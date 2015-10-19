<!doctype html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>jQuery UI Draggable - Default functionality</title>
  <!--
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
  -->
  
  <link rel="stylesheet" href="<c:url value="../jquery/development-bundle/themes/ui-darkness/jquery-ui.css"/>" />
  <script src="<c:url value="../jquery/js/jquery-1.9.1.js"/>"></script>
  <script src="<c:url value="../jquery/js/jquery-ui-1.10.1.custom.js"/>"></script>
  <style>
  #draggable { width: 150px; height: 150px; padding: 0.5em; }
  </style>
  <script>
  $(function() {
    $( "#draggable" ).draggable();
    $( "#draggableTable" ).draggable();
  });
  </script>
</head>
<body>
 
<div id="draggable" class="ui-widget-content">
  <p>Drag me around</p>
</div>


<table id="draggableTable" class="ui-widget-content">
    <tr><td>Drag me</td></tr>
</table>
 
</body>
</html>