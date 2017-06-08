"use strict";
$(document).ready(function(){





$('.post').on('click', function() {
  var author = prompt("please enter an author");
  var comment = prompt("please enter a comment");
  var newComment = $(`<div class="comment"> <div class="author">`+ author +` says:</div> <div class="message">`+ comment +`</div><div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`)

  $('.comments').append(newComment);
});


$('.comments').on('click', '.reply', function() {
    var replyAuthor = prompt("please enter an author");
    var replyComment = prompt("please enter a comment");

    var newReply = $(`<div class="comment"> <div class="author">`+ replyAuthor +` says:</div> <div class="message">`+ replyComment +`</div><div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button><button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`)

  // `this` points to the current `.reply` button that was clicked
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newReply);

})

$('.comments').on('click', '.hide-replies', function(){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
})

$('.comments').on('click', '.show-replies', function(){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
})

})
// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
