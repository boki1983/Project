var lunarInfo = new Array(
   0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
   0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
   0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
   0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
   0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
   0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
   0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
   0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
   0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
   0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
   0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
   0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
   0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
   0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
   0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
   0x14b63);

var lunarNum = new Array("十", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
var lunarMonth = new Array("正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二");
var solarTerm = new Array("小寒","大寒","立春","雨水","驚蟄","春分","清明","穀雨","立夏","小滿","芒種","夏至","小暑"," 大暑","立秋","處暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
var solarTermBase = new Array(4,19,3,18,4,19,4,19,4,20,4,20,6,22,6,22,6,22,7,22,6,21,6,21);
var solarTermIdx = '0123415341536789:;<9:=<>:=1>?012@015@015@015AB78CDE8CD=1FD01GH01GH01IH01IJ0KLMN;LMBEOPDQRST0RUH0RVH0RWH0RWM0XYMNZ[MB\\]PT^_ST`_WH`_WH`_WM`_WM`aYMbc[Mde]Sfe]gfh_gih_Wih_WjhaWjka[jkl[jmn]ope]qph_qrh_sth_W';
var solarTermOS = '211122112122112121222211221122122222212222222221222122222232222222222222222233223232223232222222322222112122112121222211222122222222222222222222322222112122112121222111211122122222212221222221221122122222222222222222222223222232222232222222222222112122112121122111211122122122212221222221221122122222222222222221211122112122212221222211222122222232222232222222222222112122112121111111222222112121112121111111222222111121112121111111211122112122112121122111222212111121111121111111111122112122112121122111211122112122212221222221222211111121111121111111222111111121111111111111111122112121112121111111222111111111111111111111111122111121112121111111221122122222212221222221222111011111111111111111111122111121111121111111211122112122112121122211221111011111101111111111111112111121111121111111211122112122112221222211221111011111101111111110111111111121111111111111111122112121112121122111111011111121111111111111111011111111112111111111111011111111111111111111221111011111101110111110111011011111111111111111221111011011101110111110111011011111101111111111211111001011101110111110110011011111101111111111211111001011001010111110110011011111101111111110211111001011001010111100110011011011101110111110211111001011001010011100110011001011101110111110211111001010001010011000100011001011001010111110111111001010001010011000111111111111111111111111100011001011001010111100111111001010001010000000111111000010000010000000100011001011001010011100110011001011001110111110100011001010001010011000110011001011001010111110111100000010000000000000000011001010001010011000111100000000000000000000000011001010001010000000111000000000000000000000000011001010000010000000';
var twFestivalM = new Array(1,2,3,4,8,10,10,10,11,12);
var twFestivalD = new Array(1,14,29,4,8,10,25,31,12,25);
var twFestivalS = new Array("元旦","西洋情人節","青年節","兒童節","父親節","雙十節" ,"臺灣光復節", "蔣公誕辰紀念日", "國父誕辰紀念日", "行憲紀念日");
var lunarFestivalM = new Array(1,1,5,7,7,8,9);
var lunarFestivalD = new Array(1,15,5,7,15,15,9);
var lunarFestivalS = new Array("春節", "元宵節", "端午節", "七夕情人節", "中元節", "中秋節", "重陽節");
var weekFestavalM = new Array(5, 11); //幾月
var weekFestavalW = new Array(2, 4); //第幾周
var weekFestavalD = new Array(0, 4); //星期幾
var weekFestavalS = new Array("母親節", "感恩節"); ////某月的第幾個星期幾 ex.五月的第二個星期日為母親節

/* 返回農曆year年的總天數 */
function lYearDays(year) {
	var i, sum = 348;
    for(i=0x8000; i>0x8; i>>=1)
    	sum += (lunarInfo[year-1900] & i)? 1: 0;
    return (sum+leapDays(year));
}

/* 返回農曆y年閏月的天數 */
function leapDays(year) {
	if (leapMonth(year)) 
		return((lunarInfo[year-1900] & 0x10000)? 30: 29);
    else
    	return (0);
}

/* 返回農曆y年閏哪個月 1-12 , 沒閏返回 0 */
function leapMonth(year) {
    return(lunarInfo[year-1900] & 0xf);
}

/* 返回農曆year年month月的總天數 */
function monthDays(year, month) {
    return( (lunarInfo[year-1900] & (0x10000>>month))? 30: 29 );
}

/* 某年的第n個節氣為幾日(從0小寒起算) */
function sTerm(y, n) {
   return (solarTermBase[n] + Math.floor( solarTermOS.charAt( ( Math.floor(solarTermIdx.charCodeAt(y-1900)) - 48) * 24 + n  ) ) );
}

/* 算出農曆, 傳入日期物件, 返回農曆日期物件包含屬性 .year .month .day .isLeap */
function lunar(dateObj) {
    var i, leap=0, temp=0;
    var offset = (Date.UTC(dateObj.getFullYear(),dateObj.getMonth(),dateObj.getDate()) - Date.UTC(1900,0,31))/86400000;
    for(i=1900; i<2050 && offset>0; i++) {
    	temp = lYearDays(i);
    	offset -= temp;
	}
    if (offset<0) {
    	offset+=temp;
    	i--;
    }
    this.year = i;
    leap = leapMonth(i); //閏哪個月
    this.isLeap = false;

    for (i=1; i<13 && offset>0; i++) {//閏月
     if (leap>0 && i==(leap+1) && this.isLeap==false) {
    	 --i;
    	 this.isLeap = true;
    	 temp = leapDays(this.year);
     } else {
    	 temp = monthDays(this.year, i);
     }
     //解除閏月
     if(this.isLeap==true && i==(leap+1))
    	 this.isLeap = false;
     offset -= temp;
    }

    if (offset==0 && leap>0 && i==leap+1)
    if (this.isLeap) {
    	this.isLeap = false;
    } else {
    	this.isLeap = true; --i;
    }

    if (offset<0) {
    	offset += temp; --i;
    }

    this.month = i;
    this.day = offset + 1;
}

function getLunarDateStr(date) {
	var y = date.getFullYear();
	var m = date.getMonth();
	var d = date.getDate();
	var l = new lunar(date);	
	var lM = l.month.toFixed(0);
    var pre = (l.isLeap) ? '閏' : '';
    var mStr = pre + lunarMonth[lM-1] + '月';
    var lD = l.day.toFixed(0);// - 1;    
    pre = (lD <= 10) ? '初' : ((lD <= 19) ? '十' : ((lD <= 29) ? '廿' : '三'));
    var dStr = pre + lunarNum[lD % 10];
    var festival = '';
    var termStr = (d == sTerm(y, m*2)) ? solarTerm[m*2] : ((d == sTerm(y, m*2+1)) ? solarTerm[m*2+1] : '');
    if (termStr == '清明')
		festival += " 清明節";
    if (termStr != '') termStr = " " + termStr;
    
    //國曆節日
    for(var i in twFestivalS) { 
		if ((twFestivalM[i] == (m+1)) && (twFestivalD[i] == d)) {
			festival += " " + twFestivalS[i];
		}
    }
    //農曆節日
    for(var j in lunarFestivalS) {
		if ((lunarFestivalM[j] == lM) && (lunarFestivalD[j] == lD)) {
			festival += " " + lunarFestivalS[j];
		}
    }
	if ((lM == 12) && (lD == monthDays(y, 12))) {
		festival += " 除夕";
	}
	//月周節日
	var thisMonthFirstDate = new Date(y, m, 1);
	var firstWeek = thisMonthFirstDate.getDay();
	for(var k in weekFestavalS) {
		if (weekFestavalM[k] == (m+1)) {
			var w = weekFestavalW[k];
			var wday = weekFestavalD[k];
			if (w < 5) {
				if((((firstWeek > wday)? 7 : 0) + 7*(w-1) + wday - firstWeek + 1) == d) {
					festival += " " + weekFestavalS[k];
				} else {
					w -= 5;					
					var len = uiCommonGetMonthDays(m+1, y);
					var tmp = (firstWeek + len - 1) % 7; 					
					if ((len - tmp - 7*w + wday - (wday>tmp?7:0)) == d)
						festival += " " + weekFestavalS[k];
				}
			}
		}
    }
    return "(農曆" + mStr + dStr + termStr + ")" + festival;
}