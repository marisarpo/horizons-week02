"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {
	var show = $(this).find('.show-replies');
	show.hide();

	$('.post').on('click', function() {
		var author = prompt("Please enter an author name.");
		var comment = prompt("Please enter a comment");

		var newComment = $(`<div class="comment">
						  <div class="author">` + author + ` says:</div>
						  <div class="message">` + comment + `</div>
						  <div class="controls">
						    <button class="hide-replies btn btn-default">Hide Replies</button>
						    <button class="show-replies btn btn-default">Show Replies</button>
						    <button class="reply btn btn-default">Reply</button>
						  </div>
						  <div class="replies"></div>
						</div>`);

		$('.comments').append(newComment);
	})

	$('.comments').on('click', '.reply', function() {
		var author = prompt("Please enter an author name.");
		var comment = prompt("Please enter a comment");

		var newComment = $(`<div class="comment">
						  <div class="author">` + author + ` says:</div>
						  <div class="message">` + comment + `</div>
						  <div class="controls">
						    <button class="hide-replies btn btn-default">Hide Replies</button>
						    <button class="show-replies btn btn-default">Show Replies</button>
						    <button class="reply btn btn-default">Reply</button>
						  </div>
						  <div class="replies"></div>
						</div>`);

		var commentDiv = $(this).closest('.comment');
	  	var repliesDiv = commentDiv.children('.replies');

		repliesDiv.append(newComment);
	})

	$('.comments').on('click', '.hide-replies', function() {
		var commentDiv = $(this).closest('.comment');
	  	var repliesDiv = commentDiv.children('.replies');
	  	repliesDiv.hide();

	  	$(this).hide();
	  	var control = $(this).closest('.controls')
	  	var show = control.find('.show-replies');
	  	show.show();

	})

	$('.comments').on('click', '.show-replies', function() {
		var commentDiv = $(this).closest('.comment');
	  	var repliesDiv = commentDiv.children('.replies');
	  	repliesDiv.show();

	  	$(this).hide();
	  	var control = $(this).closest('.controls')
	  	var hide = control.find('.hide-replies');
	  	hide.show();
	})
});
