// var names = $('ol').children();
var names = [];
for (var i = 0; i < $('ol').children(); i++) {
	names = names.push($('ol').children()[i]);
}

console.log(names)

var findIndex = function(name) {
	console.log(name);
	for(var i = 0; i < names.length; i++) {	
		if (name === names[i]);
		return i;
	}
}


$('li').on('click', function() {
	//$('ol').each(function(i) {
	//console.log($('this').parent());
 	$('.indexValue').text('That was div index #' + i);	
});
//});


// put names into array, check if the name