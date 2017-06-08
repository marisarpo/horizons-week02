"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {
	$('.show-replies').hide();

	$('.post').on('click', function() {
		var author = prompt('Enter your name');
		var comment = prompt('Enter your comment');
		var newElem = $('<div class="comment"><div class="author">"' + author + '" says:</div>' +
			'<div class="message">' + comment + '</div>' + 
			'<div class="controls">' +
				'<button class="hide-replies btn btn-default">Hide Replies</button>' +
				'<button class="show-replies btn btn-default">Show Replies</button>' +
				'<button class="reply btn btn-default">Reply</button>' +
			'</div>' + '<div class="replies"></div></div>');
		$('.comments').append(newElem);
	})

	$('.comments').on('click', '.reply', function() {
		var author = prompt('Enter your name');
		var comment = prompt('Enter your comment');
		var $this = $(this);
  	var commentDiv = $this.closest('.comment');
  	var repliesDiv = commentDiv.children('.replies');
  	var newElem = $(`<div class="comment"><div class="author">"${author}" says:</div>
			<div class="message">${comment}</div>  
			<div class="controls"> 
				<button class="hide-replies btn btn-default">Hide Replies</button> 
				<button class="show-replies btn btn-default">Show Replies</button> 
				<button class="reply btn btn-default">Reply</button> 
			</div>
			<div class="replies"></div></div>`);
  	repliesDiv.append(newElem);
	})

	$('.comments').on('click', '.hide-replies', function() {
		var $this = $(this);
  	var commentDiv = $this.closest('.comment');
  	var repliesDiv = commentDiv.children('.replies');
  	//var showReplies = commentDiv.children().children('.show-replies');
  	repliesDiv.hide();
  	$(this).hide();
  	$this.siblings('.show-replies').show();

  	var count = commentDiv.find('.replies').length - 1;
  	$this.siblings('.show-replies').text('Show Replies ' + `(${count})`);
	})
	$('.comments').on('click', '.show-replies', function() {
		var $this = $(this);
  	var commentDiv = $this.closest('.comment');
  	var repliesDiv = commentDiv.children('.replies');
  	//var hideReplies = commentDiv.children().children('.hide-replies');
  	repliesDiv.show();
  	$(this).hide();
  	$this.siblings('.hide-replies').show();
	})

})
