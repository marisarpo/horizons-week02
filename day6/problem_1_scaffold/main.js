

var names = ["Josh", "Ethan", "Moose", "Sean", "Austin", "Mandelbaum", "Anirudh", "Sperry", "Jack", "Llop"];

// $(document).ready(function() {
// 	var wrapper = $('<ul></ul>');
// 	var list = "";
// 	for(var i=0; i<names.length; i++) {
// 		list += "<li>"+names[i]+"</li>";
// 		wrapper.append(list.render());

// 		return wrapper.html();
// 	};

// })


// var children = $('<ul>').children().toArray();
// console.log($('<li>'));
// console.log(children);


// $('.add-list').click(function(e) {
//     $('#addList').collapse('toggle');
//   });

// var picked = null;
// $('.li').click(function(e) {
// 	console.log("clicked");
// 	console.log($('.li').val());
// 	for (var i=0; i<names.length; i++) {
// 		if ("<li>"+names[i]+"</li>" === $(this.li)) {
// 			var picked = i;
// 		}
// 	}
// 	return picked;
// })


$('li').on('click', function(e) {
    var x = e.target.firstChild;
    $('span').empty();
    for(var i = 0; i < $('li').length; i++){
        if(x===$('li')[i].firstChild.firstChild){
            $('span').append("This was div index #"+i);
        }
    }
});

