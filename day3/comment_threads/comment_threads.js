"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {
	$('.comments .show-replies').hide();
})

$('.post').on('click', function() {
	var author = window.prompt("Enter Author");
	var comment = window.prompt("Enter Comment");

	var newElem = $("<div class='comment'><div class='author'>" + author + " says:</div>"
  	+ "<div class=comment>" + comment + "</div>" + "<div class='controls'>"
    + "<button class='hide-replies btn btn-default'>Hide Replies</button>"
    + "<button class='show-replies btn btn-default'>Show Replies</button>"
    + "<button class='reply btn btn-default'>Reply</button>"
  	+ "</div><div class='replies'></div></div>");

	$('.comments').append(newElem);
})

$('.comments').on('click', '.reply', function() {
	var author = window.prompt("Enter Author");
	var comment = window.prompt("Enter Comment");

	var newElem = $("<div class='comment'><div class='author'>" + author + " says:</div>"
  	+ "<div class=comment>" + comment + "</div>" + "<div class='controls'>"
    + "<button class='hide-replies btn btn-default'>Hide Replies</button>"
    + "<button class='show-replies btn btn-default'>Show Replies</button>"
    + "<button class='reply btn btn-default'>Reply</button>"
  	+ "</div><div class='replies'></div></div>");

	$(this).closest('.comment').children('.replies').append(newElem);
})

$('.comments').on('click', '.hide-replies', function () {
	$(this).closest('.comment').children('.replies').hide();
	$(this).closest('.comment').children('.controls').children('.hide-replies').hide();
	$(this).closest('.comment').children('.controls').children('.show-replies').show();

	var numReplies = $(this).closest('.comment').find('.comment').length;
	$(this).closest('.comment').children('.controls').children('.show-replies').text("Show Replies" + " [" + numReplies + "]");
})

$('.comments').on('click', '.show-replies', function () {
	$(this).closest('.comment').children('.replies').show();
	$(this).closest('.comment').children('.controls').children('.show-replies').hide();
	$(this).closest('.comment').children('.controls').children('.hide-replies').show();
})

