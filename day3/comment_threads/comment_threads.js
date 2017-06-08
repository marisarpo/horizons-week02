"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {
	$('.show-replies').hide();

	$('.post').on('click', function() {
		var author = prompt('Enter your name.');
		var comment = prompt('Enter your comment');
		$('.comments').append(
		'<div class="comment">\
		  <div class="author">' + author + 'says:</div>\
		  <div class="message">' + comment + '</div>\
		  <div class="controls">\
		    <button class="hide-replies btn btn-default">Hide Replies</button>\
		    <button class="show-replies btn btn-default">Show Replies</button>\
		    <button class="reply btn btn-default">Reply</button>\
		  </div>\
		  <div class="replies"></div>\
		</div>');
	})
	$('.comments').on('click','.reply', function() {
		var author = prompt('Enter your name.');
		var comment = prompt('Enter your comment');
		var numOfReplies = $(this).parent().next().find('.comment').length;
		$(this).closest('.comment').children('.replies').append(
		'<div class="comment">\
		  <div class="author">' + author + 'says:</div>\
		  <div class="message">' + comment + '</div>\
		  <div class="controls">\
		  	<div class="num-replies">Number of replies: 0</div>\
		    <button class="hide-replies btn btn-default">Hide Replies</button>\
		    <button class="show-replies btn btn-default">Show Replies</button>\
		    <button class="reply btn btn-default">Reply</button>\
		  </div>\
		  <div class="replies"></div>\
		</div>');
		$(this).closest('.comment').children('.num-replies').text("Number of replies: " + numOfReplies);
	})
	$('.comments').on('click','.hide-replies', function() {
		$(this).parent().next().hide();
		$(this).hide();
		$(this).siblings('.show-replies').show();
	})
	$('.comments').on('click','.show-replies', function() {
		$(this).parent().next().show();
		$(this).hide();
		$(this).siblings('.hide-replies').show();
	})
});