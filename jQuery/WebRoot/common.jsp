<%@ page language="java" import="java.util.*" pageEncoding="BIG5"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>common page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
    <!-- 系統樣式檔 -->
    <link type="text/css" rel="stylesheet" href="/WEB-INF/css/CommonUI.css"/>
    <link type="text/css" rel="stylesheet" href="/WEB-INF/js/simpletreemenu/simpletree.css"/>
    <link type="text/css" rel="stylesheet" href="/WEB-INF/js/jqueryui/css/redmond/jquery-ui-1.8.2.custom.css"/>
    <link type="text/css" rel="stylesheet" href="/WEB-INF/js/jqgrid/css/ui.jqgrid.css"/>
    <!-- 系統JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/jquery/jquery-1.4.2.min.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/jqueryui/jquery-ui-1.8.2.custom.min.js"/></script>    
    <script type="text/javascript" src="/WEB-INF/js/simpletreemenu/simpletreemenu.js"/></script>
    <!-- UI元件樣式檔 -->
    <link type="text/css" rel="stylesheet" href="/WEB-INF/js/dynatree/skin-vista/ui.dynatree.css"/>
    <link type="text/css" rel="stylesheet" href="/WEB-INF/js/jdmenu/jquery.jdMenu.css"/>
    <link type="text/css" rel="stylesheet" href="/WEB-INF/js/jqplot/jquery.jqplot.min.css"/>
    <link type="text/css" rel="stylesheet" href="/WEB-INF/js/lightbox/jquery.lightbox-0.5.css"/>
    <link type="text/css" rel="stylesheet" href="/WEB-INF/js/my97datepicker/skin/WdatePicker.css"/>
    <link type="text/css" rel="stylesheet" href="/WEB-INF/js/spinner/ui.spinner.css"/>
    <link type="text/css" rel="stylesheet" href="/WEB-INF/js/treeview/jquery.treeview.css"/>
    <!-- 自動跳轉輸入元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/autotab/jquery.autotab-1.1b.js"/></script>
    <!-- 阻擋輸入元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/blockui/jquery.blockUI.js"/></script>
    <!-- 右鍵選單元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/contextmenu/jquery.contextMenu.js"/></script>
    <!-- 動態樹元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/dynatree/jquery.dynatree.min.js"/></script>
    <!-- 表單元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/form/form2object.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/form/jquery.form.js"/></script>
    <!-- 輸入元件JavaScript函式庫 -->    
    <script type="text/javascript" src="/WEB-INF/js/functionkeyredirect/function.key.redirect.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/halftofulltype/halftofulltype.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/jcaret/jquery.caret.1.02.js"/></script>
    <!-- 選單元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/jdmenu/jquery.bgiframe.js"/></script>    
    <script type="text/javascript" src="/WEB-INF/js/jdmenu/jquery.jdMenu.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/jdmenu/jquery.positionBy.js"/></script>
    <!-- 表格Grid元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/jqgrid/i18n/grid.locale-zh-tw.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/jqgrid/jquery.jqGrid.min.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/jqgrid/grid.setcolumns.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/jqgrid/grid.postext.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/jqgrid/grid.addons.js"/></script>
    <!-- JSON元件JavaScript函式庫 -->        
    <script type="text/javascript" src="/WEB-INF/js/json/jquery.json-2.2.min.js"/></script>
    <!-- 燈箱元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/lightbox/jquery.lightbox-0.5.min.js"/></script>
    <!-- 遮罩輸入元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/maskedinput/jquery.maskedinput-1.2.2.min.js"/></script>
    <!-- 多檔案上傳元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/multifile/jquery.MultiFile.min.js"/></script>
    <!-- 日曆元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/my97datepicker/WdatePicker.js"/></script>
    <!-- 微調鈕元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/spinner/ui.spinner.min.js"/></script>
    <!-- 樹狀控制元件JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/treeview/jquery.treeview.min.js"/></script>
    <!-- UI元件共用JavaScript字串檔 -->    
    <script type="text/javascript" src="/WEB-INF/js/uicommon/uiCommonString.js"/></script>
    <!-- UI模組客製化JavaScript控制檔 -->
    <script type="text/javascript" src="/WEB-INF/js/uicommon/uiCommon.js"/></script>
    <!-- 農民曆JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/lunar/lunarCalendar.js"/></script>
    <!-- 前端驗證JavaScript函式庫 -->
    <script type="text/javascript" src="/WEB-INF/js/validate/jquery.validate.min.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/validate/jquery.metadata.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/validate/additional-methods.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/validate/custom-methods.js"/></script>
    <script type="text/javascript" src="/WEB-INF/js/validate/localization/messages_tw.js"/></script>
    <!-- 浮水印JavaScript函式庫 -->    
    <script type="text/javascript" src="/WEB-INF/js/watermarkinput/jquery.watermarkinput.js"/></script>
  </head>
  
  <input id="test1"  value="123  "   onblur="test()">
<script>
function test() {
alert($("#test1").val());
}
</script>
  
</html>
