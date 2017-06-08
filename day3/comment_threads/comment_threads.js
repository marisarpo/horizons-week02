"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {
	$('.show-replies').hide();

	var input = '<div class="comment"> <div class="author">"';
	var input1 = '" says: </div> <div clsas="message">'
	var input2 = '</div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button>';
	var input3 = '<button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button>';
	var input4 = '</div> <div class="replies"></div> </div>';
	var author = "anonymous";
	var comment = "none";

	$('.post').on('click', function() {
		author = prompt("Enter your name")
		comment = prompt("Enter your comment")

		$('.comments').append($(input+author+input1+comment+input2+input3+input4))
	})

	$('.comments').on('click', '.reply', function() {
		var $this = $(this);
		var commentDiv = $this.closest('.comment');
		var repliesDiv = commentDiv.children('.replies');

		author = prompt("Enter your name")
		comment = prompt("Enter your comment")

		repliesDiv.append($(input+author+input1+comment+input2+input3+input4));
	})

	$('.comments').on('click', '.hide-replies', function() {
		var $this = $(this);
		var commentDiv = $this.closest('.comment');
		var repliesDiv = commentDiv.children('.replies');
		var showRepliesDiv = $this.siblings('.show-replies');
		var count = commentDiv.find('.replies').length-1;
		
		repliesDiv.hide();
		$this.hide();
		showRepliesDiv.show();
		showRepliesDiv.text("Show Replies ("+count+")");
	})

	$('.comments').on('click', '.show-replies', function() {
		var $this = $(this);
		var commentDiv = $this.closest('.comment');
		var repliesDiv = commentDiv.children('.replies');

		repliesDiv.show();
		$this.hide();
		$this.siblings('.hide-replies').show();
	})

})
