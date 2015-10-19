/**********************************/
/*   Version: SDP v1.7.4(121112)  */
/**********************************/

/*****[START] 全域變數 [START]*****/
var gFDCUser = null; //使用者資訊權限物件
var gDeputyFDCUser = null; //代理使用者資訊物件
var gFDCMenuStructure = null; //選單結構
var gFDCMenuSearch = new Array(); //選單快速搜尋結構
var gFDCDebug = false; //除錯模式
var gWiredAjaxAutoBlockUI = false; //是否已經註冊了要自動在AJAX發出時BlockUI，已無用，留著for相容性
var gUIBlockingCount = 0; //@deprecated 呼叫BlockUI的次數
var gUIBlocking = false; //是否正在BlockUI
var giAddrHsn = 1; //縣市常數
var giAddrTown = 2; //鄉鎮市區常數
var giAddrVill = 3; //村里常數
var gAddrHsnData = new Array(); //縣市資料
var gAddrTownData = new Array(); //鄉鎮市區資料
var gAddrVillData = new Array(); //村里資料
var gUniqueWindowNo = 0; //強制開新視窗的視窗名稱會不相同，將此值動態接續在視窗名稱後並累加
/*****[ END ] 全域變數 [ END ]*****/

/*****[START] 系統頁面操控 [START]*****/
/* 全域設定 */
$(document).ready(function() {
	$.ajaxSetup({
    	error : function(jqXHR, textStatus, errorThrown) {
    		uiCommonSessionTimeoutForAjax(jqXHR, textStatus, errorThrown);
        }
    });
});
/* 頁面載入前先檢查使用者資訊權限物件與功能代號設定的一致性 */
function uiCommonCheckPageConsistency() {
	if (gsFuncCodeKey) {
		if (gFDCUser) {
			if (gFDCUser.menuFuncButtons) {
				if (gFDCMenuStructure) {
					if (gFDCUser.menuFuncButtons[gsFuncCodeKey]) return true;
					else uiCommonEmptyContent('未定義功能代號' + gsFuncCodeKey + '對應的使用者選單與功能按鈕權限物件！'); return false;
				} else uiCommonEmptyContent('未定義選單結構！'); return false;
			} else uiCommonEmptyContent('未定義使用者選單與功能按鈕權限物件！'); return false;
		} else uiCommonEmptyContent('未定義使用者資訊與權限物件！'); return false;
	} else uiCommonEmptyContent('未定義功能代號在頁面樣板設定檔內！'); return false;
}
/* 準備頁面, 根據使用者資訊權限物件內容建立起功能選單並將使用者功能按鈕權限從使用者資訊權限物件中抽出元件指定給使用者功能按鈕權限 */
function uiCommonPreparePage() {
	if (uiCommonCheckPageConsistency() == false) return;
	//設定metadata為validate
	$.metadata.setType("attr", "validate");
	//更新使用者資訊
	uiCommonUpdateHeaderUserInfo();	
	uiCommonUpdateHeaderDate();
	uiCommonUpdateEnvInfo();
	//依據使用者資訊權限物件建立功能選單與設定按鈕權限
	$("#fdcMenu").html(gFDCMenuStructure);
	uiCommonCreateBreadCrumbPath(gsFuncCodeKey);
	uiCommonAuthorizeMenuTree($("#fdcMenu li:first-child"), uiCommonGetMenuLinkBehaviorCookie());	
	uiCommonUpdateConfidentialLevel(gFDCUser.menuFuncButtons[gsFuncCodeKey].confdGrd);
	uiCommonApplyFunctionButtonAuthority(gFDCUser.menuFuncButtons[gsFuncCodeKey].enables);
	//建立功能選單樣式並開啟root
	ddtreemenu.createTree("fdcMenu", true); 
	uiCommonOpenMenuTreeRoot();
	//開啟目前頁面所在的選單位置與變更目前選取選單項目CSS
	uiCommonOpenMenuTreeNode(gsFuncCodeKey);
	$("#fdcMenuItem" + gsFuncCodeKey).children("div").addClass("current");
	//建立功能選單操控按鈕
	uiCommonCreateMenuControlButton();
	//準備選單自動完成功能
	uiCommonPrepareMenuAutoComplete();
	//此時才打開選單層使其可見
	if ($("#menuBaseLayer").length > 0) $("#menuBaseLayer").show();
	//此時才打開檔頭上的知識管理按鈕
	if ($("#headerJkmBtn").length > 0) $("#headerJkmBtn").show();
	//根據使用者偏好的選單cookie重設選單on/off
	if (uiCommonGetMenuPreferenceCookie() == "on") uiCommonOpenMenu();
	else uiCommonCloseMenu();
	//根據使用者偏好的頁面檔頭cookie重設頁面檔頭on/off
	if (uiCommonGetHeaderPreferenceCookie() == "on") uiCommonOpenHeader();
	else uiCommonCloseHeader();
	//若頁面上有地址元件便載入地址資料
	if ($("input:hidden[class=addressHidden]").length > 0) uiCommonLoadAllAddressData(true);
	//將頁面上所有有title的portlet加上收合按鈕
	$(".portlet").find(".portlet-header")
	.prepend('<span class="ui-icon-light ui-icon-light-circle-triangle-n"></span>').end().find(".portlet-content");
	//註冊收合按鈕的click事件處理
	$(".portlet-header .ui-icon-light").click(function() {
		$(this).toggleClass("ui-icon-light-circle-triangle-n").toggleClass("ui-icon-light-circle-triangle-s");
		$(this).parents(".portlet:first").find(".portlet-content").toggle("blind", 300);
	});
	//註冊開啟選單按鈕事件
	$("#btnSlideOut").click(function() { uiCommonOpenMenu(); });
	//註冊關閉選單按鈕事件
	if ($("#btnSlideInTd").length > 0) $("#btnSlideInTd").click(function() { uiCommonCloseMenu(); });
	else $("#btnSlideIn").click(function() { uiCommonCloseMenu(); });
	//註冊開啟頁面檔頭事件
	$("#btnHeaderOut").click(function() { uiCommonOpenHeader(); });
	//註冊關閉頁面檔頭事件
	$("#btnHeaderIn").click(function() { uiCommonCloseHeader(); });
	//註冊視窗大小改變事件
	$(window).bind('resize', function() { uiCommonAdjustFixedPositionAndSize(); });
}
/* 準備不包含選單與頁頭的彈出視窗頁面, 根據使用者資訊權限物件內容建立起功能選單並將使用者功能按鈕權限從使用者資訊權限物件中抽出元件指定給使用者功能按鈕權限 */
function uiCommonPreparePopupPage() {
	if (uiCommonCheckPageConsistency() == false) return;
	//設定metadata為validate
	$.metadata.setType("attr", "validate");
	//依據使用者資訊權限物件建立功能選單與設定按鈕權限
	uiCommonApplyFunctionButtonAuthority(gFDCUser.menuFuncButtons[gsFuncCodeKey].enables);
	uiCommonAdjustFixedPositionAndSize();
	//若頁面上有地址元件便載入地址資料
	if ($("input:hidden[class=addressHidden]").length > 0) uiCommonLoadAllAddressData(true);
	//將頁面上所有有title的portlet加上收合按鈕
	$(".portlet").find(".portlet-header")
	.prepend('<span class="ui-icon-light ui-icon-light-circle-triangle-n"></span>').end().find(".portlet-content");
	//註冊收合按鈕的click事件處理
	$(".portlet-header .ui-icon-light").click(function() {
		$(this).toggleClass("ui-icon-light-circle-triangle-n").toggleClass("ui-icon-light-circle-triangle-s");
		$(this).parents(".portlet:first").find(".portlet-content").toggle("blind", 300);
	});
	//註冊視窗大小改變事件
	$(window).bind('resize', function() { uiCommonAdjustFixedPositionAndSize(); });
}
/* 顯示程式尚未通過審核訊息 */
function uiCommonShowDisabledMenuStatus(status) {
	if (status) {
		if (status == "0") alert('此功能狀態為【審核中】，暫時無法使用!');
		else if (status == "1") alert('此功能狀態為【已啟用'); 
		else if (status == "2") alert('此功能狀態為【已停用】，暫時無法使用!');
		else if (status == "3") alert('此功能狀態為【已註冊且通過審核，待YPM進館】，暫時無法使用!');
		else if (status == "4") alert('此功能狀態為【狀態變更審核中】，暫時無法使用!');
		else if (status == "9") alert('此功能狀態為【程式維護中】，目前由YBD註記停用，暫時無法使用!');
	} else alert('此功能狀態未知，暫時無法使用!');
}
/* 遞迴建立與授權功能樹選單 */
function uiCommonAuthorizeMenuTree(node, target) {	
	if (node) {
		var nodeId = node.attr("id"); //目前節點的id，分類節點的id會包含DIR字樣
		var searchObj = new Object(); //供快速搜尋使用
		if (nodeId) { //選單節點有定義id欄位
			if ((gFDCUser.menuFuncButtons[nodeId] != null) || nodeId.match("DIR") || (gFDCUser.menuFuncButtons[("STOP_" + nodeId)] != null)) { //節點具有授權或為分類節點
				var ulChild = $("#" + nodeId).children("ul"); //檢查有無子節點
				if (ulChild.length > 0) { //中間節點，含有子節點
					var liChild = $(ulChild[0]).children("li"); //取得子節點並遞迴授權
					for (var i=0; i<liChild.length; i++) { uiCommonAuthorizeMenuTree($(liChild[i]), target); }
					if ($(ulChild[0]).children("li").length > 0) { //子節點經過遞迴授權後，若還有子節點，則建立本節點的選單
						uiCommonBuildMenuTree(nodeId, target, false);
					} else $("#" + nodeId).remove(); //子節點經過遞迴授權後，若沒有子節點了，則移除本節點
				} else { //末端節點，不含子節點
					uiCommonBuildMenuTree(nodeId, target, true);
				}
			} else $("#" + nodeId).remove(); //節點不具有授權就移除
		} else uiCommonEmptyContent('選單節點未定義id欄位，選單結構可能註冊有誤！');
	}
}
/* 建立選單節點HTML */
function uiCommonBuildMenuTree(nodeId, target, isLeaf) {
	var html = isLeaf ? "<div class='menu-text'>" : "<div class='menu-text-folder'>";
	if (nodeId.match("DIR")) { //分類節點
		if (isLeaf) $("#" + nodeId).remove(); //分類節點沒有子節點應移除
		else {
			html += "<a href='#' target='_self'>" + $("#" + nodeId).attr("title") + "</a></div>"; //將選單結構中分類節點的title屬性值文字加到連結中顯示
			$("#" + nodeId).removeAttr("title"); //移除選單結構中分類節點的title屬性
		}
	} else { //一般節點，非分類節點
		var nodeAuthObj = null;
		if (gFDCUser.menuFuncButtons[nodeId]) nodeAuthObj = gFDCUser.menuFuncButtons[nodeId];
		else if (gFDCUser.menuFuncButtons[("STOP_" + nodeId)]) nodeAuthObj = gFDCUser.menuFuncButtons[("STOP_" + nodeId)];
		if (nodeAuthObj) {
			if (nodeAuthObj.authMode && nodeAuthObj.authMode == "T") {
				$("#" + nodeId).remove(); //若有認證模式為T代表Trust模式，此節點需隱藏不顯示，直接移除
			} else {
				if (nodeId.match(gsDirCodeSep)) { //若有"__"代表單一功能代號會出現多筆在選單中，為多重功能代號模式
					var pos = nodeId.indexOf(gsDirCodeSep); 
					var func = nodeId.substring(0, pos); //功能代號 
					var dir = nodeId.substring(pos + 2); //分類識別碼
					if (nodeAuthObj.prcdStatus && nodeAuthObj.prcdStatus != "1") { //功能尚未啟用，需顯示disable					
						html += "<a href='javascript:void(0);' target='" + target + "'rel='dynamic' style='color:gray;' onclick=\"uiCommonShowDisabledMenuStatus('" + nodeAuthObj.prcdStatus + "');\">" + nodeAuthObj.text + "-" + func; + "</a></div>";
					} else {
						html += "<a href='" + nodeAuthObj.link + "?dircode=" + dir + "' target='" + target + "'rel='dynamic'>" + nodeAuthObj.text + "-" + func + "</a></div>";
						var searchObj = new Object(); //供快速搜尋使用
						searchObj.nodeId = nodeId;
						searchObj.value = func + "-" + nodeAuthObj.text;
						searchObj.label = searchObj.value + "(" + dir + ")";
						gFDCMenuSearch.push(searchObj); //加入快速搜尋
					}
				} else { //一般功能代號模式
					if (nodeAuthObj.prcdStatus && nodeAuthObj.prcdStatus != "1") { //功能尚未啟用，需顯示disable
						html += "<a href='javascript:void(0);' target='" + target + "'rel='dynamic' style='color:gray;' onclick=\"uiCommonShowDisabledMenuStatus('" + nodeAuthObj.prcdStatus + "');\">" + nodeAuthObj.text + "-" + nodeId; + "</a></div>";
					} else {
						html += "<a href='" + nodeAuthObj.link + "' target='" + target + "'rel='dynamic'>" + nodeAuthObj.text + "-" + nodeId + "</a></div>";
						var searchObj = new Object(); //供快速搜尋使用
						searchObj.nodeId = nodeId;
						searchObj.value = nodeId + "-" + nodeAuthObj.text;
						searchObj.label = searchObj.value;
						gFDCMenuSearch.push(searchObj);
					}
				}
			}
		}
	}
	$("#" + nodeId).prepend(html);
	$("#" + nodeId).attr("id", "fdcMenuItem" + nodeId);
}
/* 遞迴建立目前位置列 */
function uiCommonCreateBreadCrumbPath(funcIdKey) {
	if (funcIdKey) {		
		if ($("#" + funcIdKey).length == 0) return; //功能選單結構中隱藏的或找不到的就不建立位置列
		var funcId = funcIdKey;
		var dircode;
		if (funcIdKey.match(gsDirCodeSep)) {
			var idx = funcIdKey.indexOf(gsDirCodeSep);
			funcId = funcIdKey.substring(0, idx);
			dircode = funcIdKey.substring(idx + 2);
		}
		var path = "<a href='";
		if (funcIdKey.match("DIR")) path += "#'>" + $("#" + funcIdKey).attr("title") + "</a>";
		else {
			if (dircode && dircode != "") path += gFDCUser.menuFuncButtons[funcIdKey].link + "?dircode=" + dircode + "'>" + gFDCUser.menuFuncButtons[funcIdKey].text + "-" + funcId + "</a>";
			else path += gFDCUser.menuFuncButtons[funcId].link + "'>" + gFDCUser.menuFuncButtons[funcId].text + "-" + funcId + "</a>";
		}
		$("#breadCrumbContent").prepend(path);
		
		if ($("#" + funcIdKey).parent("ul").attr("id") == "fdcMenu") {
			$("#breadCrumbContent a:first-child").addClass("home");
			$("#breadCrumbContent a:last-child").addClass("current");
		} else uiCommonCreateBreadCrumbPath($("#" + funcIdKey).parent("ul").parent("li").attr("id"));
	}
}
/* 建立選單操控控制按鈕 */
function uiCommonCreateMenuControlButton() {
	$("#btnFdcMenuOpenAll").button({icons: { primary: "ui-icon-circle-triangle-s" }, text: false});
	$("#btnFdcMenuCloseAll").button({icons: { primary: "ui-icon-circle-triangle-n" }, text: false});
	$("#btnFdcMenuOpenCurrent").button({icons: { primary: "ui-icon-circle-triangle-e" }, text: false});
	$("#btnFdcMenuOpenLinkBlankCheckbox").button({icons: { primary: "ui-icon-newwin" }, text: false});
	if ($("#btnFdcMenuSearchAndGoCheckbox").length > 0) $("#btnFdcMenuSearchAndGoCheckbox").button({icons: { primary: "ui-icon-search" }, text: false});
	$("#btnFdcMenuOpenAll").css("width", "30px");
	$("#btnFdcMenuCloseAll").css("width", "30px");
	$("#btnFdcMenuOpenCurrent").css("width", "30px");	
	$("#fdcMenu").children("li").removeClass("open");
	$("#fdcMenu").children("li").addClass("root");
	//從cookie中讀出是否開新視窗並套用
	if (uiCommonGetMenuLinkBehaviorCookie() == "_self") {
		$("#btnFdcMenuOpenLinkBlankCheckbox").removeAttr("checked");
		if ($("#btnFdcMenuOpenLinkBlank").hasClass("ui-state-active")) $("#btnFdcMenuOpenLinkBlank").removeClass("ui-state-active");
		if ($("#menuSearchAndGoLink").length > 0) $("#menuSearchAndGoLink").attr("target", "_self");
	} else {
		$("#btnFdcMenuOpenLinkBlankCheckbox").attr("checked", "checked");
		if ($("#btnFdcMenuOpenLinkBlank").hasClass("ui-state-active") == false) $("#btnFdcMenuOpenLinkBlank").addClass("ui-state-active");
		if ($("#menuSearchAndGoLink").length > 0) $("#menuSearchAndGoLink").attr("target", "_blank");
	}
	//若使用firefox才需要調整圖示位置
	if (navigator.userAgent.search("Firefox") > -1) {
		$("#btnFdcMenuOpenLinkBlank").css("margin-top", "-1px");		
		if ($("#btnFdcMenuSearchAndGo").length > 0) $("#btnFdcMenuSearchAndGo").css("margin-top", "-1px");
	}
	//繫結選單按鈕事件
	$("#btnFdcMenuOpenAll").click(function(e) {
		ddtreemenu.flatten("fdcMenu", "expand");
		$("#fdcMenu").children("li").removeClass("open");
		$("#fdcMenu").children("li").addClass("root");
		ddtreemenu.preventpropagate(e);
	});		
	$("#btnFdcMenuCloseAll").click(function(e) {
		ddtreemenu.flatten("fdcMenu", "closed");
		uiCommonOpenMenuTreeRoot();
		$("#fdcMenu").children("li").removeClass("open");
		$("#fdcMenu").children("li").addClass("root");
		ddtreemenu.preventpropagate(e);
	});
	$("#btnFdcMenuOpenCurrent").click(function(e) {
		if ($("#fdcMenuItem" + gsFuncCodeKey).length > 0) {
			ddtreemenu.flatten("fdcMenu", "closed");
			uiCommonOpenMenuTreeNode(gsFuncCodeKey);
			$("#fdcMenu").children("li").removeClass("open");
			$("#fdcMenu").children("li").addClass("root");
		}
		ddtreemenu.preventpropagate(e);
	});	
	$("#btnFdcMenuOpenLinkBlankCheckbox").click(function(e) {
		ddtreemenu.preventpropagate(e);
		if ($("#btnFdcMenuOpenLinkBlankCheckbox").is(":checked")) {
			$("#btnFdcMenuOpenLinkBlankCheckbox").attr("checked", "checked");			
			$("#fdcMenu a[rel=dynamic]").attr("target", "_blank");			
			if ($("#btnFdcMenuOpenLinkBlank").hasClass("ui-state-active") == false) $("#btnFdcMenuOpenLinkBlank").addClass("ui-state-active");
			if ($("#menuSearchAndGoLink").length > 0) $("#menuSearchAndGoLink").attr("target", "_blank");
		} else {
			$("#btnFdcMenuOpenLinkBlankCheckbox").removeAttr("checked");			
			$("#fdcMenu a[rel=dynamic]").attr("target", "_self");			
			if ($("#btnFdcMenuOpenLinkBlank").hasClass("ui-state-active")) $("#btnFdcMenuOpenLinkBlank").removeClass("ui-state-active");
			if ($("#menuSearchAndGoLink").length > 0) $("#menuSearchAndGoLink").attr("target", "_self");
		}
		uiCommonSetMenuLinkBehaviorCookie();
	});
	$("#btnFdcMenuOpenLinkBlank").click(function(e) { ddtreemenu.preventpropagate(e); });
	if ($("#btnFdcMenuSearchAndGoCheckbox").length > 0) {
		$("#btnFdcMenuSearchAndGoCheckbox").click(function(e) {
			ddtreemenu.preventpropagate(e);
			if ($("#btnFdcMenuSearchAndGoCheckbox").is(":checked")) $("#menuSearchAndGo").show();
			else {
				$("#menuSearchAndGoInput").autocomplete("close");
				$("#menuSearchAndGo").hide();
			}
			uiCommonAdjustFixedPositionAndSize();
			uiCommonSetMenuSearchAndGoCookie();
		});
		$("#btnFdcMenuSearchAndGo").click(function(e) { ddtreemenu.preventpropagate(e); });
	}
}
/* 準備選單自動完成資料排序功能 */
function uiCommonMenuAutoCompleteDataCompare(item1, item2) {
	if (item1.label < item2.label) return -1;
	if (item1.label > item2.label) return 1;
	return 0;
}
/* 準備選單自動完成功能 */
function uiCommonPrepareMenuAutoComplete() {
	if (gFDCMenuSearch) gFDCMenuSearch.sort(uiCommonMenuAutoCompleteDataCompare);
	if ($("#menuSearchAndGoInput").length > 0 && $("#menuSearchAndGoLink").length > 0) {
		$("#menuSearchAndGoInput").autocomplete({
			minLength: 1,
			source: gFDCMenuSearch,
			focus: function(event, ui) {
				$("#menuSearchAndGoInput").val(ui.item.label);
				return false;
			},
			select: function(event, ui) {
				var sel = ui.item.label;
				if (ui.item.label) $("#menuSearchAndGoInput").val(ui.item.label);
				if (ui.item.nodeId) {
					if (ui.item.nodeId.match(gsDirCodeSep)) {
						$("#menuSearchAndGoLink").attr("href", gFDCUser.menuFuncButtons[ui.item.nodeId].link + "?dircode=" + ui.item.nodeId.substring(ui.item.nodeId.indexOf(gsDirCodeSep) + 2));
						document.getElementById("menuSearchAndGoLink").click();
					} else {
						$("#menuSearchAndGoLink").attr("href", gFDCUser.menuFuncButtons[ui.item.nodeId].link);
						document.getElementById("menuSearchAndGoLink").click();
					}
				}
			}
		});
		$("#menuSearchAndGoInput").Watermark(gsSearchAndGoHint);
		if (uiCommonGetMenuSearchAndGoCookie() == "on") {
			$("#btnFdcMenuSearchAndGoCheckbox").attr("checked", "checked");
			$("#btnFdcMenuSearchAndGoCheckbox").button("refresh");
		}
	}
}
/* 更新Header的使用者資訊 */
function uiCommonUpdateHeaderUserInfo() {
	var userInfo = gsHeaderUser;
	if (gFDCUser) userInfo += gFDCUser.userCounty + " " + gFDCUser.userUnit + " " + gFDCUser.name + "(" + gFDCUser.userID + ")";	
	if (gFDCUser && gDeputyFDCUser) {
		if (gFDCUser.userID != gDeputyFDCUser.userID) userInfo += "<font class='deputyUserProfile'>&nbsp;&nbsp;" + gsHeaderDeputyUser + gDeputyFDCUser.name + "(" + gDeputyFDCUser.userID + ")</font>";
	}
	$("#headerUserInfo").html(userInfo);
}
/* 更新環境資訊與位置 */
function uiCommonUpdateEnvInfo() {
	if ($("#headerEnv").length > 0 && $("#headerJkm").length > 0) {	
		if (gFDCUser.testEnv != null && gFDCUser.testEnv == true) {
			$("#headerEnv").removeClass("envFormalProfile");			
			$("#headerEnv").addClass("envTestProfile");
			$("#headerEnv").css("left", uiCommonGetViewportWidth() - $("#headerEnv").width() - 10);
			$("#headerJkm").css("left", uiCommonGetViewportWidth() - $("#headerEnv").width() - 10 - $("#headerJkm").width() - 10);			
		} else {
			$("#headerEnv").removeClass("envTestProfile");		
			$("#headerEnv").addClass("envFormalProfile");
			$("#headerJkm").css("left", uiCommonGetViewportWidth() - $("#headerJkm").width() - 10);
		}
	}
}
/* 根據使用者權限物件中的機密等級來更新頁面上的機密等級文字 */
function uiCommonUpdateConfidentialLevel(level) {
   switch (level) {
	   case "0": $('#confidentialLevel').text(gsConfidentialLevel + "：" + gsConfidentialLevelPublic); break;
	   case "1": $('#confidentialLevel').text(gsConfidentialLevel + "：" + gsConfidentialLevelGeneral); break;
	   case "2": $('#confidentialLevel').text(gsConfidentialLevel + "：" + gsConfidentialLevelSensitive); break;
	   case "3": $('#confidentialLevel').text(gsConfidentialLevel + "：" + gsConfidentialLevelConfident); break;
	   default: break;
   }
}
/* 將頁面內容全部移除 */
function uiCommonEmptyContent(msg) {
	if (gFDCDebug == false) $("body").text("");	
	if (msg) alert(msg + "\n" + gsNoAuthorityCloseWindow);
	else alert(gsNoAuthorityCloseWindow);
	if (gFDCDebug == false) window.close();
}
/* 關閉頁面 */
function uiCommonClose(page) {
	if(confirm("你正在檢視的網頁嘗試要關閉視窗。\n\n你是否要關閉此視窗?")){
	      window.open('', '_self', '');
	      window.close(page);
	} 
}
/* Ctrl+M 開啟知識管理 */
function uiCommonCompoundKeyCtrlM() {
	if (gsFuncCode) {
		$.ajax({
			url: '/' + $("meta[name='pagebase']").attr("content") + gsJkmSopPath,
			type: gsAjaxPost,
			dataType: gsAjaxJson,
			contentType: gsAjaxContentType,
			success: function(jsonResult, status){
				if (jsonResult.value) {
					window.open(jsonResult.value + gsFuncCode, "JKM_KM_" + gsFuncCode);
				}
			},
			error: function(xhrInstance, status, xhrException) {			
			}
		});
	}
}
/* Ctrl+F11 開啟電子書 */
function uiCommonCompoundKeyCtrlF11() {
	if (gsFuncCode.length == 3) return;
	var url = $("#fdcElectronicMenuDialogUrl").val();
	var paramNames = ['SYSTEMID', 'DOCNM'];
	var paramValues = [gsFuncCode.substring(0, 3).toUpperCase(), gsFuncCode.substring(3)];
	uiCommonOpenWindowWithPostParams(url, "YIM_EBOOK_" + gsFuncCode, "", paramNames, paramValues);
}
/* Ctrl+F12 顯示後端版本*/
function uiCommonCompoundKeyCtrlF12() {
	$("#fdcProgDtlDialog").dialog({ resize: function (event, ui) { uiCommonAdjustGridWidth('fdcProgDtlGrid'); } });
	var formData = {funcCd:gsFuncCode};
	uiCommonOpenDialog("fdcProgDtlDialog");
	uiCommonCreateGridfdcProgDtlGrid(formData);
}
/* 顯示程式版本資訊 */
function uiCommonShowProgDtl(jsonResult) {
	$("#fdcProgDtlDialogMsg").empty();
	if (jsonResult.data) {
		var info = "系統代號 : ";
		if (jsonResult.data.sysCd) info += (jsonResult.data.sysCd);
		else info += gsFuncCode.substring(0, 3);
		info += "&nbsp;&nbsp;&nbsp;&nbsp;功能代號 : ";
		if (jsonResult.data.funcCd) info += (jsonResult.data.funcCd);
		else info += gsFuncCode;
		info += "<br/><br/>";
		$("#fdcProgDtlDialogMsg").html(info);
	} else $("#fdcProgDtlDialogMsg").html("查無程式功能代號" + gsFuncCode + "的相關版本資訊！<br/><br/>");
	$("#fdcProgDtlDialog").parent(".ui-dialog").children(".ui-dialog-buttonpane").find(".ui-button").focus();
}
/* 更新header節氣時間*/
function uiCommonUpdateHeaderDate() {
	if (gServerDate) {
		var day = new Array("日","一","二","三","四","五","六");
		var dateStr = "民國" + (gServerDate.year - 1911) + "年" + gServerDate.month + "月" + gServerDate.date + "日 星期" + day[gServerDate.day] + " " + getLunarDateStr(new Date(gServerDate.year, gServerDate.month - 1, gServerDate.date));
		if ($("#headerToday").length > 0) $("#headerToday").text(dateStr);
	}
}
/*****[ END ] 系統頁面操控 [ END ]*****/

