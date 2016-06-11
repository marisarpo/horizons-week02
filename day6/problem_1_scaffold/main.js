


$("li").click(function(e) {
	console.log("hadsadsf");
	var arr = $(e.target).parent().children();
	console.log("arr: " + arr);
	for (var i = 0; i < arr.length; i++) {
		if (e.target === arr[i]) {
			count = i;
			console.log("count " + count);
			console.log(i);
			$('span').html("This index" + count);
		}
	}
});


