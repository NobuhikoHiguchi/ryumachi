function hideLayer(val) {
	if (val == 1) {
		$("#tbl2").css({visibility : "hidden"});
		$("#tbl2").css({position : "absolute"});
		$("#img2").attr("src", "/templates/professional/images/btn_med01_news-area.gif");
		$("#tbl1").css({visibility : "visible"});
		$("#tbl1").position("relative");
		$("#img1").attr("src", "/templates/professional/images/btn_med01_news-products_h.gif");
	} else if (val == 2) {
		$("#tbl1").css({visibility : "hidden"});
		$("#tbl1").position("absolute");
		$("#img1").attr("src", "/templates/professional/images/btn_med01_news-products.gif");
		$("#tbl2").css({visibility : "visible"});
		$("#tbl2").position("relative");
		$("#img2").attr("src", "/templates/professional/images/btn_med01_news-area_h.gif");
	}
}