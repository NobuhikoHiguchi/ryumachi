$(function(){

$(".accordion dt").click(function(){
	// 共通動作
	$(this).next("dd").slideToggle();
	//	$(this).next("dd").siblings("dd").slideUp(); //開きっぱなし制御

	// ドロワーメニュ内をクリックした時のみの動作
	if( $(this).closest('.drawer').length > 0 ){
		$('#sp-gnavi-wrap .drawer dt.open').eq(0).removeClass("open").siblings("dd").slideUp(); // ドロワーメニューのみ、開きっぱなし制御
	}

	// 共通動作
	$(this).toggleClass("open");	
	$(this).siblings("dt").removeClass("open");

	console.log('a');
	
});


// ドロワーメニューの開閉
$("#sp-gnavi-wrap a.menu").click(function(e){
	e.preventDefault();
	$(this).toggleClass("open");
	if( $(this).hasClass('open') ){
		$("#sp-gnavi-wrap .drawer").animate({ right: 0 },300);	
	}else{
		$("#sp-gnavi-wrap .drawer").animate({ right: '-86.5625vw' } ,300);	
	}
});


// ドロワーメニュー、現在のページをアクティブ状態に
var pathname = location.pathname;
$("#sp-gnavi-wrap .drawer a").each(function(i,ele){
	if( pathname == $(ele).attr('href') || pathname+'index.html' == $(ele).attr('href') ){
		var parent = $(ele).parent('li');
		parent.addClass('active'); // アクティブ状態にする
		parent.closest('dd').slideToggle().siblings("dt").toggleClass("open"); // dt に .open を付与
	}
});


}); 