/*****[START] 頁頭操控 [START]*****/
/* 取得目前頁頭狀態是否為關閉 */
function uiCommonIsHeaderClosed() {
	return $("#btnHeaderIn").is(":hidden");
}
/* 自動判斷將隱藏的頁頭帶出或是將隱藏 */
function uiCommonToggleHeader() {
	($("#btnHeaderOut").is(":hidden")) ? uiCommonCloseHeader() : uiCommonOpenHeader();
}
/* 將打開的頁頭收闔 */
function uiCommonCloseHeader() {
	$("#headerBase").hide();
	if ($("#btnHeaderOut").is(":hidden")) $("#btnHeaderOut").show();
	$("#btnHeaderIn").hide();
	uiCommonSetHeaderPreferenceCookie();
	uiCommonAdjustFixedPositionAndSize();
}
/* 將收闔的頁頭打開 */
function uiCommonOpenHeader() {
	$("#headerBase").show();
	if ($("#btnHeaderIn").is(":hidden")) $("#btnHeaderIn").show();
	$("#btnHeaderOut").hide();
	uiCommonSetHeaderPreferenceCookie();
	uiCommonAdjustFixedPositionAndSize();
}
/* 將目前頁頭開關記到cookie */
function uiCommonSetHeaderPreferenceCookie() {
	var isFixed = "on";
	if ($("#btnHeaderIn").is(":hidden")) isFixed = "off";
	document.cookie = "fdcHeaderPref=" + escape(isFixed) + ";";
}
/* 取得頁面檔頭開關on/off的cookie */
function uiCommonGetHeaderPreferenceCookie() {
	if (document.cookie.length > 0) {
		var cookieList = document.cookie.toString().split("\;");
		for (var i in cookieList) {
			var cook = cookieList[i].toString().split("=");
			if (cook[0].indexOf("fdcHeaderPref") != -1) return unescape(cook[1]);
		}
	}
	return "on";
}
/*****[ END ] 頁頭操控 [ END ]*****/

