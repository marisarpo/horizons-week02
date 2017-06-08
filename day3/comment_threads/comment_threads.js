"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(".post").on("click", function() {
	// var author = window.prompt("Enter name");
	// var message = window.prompt("Enter comment");

	var newComment = $('<div class="comment">')
	newComment.append('<div class="author">')

	$(".comments").append(newComment)
});



