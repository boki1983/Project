<!doctype html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>jQuery UI Droppable - Default functionality</title>
  <link rel="stylesheet" href="<c:url value="../jquery/development-bundle/themes/ui-darkness/jquery-ui.css"/>" />
  <script src="<c:url value="../jquery/js/jquery-1.9.1.js"/>"></script>
  <script src="<c:url value="../jquery/js/jquery-ui-1.10.1.custom.js"/>"></script>

  <style>
  #draggable { width: 100px; height: 100px; padding: 0.5em; float: left; margin: 10px 10px 10px 0; }
  #droppable { width: 150px; height: 150px; padding: 0.5em; float: left; margin: 10px; }
  </style>
  <script>
  $(function() {
    $( "#draggable" ).draggable();
    $( "#draggableTable" ).draggable();
    
    $( "#droppable" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
    
  });
  </script>
</head>
<body>
 
<div id="draggable" class="ui-widget-content">
  <p>Drag me to my target</p>
</div>
 
<div id="droppable" class="ui-widget-header">
  <p>Drop here</p>
</div>
 
 
</body>
</html>