/*****[START] 選單操控 [START]*****/
/* 取得目前選單狀態是否為關閉 */
function uiCommonIsMenuClosed() {
	return ($("#btnSlideIn").is(":hidden"));
}
/* 自動判斷將隱藏的選單帶出或是將選單隱藏 */
function uiCommonToggleMenu() {
	if ($("#btnSlideOut").is(":hidden")) uiCommonCloseMenu();
	else uiCommonOpenMenu();
}
/* 關閉選單 */
function uiCommonCloseMenu() {
	$("#breadCrumbFixed").attr("id", "breadCrumb");
	$("#contentBaseFixed").attr("id", "contentBase");
	$("#menuBaseFixed").hide();
	$("#btnSlideIn").hide();
	$("#btnSlideOut").show();
	if ($("#funcBtnsFixed")) $("#funcBtnsFixed").attr("id", "funcBtns");
	if ($("#msgAreaFixed")) $("#msgAreaFixed").attr("id", "msgArea");
	if ($("#menuSearchAndGo").length > 0 && $("#btnFdcMenuSearchAndGoCheckbox").is(":checked")) $("#menuSearchAndGo").hide();
 	uiCommonSetMenuPreferenceCookie();
 	uiCommonAdjustFixedPositionAndSize();
}
/* 開啟選單 */
function uiCommonOpenMenu() {
	$("#breadCrumb").attr("id", "breadCrumbFixed");
	$("#contentBase").attr("id", "contentBaseFixed");
	$("#menuBaseFixed").show();
	$("#btnSlideIn").show();
	$("#btnSlideOut").hide();
	if ($("#funcBtns")) $("#funcBtns").attr("id", "funcBtnsFixed");
	if ($("#msgArea")) $("#msgArea").attr("id", "msgAreaFixed");
	if ($("#menuSearchAndGo").length > 0 && $("#btnFdcMenuSearchAndGoCheckbox").is(":checked")) $("#menuSearchAndGo").show();
 	uiCommonSetMenuPreferenceCookie();
 	uiCommonAdjustFixedPositionAndSize();
}
/* 將目前選單開關記到cookie */
function uiCommonSetMenuPreferenceCookie() {
	var isFixed = "on";
	if ($("#btnSlideIn").is(":hidden")) isFixed = "off";
	document.cookie = "fdcMenuPref=" + escape(isFixed) + ";";
}
/* 取得選單開關on/off的cookie */
function uiCommonGetMenuPreferenceCookie() {
	if (document.cookie.length > 0) {
		var cookieList = document.cookie.toString().split("\;");
		for (var i in cookieList) {
			var cook = cookieList[i].toString().split("=");
			if (cook[0].indexOf("fdcMenuPref") != -1) return unescape(cook[1]);
		}
	}
	return "on";
}
/* 開啟樹狀選單的root */
function uiCommonOpenMenuTreeRoot() {
	var submenu = $("#fdcMenu").children("li")[0];
	submenu = $(submenu).children("ul")[0];
	$(submenu).attr("rel", "open");
	$(submenu).parent().removeClass("closed");	
	$(submenu).parent().addClass("open");
	$(submenu).css("display", "block");
};
/* 開啟樹狀選單的指定節點 */
function uiCommonOpenMenuTreeNode(nodeid) {	
	var submenu;
	if (nodeid.indexOf("fdcMenuItem") == -1) nodeid = "fdcMenuItem" + nodeid;
	if ($("#" + nodeid).length > 0) {
		submenu = $("#" + nodeid).children("ul")[0];
		if (submenu) ddtreemenu.expandSubTree("fdcMenu", submenu);
		else ddtreemenu.expandSubTree("fdcMenu", $("#" + nodeid).parent()); 
	}
};
/* 關閉樹狀選單的指定節點 */
function uiCommonCloseMenuTreeNode(nodeid) {	
	var submenu;
	if ($("#fdcMenuItem" + nodeid).length > 0) submenu = $("#fdcMenuItem" + nodeid).children("ul")[0];
	if (submenu) {
		$(submenu).attr("rel", "closed");
		$(submenu).parent().removeClass("open");	
		$(submenu).parent().addClass("closed");
		$(submenu).css("display", "none");
	}
};
/* 將目前選單開新視窗或在原視窗開啟記到cookie */
function uiCommonSetMenuLinkBehaviorCookie() {
	var target = "_self";
	if ($("#btnFdcMenuOpenLinkBlankCheckbox").is(":checked")) target = "_blank";
	document.cookie = "fdcMenuLinkBehavior=" + escape(target) + ";";
}
/* 取得選單開新視窗或在原視窗開啟的cookie */
function uiCommonGetMenuLinkBehaviorCookie() {
	if (document.cookie.length > 0) {
		var cookieList = document.cookie.toString().split("\;");
		for (var i in cookieList) {
			var cook = cookieList[i].toString().split("=");
			if (cook[0].indexOf("fdcMenuLinkBehavior") != -1) return unescape(cook[1]);
		}
	}
	return "_self";
}
/* 將選單快速搜尋是否顯示記到cookie */
function uiCommonSetMenuSearchAndGoCookie() {
	var display = "off";
	if ($("#btnFdcMenuSearchAndGoCheckbox").length > 0 && $("#btnFdcMenuSearchAndGoCheckbox").is(":checked")) display = "on";
	document.cookie = "fdcMenuSearchAndGo=" + escape(display) + ";";
}
/* 取得選單快速搜尋是否顯示的cookie */
function uiCommonGetMenuSearchAndGoCookie() {
	if (document.cookie.length > 0) {
		var cookieList = document.cookie.toString().split("\;");
		for (var i in cookieList) {
			var cook = cookieList[i].toString().split("=");
			if (cook[0].indexOf("fdcMenuSearchAndGo") != -1) return unescape(cook[1]);
		}
	}
	return "off";
}
/*****[ END ] 選單操控 [ END ]*****/

/*****[START] 功能按鈕權限操控 [START]*****/
/* 根據傳入的程式功能代號(ex.APP001W)來查詢使用者權限物件的功能按鈕清單 */
function uiCommonFindProgramAuthority() {
	if (gFDCUser && gsFuncCodeKey) return gFDCUser.menuFuncButtons[gsFuncCodeKey].enables;
	return null;
}
/* 將頁面上的功能按鈕套用使用者權限, 如果沒有傳入功能權限則會去找頁面上一開始載入時的功能權限, 如果也沒有的話就會把所有功能按鈕全部設為不能選按, 而如果有的話則會依使用者權限把該使用者不能按的功能按鈕設為不能選按, 但需注意若是使用者可以按的功能按鈕則不會將其設為可以選按, 因為這個是根據各個應用程式狀態由應用程式去決定的 */
function uiCommonApplyFunctionButtonAuthority(funcBtnAuthority) {
	if (!(funcBtnAuthority)) {
		funcBtnAuthority = uiCommonFindProgramAuthority();
		if (!(funcBtnAuthority)) {
			for (var i=1; i<11; i++) {
				var buttonId = "#btnF" + i;
				if ($(buttonId) && ($(buttonId).is(":enabled"))) $(buttonId).attr("disabled", "disabled");
			}
			return;
		}
	}
	for (var j=0; j<funcBtnAuthority.length; j++) {
		var btnId = "#btnF" + (j + 1);
		if ($(btnId) && ($(btnId).is(":enabled")))
			if (funcBtnAuthority[j] == false) $(btnId).attr("disabled", "disabled");
	}
}
/* 這個是用來檢查使用者是否有權限操作這個功能按鈕傳入的參數是從1開始的功能按鈕編號(ex. F1的話就傳1, F2的話就傳2)*/
function uiCommonCheckFunctionButtonAuthority(fnNo) {
	var btnId = "#btnF" + fnNo;	
	var btnEnables = uiCommonFindProgramAuthority();
	if ($(btnId) && (btnEnables) && (btnEnables[(fnNo - 1)] == true)) return true;
	return false;
}
/* 依據傳入的功能按鈕編號(1~10)將對應的功能按鈕設為可按，會先檢查使用者有無此按鈕權限，有權限才會設成可按 */
function uiCommonEnableFuncBtn(fnNo) {
	if (fnNo && (uiCommonCheckFunctionButtonAuthority(fnNo) == true)) $("#btnF" + fnNo).removeAttr("disabled");
}
/* 依據傳入的功能按鈕編號(1~10)將對應的功能按鈕設為不可按 */
function uiCommonDisableFuncBtn(fnNo) {
	if (fnNo) $("#btnF" + fnNo).attr("disabled", "disabled");
}
/*****[ END ] 功能按鈕權限操控 [ END ]*****/

/*****[START] 地址元件操控(配合<cui:address>使用) [START]*****/
/* 連續清除縣市、鄉鎮市區或村里下拉式選單內容，
 * cleanAddrFrom:1 代表保留並重設縣市清單選取、清除鄉鎮市區與村里清單 
 * cleanAddrFrom:2 代表保留縣市清單選取項目、清除鄉鎮市區與村里清單
 * cleanAddrFrom:3 代表保留縣市與鄉鎮市區清單選取項目、清除村里清單*/
