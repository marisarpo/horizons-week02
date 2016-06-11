$("#list").children().each(function(i) {
	$(this).on("click", function(){
		var index = i;
		$("#print").text(index);
	});
});