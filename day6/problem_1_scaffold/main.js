$("li").click(function(e){
	for(var i=0; i<$("li").length; i++){
		if($("li")[i].firstChild.firstChild===(e.target).firstChild){
			$("span").text("This was div index #"+i);
		}
	}
})