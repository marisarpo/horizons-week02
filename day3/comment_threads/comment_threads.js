"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function(){
	var userName = prompt("Enter your name");
	var comment = prompt("Add commentary here")
	var newComment = $('<div class="comment"><div class="author">"' + userName +'" says:</div><div class="message">"' + comment + '"</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>')
	$(".comments").append(newComment)

})

$('.comments').on('click', '.reply', function(){
	var userName = prompt("Enter your name");
	var comment = prompt("Add commentary here")
	var newComment = $('<div class="comment"><div class="author">"' + userName +'" says:</div><div class="message">"' + comment + '"</div><div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div><div class="replies"></div></div>')

  // `this` points to the current `.reply` button that was clicked
  	var $this = $(this);
  	var commentDiv = $this.parent();
  	var repliesDiv = commentDiv.siblings('.replies');
  	repliesDiv.append(newComment);
})

$('.comments').on('click', '.hide-replies', function(){
	$(this).closest('.comment').children('.replies').hide();
	// $(this).parent().find('.controls')
})

$('.comments').on('click', '.show-replies', function(){
	$(this).closest('.comment').children('.replies').show()
	// $(this).parent().find('.controls')
	
// 	$(this).parent().append(newComment);
})