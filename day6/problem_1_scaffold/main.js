// Names.render = function(){
// 	var wrapper = $('<ul></ul>');
// 	var nameWrapper = $('<li></li>');

// 	wrapper.append(nameWrapper);
// }

// var names = ["Josh","Ethan", "Moose","Sean", "Louis", "Andy","Anirudh","Sam","Steven","Virginia"]
// $(document).ready(function(){
// 	var wrapper = $('<ul>''</ul>');
// 	var list = "";
// 	for(var i = 0; i < names.length; i++){
// 		list += '<li>' + names[i]+'</li>'
// 	}
// 	wrapper.append(list.render());
// 	console.log(wrapper.html());
// 	return wrapper.html();
// })
// $("ul".parent).on("click", function(){
// 	$("ul").children().css
// })
// function handler( event ) {
//   var target = $( event.target );
//   if ( target.is( "li" ) ) {
//     target.children().toggle();
//   }
// }
var names = [];
$('li').on('click', function(e) {
    var x = e.target.firstChild;
    $('span').empty();
    for(var i = 0; i < $('li').length; i++){
    	if(x===$('li')[i].firstChild.firstChild){
    		$('span').append("This was div index #"+i);
    	}
    }
});