function uiCommonAddrListClean(idSuffix, cleanAddrFrom) {
	if (cleanAddrFrom) {
		switch (cleanAddrFrom) {
		case giAddrHsn:
			$('#hsnCd' + idSuffix).val('');			
			$('#hsnNm' + idSuffix).val('');
			$('#hsnNm' + idSuffix + 'Hidden').val('');
		case giAddrTown:
			$('#zipCd' + idSuffix).val('');
			$('#zipCd' + idSuffix + 'Hidden').empty();
			$('#townCd' + idSuffix).val('');
			$('#townNm' + idSuffix).empty();
			$('#townNm' + idSuffix + 'Hidden').empty();
		case giAddrVill:
			$('#villCd' + idSuffix).val('');
			$('#villNm' + idSuffix).empty();
			$('#villNm' + idSuffix + 'Hidden').empty();
		default:
			break;
		}
	}
}
/* 滑鼠點選或鍵盤選取改變地址元件的下拉選單的選取項目時使用 */
function uiCommonAddrListChangeHandler(idSuffix, isFirstItemEmpty, target) {
	if (!(idSuffix)) idSuffix = '';
	switch(target) {
	case giAddrHsn:
		$('#hsnNm' + idSuffix + 'Hidden')[0].selectedIndex = $('#hsnNm' + idSuffix).attr("selectedIndex");	
		$('#hsnCd' + idSuffix).val($('#hsnNm' + idSuffix + 'Hidden').val());	
		uiCommonAddrListClean(idSuffix, giAddrTown);
		uiCommonComposeAddrListData(idSuffix, isFirstItemEmpty, giAddrTown);
		break;
	case giAddrTown:
		$('#townNm' + idSuffix + 'Hidden')[0].selectedIndex = $('#townNm' + idSuffix).attr("selectedIndex");
		$('#townCd' + idSuffix).val($('#townNm' + idSuffix + 'Hidden').val());
		if ($('#townNm' + idSuffix + 'Hidden').val()) {
			$('#zipCd' + idSuffix + 'Hidden').val($('#townNm' + idSuffix + 'Hidden').val());
			$('#zipCd' + idSuffix).val($('#zipCd' + idSuffix + 'Hidden option:selected').text());
		} else {
			$('#zipCd' + idSuffix + 'Hidden').val('');
			$('#zipCd' + idSuffix).val('');
		}
		uiCommonAddrListClean(idSuffix, giAddrVill);
		uiCommonComposeAddrListData(idSuffix, isFirstItemEmpty, giAddrVill);
		break;
	case giAddrVill:
		$('#villNm' + idSuffix + 'Hidden')[0].selectedIndex = $('#villNm' + idSuffix).attr("selectedIndex");
		$('#villCd' + idSuffix).val($('#villNm' + idSuffix + 'Hidden').val());
		break;
	default:
		break;
	}
}
/* 將取回來的地址清單資料帶入指定的地址下拉選單中 */
function uiCommonComposeAddrListData(idSuffix, isFirstItemEmpty, target) {
	switch (target) {
	case giAddrHsn:
		if (gAddrHsnData && (gAddrHsnData.length > 0)) {
			$('#hsnNm' + idSuffix).empty();
			$('#hsnNm' + idSuffix + 'Hidden').empty();
			if (isFirstItemEmpty) {
				$('#hsnNm' + idSuffix).append("<option value='' selected='selected'>" + gsPleaseSelect + "</option>");
				$('#hsnNm' + idSuffix + 'Hidden').append("<option value='' selected='selected'>" + gsPleaseSelect + "</option>");
				for (var i in gAddrHsnData) {
					$('#hsnNm' + idSuffix).append("<option value='" + gAddrHsnData[i].hsnNm + "'>" + gAddrHsnData[i].hsnNm + "</option>");
					$('#hsnNm' + idSuffix + 'Hidden').append("<option value='" + gAddrHsnData[i].hsnCd + "'>" + gAddrHsnData[i].hsnNm + "</option>");
				}
			} else {
				for (var j in gAddrHsnData) {
					if (j == 0) {
						$('#hsnNm' + idSuffix).append("<option value='" + gAddrHsnData[j].hsnNm + "' selected='selected'>" + gAddrHsnData[j].hsnNm + "</option>");
						$('#hsnNm' + idSuffix + 'Hidden').append("<option value='" + gAddrHsnData[j].hsnCd + "' selected='selected'>" + gAddrHsnData[j].hsnNm + "</option>");
					} else {
						$('#hsnNm' + idSuffix).append("<option value='" + gAddrHsnData[j].hsnNm + "'>" + gAddrHsnData[j].hsnNm + "</option>");
						$('#hsnNm' + idSuffix + 'Hidden').append("<option value='" + gAddrHsnData[j].hsnCd + "'>" + gAddrHsnData[j].hsnNm + "</option>");
					}
				}
			}
		} else {
			$('#hsnNm' + idSuffix).empty();
			$('#hsnNm' + idSuffix + 'Hidden').empty();
		}
		return;
	case giAddrTown:
		var townKey = $('#hsnCd' + idSuffix).val();
		var townList = gAddrTownData[townKey]; 
		if (townList && (townList.length > 0)) {
			$('#townNm' + idSuffix).empty();
			$('#townNm' + idSuffix + 'Hidden').empty();
			$('#zipCd' + idSuffix + 'Hidden').empty();
			if (isFirstItemEmpty) {
				$('#townNm' + idSuffix).append("<option value='' selected='selected'>" + gsPleaseSelect + "</option>");
				$('#townNm' + idSuffix + 'Hidden').append("<option value='' selected='selected'>" + gsPleaseSelect + "</option>");
				$('#zipCd' + idSuffix + 'Hidden').append("<option value='' selected='selected'>" + gsPleaseSelect + "</option>");
				for (var i in townList) {
					$('#townNm' + idSuffix).append("<option value='" + townList[i].townNm + "'>" + townList[i].townNm + "</option>");
					$('#townNm' + idSuffix + 'Hidden').append("<option value='" + townList[i].townCd + "'>" + townList[i].townNm + "</option>");
					$('#zipCd' + idSuffix + 'Hidden').append("<option value='" + townList[i].townCd + "'>" + townList[i].zipCd + "</option>");
				}
			} else {
				for (var j in townList) {
					if (j == 0) {
						$('#townNm' + idSuffix).append("<option value='" + townList[j].townNm + "' selected='selected'>" + townList[j].townNm + "</option>");
						$('#townNm' + idSuffix + 'Hidden').append("<option value='" + townList[j].townCd + "' selected='selected'>" + townList[j].townNm + "</option>");
						$('#zipCd' + idSuffix + 'Hidden').append("<option value='" + townList[j].townCd + "' selected='selected'>" + townList[j].zipCd + "</option>");
					} else {
						$('#townNm' + idSuffix).append("<option value='" + townList[j].townNm + "'>" + townList[j].townNm + "</option>");
						$('#townNm' + idSuffix + 'Hidden').append("<option value='" + townList[j].townCd + "'>" + townList[j].townNm + "</option>");
						$('#zipCd' + idSuffix + 'Hidden').append("<option value='" + townList[j].townCd + "'>" + townList[j].zipCd + "</option>");
					}
				}
			}
		}
		return;
	case giAddrVill:
		var villKey = $('#hsnCd' + idSuffix).val() + $('#townCd' + idSuffix).val();
		var villList = gAddrVillData[villKey]; 
		if (villList && (villList.length > 0)) {
			$('#villNm' + idSuffix).empty();
			$('#villNm' + idSuffix + 'Hidden').empty();
			if (isFirstItemEmpty) {
				$('#villNm' + idSuffix).append("<option value='' selected='selected'>" + gsPleaseSelect + "</option>");
				$('#villNm' + idSuffix + 'Hidden').append("<option value='' selected='selected'>" + gsPleaseSelect + "</option>");
				for (var i in villList) {
					$('#villNm' + idSuffix).append("<option value='" + villList[i].villNm + "'>" + villList[i].villNm + "</option>");
					$('#villNm' + idSuffix + 'Hidden').append("<option value='" + villList[i].villCd + "'>" + villList[i].villNm + "</option>");
				}
			} else {
				for (var j in villList) {
					if (j == 0) {
						$('#villNm' + idSuffix).append("<option value='" + villList[j].villNm + "' selected='selected'>" + villList[j].villNm + "</option>");
						$('#villNm' + idSuffix + 'Hidden').append("<option value='" + villList[j].villCd + "' selected='selected'>" + villList[j].villNm + "</option>");
					} else {
						$('#villNm' + idSuffix).append("<option value='" + villList[j].villNm + "'>" + villList[j].villNm + "</option>");
						$('#villNm' + idSuffix + 'Hidden').append("<option value='" + villList[j].villCd + "'>" + villList[j].villNm + "</option>");
					}
				}
			}
		}
		return;
	default:
		return;
	}
}
/* 繫結畫面上地址元件的事件處理 */
function uiCommonBindAddressEvent(suffix, confirmCodeInputError) {
	var zipCd = "#zipCd" + suffix;
	var hsnCd = "#hsnCd" + suffix;
	var hsnNm = "#hsnNm" + suffix;
	var townCd = "#townCd" + suffix;
	var townNm = "#townNm" + suffix;
	var villCd = "#villCd" + suffix;
	var villNm = "#villNm" + suffix;
	var zipCdHidden = zipCd + "Hidden";
	var hsnNmHidden = hsnNm + "Hidden";
	var townNmHidden = townNm + "Hidden";
	var villNmHidden = villNm + "Hidden";
	$(hsnCd).keyup(function(keyevent) {
        if(uiCommonIsModifyKey(keyevent.keyCode) == true) {
            $(hsnCd).val($(hsnCd).val().toUpperCase());
            if($(hsnNmHidden + ' option[value=' + $(hsnCd).val() + ']').length > 0) {
                $(hsnNmHidden).val($(hsnCd).val());
                $(hsnNm).val('');
                $(hsnNm).val($(hsnNmHidden + ' option:selected').text());
                uiCommonAddrListChangeHandler(suffix, true, giAddrHsn);
            } else {
                $(hsnNmHidden).val('');
                $(hsnNm).val('');
            }
        }
    });
    $(hsnCd).blur(function() {
        $(hsnCd).val($(hsnCd).val().toUpperCase());
        if($(hsnNmHidden + ' option[value=' + $(hsnCd).val() + ']').length > 0) {
            $(hsnNmHidden).val($(hsnCd).val());
            $(hsnNm).val('');
            $(hsnNm).val($(hsnNmHidden + ' option:selected').text());
            uiCommonAddrListChangeHandler(suffix, true, giAddrHsn);
        } else {
        	var clean = false;
        	if (confirmCodeInputError) {
	        	if ($(townCd).val() && $(villCd).val()) clean = confirm('輸入的地址「縣市代碼」不存在，請重新輸入！\n是否清除連動的地址「鄉鎮市區」與「村里」欄位？');
	        	else alert('輸入的地址「縣市代碼」不存在，請重新輸入！');
        	} else {
        		clean = true;
        	}
            $(hsnCd).val('');
        	$(hsnNmHidden).val('');
            $(hsnNm).val('');
            if (clean) uiCommonAddrListChangeHandler(suffix, true, giAddrHsn);
            
        }
    });
    $(hsnNm).change(function() {
        uiCommonAddrListChangeHandler(suffix, true, giAddrHsn);
    }).keyup(function() {
        uiCommonAddrListChangeHandler(suffix, true, giAddrHsn);
    });
    $(townCd).keyup(function(keyevent) {
        if(uiCommonIsModifyKey(keyevent.keyCode) == true) {
            $(townCd).val($(townCd).val().toUpperCase());
            if($(townNmHidden + ' option[value=' + $(townCd).val() + ']').length > 0) {
                $(townNmHidden).val($(townCd).val());
                $(townNm).val('');
                $(townNm).val($(townNmHidden + ' option:selected').text());
                uiCommonAddrListChangeHandler(suffix, true, giAddrTown);
            } else {
                $(townNmHidden).val('');
                $(townNm).val('');
            }
        }
    });
    $(townCd).blur(function() {
        $(townCd).val($(townCd).val().toUpperCase());
        if($(townNmHidden + ' option[value=' + $(townCd).val() + ']').length > 0) {
            $(townNmHidden).val($(townCd).val());
            $(townNm).val('');
            $(townNm).val($(townNmHidden + ' option:selected').text());
            uiCommonAddrListChangeHandler(suffix, true, giAddrTown);
        } else {
        	var clean = false;
        	if (confirmCodeInputError) {
	        	if ($(villCd).val()) clean = confirm('輸入的地址「鄉鎮市區代碼」不存在，請重新輸入！\n是否清除連動的地址「村里」欄位？');
	        	else alert('輸入的地址「鄉鎮市區代碼」不存在，請重新輸入！');
        	} else {
        		clean = true;
        	}
            $(townCd).val('');
            $(townNmHidden).val('');
            $(townNm).val('');
            if (clean) uiCommonAddrListChangeHandler(suffix, true, giAddrTown);
            else {
            	$(zipCdHidden).val('');
            	$(zipCd).val('');
            }
        }
    });
    
    $(townNm).change(function() {
        uiCommonAddrListChangeHandler(suffix, true, giAddrTown);
    }).keyup(function() {
        uiCommonAddrListChangeHandler(suffix, true, giAddrTown);
    });
    $(villCd).keyup(function(keyevent) {
        if(uiCommonIsModifyKey(keyevent.keyCode) == true) {
            $(villCd).val($(villCd).val().toUpperCase());
            if($(villNmHidden + ' option[value=' + $(villCd).val() + ']').length > 0) {            	
                $(villNmHidden).val($(villCd).val());
                $(villNm).val('');
                $(villNm).val($(villNmHidden + ' option:selected').text());
                uiCommonAddrListChangeHandler(suffix, true, giAddrVill);
            } else {
            	$(villNmHidden).val('');
            	$(villNm).val('');
            }
        }
    });
    $(villCd).blur(function() {
        $(villCd).val($(villCd).val().toUpperCase());
        if($(villNmHidden + ' option[value=' + $(villCd).val() + ']').length > 0) {
            $(villNmHidden).val($(villCd).val());
            $(villNm).val('');
            $(villNm).val($(villNmHidden + ' option:selected').text());
            uiCommonAddrListChangeHandler(suffix, true, giAddrVill);
        } else {
        	if (confirmCodeInputError) {
        		alert('輸入的地址「村里代碼」不存在，請重新輸入！');
        	}
        	$(villCd).val('');
        	$(villNmHidden).val('');
            $(villNm).val('');
            uiCommonAddrListChangeHandler(suffix, true, giAddrVill);
        }
    });
    $(villNm).change(function() {
        uiCommonAddrListChangeHandler(suffix, true, giAddrVill);
    }).keyup(function() {
        uiCommonAddrListChangeHandler(suffix, true, giAddrVill);
    });
    if ($(hsnCd).parents('form:first').length > 0) {
        $(hsnCd).parents('form:first').bind('reset', function() {
            $(zipCdHidden).empty();
            $(townNm).empty();
            $(townNmHidden).empty();
            $(villNm).empty();
            $(villNmHidden).empty();
        });
    }
}
/* 更改地址鄰欄位的處理方式，當地址的鄰的資料有"鄰"文字時，會傳入hideLinText=true的參數
 * 會更改鄰的顯示方式，將鄰欄位後方的鄰文字移除，並將鄰輸入欄位擴欄與自動在blur時補"鄰"文字，
 * 反之則還原地址鄰欄位為原本的處理方式 */
