"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE


//Post Comment
$('.post').on('click', function(){
	var author = prompt('Enter your name');
	var comment = prompt('Enter your comment');

	//Create new div
	var commentSec = $(`
		<div class="comment">
		  <div class="author">` + author + `"says:"</div>
		  <div class="message">c` + comment + `</div>
		  <div class="controls">
		    <button class="hide-replies btn btn-default">Hide Replies</button>
		    <button class="show-replies btn btn-default">Show Replies</button>
		    <button class="reply btn btn-default">Reply</button>
		  </div>
		  <div class="replies"></div>
		</div>
		`);

	//append the comment
	$('.comments').append(commentSec);
	$('.show-replies').hide();
});

//Reply
$('.comments').on('click','.reply', function(){
	var author = prompt('Enter your name');
	var comment = prompt('Enter your comment');

	//Create new div
	var commentSec = $(`
		<div class="comment">
		  <div class="author">${author} says:"</div>
		  <div class="message">${comment} </div>
		  <div class="controls">
		    <button class="hide-replies btn btn-default">Hide Replies</button>
		    <button class="show-replies btn btn-default">Show Replies</button>
		    <button class="reply btn btn-default">Reply</button>
		    <div class="btn" id="count"></div>
		  </div>
		  <div class="replies"></div>
		</div>
		`);

  // `this` points to the current `.reply` button that was clicked
	  var $this = $(this);
	  var commentDiv = $this.closest('.comment');
	  var repliesDiv = commentDiv.children('.replies');
	  repliesDiv.append(commentSec);
})

//Hide
$('.comments').on('click', '.hide-replies', function(){
	  var $this = $(this);
	  var commentDiv = $this.closest('.comment');
	  var repliesDiv = commentDiv.children('.replies');
	  $(repliesDiv).hide();
	  $(this).hide();
	  $(this).siblings('.show-replies').show();
	  $(this).siblings('#count').html($(this).parent().siblings('.replies').find('.comment').length);
	  console.log($(this).parent().siblings('.replies').find('.comment').length);

})

//Show
$('.comments').on('click', '.show-replies', function(){
	  var $this = $(this);
	  var commentDiv = $this.closest('.comment');
	  var repliesDiv = commentDiv.children('.replies');
	  $(repliesDiv).show();
	  $(this).hide();
	  $(this).siblings('.hide-replies').show();
})

//Hide Show Replies Button
$(window).on('load', function(){
	  var $this = $(this);	
	  var commentDiv = $this.closest('.comment');
	  var repliesButton = commentDiv.children('.show-replies');
	  $(repliesButton).hide();
	  $('.show-replies').hide();
})

