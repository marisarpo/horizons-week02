"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$('.show-replies').hide();

$('.post').on('click', function(){
	 var author = prompt("Enter your name: ");
	 var comment = prompt("Enter your comment: ");

	 var postComment = $(`<div class="comment">
	   <div class="author"> "${author}" says:</div>
	   <div class="message">${comment}</div>
	   <div class="controls">
	     <button class="hide-replies btn btn-default">Hide Replies</button>
	     <button class="show-replies btn btn-default">Show Replies</button>
	     <button class="reply btn btn-default">Reply</button>
	   </div>
	   <div class="replies"></div>
	 </div>`);

	 $('.comments').append(postComment);
})

// $('.reply').on('click', function() {
//   // `this` points to the current `.reply` button that was clicked
//   var $this = $(this);
//   var commentDiv = $this.closest('.comment'); // parent
//   console.log(commentDiv);
//   var repliesDiv = commentDiv.children('.replies');
//    var author = prompt("Enter your name: ");
//    var comment = prompt("Enter your comment: ");
//
//    var replyComment = $(`<div class="comment">
// 	 <div class="author"> "${author}" says:</div>
// 	 <div class="message">${comment}</div>
// 	 <div class="controls">
// 	   <button class="hide-replies btn btn-default">Hide Replies</button>
// 	   <button class="show-replies btn btn-default">Show Replies</button>
// 	   <button class="reply btn btn-default">Reply</button>
// 	 </div>
// 	 <div class="replies"></div>
//    </div>`);
//    // $(repliesDiv).append(replyComment);
//     $this.closest('.comment').children('.replies').append(replyComment);
// })

$('.comments').on('click', '.reply', function(){
	var $this = $(this);
	var commentDiv = $this.closest('.comment'); // parent
	console.log(commentDiv);
	var repliesDiv = commentDiv.children('.replies');
	 var author = prompt("Enter your name: ");
	 var comment = prompt("Enter your comment: ");

	 var replyComment = $(`<div class="comment">
	<div class="author"> "${author}" says:</div>
	<div class="message">${comment}</div>
	<div class="controls">
	  <button class="hide-replies btn btn-default">Hide Replies</button>
	  <button class="show-replies btn btn-default">Show Replies</button>
	  <button class="reply btn btn-default">Reply</button>
	</div>
	<div class="replies"></div>
	 </div>`);

	  $this.closest('.comment').children('.replies').append(replyComment);

})

$('.comments').on('click', '.hide-replies', function(){
	var $this = $(this);

	var repliesDiv = $this.closest('.comment').children('.replies');
	$(repliesDiv).hide();
	$this.hide();
	$('.show-replies').show();

})

$('.comments').on('click', '.show-replies', function(){
	var $this = $(this);
	var repliesDiv = $this.closest('.comment').children('.replies');
	var controlDiv = $this.closest('.comment').children('controls');
	$(repliesDiv).show();
	$this.hide();
	$('.hide-replies').show();
	var numChildren = $('.replies').children().length;
	console.log(numChildren);
	$this.append(" " + numChildren);
})
