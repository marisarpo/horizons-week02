// 1. Add a click hander to 'x' button
// 2. Inside the click handler find the alert div and make it disappear using $.hide()

// YOUR CODE HERE

// $(document).ready(function() {
//     $(".button").click(function(){
//         alert("button");
//     }); 
// });



$(function() {
	$("button").click(function() {
		console.log("clicked");
		$("div").hide("slow");
	});
});

// $(document).ready("#close").click(function() {
//       alert('button clicked');
// });
