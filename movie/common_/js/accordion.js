$(document).ready(function() {
 $(".accordion dd").css("display","none");
 $(".accordion dd.preOpen").css("display","block");
 $(".accordion dd.preOpen").prev().addClass("iconSortDown");

 $(".accordion dt a").click(function(){
	var elm;
	if(this.parentNode.nodeName=="DT")
		elm = $(this).parent();
	else if(this.parentNode.parentNode.nodeName=="DT")
		elm = $(this).parent().parent();
	  
  elm.next().slideToggle("fast",
   function(){
    if(this.style.display=="block"){
     $(this).prev().addClass("iconSortDown");
    }
    else{
     $(this).prev().removeClass("iconSortDown");
		 $(this).removeClass("preOpen");
    }
   }
  );
	return false;
 });
});

