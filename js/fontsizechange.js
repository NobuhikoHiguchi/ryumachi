//font size change
var domainname = ".chugai-ra.jp";
//var domainname = ".chugai.maxmouse-local.com";
var fs_fontsize;
var flg = false;

function set_font_size_change(fsc){
	var expires = new Date();
	expires.setTime(expires.getTime() + 365*24*60*60*1000);
	setCookie(fs_key,fsc,domainname,"expires=" + expires.toGMTString());
//	location.reload();
	flg = true;
fs_fontsize = fsc;
if (fs_fontsize == "big"){
	fs = fs_big;
}else if (fs_fontsize == "small"){
	fs = fs_small;
}else{
	fs = fs_middle;
}
if(document.body){
	document.body.style.fontSize = fs+"%";
}
init_font_size_btn();


}

function setCookie(key,val,domain,limit){
	var tmp = key + "=" + escape(val) + ";domain=" + domain + ";path=/;";
	tmp += limit;
	document.cookie = tmp;
}

function get_font_size_change(key){
	var tmp = document.cookie+";";
	var i = tmp.indexOf(key+"=",0);
	if (i != -1){
		i += (key.length + 1);
		var j = tmp.indexOf(";",i);
		var value = tmp.substring(i,j);
		return (unescape(value));
	}else{
		return "";
	}
}


var init_font_size_btn = function(){
	//ƒ{ƒ^ƒ“
	if (fs_fontsize == "big"){
		document.getElementById("font_big_btn").src = big_button_on;
		document.getElementById("font_middle_btn").src = middle_button_off;
		document.getElementById("font_small_btn").src = small_button_off;
	}else if (fs_fontsize == "middle"){
		document.getElementById("font_big_btn").src = big_button_off;
		document.getElementById("font_middle_btn").src = middle_button_on;
		document.getElementById("font_small_btn").src = small_button_off;
	}else{
		document.getElementById("font_big_btn").src = big_button_off;
		document.getElementById("font_middle_btn").src = middle_button_off;
		document.getElementById("font_small_btn").src = small_button_on;
	}

}

function swapImageIn(imgObj){
	if(imgObj.getAttribute("src").match("_in.") != null){
		flg = true;
	}
	imgObj.setAttribute("src",imgObj.getAttribute("src").replace("_out.","_in."));
}


function swapImageOut(imgObj){
	if(!flg){
		imgObj.setAttribute("src",imgObj.getAttribute("src").replace("_in.", "_out."));
	}
	flg = false;
}


function addEvent(elm,listener,fn){
	try{
		elm.addEventListener(listener,fn,false);
	}catch(e){
		try{
			elm.attachEvent("on"+listener,fn);
		}catch(e){
		}
	}
}
addEvent(window,"load",init_font_size_btn);

