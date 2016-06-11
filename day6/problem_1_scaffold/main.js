var names = ['Jon', 'Will', 'Serrie', 'Brandon', 'Siddiqui', 'Ying Hang', 'Tom', 'David', 'Anirudh', 'Cole'];

$("li").on("click", function(e){
	for(var i = 0; i < names.length; i++){
		if(names[i] === $(e.target).text()){
			console.log($(e.target).text());
			$("span").html("That was index " + String(i));
			break;
		}
	};
});