/*====================================================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////

 Author : http://www.metaphase.co.jp
 created: 2007/11/01
 update : 2008/07/16

//////////////////////////////////////////////////////////////////////////////////////////////////////
====================================================================================================*/

var metaLoader = {

	conf : {
		loader : "jsloader.js",
		loadJS : ["rollover.js","ie6csshover.htc","mm_swap.js"]
	},
	
	main : function(){
		var script = document.getElementsByTagName("script");
		for(var i=0;i<script.length;i++){
			if(script[i].getAttribute("src") && script[i].getAttribute("src").match(metaLoader.conf.loader)){
				
				locationStr = location+""
				var DirArray = new Array();
				var N=0;
				while (true) { 
				 DirArray[N] = locationStr.slice(0,locationStr.indexOf("/"));
				 locationStr = locationStr.slice(locationStr.indexOf("/")+1,locationStr.length);
				 N++;
				 if (locationStr.indexOf("/")==-1) {
					break;
				 }
				}
				
				var scriptSrc = script[i].getAttribute("src");
				scriptSrc      = scriptSrc.replace(/\.\.\//g, "");
				
				var loaderDir = "";
				if(scriptSrc.match(/^http\:|^https\:|^file\:|^\//)){
					loaderDir = scriptSrc.replace(metaLoader.conf.loader,"");
				}
				else {
					var upperDirLength = script[i].getAttribute("src").match(/\.\.\//g) ? script[i].getAttribute("src").match(/\.\.\//g).length : 0 ;
					
					for(j=0;j<(DirArray.length - upperDirLength);j++){
						loaderDir += DirArray[j]+'/'
					}
					loaderDir = loaderDir.slice(0, -1) + '/' + scriptSrc ;
					loaderDir = loaderDir.slice(0,-1 * metaLoader.conf.loader.length);
				}				
		
				for(j=0;j<metaLoader.conf.loadJS.length;j++){
					
					if (!metaLoader.conf.loadJS[j].match(/^\/|^http\:|^https\:|^\.\.\//)) {
						metaLoader.setJS(loaderDir+metaLoader.conf.loadJS[j])
					}
					else if (metaLoader.conf.loadJS[j].match(/^\/|^http\:|^https\:/)) {
						metaLoader.setJS(metaLoader.conf.loadJS[j])
					}
					else if (metaLoader.conf.loadJS[j].match(/^\.\.\//)) {
						
						var setDirArray = new Array();
						
						setDir = loaderDir;
						N=0;
						while (true) { 
							setDirArray[N] = setDir.slice(0,setDir.indexOf("/"));
							setDir = setDir.slice(setDir.indexOf("/")+1,setDir.length);
							N++;
							if (setDir.indexOf("/")==-1) {
								break;
							}
						}
						
						upperDirArray = metaLoader.conf.loadJS[j].match(/\.\.\//g);
						var dir =""
						for(k=0;k<(setDirArray.length - upperDirArray.length);k++){
							dir += setDirArray[k]+'/'
						}

						// remove "../"
						metaLoader.conf.loadJS[j] = dir + metaLoader.conf.loadJS[j].replace(/\.\.\//g, "")
						metaLoader.setJS(metaLoader.conf.loadJS[j])
						
					}
				}
				
			break;
			}
		}
	}, // END OF metaLoader.main
		
	setJS : function(filePath){
		script = document.createElement("script");
		script.setAttribute("src",filePath);
		script.setAttribute("type","text/javascript");
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	
}

metaLoader.main()