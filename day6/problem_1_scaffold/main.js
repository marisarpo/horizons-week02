var list = $('ul > li');
var span = $('span');
var clicked;

list.on('click', function(evt) {
	span.empty();
	var number;
	console.log(evt);
	for(var i=0; i<list.length; i++) {
		if(evt.target === list[i]) {
			clicked = list[i];
			number = i;
		}
	}
	console.log(clicked);
	span.append("<h4>You clicked on: "+ clicked.innerHTML +", index #"+number+" of the list </h4>")
})