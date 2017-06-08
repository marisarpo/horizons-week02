"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function(){
	$('.show-replies').hide()

	$('button.post').on('click',function(){
		var author_prompt = prompt("Enter an Author")
		var comment_prompt =prompt("Enter a Comment")
		var html = 
		`<div class="comment">
		  <div class="author"> ${author_prompt} says:</div>
		  <div class="message"> ${comment_prompt} </div>
		  <div class="controls">
		    <button class="hide-replies btn btn-default">Hide Replies</button>
		    <button class="show-replies btn btn-default">Show Replies</button>
		    <button class="reply btn btn-default">Reply</button>
		  </div>
		  <div class="replies"></div>
		</div>
		`
		$('div.comments').append(html)
	});

	$('.comments').on('click','.reply',function() {
	  var $this = $(this);
	  var commentDiv = $this.closest('.comment');
	  var repliesDiv = commentDiv.children('.replies');
	  var author_prompt = prompt("Enter an Author")
	  var comment_prompt =prompt("Enter a Comment")
	  var html = 
		`<div class="comment">
		  <div class="author"> ${author_prompt} says:</div>
		  <div class="message"> ${comment_prompt} </div>
		  <div class="controls">
		    <button class="hide-replies btn btn-default">Hide Replies</button>
		    <button class="show-replies btn btn-default">Show Replies</button>
		    <button class="reply btn btn-default">Reply</button>
		  </div>
		  <div class="replies"></div>
		</div>
		`
	  repliesDiv.append(html);
	});

	$('.comments').on('click','.hide-replies',function(){
      var $this = $(this);
	  var commentDiv = $this.closest('.comment');
	  var repliesDiv = commentDiv.children('.replies');
	  repliesDiv.hide()
	  
	  $this.hide();
  	  // $this.closest('.controls').find('.show-replies').show();
  	  var num_reply = repliesDiv.children().length
  	  $this.closest('.controls').find('.show-replies').text("Show Replies ("+num_reply+")").show()

	});

	$('.comments').on('click','.show-replies',function(){
      var $this = $(this);
	  var commentDiv = $this.closest('.comment');
	  var repliesDiv = commentDiv.children('.replies');
	  repliesDiv.show()
	  $this.hide();
  	  $this.closest('.controls').find('.hide-replies').show();
	});

});