function uiCommonChangeAddressLinBehavior(idSuffix, hideLinText) {
	if (hideLinText) {
		$("#linTextSpan" + idSuffix).html("&nbsp;");
		$('#lin' + idSuffix).attr("maxlength", "6");
		$('#lin' + idSuffix).css("width", "65px");
		$('#lin' + idSuffix).blur(function() {
			var linVal = $('#lin' + idSuffix).val();
			if (linVal && (linVal.indexOf('鄰') < 0)) {
				if (linVal.length > 5) {
					if (confirm("鄰欄位長度過長，無法補鄰，是否自動調整至合適長度再補上鄰文字？")) {
						$('#lin' + idSuffix).val(linVal.substring(0, 5) + '鄰');
					}
				} else {
					$('#lin' + idSuffix).val(linVal + '鄰');
				}
			}
		});
	} else {
		$("#linTextSpan" + idSuffix).html("(鄰)&nbsp;");
		$('#lin' + idSuffix).attr("maxlength", "5");
		$('#lin' + idSuffix).css("width", "40px");
		$('#lin' + idSuffix).unbind("blur");
	}
}
/* 傳入地址資料更新到頁面上的地址元件 */
function uiCommonUpdateAddress(idSuffix, isFirstItemEmpty, hsnNm, townNm, villNm, lin, road) {
	if (!(idSuffix)) idSuffix = '';
	if (lin) {
		var linTxtPos = lin.indexOf('鄰');
		if (linTxtPos >= 0) {
			if (($("#linTextSpan" + idSuffix).length > 0) && ($("#linTextSpan" + idSuffix).attr("title") == "dynamic")) {
				uiCommonChangeAddressLinBehavior(idSuffix, true);
			} else {
				lin = lin.substr(0, linTxtPos);
			}
		} else {
			if (($("#linTextSpan" + idSuffix).length > 0) && ($("#linTextSpan" + idSuffix).attr("title") == "dynamic")) {
				uiCommonChangeAddressLinBehavior(idSuffix, false);
			}
		}
		$('#lin' + idSuffix).val(lin);
		if ($('#lin' + idSuffix).attr("onblur")) {
			$('#lin' + idSuffix).val(uiCommonHalfToFull($('#lin' + idSuffix).val()));
		}
	}
	if (road) {
		$('#road' + idSuffix).val(road);
		if ($('#road' + idSuffix).attr("onblur")) {
			$('#road' + idSuffix).val(uiCommonHalfToFull($('#road' + idSuffix).val()));
		}
	}
	var isErrBefore = false;
	//重設縣市選取項目與清除鄉鎮市區與村里清單
	uiCommonAddrListClean(idSuffix, 1);
	if (hsnNm) {
		$('#hsnNm' + idSuffix).val(hsnNm);
		$('#hsnNm' + idSuffix + 'Hidden')[0].selectedIndex = $('#hsnNm' + idSuffix).attr("selectedIndex");	
		$('#hsnCd' + idSuffix).val($('#hsnNm' + idSuffix + 'Hidden').val());
		if ($('#hsnNm' + idSuffix).val() != hsnNm) {
			var road = hsnNm;
			if (townNm) road += townNm;
			if (villNm) road += villNm;
			road += $('#road' + idSuffix).val();
			$('#road' + idSuffix).val(road);
			isErrBefore = true;
		}
	}
	uiCommonComposeAddrListData(idSuffix, isFirstItemEmpty, giAddrTown);
	if (townNm) {
		$('#townNm' + idSuffix).val(townNm);
		$('#townNm' + idSuffix + 'Hidden')[0].selectedIndex = $('#townNm' + idSuffix).attr("selectedIndex");	
		$('#townCd' + idSuffix).val($('#townNm' + idSuffix + 'Hidden').val());
		if ($('#townNm' + idSuffix).val() != townNm) {
			if (townNm.length == 2) {
				$('#townNm' + idSuffix).val(townNm.charAt(0) + "　" + townNm.charAt(1));
				$('#townNm' + idSuffix + 'Hidden')[0].selectedIndex = $('#townNm' + idSuffix).attr("selectedIndex");	
				$('#townCd' + idSuffix).val($('#townNm' + idSuffix + 'Hidden').val());
				if ($('#townNm' + idSuffix).val() != townNm.charAt(0) + "　" + townNm.charAt(1)) {
					if (!isErrBefore) {
						var road = townNm;
						if (villNm) road += villNm;
						road += $('#road' + idSuffix).val();
						$('#road' + idSuffix).val(road);
						isErrBefore = true;
					}
				}
			} else {
				if (!isErrBefore) {
					var road = townNm;
					if (villNm) road += villNm;
					road += $('#road' + idSuffix).val();
					$('#road' + idSuffix).val(road);
					isErrBefore = true;
				}
			}
		}
		$('#zipCd' + idSuffix + 'Hidden').val($('#townNm' + idSuffix + 'Hidden').val());	
		$('#zipCd' + idSuffix).val($('#zipCd' + idSuffix + 'Hidden option:selected').text());
	}
	uiCommonComposeAddrListData(idSuffix, isFirstItemEmpty, giAddrVill);
	if (villNm) {
		$('#villNm' + idSuffix).val(villNm);
		$('#villNm' + idSuffix + 'Hidden')[0].selectedIndex = $('#villNm' + idSuffix).attr("selectedIndex");
		$('#villCd' + idSuffix).val($('#villNm' + idSuffix + 'Hidden').val()); 
		if ($('#villNm' + idSuffix).val() != villNm) {
			if (!isErrBefore) {
				$('#road' + idSuffix).val(villNm + $('#road' + idSuffix).val());
			}
		}
	}
}
/* 傳入地址代碼資料更新到頁面上的地址元件 */
function uiCommonUpdateAddressByCd(idSuffix, isFirstItemEmpty, hsnCd, townCd, villCd, lin, road) {
	if (!(idSuffix)) idSuffix = '';	
	if (lin) {
		var linTxtPos = lin.indexOf('鄰');
		if (linTxtPos >= 0) {
			if (($("#linTextSpan" + idSuffix).length > 0) && ($("#linTextSpan" + idSuffix).attr("title") == "dynamic")) {
				uiCommonChangeAddressLinBehavior(idSuffix, true);
			} else {
				lin = lin.substr(0, linTxtPos);
			}
		} else {
			if (($("#linTextSpan" + idSuffix).length > 0) && ($("#linTextSpan" + idSuffix).attr("title") == "dynamic")) {
				uiCommonChangeAddressLinBehavior(idSuffix, false);
			}
		}
		$('#lin' + idSuffix).val(lin);
		if ($('#lin' + idSuffix).attr("onblur")) {
			$('#lin' + idSuffix).val(uiCommonHalfToFull($('#lin' + idSuffix).val()));
		}
	}
	if (road) {
		$('#road' + idSuffix).val(road);
		if ($('#road' + idSuffix).attr("onblur")) {
			$('#road' + idSuffix).val(uiCommonHalfToFull($('#road' + idSuffix).val()));
		}
	}
	//重設縣市選取項目與清除鄉鎮市區與村里清單
	uiCommonAddrListClean(idSuffix, 1);
	if (hsnCd) {
		$('#hsnCd' + idSuffix).val(hsnCd);
		if ($('#hsnNm' + idSuffix + 'Hidden option[value=' + hsnCd + ']').length > 0) {
			$('#hsnNm' + idSuffix + 'Hidden').val(hsnCd);
			$('#hsnNm' + idSuffix).val($('#hsnNm' + idSuffix + 'Hidden option:selected').text());			
		}
	}
	uiCommonComposeAddrListData(idSuffix, isFirstItemEmpty, giAddrTown);
	if (townCd) {
		$('#townCd' + idSuffix).val(townCd);
		if ($('#townNm' + idSuffix + 'Hidden option[value=' + townCd + ']').length > 0) {
			$('#townNm' + idSuffix + 'Hidden').val(townCd);
			$('#townNm' + idSuffix).val($('#townNm' + idSuffix + 'Hidden option:selected').text());
			$('#zipCd' + idSuffix + 'Hidden').val($('#townNm' + idSuffix + 'Hidden').val());
			$('#zipCd' + idSuffix).val($('#zipCd' + idSuffix + 'Hidden option:selected').text());
		}
	}	
	uiCommonComposeAddrListData(idSuffix, isFirstItemEmpty, giAddrVill);
	if (villCd) {
		$('#villCd' + idSuffix).val(villCd);
		if ($('#villNm' + idSuffix + 'Hidden option[value=' + villCd + ']').length > 0) {
			$('#villNm' + idSuffix + 'Hidden').val(villCd);
			$('#villNm' + idSuffix).val($('#villNm' + idSuffix + 'Hidden option:selected').text());
		}
	}
}
/* 一次載入所有地址資料 */
function uiCommonLoadAllAddressData(isFirstItemEmpty) {
	if ((gAddrHsnData.length > 0) || (gAddrTownData.length > 0) || (gAddrVillData.length > 0)) {
		var addressHidden = $("input:hidden[class=addressHidden]");
		for (var i=0; i<addressHidden.length; i++) uiCommonComposeAddrListData($(addressHidden[i]).val(), isFirstItemEmpty, giAddrHsn);
		if (window.loadAddressDataCallback) loadAddressDataCallback();
		return;
	}
	uiCommonBlockUI();
	$.ajax({
		url: '/' + gsPageBase + gsLoadAddressPath,
		type: gsAjaxPost,
		dataType: gsAjaxJson,
		contentType: gsAjaxContentType,
		success: function(jsonResult, status) {
			gAddrHsnData = jsonResult.hsnList;
			for (var i in jsonResult.townList) {
				var obj = jsonResult.townList[i];
				if (gAddrTownData[obj.hsnCd]) gAddrTownData[obj.hsnCd].push(obj);
				else gAddrTownData[obj.hsnCd] = new Array(obj);
			}			
			for (var j in jsonResult.villList) {
				var obj = jsonResult.villList[j];
				if (gAddrVillData[obj.hsnCd+obj.townCd]) gAddrVillData[obj.hsnCd+obj.townCd].push(obj);
				else gAddrVillData[obj.hsnCd+obj.townCd] = new Array(obj);
			}
			var addressHidden = $("input:hidden[class=addressHidden]");
			for (var k=0; k<addressHidden.length; k++) uiCommonComposeAddrListData($(addressHidden[k]).val(), isFirstItemEmpty, giAddrHsn);			
			if (gWiredAjaxAutoBlockUI == false) uiCommonUnblockUI(); //若使用者未繫結ajax事件到block ui上時才需手動unblock ui
			if (window.loadAddressDataCallback) loadAddressDataCallback();
		},
		error: function(xhrInstance, status, xhrException) {
			alert(gsLoadAddressError);
			if (gWiredAjaxAutoBlockUI == false) uiCommonUnblockUI(); //若使用者未繫結ajax事件到block ui上時才需手動unblock ui
		}
	});
}
/*****[ END ] 地址元件操控(配合<cui:address>使用) [ END ]*****/

/*****[START] 日曆操控(配合<cui:datetime>使用) [START] *****/
/* 依據日曆元件輸入的日期字元與位置來更新輸入框的值，只適用日期格式為yyy/MM/dd的民國年格式，輸入991會自動變成099/1 */
function uiCommonDatetimeRocInputCheck(datetimeid) {
	if (!(datetimeid)) return;
	datetimeid = "#" + datetimeid;
	var endPos = $(datetimeid).caret().end;
	var input = $(datetimeid).val();
	
	switch (endPos) {
		case 1: if (input && (input.length == endPos)) { $(datetimeid).val(input.charAt(0)); } break;
		case 2: if (input && (input.length == endPos)) { $(datetimeid).val(input.slice(0, 2)); } break;
		case 3:
			var year = input.slice(0, 3);
			if (year > 189) $(datetimeid).val('0' + year.slice(0, 2) + '/' + year.charAt(2));
			break;
		case 4:
			var year = input.slice(0, 3);
			if (year > 189) $(datetimeid).val('0' + year.slice(0, 2) + '/' + year.charAt(2));
			else if (input.charAt(3) != '/') $(datetimeid).val(year + '/' + input.charAt(3));
			break;
		case 6:
			var month = parseInt(input.slice(4, 6), '10');
			if (month > 12) $(datetimeid).val(input.slice(0, 4) + '0' + input.charAt(4));
			else if (month == 0) $(datetimeid).val(input.slice(0, 5));
			break;
		case 7: if (input.charAt(6) != '/') $(datetimeid).val(input.slice(0, 6) + '/' + input.charAt(6)); break;
		case 9:
			var year = parseInt(input.slice(0, 3), '10') + 1911;
			var month = parseInt(input.slice(4, 6), '10');
			var day = input.slice(7, 9);
			var days = uiCommonGetMonthDays(month, year);
			if (day > days) $(datetimeid).val(input.slice(0, 8));
			break;
		default:
			break;
	}
}
/* 依據傳入的月份與年份判斷當月份有幾天後回傳當月份有幾天 */
function uiCommonGetMonthDays(month, year) {
	if (!(month)) return 0;
	month = parseInt(month, '10');
	switch (month) {
		case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
		case 2:
			if (!(year)) return 28;
			year = parseInt(year, '10');
			if ((year % 4) == 0) return 29;
			else return 28;
		default: return 30;
	}
}
/*****[ END ] 日曆操控(配合<cui:datetime>使用) [ END ] *****/

/*****[START] 對話框操控(配合<cui:dialog>使用) [START] *****/
/* 依據傳入的對話框id與來開啟對話框，可額外傳入對話框的標題更新 */
function uiCommonOpenDialog(dialogid, dialogtitle) {
	if (dialogid) {
		if (dialogtitle) $("#ui-dialog-title-" + dialogid).text(dialogtitle);
		$("#" + dialogid).dialog("open");
	}
}
/* 依據傳入的對話框id與是否重設對話框裡面的表單來關閉對話框 */
function uiCommonCloseDialog(dialogid, resetformbeforeclose) {
	if (dialogid) {
		if (resetformbeforeclose == true) {
			var formid = $("#" + dialogid).children("form").attr("id");
			uiCommonResetForm(formid);
		}
		$("#" + dialogid).dialog("close");
	}
}
/*****[ END ] 對話框操控(配合<cui:dialog>使用) [ END ] *****/

