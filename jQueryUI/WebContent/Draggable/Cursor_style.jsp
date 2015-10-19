<!doctype html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>jQuery UI Draggable - Cursor style</title>
  <link rel="stylesheet" href="<c:url value="../jquery/development-bundle/themes/ui-darkness/jquery-ui.css"/>" />
  <script src="<c:url value="../jquery/js/jquery-1.9.1.js"/>"></script>
  <script src="<c:url value="../jquery/js/jquery-ui-1.10.1.custom.js"/>"></script>
  <style>
  #draggable, #draggable2, #draggable3 { width: 100px; height: 100px; padding: 0.5em; float: left; margin: 0 10px 10px 0; }
  </style>
  <script>
  $(function() {
    $( "#draggable" ).draggable({ cursor: "move", cursorAt: { top: 56, left: 56 } });
    $( "#draggable2" ).draggable({ cursor: "crosshair", cursorAt: { top: -5, left: -5 } });
    $( "#draggable3" ).draggable({ cursorAt: { bottom: 0 } });
  });
  </script>
</head>
<body>
 
<div id="draggable" class="ui-widget-content">
  <p>I will always stick to the center (relative to the mouse)</p>
</div>
 
<div id="draggable2" class="ui-widget-content">
  <p>My cursor is at left -5 and top -5</p>
</div>
 
<div id="draggable3" class="ui-widget-content">
  <p>My cursor position is only controlled for the 'bottom' value</p>
</div>
 
 
</body>
</html>