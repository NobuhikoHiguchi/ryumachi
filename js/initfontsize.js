//font size change
fs_fontsize = get_font_size_change(fs_key);
var fs;

if (fs_fontsize == "big"){
	fs = fs_big;
}else if (fs_fontsize == "middle"){
	fs = fs_middle;
}else{
	fs = fs_small;
}
if(document.body){
	document.body.style.fontSize = fs+"%";
}

var fontsize_btn_images = new Array();
for (var i=0; i<6; i++){
	fontsize_btn_images[i] = new Image();
}
fontsize_btn_images[0].src = big_button_on;
fontsize_btn_images[1].src = big_button_off;
fontsize_btn_images[2].src = middle_button_on;
fontsize_btn_images[3].src = middle_button_off;
fontsize_btn_images[4].src = small_button_on;
fontsize_btn_images[5].src = small_button_off;

