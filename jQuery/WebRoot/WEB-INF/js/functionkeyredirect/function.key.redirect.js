// Disable Function Key(F1~F10)
if (window.document.addEventListener) {
	window.document.addEventListener("keydown", avoidInvalidKeyStorkes, false);
} else {
	window.document.attachEvent("onkeydown", avoidInvalidKeyStorkes);
	//document.captureEvents(Event.KEYDOWN);
}

function avoidInvalidKeyStorkes(evtArg) {
	var evt = (document.all ? window.event : evtArg);
	var isIE = (document.all ? true : false);
	var KEYCODE = (document.all ? window.event.keyCode : evtArg.which);
	var element = (document.all ? window.event.srcElement : evtArg.target);
	
	switch (KEYCODE) {
	case 77: // M
		if (evt.ctrlKey) {
			eatKeyStroke(evt, KEYCODE, isIE);
			if (window.uiCommonCompoundKeyCtrlM) uiCommonCompoundKeyCtrlM();
		}
		break;
	case 112: // F1	
		eatKeyStroke(evt, KEYCODE, isIE);
		if (window.uiCommonFuncKeyF1) uiCommonFuncKeyF1();
		break;
	case 113: // F2
		eatKeyStroke(evt, KEYCODE, isIE);
		if (window.uiCommonFuncKeyF2) uiCommonFuncKeyF2();
		break;
	case 114: // F3
		eatKeyStroke(evt, KEYCODE, isIE);
		if (window.uiCommonFuncKeyF3) uiCommonFuncKeyF3();
		break;
	case 115: // F4
		eatKeyStroke(evt, KEYCODE, isIE);
		if (window.uiCommonFuncKeyF4) uiCommonFuncKeyF4();
		break;
	case 116: // F5
		eatKeyStroke(evt, KEYCODE, isIE);
		if (window.uiCommonFuncKeyF5) uiCommonFuncKeyF5();
		break;
	case 117: // F6
		eatKeyStroke(evt, KEYCODE, isIE);
		if (window.uiCommonFuncKeyF6) uiCommonFuncKeyF6();
		break;
	case 118: // F7
		if (evt.ctrlKey) {			
			eatKeyStroke(evt, KEYCODE, isIE);
			if (window.uiCommonCompoundKeyCtrlF7) uiCommonCompoundKeyCtrlF7();
		} else {
			eatKeyStroke(evt, KEYCODE, isIE);
			if (window.uiCommonFuncKeyF7) uiCommonFuncKeyF7();
		}
		break;
	case 119: // F8
		eatKeyStroke(evt, KEYCODE, isIE);
		if (window.uiCommonFuncKeyF8) uiCommonFuncKeyF8();
		break;
	case 120: // F9
		eatKeyStroke(evt, KEYCODE, isIE);
		if (window.uiCommonFuncKeyF9) uiCommonFuncKeyF9();
		break;
	case 121: // F10
		eatKeyStroke(evt, KEYCODE, isIE);
		if (window.uiCommonFuncKeyF10) uiCommonFuncKeyF10();
		break;
	case 122: //F11
		if (evt.ctrlKey) {
			eatKeyStroke(evt, KEYCODE, isIE);
			if (gsFuncCode && (gsFuncCode.length == 3)) return;	
			if ($("#fdcElectronicMenuDialog").length > 0) {
				$.ajax({
					url: '/' + $("meta[name='pagebase']").attr("content") + gsEbookPath,
					type: gsAjaxPost,
					dataType: gsAjaxJson,
					contentType: gsAjaxContentType,
					success: function(jsonResult, status){
						if (jsonResult.value) {
							uiCommonOpenDialog("fdcElectronicMenuDialog");
							$("#fdcElectronicMenuDialogMsg").text(gsOpenEbookDescStart + gsFuncCode + gsOpenEbookDescEnd);
							$("#fdcElectronicMenuDialogUrl").val(jsonResult.value);
							$("#fdcElectronicMenuDialog").parent(".ui-dialog").children(".ui-dialog-buttonpane").find(".ui-button").focus();
						}
					},
					error: function(xhrInstance, status, xhrException) {			
					}
				});
			}
		} //else if (evt.altKey) {
			//eatKeyStroke(evt, KEYCODE, isIE);
			//uiCommonCompoundKeyAltF11();
		//}
		break;
	case 123: //F12
		if (evt.ctrlKey) {
			eatKeyStroke(evt, KEYCODE, isIE);
			if (window.uiCommonCompoundKeyCtrlF12) uiCommonCompoundKeyCtrlF12();
		} //else if (evt.ctrlKey) {
			//eatKeyStroke(evt, KEYCODE, isIE);
			//uiCommonCompoundKeyCtrlF12();
		//}
		break;
	default:
		window.status = "Done";
	}
}

function eatKeyStroke(event, keycode, isIE) {
	if (isIE) {
		if (keycode == "112") {
			document.onhelp = function() {
				return (false);
			};
			window.onhelp = function() {
				return (false);
			};
		}
		event.returnValue = false;
		event.keyCode = 0;		
	} else {
		event.preventDefault();
		event.stopPropagation();
	}
}