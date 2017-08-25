	//ua.js

var ua = navigator.userAgent;
if (ua.indexOf("iPad") >= 0 || ua.indexOf("iPhone") >= 0 || ua.indexOf("iPod") >= 0 || ua.indexOf("Android") >= 0 || ua.indexOf("Windows Phone") >= 0) {
	if( typeof window.devicePixelRatio !== "undefined" ){
		var ww = $(window).width();
		var wh = $(window).height();
		var sw = screen.width;
		var sh = screen.height;

		var iw;
		if( ww < wh ){
			iw = ww
		}else{
			iw = wh
		}

		if( ua.indexOf( "Nexus 7 Build" ) != -1 ){
			/*
				Nexus 7用　css / js の読み込み
			*/
//		document.write( "横インチ: " + iw + " >> Nexus 7" );
			document.write('<script type="text/javascript" src="/js/accordion.js"><\/script>');	
		}else if( iw < 640 ){
			/*
				sp用　css / js の読み込み
			*/
//			document.write( "横インチ: " + iw + " >> スマフォ" );
			document.write('<script type="text/javascript" src="/js/accordion.js"><\/script>');
		}else{
			/*
				tablet用 css / js の読み込み
			*/
//		document.write( "横インチ: " + iw + " >> タブレット" );

//			document.write('<script type="text/javascript" src="/js/accordion.js">');

}
	}else{
		/*
			windows phone 等
		*/
//		document.write( " >> win phone" );
//			document.write('<script type="text/javascript" src="/js/accordion.js">');

}
}else{
	/*
		PC
	*/

//document.write( " >> PC" );	
//			document.write('<script type="text/javascript" src="/js/accordion.js">');
}


