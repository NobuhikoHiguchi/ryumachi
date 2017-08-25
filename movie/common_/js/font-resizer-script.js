function fontResizer(defaultSize){
  var savedSize = getCookie('fontSizer') - 0;
		var curSize = defaultSize;
		var bodySize;
		
		if (savedSize == 0) {
			curSize = defaultSize;
		}
		else{
			curSize = savedSize;
		}
		
 bodySize = curSize / 16 * 100;
	$('body').css('font-size', bodySize + "%");
		
	$(".fontSizeMinus").click(function(){
		if (curSize > 8 ){
			curSize = curSize - 2;
		}
		else{
		}
		bodySize = curSize / 16 * 100;
		$('body').css('font-size', bodySize + "%");
		saveState(curSize);
	});

	$(".fontSizeNormal").click(function(){
		curSize = 12;
		bodySize = curSize / 16 * 100;
		$('body').css('font-size', bodySize + "%");
		saveState(curSize);
	});

	$(".fontSizePlus").click(function(){
		if (curSize < 16 ){
			curSize = curSize + 2;
		}
		else{
		}
		bodySize = curSize / 16 * 100;
		$('body').css('font-size', bodySize + "%");
		saveState(curSize);
	});

	function saveState(curSize) {
		var date = new Date();
		date.setTime(date.getTime()+(7*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
		document.cookie = "fontSizer"+"="+curSize+expires+"; path=/";
	}

	function getCookie(c_name) {
		if (document.cookie.length>0) {
			c_start=document.cookie.indexOf(c_name + "=");
			if (c_start!=-1) {
				c_start=c_start + c_name.length+1;
				c_end=document.cookie.indexOf(";",c_start);
				if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));
			}
		}
		return "";
	}
}

$(document).ready(function() {
 fontResizer(12);
});
