// JavaScript Document
function printWindow(){
		if (window.print){
			window.print();
		} else {
			alert("お客様のブラウザでプリントアウトされる場合は、ファイルメニューの「印刷」オプションを使って出力するか、次のショートカットキーで印刷できます。Windows：「Ctrlキーを押しながらP」　Macintosh：「Commandキーを押しながらP」 ");
		}
	}