/*****[START] 動態表格操控(配合<cui:grid>使用) [START] *****/
/* 因jqGrid在重新載入grid的時候是以第一次建立grid時所傳送的表單裡面的功能按鈕代號fn下去撈資料的，因此如果在新增、修改、刪除後要重新載入grid，原本傳送的fn就須改回網頁上正確的fn之後才能去reload，這個函數就是幫各位做這件事情 */
function uiCommonReloadGrid(gridid) {
	//因jqGrid在載入grid的時候是以第一次建立時預設的fn下去撈資料的
	//因此這裡fn須改回網頁上正確的fn之後再去reload
	if (gridid && ($("#" + gridid).length > 0)) {		
		var originalQueryCondition = $("#" + gridid).getGridParam('postData');
		var newQueryCondition = originalQueryCondition;
		if (originalQueryCondition) {
			if ($("#fn").length > 0) newQueryCondition.fn = $("#fn").val();
			$("#" + gridid).setGridParam('postData', newQueryCondition);
		}
		$("#" + gridid).trigger("reloadGrid");
	}
}
/* 清除grid表格的資料 */
function uiCommonClearGridData(gridid, clearfooter) {
	if (gridid && ($("#" + gridid).length > 0)) {
		if (clearfooter) $("#" + gridid).jqGrid("clearGridData", clearfooter);
		else $("#" + gridid).jqGrid("clearGridData");
	}
}
/* 調整grid表格寬度 */
function uiCommonAdjustGridWidth(gridid) {
	if (gridid && ($("#" + gridid).length > 0)) {
		if (($("#" + gridid + "Wrapper").length > 0) && $("#" + gridid + "Wrapper").is(":visible"))
			$("#" + gridid).setGridWidth($("#" + gridid + "Wrapper").width()-10);
	}
}
/* 將grid整個給unload移除 */
function uiCommonUnloadGrid(gridid) {
	if (gridid && ($("#" + gridid).length > 0)) $("#" + gridid).jqGrid("GridUnload");
}
/* 將顯示的grid給隱藏 */
function uiCommonHideGrid(gridid) {
	if (gridid && ($("#" + gridid).length > 0)) $("#" + gridid).jqGrid("setGridState", "hidden");
}
/* 將隱藏的grid給顯示出來 */
function uiCommonShowGrid(gridid) {
	if (gridid && ($("#" + gridid).length > 0)) $("#" + gridid).jqGrid("setGridState", "visible");
}
/* 選擇grid中的某一行，若該行已經選擇則取消選取該行 */
function uiCommonSelectGridRow(gridid, rowid) {
	if (gridid && ($("#" + gridid).length > 0)) $("#" + gridid).jqGrid("setSelection", rowid);
}
/* 重設grid中選取的項目，單選多選皆可重設 */
function uiCommonResetGridSelection(gridid) {
	if (gridid && ($("#" + gridid).length > 0)) $("#" + gridid).jqGrid("resetSelection");
}
/* 取得grid中所有選取的項目，多選模式時回傳選取行rowid(行數)的陣列，單選模式時回傳單一項目，須注意分頁時，例如選取第二頁的第一筆時選取的行數依然是1，不會是11或其他 */
function uiCommonGetGridSelectedRows(gridid) {
	if (gridid && ($("#" + gridid).length > 0)) {
		if ($("#" + gridid).jqGrid("getGridParam", "multiselect") == true) return $("#" + gridid).jqGrid("getGridParam", "selarrrow");
		else return $("#" + gridid).jqGrid("getGridParam", "selrow");
	}
	return null;
}
/* 取得grid中選取的最後一個項目的rowid(行數)，須注意分頁時，例如選取第二頁的第一筆時選取的行數依然是1，不會是11或其他 */
function uiCommonGetGridLastSelectedRow(gridid) {
	if (gridid && ($("#" + gridid).length > 0)) return $("#" + gridid).jqGrid("getGridParam", "selrow");
	return null;
}
/* 取得grid中總共有幾筆資料(包含所有分頁，從1開始) */
function uiCommonGetGridTotalRecords(gridid) {
	if (gridid && ($("#" + gridid).length > 0)) return $("#" + gridid).jqGrid("getGridParam", "records");
	return null;
}
/* 取得目前在grid中的第幾頁(從1開始) */
function uiCommonGetGridCurrentPage(gridid) {
	if (gridid && ($("#" + gridid).length > 0)) return $("#" + gridid).jqGrid("getGridParam", "page");
	return null;
}
/* 取得目前grid中總共有幾頁(從1開始) */
function uiCommonGetGridTotalPages(gridid) {
	if (gridid && ($("#" + gridid).length > 0)) return $("#" + gridid).jqGrid("getGridParam", "lastpage");
	return null;
}
/* 取得目前grid中一頁顯示幾筆 */
function uiCommonGetGridRowsPerPage(gridid) {
	if (gridid && ($("#" + gridid).length > 0)) return $("#" + gridid).jqGrid("getGridParam", "rowNum");
	return null;
}
/* 取得選取項目的資料，若有多筆則回傳陣列，若有指定行(rowid)則回傳該行資料物件 */
function uiCommonGetGridRowData(gridid, rowid) {
	if (gridid && ($("#" + gridid).length > 0)) {
		if (rowid) return $("#" + gridid).jqGrid("getRowData", rowid);
		else return $("#" + gridid).jqGrid("getRowData");
	}
	return null;
}
/*****[ END ] 動態表格操控(配合<cui:grid>使用) [ END ] *****/

/*****[START] 訊息區塊操控(配合<cui:msgarea>使用) [START] *****/
/* 組合訊息成下列格式"訊息內容 (功能代號-操作項目)", ex. 作業完成 (APP001W-F4查詢) */
function uiCommonComposeOpMsg(msg, operation) {
	var result = "";
	if (msg) {
		result += msg + " (" + gsFuncCode;
		if (operation) result += "-" + operation + ")";
		else result += ")";
	} else {
		if (operation) result += "(" + gsFuncCode + "-" + operation + ")";
		else result += "(" + gsFuncCode + ")";
	}
	return result;
}
/*****[ END ] 訊息區塊操控 [ END ] *****/

/*****[START] Portlet區塊操控(配合<cui:portlet>使用) [START] *****/
/* 要開啟收合特定portlet區塊時，傳入portletId來開啟收合 */
function uiCommonTogglePortlet(portletId) {
	var pId = "#" + portletId;
	var pIconId = "#" + portletId + " .portlet-header .ui-icon-light";
	if ($(pIconId).length > 0) $(pIconId).toggleClass("ui-icon-light-circle-triangle-n").toggleClass("ui-icon-light-circle-triangle-s");
	if ($(pId).length > 0) $(pId).find(".portlet-content").toggle("blind", 300);
}
/* 檢查特定portlet區塊內容是否為收合的 */
function uiCommonIsPortletClosed(portletId) {
	var pId = "#" + portletId;
	var pIconId = "#" + portletId + " .portlet-header .ui-icon-light";
	if (($(pIconId).length > 0) && ($(pIconId).hasClass("ui-icon-light-circle-triangle-s"))) return true;
	return false;
}
/*****[ END ] Portlet區塊操控(配合<cui:portlet>使用) [ END ] *****/

/*****[START] 驗證與表單操控(配合<cui:validate>使用) [START] *****/
/*  執行指定欄位的驗證，欄位必須為可見的 */
function uiCommonValidateField(fieldid) {
	if (($("#" + fieldid).length > 0) && $("#" + fieldid).is(':visible') && ($("#" + fieldid).valid() == true)) return true;
	return false;
}
/* 移除指定欄位的驗證錯誤的訊息(欄位輸入內容仍為紅色) */
function uiCommonRemoveFieldValidateError(fieldid) {
	if ($("#" + fieldid + "ErrMsg").length > 0) $("#" + fieldid + "ErrMsg").remove();
	else if ($("label[for=" + fieldid + "][class=validateErr]").length > 0) $("label[for=" + fieldid + "][class=validateErr]").remove();
}
/* 移除指定欄位的驗證錯誤的訊息並且將錯誤欄位輸入內容的紅色一併移除 */
function uiCommonResetFieldValidateError(fieldid) {
	if ($("#" + fieldid + "ErrMsg").length > 0) $("#" + fieldid + "ErrMsg").remove();
	else if ($("label[for=" + fieldid + "][class=validateErr]").length > 0) $("label[for=" + fieldid + "][class=validateErr]").remove();
	if ($("#" + fieldid).length > 0) {
		$("#" + fieldid).removeClass("validateErr");
		$("#" + fieldid).addClass("valid");
	}
}
/* 依據傳入的表單id將表單重設 */
function uiCommonResetForm(formid) {
	if (formid) {
		var validator = $("#" + formid).validate();		
		if (validator) validator.resetForm();		
		else $("#" + formid)[0].reset();
	}
}
/* 依據傳入的表單id將表單中所有驗證錯誤欄位的錯誤訊息清除(表單輸入的值不會重設) */
function uiCommonClearFormValidateError(formid) {
	if (formid) {
		var validator = $("#" + formid).validate();
		if (validator) validator.clearFormError();
	}
}
/*****[ END ] 驗證與表單操控(配合<cui:validate>使用) [ END ] *****/

/*****[START] 阻擋操作操控 [START] *****/
/* 阻擋使用者操作, 自訂彈出對話框標題(title), 與對話框訊息(message), 與過幾毫秒自動消失(timeout) */
function uiCommonBlockUICustom(title, message, timeout) {
	var loadingIconPath = '/' + gsPageBase + '/commonres/css/images/ui-anim_basic_16x16.gif';
	if (timeout) {
		$.blockUI({
			theme: true,
			title: title,
			message: '<h4><center><img src="' + loadingIconPath + '"/>&nbsp;&nbsp;' + message + '</center></h4>',
			overlayCSS: { opacity: 0.1 },
			timeout: timeout
		});
	} else {
		$.blockUI({
			theme: true,
			title: title,
			message: '<h4><center><img src="' + loadingIconPath + '"/>&nbsp;&nbsp;' + message + '</center></h4>',
			overlayCSS: { opacity: 0.1 }
		});
	}
	gUIBlocking = true;
}
/* 阻擋使用者操作, 彈出對話框有預設的標題, 訊息且不會自動消失，呼叫時會增加BlockUI的計數 */
function uiCommonBlockUI() {
	var loadingIconPath = '/' + gsPageBase + '/commonres/css/images/ui-anim_basic_16x16.gif';
	$.blockUI({
		theme: true,
		title: gsBlockUIDefaultTitle,
		message: '<h4><center><img src="' + loadingIconPath + '"/>&nbsp;&nbsp;' + gsBlockUIDefaultMessage + '</center></h4>',		
		overlayCSS: { opacity: 0.1 }
	});
	gUIBlocking = true;
}
/* 當BlockUI的計數為1或0時才將阻擋使用者操作所彈出對話框關閉並回傳true，否則代表還有其他未完成的呼叫因此不關閉並回傳false */
function uiCommonUnblockUI() {
	$.unblockUI();
	gUIBlocking = false;
}
/* 不管BlockUI的計數強制將阻擋使用者操作所彈出對話框關閉並重設BlockUI的計數 */
function uiCommonForceUnblockUI() {
	$.unblockUI();
	gUIBlocking = false;
}
/* 將頁面上所有ajax開始event註冊給阻擋使用者操作的畫面, 這樣只要頁面上有ajax的事件傳送前便會跳出視窗阻檔使用者操作, 同時將ajax結束event註冊給取消阻擋使用者操作畫面, 這樣頁面上ajax的事件結束時便會關閉原先阻擋的視窗 */
function uiCommonWireAjaxToAutoBlockUI() {
	if (gWiredAjaxAutoBlockUI == false) {		
		$(document).ajaxStart(function(){ uiCommonBlockUI(); });
		$(document).ajaxStop(function(){ uiCommonUnblockUI(); });
		gWiredAjaxAutoBlockUI = true;
	}
}
/* 取消將頁面上所有ajax開始與結束的event註冊給阻擋使用者操作的畫面, 因頁面上可能有許多ajax事件不想彈出此阻擋畫面, 因此可取消此事件 */
function uiCommonUnwireAjaxToAutoBlockUI() {
	if (gWiredAjaxAutoBlockUI == true) {		
		$(document).unbind('ajaxStart');
		$(document).unbind('ajaxStop');
		gWiredAjaxAutoBlockUI = false;
	}
}
/*****[ END ] 阻擋操作操控 [ END ] *****/

/*****[START] 頁面長寬偵測與固定區塊位置操控 [START] *****/
/* 偵測視窗實際寬度 */
function uiCommonGetViewportWidth() {
	if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)		
		return document.documentElement.clientWidth; //IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else return document.getElementsByTagName('body')[0].clientWidth; //older versions of IE
}
/* 偵測視窗實際高度 */
function uiCommonGetViewportHeight() {
	if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
		return document.documentElement.clientHeight; //IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else return document.getElementsByTagName('body')[0].clientHeight; //older versions of IE
}
/* 調整固定浮動區塊的寬度以符合視窗內部最適大小 */
function uiCommonAdjustFixedPositionAndSize() {
	var vWidth = uiCommonGetViewportWidth();	
	if (vWidth) {
		var newWidth = vWidth;
		if ($("#contentBasePopup").length > 0) { //for popup page only(no menu, no header)
			newWidth = vWidth - 3 - 3;
			var x = 3;
			if (($("#funcBtns").length > 0) && ($("#msgArea").length > 0)) {
				var fbfTop1 = 3;
				$("#funcBtns").css('top', fbfTop1);
				$("#funcBtns").css('left', x);
				$("#funcBtns").width(newWidth);
				var mafTop1 = fbfTop1 + $("#funcBtns").height() - 1 + 1; //minus one for IE, plus one for shadow
				$("#msgArea").css('top', mafTop1);
				$("#msgArea").css('left', x);
				$("#msgArea").width(newWidth);
				var cbfTop1 = mafTop1 + $("#msgArea").height() + 6;
				$("#contentBasePopup").css('margin-top', cbfTop1);
			} else if ($("#funcBtns").length > 0) {
				var fbfTop2 = 3;
				$("#funcBtns").css('top', fbfTop2);
				$("#funcBtns").css('left', x);
				$("#funcBtns").width(newWidth);
				var cbfTop2 = fbfTop2 + $("#funcBtns").height() + 6 + 1; //plus one for shadow
				$("#contentBasePopup").css('margin-top', cbfTop2);
			} else if ($("#msgArea").length > 0) {
				var mafTop3 = 3;
				$("#msgArea").css('top', mafTop3);
				$("#msgArea").css('left', x);
				$("#msgArea").width(newWidth);
				var cbfTop3 = mafTop3 + $("#msgArea").height() + 6;
				$("#contentBasePopup").css('margin-top', cbfTop3);
			}
			return;
		}
		if (uiCommonIsMenuClosed()) {			
			var breadCrumbTop = 60; //This must be the same with css class of breadCrumb's top
			if (uiCommonIsHeaderClosed() == true) breadCrumbTop = 5;
			$("#btnSlideOut").css('top', breadCrumbTop);
			newWidth = vWidth - 30 - 8 - 8;			
			if (($("#breadCrumb").length > 0) && ($("#funcBtns").length > 0) && ($("#msgArea").length > 0)) {
				$("#breadCrumb").css('top', breadCrumbTop);
				$("#breadCrumb").width(newWidth);
				var fbfTop1 = breadCrumbTop + $("#breadCrumb").height() + 6;
				$("#funcBtns").css('top', fbfTop1);
				$("#funcBtns").width(newWidth);
				var mafTop1 = fbfTop1 + $("#funcBtns").height() - 1 + 1; //minus one for IE, plus one for shadow
				$("#msgArea").css('top', mafTop1);
				$("#msgArea").width(newWidth);
				var cbfTop1 = mafTop1 + $("#msgArea").height() + 6;
				$("#contentBase").css('margin-top', cbfTop1);
			} else if (($("#breadCrumb").length > 0) && ($("#funcBtns").length > 0)) {
				$("#breadCrumb").css('top', breadCrumbTop);
				$("#breadCrumb").width(newWidth);
				var fbfTop2 = breadCrumbTop + $("#breadCrumb").height() + 6 + 1; //plus one for shadow
				$("#funcBtns").css('top', fbfTop2);
				$("#funcBtns").width(newWidth);
				var cbfTop2 = fbfTop2 + $("#funcBtns").height() + 6;
				$("#contentBase").css('margin-top', cbfTop2);
			} else if (($("#breadCrumb").length > 0) && ($("#msgArea").length > 0)) {
				$("#breadCrumb").css('top', breadCrumbTop);
				$("#breadCrumb").width(newWidth);
				var mafTop3 = breadCrumbTop + $("#breadCrumb").height() + 6;
				$("#msgArea").css('top', mafTop3);
				$("#msgArea").width(newWidth);
				var cbfTop3 = mafTop3 + $("#msgArea").height() + 6;
				$("#contentBase").css('margin-top', cbfTop3);
			}
		} else {
			var breadCrumbFixedTop = 60; //This must be the same with css class of breadCrumbFixed's top
			if (uiCommonIsHeaderClosed() == true) {
				breadCrumbFixedTop = 5;
				if ($("#menuSearchAndGo").length > 0 && $("#menuSearchAndGo").is(":visible")) {
					$("#menuSearchAndGo").css('top', 35);
					$("#menuBaseFixed").css('top', $("#menuSearchAndGo").height() + 35); //This must be the breadCrumbFixedTop plus menu top button's height
				} else {
					$("#menuBaseFixed").css('top', 35); //This must be the breadCrumbFixedTop plus menu top button's height
				}
			} else {
				if ($("#menuSearchAndGo").length > 0 && $("#menuSearchAndGo").is(":visible")) {
					$("#menuSearchAndGo").css('top', 90);
					$("#menuBaseFixed").css('top', $("#menuSearchAndGo").height() + 90); //This must be the breadCrumbFixedTop plus menu top button's height
				} else {
					$("#menuBaseFixed").css('top', 90); //This must be the same with css class of menuBaseFixed's top
				}
			}
			$("#btnSlideIn").css('top', breadCrumbFixedTop);
			newWidth = vWidth - 285 - 8 - 8;			
			if (($("#breadCrumbFixed").length > 0) && ($("#funcBtnsFixed").length > 0) && ($("#msgAreaFixed").length > 0)) {
				$("#breadCrumbFixed").css('top', breadCrumbFixedTop);
				$("#breadCrumbFixed").width(newWidth);
				var fbfTop11 = breadCrumbFixedTop + $("#breadCrumbFixed").height() + 6;
				$("#funcBtnsFixed").css('top', fbfTop11);
				$("#funcBtnsFixed").width(newWidth);				
				var mafTop11 = fbfTop11 + $("#funcBtnsFixed").height() - 1 + 1; //minus one for IE, plus one for shadow
				$("#msgAreaFixed").css('top', mafTop11);
				$("#msgAreaFixed").width(newWidth);
				var cbfTop11 = mafTop11 + $("#msgAreaFixed").height() + 6;
				$("#contentBaseFixed").css('margin-top', cbfTop11);
			} else if (($("#breadCrumbFixed").length > 0) && ($("#funcBtnsFixed").length > 0)) {
				$("#breadCrumbFixed").css('top', breadCrumbFixedTop);
				$("#breadCrumbFixed").width(newWidth);
				var fbfTop21 = breadCrumbFixedTop + $("#breadCrumbFixed").height() + 6 + 1; //plus one for shadow
				$("#funcBtnsFixed").css('top', fbfTop21);
				$("#funcBtnsFixed").width(newWidth);
				var cbfTop21 = fbfTop21 + $("#funcBtnsFixed").height() + 6;
				$("#contentBaseFixed").css('margin-top', cbfTop21);
			} else if (($("#breadCrumbFixed").length > 0) && ($("#msgAreaFixed").length > 0)) {
				$("#breadCrumbFixed").css('top', breadCrumbFixedTop);
				$("#breadCrumbFixed").width(newWidth);
				var mafTop31 = breadCrumbFixedTop + $("#breadCrumbFixed").height() + 6;
				$("#msgAreaFixed").css('top', mafTop31);
				$("#msgAreaFixed").width(newWidth);
				var cbfTop31 = mafTop31 + $("#msgAreaFixed").height() + 6;
				$("#contentBaseFixed").css('margin-top', cbfTop31);
			}
		}
	}
	uiCommonUpdateEnvInfo();
}
/*****[ END ] 頁面長寬偵測與固定區塊位置操控 [ END ] *****/

