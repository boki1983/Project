var persisteduls = new Object();
var ddtreemenu = new Object();
var pgbase = $("meta[name='pagebase']").attr("content");

//////////No need to edit beyond here///////////////////////////
ddtreemenu.createTree = function(treeid, enablepersist, persistdays) {
	var ultags = $("#" + treeid + " ul");	
	if (typeof persisteduls[pgbase+treeid] == "undefined")
		persisteduls[pgbase+treeid] = (enablepersist==true && ddtreemenu.getCookie(pgbase+treeid)!="")? ddtreemenu.getCookie(pgbase+treeid).split(",") : "";
	for (var i=0; i<ultags.length; i++)
		ddtreemenu.buildSubTree(treeid, ultags[i], i);
	if (enablepersist == true) { //if enable persist feature
		var durationdays = (typeof persistdays=="undefined")? 1 : parseInt(persistdays);
		ddtreemenu.dotask(window, function() {
			ddtreemenu.rememberstate(treeid, durationdays);
		}, "unload"); //save opened UL indexes on body unload
	}
};

ddtreemenu.buildSubTree = function(treeid, ulelement, index) {
	$(ulelement).parent().addClass("submenu");	
	if (typeof persisteduls[pgbase+treeid] == "object") { //if cookie exists (persisteduls[treeid] is an array versus "" string)		
		if (ddtreemenu.searcharray(persisteduls[pgbase+treeid], index)) {
			$(ulelement).attr("rel", "open");
			$(ulelement).css("display", "block");
			$(ulelement).parent().removeClass("closed");	
			$(ulelement).parent().addClass("open");
		} else {
			$(ulelement).attr("rel", "closed");
			$(ulelement).css("display", "none");
			$(ulelement).parent().removeClass("open");	
			$(ulelement).parent().addClass("closed");
		}
	} //end cookie persist code
	else if ($(ulelement).attr("rel")==null || $(ulelement).attr("rel")==false) { //if no cookie and UL has NO rel attribute explicted added by user
		$(ulelement).attr("rel", "closed");
		$(ulelement).parent().addClass("closed");
	}
	else if ($(ulelement).attr("rel")=="open") { //else if no cookie and this UL has an explicit rel value of "open"
		ddtreemenu.expandSubTree(treeid, ulelement); //expand this UL plus all parent ULs (so the most inner UL is revealed!)
	}
	if ($(ulelement).attr("id") != treeid) {
		$(ulelement).parent().click(function(e) {
			if ($(this).parent().attr("id") == "fdcMenu") {
				ddtreemenu.preventpropagate(e);
				return;
			}
			var submenu = $(this).children("ul")[0];	
			if ($(submenu).attr("rel")=="closed") {
				$(submenu).attr("rel", "open");
				$(ulelement).parent().removeClass("closed");	
				$(ulelement).parent().addClass("open");
				$(submenu).toggle("blind", 100);
			}
			else if ($(submenu).attr("rel")=="open") {
				$(submenu).attr("rel", "closed");
				$(ulelement).parent().removeClass("open");	
				$(ulelement).parent().addClass("closed");
				$(submenu).toggle("blind", 100);
			}
			ddtreemenu.preventpropagate(e);
		});
		$(ulelement).click(function(e) {
			ddtreemenu.preventpropagate(e);
		});
	}
};

ddtreemenu.expandSubTree = function(treeid, ulelement) { //expand a UL element and any of its parent ULs	
	var currentnode = $(ulelement);
	while (currentnode.attr("id") != treeid) {
		if (currentnode.attr("tagName") == "UL") { //if parent node is a UL, expand it too
			currentnode.css("display", "block");
			currentnode.attr("rel", "open"); //indicate it's open
			currentnode.parent().removeClass("closed");	
			currentnode.parent().addClass("open");
		}
		currentnode = currentnode.parent();
	}
};

ddtreemenu.flatten = function(treeid, action) { //expand or contract all UL elements	
	var ultags = $("#" + treeid + " ul");
	for (var i=0; i<ultags.length; i++) {
		$(ultags[i]).css("display", (action=="expand")? "block" : "none");
		$(ultags[i]).attr("rel", (action=="expand")? "open" : "closed");
		if (action=="expand") {
			$(ultags[i]).parent().removeClass("closed");	
			$(ultags[i]).parent().addClass("open");
		} else {
			$(ultags[i]).parent().removeClass("open");	
			$(ultags[i]).parent().addClass("closed");
		}
	}
};

ddtreemenu.rememberstate = function(treeid, durationdays) { //store index of opened ULs relative to other ULs in Tree into cookie
	var ultags = $("#" + treeid + " ul");
	var openuls = new Array();
	for (var i=0; i<ultags.length; i++) {
		if ($(ultags[i]).attr("rel")=="open") {
			openuls[openuls.length] = i; //save the index of the opened UL (relative to the entire list of ULs) as an array element
		}
	}
	if (openuls.length == 0) //if there are no opened ULs to save/persist
		openuls[0] = "none open"; //set array value to string to simply indicate all ULs should persist with state being closed
	ddtreemenu.setCookie(pgbase+treeid, openuls.join(","), durationdays); //populate cookie with value treeid=1,2,3 etc (where 1,2... are the indexes of the opened ULs)
};

////A few utility functions below//////////////////////
ddtreemenu.getCookie = function(Name) { //get cookie value
	var re = new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
	if (document.cookie.match(re)) //if cookie found
		return document.cookie.match(re)[0].split("=")[1]; //return its value
	return "";
};

ddtreemenu.setCookie = function(name, value, days) { //set cookei value
	var expireDate = new Date();
	//set "expstring" to either future or past date, to set or delete cookie, respectively
	var expstring = expireDate.setDate(expireDate.getDate()+parseInt(days));
	document.cookie = name+"="+value+"; expires="+expireDate.toGMTString()+"; path=/";
};

ddtreemenu.searcharray = function(thearray, value) { //searches an array for the entered value. If found, delete value from array
	var isfound = false;
	for (var i=0; i<thearray.length; i++){
		if (thearray[i] == value){
			isfound = true;
			thearray.shift(); //delete this element from array for efficiency sake
			break;
		}
	}
	return isfound;
};

ddtreemenu.preventpropagate = function(e) { //prevent action from bubbling upwards
	if (typeof e != "undefined")
		e.stopPropagation();
	else
		event.cancelBubble = true;
};

ddtreemenu.dotask = function(target, functionref, tasktype) { //assign a function to execute to an event handler (ie: onunload)
	var tasktype = (window.addEventListener)? tasktype : "on"+tasktype;
	if (target.addEventListener)
		target.addEventListener(tasktype, functionref, false);
	else if (target.attachEvent)
		target.attachEvent(tasktype, functionref);
};