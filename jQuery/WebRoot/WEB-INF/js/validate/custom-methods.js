//自定義byte最大長度驗證
jQuery.validator.addMethod("byteMaxLength", function(value, element, maxlength) {
    return this.optional(element) || uiCommonValidateByteMaxLength(value, element, maxlength);
},jQuery.validator.format("請輸入長度小於 {0} 的字串"));

//自定義byte最小長度驗證
jQuery.validator.addMethod("byteMinLength", function(value, element, minlength) {
    return this.optional(element) || uiCommonValidateByteMinLength(value, element, minlength);
},jQuery.validator.format("請輸入長度大於 {0} 的字串"));

//自定義byte長度範圍驗證
jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
    return this.optional(element) || uiCommonValidateByteRangeLength(value, element, param);
},jQuery.validator.format("請輸入長度介於 {0} 和 {1} 之間的字串"));

//自定義身分證號檢驗
jQuery.validator.addMethod("citizenId", function(value, element) {
	return this.optional(element) || uiCommonValidateCitizenId(value, element);
},"IDN格式不符");

//自定義外國人護照號碼檢驗
jQuery.validator.addMethod("passportId", function(value, element) {    
    return this.optional(element) || uiCommonValidatePassportId(value, element);
},"IDN格式不符");

//自定義營利事業統編檢驗
jQuery.validator.addMethod("taxId", function(value, element) {    
	return this.optional(element) || uiCommonValidateTaxId(value, element);
},"BAN格式不符");

//自定義身分證號或外國人護照號碼檢驗
jQuery.validator.addMethod("citizenIdOrPassportId", function(value, element) {
	return this.optional(element) || uiCommonValidateCitizenId(value, element) || uiCommonValidatePassportId(value, element);
},"IDN格式不符");

//自定義身分證號或營利事業統編檢驗
jQuery.validator.addMethod("citizenIdOrTaxId", function(value, element) {
	return this.optional(element) || uiCommonValidateCitizenId(value, element) || uiCommonValidateTaxId(value, element);
},"IDN或BAN格式不符");