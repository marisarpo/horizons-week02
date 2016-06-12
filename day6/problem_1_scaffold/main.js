$("ul").click(function(e) {
	var i = -1;
	var newChild = e.target;
	while((newChild) != null) {
		newChild = newChild.previousElementSibling;
		i++;
	}
	return $("span").html('That was li index #' + i);
})