;(function($){
/**
 * jqGrid Chinese Traditional Translation for v3.6
 * waiting 2010.01.18
 * http://waiting.javaeye.com/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * update 2010.05.04
 *		add double u3000 SPACE for search:odata to fix SEARCH box display err when narrow width from only use of eq/ne/cn/in/lt/gt operator under IE6/7
**/
$.jgrid = {
	defaults : {
		recordtext: "顯示{0}到{1}筆 共{2}筆",
		emptyrecords: "沒有資料",
		loadtext: "讀取中...",
		pgtext : " {0} 共 {1} 頁"
	},
	search : {
		caption: "搜尋...",
		Find: "尋找",
		Reset: "重設",
		odata : ['等於\u3000\u3000', '不等於', '小於\u3000\u3000', '小於等於','大於\u3000\u3000','大於等於', 
			'開始於','不開始於','屬於\u3000\u3000','不屬於','結束於','不結束於','包含\u3000\u3000','不包含'],
		groupOps: [	{ op: "AND", text: "所有" },	{ op: "OR",  text: "任一" }	],
		matchText: " 符合",
		rulesText: " 規則"
	},
	edit : {
		addCaption: "新增資料",
		editCaption: "編輯資料",
		bSubmit: "送出",
		bCancel: "取消",
		bClose: "關閉",
		saveData: "資料已經改變，是否保存？",
		bYes : "是",
		bNo : "否",
		bExit : "取消",
		msg: {
			required:"此欄位必填",
			number:"請輸入有效數字",
			minValue:"輸入值必須大於等於 ",
			maxValue:"輸入值必須小於等於 ",
			email: "這不是有效的e-mail地址",
			integer: "請輸入有效整數",
			date: "請輸入有效時間",
			url: "網址無效。開頭必須為 ('http://' 或 'https://')",
			nodefined : " 未定義！",
			novalue : " 需要返回值！",
			customarray : "自定義函數需要返回陣列數值！",
			customfcheck : "應該要有自定義的檢查函數！"
		}
	},
	view : {
		caption: "顯示資料",
		bClose: "關閉"
	},
	del : {
		caption: "刪除",
		msg: "刪除所選資料？",
		bSubmit: "刪除",
		bCancel: "取消"
	},
	nav : {
		edittext: "",
		edittitle: "編輯所選資料",
		addtext:"",
		addtitle: "新增資料",
		deltext: "",
		deltitle: "刪除所選資料",
		searchtext: "",
		searchtitle: "尋找",
		refreshtext: "",
		refreshtitle: "重新整理",
		alertcap: "注意",
		alerttext: "請選擇資料",
		viewtext: "",
		viewtitle: "顯示所選資料"
	},
	col : {
		caption: "選擇欄位是否顯示",
		bSubmit: "確定",
		bCancel: "取消"
	},
	errors : {
		errcap : "錯誤",
		nourl : "沒有設定url",
		norecords: "沒有要處理的資料",
		model : "colNames與colModel的欄位數目不相同！"
	},
	formatter : {
		integer : {thousandsSeparator: ",", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat",
		         "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
				"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th';},
			srcformat: 'Y-m-d',
			newformat: 'm-d-Y',
			masks : {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				ShortDate: "Y/j/n",
				LongDate: "l, F d, Y",
				FullDateTime: "l, F d, Y g:i:s A",
				MonthDay: "F d",
				ShortTime: "g:i A",
				LongTime: "g:i:s A",
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				YearMonth: "F, Y"
			},
			reformatAfterEdit : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox : {disabled:true},
		idName : 'id'
	}
};
})(jQuery);
