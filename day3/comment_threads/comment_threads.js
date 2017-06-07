"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function(){

$("button.post").on('click',function(){
   var author_Name = prompt("enter author");
   var comment_here = prompt("comment");
   var html = 
   `<div class="comment">
	  <div class="author">${author_Name} says:</div>
	  <div class="message">${comment_here}</div>
	  <div class="controls">
	    <button class="hide-replies btn btn-default">Hide Replies</button>
	    <button class="show-replies btn btn-default">Show Replies</button>
	    <button class="reply btn btn-default">Reply</button>
	  </div>
	  <div class="replies"></div>
	</div>
   `
   $('.comments').append(html);
})

$(".comments").on('click','.reply',function(){
  var author = prompt("enter author");
  var comment = prompt("comment");
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var html = 
   `  <div class="comment">
	      <div class="author">${author} says:</div>
	      <div class="message">${comment}</div>
	      <div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button><button class="reply btn btn-default">Reply</button></div>
	      <div class="replies"></div>
	    </div>
	  </div>
   `
   repliesDiv.append(html);
})

$('.comments').on('click','.hide-replies',function(){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  var showreplies = $this.closest('.controls').children('.show-replies');
  repliesDiv.hide();
  $this.hide();
  showreplies.show();
  var number_of_replies = repliesDiv.children().length;
  showreplies.text("Show Replies " + number_of_replies);


})

$('.comments').on('click','.show-replies',function(){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
  $this.hide();
  // var hidereplies = commentDiv.find('button.hide-replies');
  //don't use this because there are several hide-replies and all will be shown


  $this.closest('.controls').children('.hide-replies').show();
  // hidereplies.show();
})


$("button.show-replies").hide();



})