/*****[START] 其他操控 [START] *****/
/* 預設的AJAX錯誤處理 */
function uiCommonSessionTimeoutForAjax(jqXHR, textStatus, errorThrown) {
    if (jqXHR.status == 901) { //Server User Session Timeout    	
    	var hrefArray = location.href.split("/");
    	if (hrefArray.length > 3) {
    		var newUrl = hrefArray[0] + "//" + hrefArray[2] + "/" + hrefArray[3] + "/invalidSession";
    		alert("閒置時間過久，請重新登入!");
    		window.location = newUrl;
    	}
    } else if (jqXHR.status === 0) {
        alert('HTTP 0: 網路未連接，請檢查網路連線!');
    } else if (jqXHR.status == 404) {
        alert('HTTP 404: 請求的頁面不存在!');
    } else if (jqXHR.status == 500) {
        alert('HTTP 500: 伺服器內部處理發生錯誤!');
    }
}
/* 取得ajax要傳送的url位置，會取得目前網頁位置，然後與傳入的url做吻合判斷，如果目前所在url位置最後與要傳送的url不符合的話便會找到符合的url再回傳*/
/* 例: 當頁面在/front/APP001W/Params時，AJAX的要求得送到"../APP001W"處理才會work，而不是送到APP001W */
function uiCommonGetMatchedAjaxUrl(url) {
	var href = location.href;
	if (href) {
		var parts = href.toString().split("/"); 
		if (parts.length > 0) {
			if (parts[parts.length - 1].indexOf(url) == 0)
				return url;
			else {
				var level = 1;
				for(var i=parts.length - 2; i>=0; i--) {
					if (parts[i].indexOf(url) == 0) {
						for (var j=0; j<level; j++) {
							url = "../" + url;
						}
						return url;
					} else {
						level++;
					}
				}
				return "";
			}
		}
	}
}
/* 使用舊版(2.0.0以前，不包含2.0.0)的報表直接列印 */
function uiCommonSilentPrintOriginal(applet, url, paramNames, paramValues, reportCd, debug, disablePrint, 
		doubleSided, flipOnShortEdge) {
	var link = location.href;
	link = link.substring(0, link.lastIndexOf("/"));
	if (url.indexOf("http") < 0) {
		url = link + "/" + url;
	}
	var params = "";
	if (paramNames && paramValues && (paramNames.length == paramValues.length)) {
		for (var i=0; i < paramNames.length; i++) {			
			params += paramNames[i] + "=" + paramValues[i];
			if (i != (paramNames.length - 1)) params = params + "&";
		}
	}
	if (debug) applet.debug = true;
	else applet.debug = false; 
	if (disablePrint) applet.disablePrint = true;
	else applet.disablePrint = false;
	if (doubleSided) applet.doubleSided = true;
	else applet.doubleSided = false;
	if (flipOnShortEdge) applet.flipOnShortEdge = true;
	else applet.flipOnShortEdge = false;
	var ret = applet.sendRequestAndSilentPrint(url, params, reportCd);
	if (ret && ret != "") {
		alert(ret);
	}
	return ret;
}
/* 使用新版(2.0.0以後)的報表直接列印 */
function uiCommonSilentPrint(applet, url, paramNames, paramValues, reportCd, debug, disablePrint, 
		doubleSided, flipOnShortEdge, copies, mediaSizeName, useDefaultPrinter) {
	var link = location.href;
	link = link.substring(0, link.lastIndexOf("/"));
	if (url.indexOf("http") < 0) {
		url = link + "/" + url;
	}
	var params = "";
	if (paramNames && paramValues && (paramNames.length == paramValues.length)) {
		for (var i=0; i < paramNames.length; i++) {			
			params += paramNames[i] + "=" + paramValues[i];
			if (i != (paramNames.length - 1)) params = params + "&";
		}
	}
	if (debug) applet.debug = true;
	else applet.debug = false; 
	if (disablePrint) applet.disablePrint = true;
	else applet.disablePrint = false;
	if (doubleSided) applet.doubleSided = true;
	else applet.doubleSided = false;
	if (flipOnShortEdge) applet.flipOnShortEdge = true;
	else applet.flipOnShortEdge = false;
	if (copies) applet.copies = copies;
	else applet.copies = 1;
	if (useDefaultPrinter) applet.useDefaultPrinter = useDefaultPrinter;
	else applet.useDefaultPrinter = false;
	if (mediaSizeName) applet.mediaSizeName = mediaSizeName;
	else applet.mediaSizeName = "AUTO";
	var ret = applet.sendRequestAndSilentPrint(url, params, reportCd);
	if (ret && ret != "") {
		alert(ret);
	}
	return ret;
}
/* 直接發出包含參數請求並直接列印回應的報表，成功會回串空字串，失敗會回傳錯誤訊息 */
function uiCommonSilentPrintWithPostParams(url, paramNames, paramValues, reportCd, debug, disablePrint, 
		doubleSided, flipOnShortEdge, copies, mediaSizeName, useDefaultPrinter) {
	if (typeof(useNewSdpReportViewerPrinter) !== "undefined" && useNewSdpReportViewerPrinter) {
		if (($("#ReportPrintApplet").length > 0) && 
				(typeof (document.ReportPrintApplet) != 'undefined') && 
				(document.ReportPrintApplet.isActive())) {
			return uiCommonSilentPrint(document.ReportPrintApplet, url, paramNames, paramValues, reportCd, debug, disablePrint, 
					doubleSided, flipOnShortEdge, copies, mediaSizeName, useDefaultPrinter);
		} else if (($("#reportPrintApplet").length > 0) && 
				(typeof (document.reportPrintApplet) != 'undefined') && 
				(document.reportPrintApplet.isActive())) {
			return uiCommonSilentPrint(document.reportPrintApplet, url, paramNames, paramValues, reportCd, debug, disablePrint, 
					doubleSided, flipOnShortEdge, copies, mediaSizeName, useDefaultPrinter);
		} else {
			alert("未載入報表直接列印元件!");
			return "未載入報表直接列印元件!"; 
		}
	} else {
		if (($("#ReportPrintApplet").length > 0) && 
				(typeof (document.ReportPrintApplet) != 'undefined') && 
				(document.ReportPrintApplet.isActive())) {
			return uiCommonSilentPrintOriginal(document.ReportPrintApplet, url, paramNames, paramValues, reportCd, debug, disablePrint, 
					doubleSided, flipOnShortEdge);
		} else if (($("#reportPrintApplet").length > 0) && 
				(typeof (document.reportPrintApplet) != 'undefined') && 
				(document.reportPrintApplet.isActive())) {
			return uiCommonSilentPrintOriginal(document.reportPrintApplet, url, paramNames, paramValues, reportCd, debug, disablePrint, 
					doubleSided, flipOnShortEdge);
		} else {
			alert("未載入報表列印元件!");
			return "未載入報表列印元件!"; 
		}
	}
	
}
/* 使用新版(2.0.0以後)的報表直接列印，直接發出包含參數物件請求並直接列印回應的報表，成功會回串空字串，失敗會回傳錯誤訊息 */
function uiCommonSilentPrintWithPostObj(url, paramObject, reportCd, debug, disablePrint, 
		doubleSided, flipOnShortEdge, copies, mediaSizeName, useDefaultPrinter) {
	var paramNames = [];
	var paramValues = [];
	if (paramObject) {
		for (var paramName in paramObject) {
			paramNames.push(paramName);	
			paramValues.push(paramObject[paramName]);
		}
	}
	uiCommonSilentPrintWithPostParams(url, paramNames, paramValues, reportCd, debug, disablePrint, 
			doubleSided, flipOnShortEdge, copies, mediaSizeName, useDefaultPrinter);
}
/* 使用新版(2.0.0以後)的報表預覽，在新視窗開啟PDF檢視器檢視傳入的PDF URL位置
 * pagefitMode->1: 原始大小, 2: 符合視窗, 3: 符合寬度，預設為3: 符合寬度,
 * mediaSizeName->AUTO,ISO_A3,ISO_A4,ISO_A5,ISO_B3,ISO_B4,ISO_B5,JIS_B3,JIS_B4,JIS_B5,ISO_C3,ISO_C4,ISO_C5預設為AUTO */
