// 1. Add a click hander to 'x' button
// 2. Inside the click handler find the alert div and make it disappear using $.hide()

// YOUR CODE HERE

// $(document).ready(function() {
//     $(".button").click(function(){
//         alert("button");
//     }); 
// });


// method 1: .click();
$(function() {
	$("button").click(function() {
		console.log("clicked");
		$("div").hide("slow");
	});
});

// method2: .on();

// $(document).ready(function() {
// 	$(document).on("click", "button", function() {
// 		$("div").hide("slow");
// 	});
// });

$(".close").click(function(){
	console.log("clicked");
	$("div").hide();
});

// $(document).ready("#close").click(function() {
//       alert('button clicked');
// });


//exercise 2
$(function() {
	$("a").click(function() {
		console.log("clicked");
    console.log(this);
    alert(this);
    return false;
	});
});

//exercise 3
$(function() {
	$("a").click(function() {
		console.log("clicked");
    console.log(this);
    alert(this);
    $(".main-image").attr('src', this);
    return false;
	});
});