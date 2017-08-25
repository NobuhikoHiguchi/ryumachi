//

new function(){
	var overFn = function(){
		var imgObj = document.getElementsByTagName("img");
		var preload = new Array();
		for(var i=0, i_len = imgObj.length ; i < i_len; i++){
			var unitC = imgObj[i].className.split(/\s+/);
			for(var k=0, k_len = unitC.length; k < k_len; k++){
				if(unitC[k] == "rollover"||imgObj[i].getAttribute("src").match("_off.")){
					preload[i]=new Image();
					preload[i].src = imgObj[i].getAttribute("src").replace("_off.", "_on.");
					imgObj[i].onmouseover = function(){
						this.setAttribute("src",this.getAttribute("src").replace("_off.","_on."));
					}
					imgObj[i].onmouseout = function(){
						this.setAttribute("src",this.getAttribute("src").replace("_on.", "_off."));
					}
					break;
				}
			}
		}
	}		
	function addEvent(elm,listener,fn){
		try{
			elm.addEventListener(listener,fn,false);
		}catch(e){
			elm.attachEvent("on"+listener,fn);
		}
	}
	addEvent(window,"load",overFn);
}


//mobile proxy  iPadでの見栄え制御

var d = window.document;
if(navigator.userAgent.indexOf('iPad') > -1)
	d.write('<meta name="viewport" content="width=1024; initial-scale=1.0;" />');

	
//text resize

jQuery(document).ready( function() {
    jQuery( "#textsizer a" ).textresizer({
        target: "#contents,#footer-link",                       // 対象要素
        type: "fontSize",                        // サイズ指定方法
        sizes: [ "75%", "100%", "125%", "140%"],// フォントサイズ
        selectedIndex: 1                         // 初期表示
    });
});



//scroll
$(function(){
	var pagetop = $('.pagetop a');
	pagetop.click( function(e) {
		e.preventDefault();
		$('body, html').animate({ scrollTop: 0 }, 500);
		// return false;
	});
}); 