function uiCommonOpenPdfViewer(pdfUrl, name, specs, viewerWidth, viewerHeight, forceUniqueWindowName, pagefitMode, mediaSizeName) {
    var browser = navigator.userAgent.toLowerCase();
    var newWindow = null;
    if (!specs) specs = 'resizable=yes';
    if (name) {
        if (forceUniqueWindowName) {
            name = name + "_" + gUniqueWindowNo;
            gUniqueWindowNo++;
        }
    } else {
        name = "_blank";
    }
    newWindow = window.open("about:blank", name, specs);
    newWindow.moveTo(0, 0);
    newWindow.resizeTo(screen.width, screen.height - 40);   
    var w = '100%'; if (viewerWidth) w = viewerWidth;
    var h = '100%'; if (viewerHeight) h = viewerHeight;
    var html = "";
    if (typeof(useNewSdpReportViewerPrinter) !== "undefined" && useNewSdpReportViewerPrinter) { //New sdp-report-viewer after(including) version 2.0.0
        if (h == '100%' && browser.indexOf("chrome") >= 0) h = '96%'; //Chrome的話100%高度會超過，要縮減
        var initPageFitMode = 4;
        if (pagefitMode && (pagefitMode > 0) && (pagefitMode < 4)) initPageFitMode = pagefitMode + 1; //viewer真正的fit mode為2開始，所以要加1
        var initMediaSizeName = 'AUTO';
        if (mediaSizeName) initMediaSizeName = mediaSizeName;
        html =  "<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8/'></head><body><div id='ReportViewerAppletWrapper'>\n" +
        "<applet id='ReportViewerApplet' name='ReportViewerApplet' codebase='/" + gsPageBase + "/res/applets' code='gov.fdc.common.print.ReportViewerApplet.class' archive='sdp-report-viewer.jar' width='" + w + "' height='" + h + "'>\n" +
        "<param name='type' value='application/x-java-applet;jpi-version=1.5.0'/>\n" +
        "<param name='java_arguments' value='-Xmx128m'/>\n" +
        "<param name='classloader_cache' value='false'/>\n" +
        "<param name='url' value='/" + gsPageBase + gsReportViewerPath + "/" + pdfUrl + "'/>\n" +
        "<param name='pagefitMode' value='" + initPageFitMode + "'/>\n" +
        "<param name='mediaSizeName' value='" + initMediaSizeName + "'/>\n" +
        "</applet></div></body></html>";
    } else { //Old sdp-report-viewer before version 2.0.0, like version 1.8.0
        var html =  "<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8/'></head>\n<body>\n" +
        "<applet id='embedPDF' name='embedPDF' codebase='/" + gsPageBase + "/res/applets' code='ch.randelshofer.pdf.EmbedPDFApplet.class' archive='sdp-report-viewer.jar' width='" + w + "' height='" + h + "'>\n" +
        "<param name='enableOpenWindow' value='false'/>\n<param name='enableSubpixAA' value='true'/>\n<param name='pdf' value='/" + gsPageBase + gsReportViewerPath + "/" + pdfUrl + "'/>" +
        "<param name='classloader_cache' value='false'/>\n" +
        "</applet></body></html>";
    }
    window.setTimeout(function() { newWindow.document.write(html); }, 100); //避免Racing Condition會造成applet畫不出來，因此間隔時間100毫秒才寫入
    return newWindow;
}
/* 開新視窗並將原本視窗要帶的參數以POST傳遞 */
function uiCommonOpenWindowWithPostParams(url, name, specs, paramNames, paramValues, forceUniqueWindowName) {
	if (name) {
		if (forceUniqueWindowName) {
			name = name + "_" + gUniqueWindowNo;
			gUniqueWindowNo++;
		}
	} else {
		name = "_blank";
	}
	var newWindow = window.open('about:blank', name, specs); 
	if (!newWindow) return false;
	var formHtml = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8/'></head><body><form name='uiCommonPostParamForm' method='post' action='" + url + "' accept-charset='UTF-8'>";
	if (paramNames && paramValues && (paramNames.length == paramValues.length)) {
		for (var i=0; i < paramNames.length; i++) formHtml += "<input type='hidden' name='" + paramNames[i] + "' value='" + paramValues[i] + "'/>";
		formHtml += "</form><script type='text/javascript'>document.forms['uiCommonPostParamForm'].submit();</script></body></html>";
	}
	newWindow.document.write(formHtml);
	return newWindow;
}
/* 開新視窗並將原本視窗要帶的參數以POST傳遞 */
function uiCommonOpenWindowWithNameWithPostParams(url, name, specs, paramNames, paramValues, titleName, forceUniqueWindowName) {
	if (name) {
		if (forceUniqueWindowName) {
			name = name + "_" + gUniqueWindowNo;
			gUniqueWindowNo++;
		}
	} else {
		name = "_blank";
	}
	var newWindow = window.open('about:blank', name, specs);
	if (!newWindow)
		return false;
	var frameHtml = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8/'><title>"
			+ titleName + "</title></head>";
	frameHtml += "<frameset rows='0%,50%' border='0'><frame src='about:blank'><frame src='about:blank' id='contentNewWin'></frameset>";
	frameHtml += "</html>";
	newWindow.document.write(frameHtml);
	var formHtml = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8/'></head><body><form name='uiCommonPostParamForm' method='post' action='"
			+ url + "' accept-charset='UTF-8'>";
	if (paramNames && paramValues && (paramNames.length == paramValues.length)) {
		for ( var i = 0; i < paramNames.length; i++)
			formHtml += "<input type='hidden' name='" + paramNames[i]
					+ "' value='" + paramValues[i] + "'/>";
		formHtml += "</form><script type='text/javascript'>document.forms['uiCommonPostParamForm'].submit();</script></body></html>";
	}
	newWindow.contentNewWin.document.write(formHtml);
	return newWindow;
}
/* 開新視窗並將原本視窗要帶的參數物件以POST傳遞 */
function uiCommonOpenWindowWithPostObj(url, name, specs, paramObject, forceUniqueWindowName) {
	var paramNames = [];
	var paramValues = [];
	if (paramObject) {
		for (var paramName in paramObject) {
			paramNames.push(paramName);	
			paramValues.push(paramObject[paramName]);
		}
	}
	return uiCommonOpenWindowWithPostParams(url, name, specs, paramNames, paramValues, forceUniqueWindowName);
}
/* 判斷鍵盤輸入值是否為修改的按鍵或是字元輸入的按鍵 */
function uiCommonIsModifyKey(keycode) {
	if (!(keycode)) return false;
	if (keycode < 47) {
		//backspace, clear, enter, esc, spacebar, delete
		if ((keycode == 8) || (keycode == 12) || (keycode == 13) || (keycode == 27) || (keycode == 32) || (keycode == 46)) return true;
		return false;
	} else {
		//0-9
		if ((keycode >= 48) && (keycode <= 57)) return true;
		//A-Z
		if ((keycode >= 65) && (keycode <= 90)) return true;
		//Numpad 0-9, *, +, enter, -, ., /
		if ((keycode >= 96) && (keycode <= 111)) return true;
		//;=,-./`
		if ((keycode >= 186) && (keycode <= 192)) return true;
		//[\]'
		if ((keycode >= 219) && (keycode <= 222)) return true;
		return false;
	}
}
/* 取得今日日期民國年字串100/01/01 */
function uiCommonGetTodayString(isRocYear) {
	var today = new Date();
	var year = today.getFullYear();
	if (isRocYear) year = year - 1911;
	var month = today.getMonth() + 1;
	if (month < 10) month = "0" + month;
	var day = today.getDate();	
	if (day < 10) day = "0" + day;
	return (year + "/" + month + "/" + day);
}
/* 將半形英數字、標點符號、空白轉成全形字後回傳 */
function uiCommonHalfToFull(text) {
	if (text && text.length > 0) {
	    var pattern = "[0-9A-Za-z!\"#$%&\'()*+,-./:;<=>?@\[\\\]^_`{|}~]";
	    var tmp = "";
	    for (var i=0; i<text.length ;i++){
	        var ch = text.charAt(i);
	        if (ch.match(pattern)) {
	        	ch = String.fromCharCode(text.charCodeAt(i) + 65248) ; //plus 0xFEE0
	        } else if (ch == " ") { //half type space
	        	ch = "　"; //full type space
	        }
	        tmp = tmp + ch;
	    }
	    return tmp;
	}
	return text;
}
/* 將全形英數字、標點符號、空白轉成半形字後回傳 */
function uiCommonFullToHalf(text) {
	if (text && text.length > 0) {
	    var pattern = "[\uFF01-\uFF5E]"; //full type from ! to ~ punctuation, also include full type a-Z 0-9 A-Z
	    var tmp = "";
	    for (var i=0; i<text.length ;i++){
	        var ch = text.charAt(i);
	        if (ch.match(pattern)) {
	        	ch = String.fromCharCode(text.charCodeAt(i) - 65248) ; //minus 0xFEE0
	        } else if (ch == "　") { //full type space
	        	ch = " "; //half type space
	        }
	        tmp = tmp + ch;
	    }
	    return tmp;
	}
	return text;
}
/* 將傳入的欄位元素id中的值去除","分隔的字串並設回欄位元素中 */
function uiCommonRemoveMoneyCommas(elementId) {
	var value = $("#" + elementId).val();
	if (value) {
		$("#" + elementId).val(value.replace(/\,/g, ''));
	}
}
/* 將傳入的欄位元素id中的值格式化成以千分位為單位","分隔的字串並設回欄位元素中 */
function uiCommonAddMoneyCommas(elementId) {
	$("#" + elementId).val(uiCommonFormatMoneyCommas($("#" + elementId).val()));
}
/* 將傳入的數字或字串格式化成以千分位為單位","分隔的字串 */
function uiCommonFormatMoneyCommas(numberOrString) {
	numberOrString += '';
	numberOrString = numberOrString.replace(/\,/g, '');
	var x = numberOrString.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + ',' + '$2');
	return x1 + x2;
}
/* 取得頁面目錄識別碼，當選單中有多個同功能代號的項目時，每個相同功能代號的項目會有不同的目錄識別碼以供辨別 */
function uiCommonGetDirCode() {
	if (gsDirCode) return gsDirCode;
	else return $("meta[name='dircode']").attr("content");
}
/* 傳入的字串(haystack)是否以某字串(needle)開頭 */
function uiCommonStartsWith(haystack, needle, isCaseSensitive) {
	if (isCaseSensitive) {
	} else {
		haystack = haystack.toUpperCase();
		needle = needle.toUpperCase();
	}
	return haystack.substr(0, needle.length) === needle ? true : false;
}
/* 傳入的字串(haystack)是否以某字串(needle)結尾 */
function uiCommonEndsWith(haystack, needle, isCaseSensitive) {
	if (isCaseSensitive) {
	} else {
		haystack = haystack.toUpperCase();
		needle = needle.toUpperCase();
	}
	var len = needle.length;
	if (len == 0) return true;
	var start = 0 - len;
	return haystack.substr(start) === needle ? true : false;
}
/* 將傳入的跳脫過的HTML轉成未跳脫的HTML */
function uiCommonUnescapeHtml(html) {
	var htmlNode = document.createElement("div");
	htmlNode.innerHTML = html;
	if (htmlNode.innerText !== undefined)
		return htmlNode.innerText; // For IE
	return htmlNode.textContent; // For FF
}
/* 將傳入的跳脫過的HTML轉成未跳脫的HTML並轉為JSON物件 */
function uiCommonUnescapeHtmlToJson(html) {
	return $.evalJSON(uiCommonUnescapeHtml(html));
}
/*****[ END ] 其他操控 [ END ] *****/

/*****[START] 自定義驗證方法 [START] *****/
/* 自定義byte最大長度驗證供驗證元件呼叫使用 */
function uiCommonValidateByteMaxLength(value, element, maxlength) {
	var wordLen = value.length;
	for (var i=0; i<value.length; i++) {
	  if (value.charCodeAt(i) > 127) wordLen += 3; //中文字原本算的長度是1, 但ORACLE UTF-8資料庫中文字占4個位元組, 所以長度要加3
	}
	return (wordLen <= maxlength);
}
/* 自定義byte最小長度驗證供驗證元件呼叫使用 */
function uiCommonValidateByteMinLength(value, element, minlength) {
	var wordLen = value.length;
	for (var i=0; i<value.length; i++) {
	  if (value.charCodeAt(i) > 127) wordLen += 3; //中文字原本算的長度是1, 但ORACLE UTF-8資料庫中文字占4個位元組, 所以長度要加3
	}
	return (wordLen >= minlength);
}
/* 自定義byte長度範圍驗證 */
function uiCommonValidateByteRangeLength(value, element, param) {
	var wordLen = value.length;
	for (var i=0; i<value.length; i++) {
		if (value.charCodeAt(i) > 127) wordLen += 3; //中文字原本算的長度是1, 但ORACLE UTF-8資料庫中文字占4個位元組, 所以長度要加3
	}
	return ( wordLen >= param[0] && wordLen <= param[1] );
}
/* 自定義身分證號檢驗 */
function uiCommonValidateCitizenId(value, element) {
	value = value.replace(/\s+/g, "");
	if ((/^[A-Z, a-z]{1}[1-2]{1}[0-9]{8}$/.test(value)) == false) return false;
	
	var local_table = [10,11,12,13,14,15,16,17,34,18,19,20,21,
					   22,35,23,24,25,26,27,28,29,32,30,31,33];
					/* A, B, C, D, E, F, G, H, I, J, K, L, M,
					   N, O, P, Q, R, S, T, U, V, W, X, Y, Z */
	var local_digit = local_table[value.toUpperCase().charCodeAt(0)-'A'.charCodeAt(0)];   	 
	var checksum = 0; 
	checksum += Math.floor(local_digit / 10);
	checksum += (local_digit % 10) * 9;
	/* i: index; p: permission value */
	/* this loop sums from [1] to [8] */
	/* permission value decreases */
	for (var i=1, p=8; i <= 8; i++, p--) checksum += parseInt(value.charAt(i)) * p;
	// add the last number
	checksum += parseInt(value.charAt(9)); 
	return (!(checksum % 10));
}
/* 自定義護照檢驗 */
function uiCommonValidatePassportId(value, element) {
	if (value.length < 10) return false;
		
	value = value.replace(/\s+/g, "");
	var isPass = false;
	if ((/^[A-Z, a-z]{1}[A-D, a-d]{1}[0-9]{8}$/.test(value))) {
		// check new rule
		var strFst = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
		var strInt = '19876543211';
		var strFstWd = value.toUpperCase();
		var strIntAll;
		var intANS=0,i=0;
		var intFst1,intFst2,intNum1,intNum2,intNum3;				 
	
		intFst1 = parseInt(strFst.indexOf(strFstWd.substr(0,1)),10) + 10;
		intFst2 = parseInt(strFst.indexOf(strFstWd.substr(1,1)),10) + 10;
		if ( intFst1 > 29 ) intNum1 = 3;
		else if ( intFst1 > 19 ) intNum1 = 2;
		else intNum1 = 1;
		intNum2 = intFst1 % 10;
		intNum3 = intFst2 - 10;
		strIntAll = intNum1.toString() + intNum2.toString() + intNum3.toString() + value.substring(2,11);   // 字串組合;
	
		for (var i=0; i<=10; i++) intANS += (parseInt(strInt.substr(i,1),10) * parseInt(strIntAll.substr(i,1),10));
		isPass = (!(intANS % 10));
	}
	
	if (isPass == false) {
		// check old rule
	    if (/^[0-9]{8}[A-Z, a-z]{2}$/.test(value)) {
	        var checkDate = value.substring(0,8);
	        var intDate = parseInt(checkDate);
	        var day = intDate%100;
	        var month = Math.floor(intDate%10000/100);
	        var year = Math.floor(intDate/10000);
	        var xdata = new Date(year,month-1,day);
	        isPass = (intDate >= 18500101 && ((xdata.getFullYear() == year) && (xdata.getMonth() == month - 1) && (xdata.getDate() == day)));
	    }
	}
	
	return isPass;
}
/* 自定義營利事業統編驗證 */
function uiCommonValidateTaxId(value, element) {
	if ((/^[0-9]{8}$/.test(value)) == false) return false;
	var res = new Array(8);
	var key = "12121241";
	var isModeTwo = false; //第七個數是否為七
	var result = 0;
	for (var i=0; i<8; i++) {
		var tmp = value.charAt(i) * key.charAt(i);
		res[i] = Math.floor(tmp/10) + (tmp%10); //取出十位數和個位數相加
		if (i == 6 && value.charAt(i) == 7) isModeTwo = true;	
	}
	for (var s=0; s<8; s++) result += res[s];
	if (isModeTwo) {
		if ((result % 10) == 0 || ((result + 1) % 10) == 0) return true;
		else return false;
	} else return (!(result % 10));
}
/*****[ END ] 自定義驗證方法 [ END ] *****/