function common_halfToFullTypeSymbol(text) {  
  if(text) {
	  var asciiTable = "!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
	  var unicodeTable = "%uFF01%uFF02%uFF03%uFF04%uFF05%uFF06%uFF07%uFF08%uFF09%uFF0A%uFF0B%uFF0C%uFF0D%uFF0E%uFF0F%uFF1A%uFF1B%uFF1C%uFF1D%uFF1E%uFF1F%uFF20%uFF3B%uFF3C%uFF3D%uFF3E%uFF3F%FF40%uFF5B%uFF5C%uFF5D%uFF5E";
	    
	  var result = "";
	  for(var i=0; i<text.length; i++ ) {
	    var val = text.charAt(i);            
	    var j = asciiTable.indexOf(val) * 6 ;        
	    result += ( j > -1 ? unescape(unicodeTable.substring( j , j + 6 ) ) : val );    
	  }
	  return result;
  }
  else {
	  return  "";
  }
}

function common_fullToHalfTypeSymbol(text) {
	if(text) {
	    var asciiTable = "!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
	    var unicodeTable = "%uFF01%uFF02%uFF03%uFF04%uFF05%uFF06%uFF07%uFF08%uFF09%uFF0A%uFF0B%uFF0C%uFF0D%uFF0E%uFF0F%uFF1A%uFF1B%uFF1C%uFF1D%uFF1E%uFF1F%uFF20%uFF3B%uFF3C%uFF3D%uFF3E%uFF3F%FF40%uFF5B%uFF5C%uFF5D%uFF5E";
	 
	    var result = "";
	    for(var i=0; i<text.length; i++) {
	        var val = escape(text.charAt(i));
	        var j = unicodeTable.indexOf(val);
	        result += (((j > -1) && (val.length == 6)) ? asciiTable.charAt(j / 6) : text.charAt(i));
	    }
	    return result;
	}
	else {
		return "";
	}
}

function common_halfToFullTypeNumber(text) {
	if (text) {
		var asciiTable = "0123456789";
		var unicodeTable = "%uFF10%uFF11%uFF12%uFF13%uFF14%uFF15%uFF16%uFF17%uFF18%uFF19";

		var result = "";
		for ( var i = 0; i < text.length; i++) {
			var val = text.charAt(i);
			var j = asciiTable.indexOf(val) * 6;
			result += (j > -1 ? unescape(unicodeTable.substring(j, j + 6))
					: val);
		}
		return result;
	} else {
		return "";
	}
}

function common_fullToHalfTypeNumber(text) {
	if(text) {
	    var asciiTable = "0123456789";
	    var unicodeTable = "%uFF10%uFF11%uFF12%uFF13%uFF14%uFF15%uFF16%uFF17%uFF18%uFF19";
	 
	    var result = "";
	    for(var i=0; i<text.length; i++) {
	        var val = escape(text.charAt(i));
	        var j = unicodeTable.indexOf(val);
	        result += (((j > -1) && (val.length == 6)) ? asciiTable.charAt(j / 6) : text.charAt(i));
	    }
	    return result;
	}
	else {
		return "";
	}
}

function common_halfToFullTypeAlphabet(text) {
	if (text) {
		var asciiTable = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var unicodeTable = "%uFF41%uFF42%uFF43%uFF44%uFF45%uFF46%uFF47%uFF48%uFF49%uFF4A%uFF4B%uFF4C%uFF4D%uFF4E%uFF4F%uFF50%uFF51%uFF52%uFF53%uFF54%uFF55%uFF56%uFF57%uFF58%uFF59%uFF5A";
		unicodeTable += "%uFF21%uFF22%uFF23%uFF24%uFF25%uFF26%uFF27%uFF28%uFF29%uFF2A%uFF2B%uFF2C%uFF2D%uFF2E%uFF2F%uFF30%uFF31%uFF32%uFF33%uFF34%uFF35%uFF36%uFF37%uFF38%uFF39%uFF3A";
 
		var result = "";
		for ( var i = 0; i < text.length; i++) {
			var val = text.charAt(i);
			var j = asciiTable.indexOf(val) * 6;
			result += (j > -1 ? unescape(unicodeTable.substring(j, j + 6))
					: val);
		}
		return result;
	} else {
		return "";
	}
}

function common_fullToHalfTypeAlphabet(text) {
	if(text) {
	    var asciiTable = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var unicodeTable = "%uFF41%uFF42%uFF43%uFF44%uFF45%uFF46%uFF47%uFF48%uFF49%uFF4A%uFF4B%uFF4C%uFF4D%uFF4E%uFF4F%uFF50%uFF51%uFF52%uFF53%uFF54%uFF55%uFF56%uFF57%uFF58%uFF59%uFF5A";
		unicodeTable += "%uFF21%uFF22%uFF23%uFF24%uFF25%uFF26%uFF27%uFF28%uFF29%uFF2A%uFF2B%uFF2C%uFF2D%uFF2E%uFF2F%uFF30%uFF31%uFF32%uFF33%uFF34%uFF35%uFF36%uFF37%uFF38%uFF39%uFF3A";
	 
	    var result = "";
	    for(var i=0; i<text.length; i++) {
	        var val = escape(text.charAt(i));
	        var j = unicodeTable.indexOf(val);
	        result += (((j > -1) && (val.length == 6)) ? asciiTable.charAt(j / 6) : text.charAt(i));
	    }
	    return result;
	}
	else {
		return "";
	}
}