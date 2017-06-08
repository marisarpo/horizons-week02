"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('.show-replies').hide();	

$('.post').on('click', function(){
	var author = window.prompt("Enter your name");
	var author_comment = window.prompt("Enter a comment");
	var new_comment = $('<div class="comment"> <div class="author">' + author + ' says:</div> <div class="message">' + author_comment + '</div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button> <button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button> </div> <div class="replies"></div>  </div>);');
	$('.container .col-xs-10 .comments').append(new_comment);
})

// Everytime the reply button in comments is clicked on, do all this crap
$('.comments').on('click','.reply',function(){
	var author = window.prompt("Enter your name");
	var author_comment = window.prompt("Enter a comment");
	var new_comment = $('<div class="comment"> <div class="author">' + author + ' says:</div> <div class="message">' + author_comment + '</div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button> <button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button> </div> <div class="replies"></div>  </div>);');
	var $this = $(this);
	var commentDiv = $this.closest('.comment');
	var repliesDiv = commentDiv.children('.replies');
	repliesDiv.append(new_comment);
 
})

$('.comments').on('click', '.hide-replies', function(){
	var $this = $(this);
	var commentDiv = $this.closest('.comment');
	var repliesDiv = commentDiv.children('.replies');
	var num_replies = commentDiv.find('.replies').length-1;
	repliesDiv.hide();
	commentDiv.children('.controls').children('.hide-replies').toggle();
	commentDiv.children('.controls').children('.show-replies').toggle();
	})

$('.comments').on('click', '.show-replies', function(){
	var $this = $(this);
	var commentDiv = $this.closest('.comment');
	var repliesDiv = commentDiv.children('.replies');
	repliesDiv.show();
	commentDiv.children('.controls').children('.hide-replies').toggle();
	commentDiv.children('.controls').children('.show-replies').toggle();
})