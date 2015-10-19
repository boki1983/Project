/**********************************/
/*       Version: SDP v1.7.3      */
/**********************************/

var gsBlockUIDefaultTitle = "請稍候";
var gsBlockUIDefaultMessage = "處理中...";
var gsConfidentialLevel = "機密等級";
var gsConfidentialLevelPublic = "公開";
var gsConfidentialLevelGeneral = "一般";        
var gsConfidentialLevelSensitive = "敏感";
var gsConfidentialLevelConfident = "密";
var gsHeaderUser = "使用者：";
var gsHeaderDeputyUser = "代理使用者：";
var gsNoAuthorityCloseWindow = "您無權限操作此系統功能，將關閉視窗！\n若您已經登入作業，可能作業逾時，請重新登入！";
var gsNoFuncBtnAuthority = "您無權限使用此功能按鈕！";
var gsAjaxGet = 'GET';
var gsAjaxPost = 'POST';
var gsAjaxJson = 'json';
var gsAjaxHtml = 'html';
var gsAjaxXml = 'xml';
var gsAjaxContentType = 'application/x-www-form-urlencoded; charset=UTF-8';
var gsPleaseSelectRow = "請先選取一筆資料列！";
var gsPleaseSelectRows = "請先選取資料列！";
var gsLoadHsnError = "無法載入縣市清單！";
var gsLoadTownError = "無法載入鄉鎮市區清單！";
var gsLoadVillError = "無法載入村里清單！";
var gsLoadAddressError = "無法載入地址資料清單！";
var gsPleaseSelect = "請選擇";
var gsLoadHsnPath = '/COMMON_SDP_ADDR/LOAD_HSN_LIST'; 
var gsLoadTownPath = '/COMMON_SDP_ADDR/LOAD_TOWN_LIST';
var gsLoadVillPath = '/COMMON_SDP_ADDR/LOAD_VILL_LIST';
var gsLoadAddressPath = '/COMMON_SDP_ADDR/LOAD_ADDRESS_DATA';
var gsEbookPath = '/COMMON_SDP_EBOOK';
var gsProgDtlPath = '/COMMON_SDP_FUNC_DETAIL';
var gsJkmSopPath = '/COMMON_SDP_JKM_SOP';
var gsReportViewerPath = '/COMMON_SDP_REPORT_VIEWER/TempReportFile';
var gsReportPrinterConfigPath = '/COMMON_SDP_REPORT_PRINTER_CONFIG';
var gsLoading = '載入中...';
var gsLoadingError = '載入錯誤！';
var gsOpenEbookDescStart = '是否確定開啟';
var gsOpenEbookDescEnd = '的電子書？';
var gsDirCodeSep = "__"; //選單目錄識別碼分隔符號
var gsDirCode = $("meta[name='dircode']").attr("content"); //選單目錄識別碼
var gsFuncCode = $("meta[name='funccode']").attr("content"); //功能代號
var gsFuncCodeKey = ((gsDirCode && gsDirCode != "") ? gsFuncCode + gsDirCodeSep + gsDirCode : gsFuncCode); //功能代號鍵值
var gsPageBase = $("meta[name='pagebase']").attr("content"); //頁面根基(Context Root)
var gsSearchAndGoHint = "請輸入功能代號或功能名稱搜尋";