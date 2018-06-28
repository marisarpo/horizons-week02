"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click',function(){
  var authorName = prompt('What\'s your name');
  var comment = prompt('Type your comment');
  var html = `<div class="comment">
  <div class="author">${authorName} says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`
  var newElement = $(html);

  $('.comments').append(newElement);
})

$('.comments').on('click','.reply', function(){
  var authorName = prompt('What\'s your name');
  var comment = prompt('Type your comment');
  var newElement = $(`<div class="comment">
  <div class="author">${authorName} says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newElement);
})

$('.comments').on('click','.hide-replies',function(){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
  $this.hide();
  var showButton = commentDiv.find('.show-replies');
  showButton.show();
  var countComment = commentDiv.find('.comment').length;
  console.log(countComment);
  commentDiv.append(`<div class="reply-count">${countComment} reply hidden</div>`);
})

$('.comments').on('click','.show-replies',function(){
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
  $this.hide();
  var hideButton = commentDiv.find('.hide-replies');
  console.log(hideButton);
  hideButton.show();
  commentDiv.find('.reply-count').hide();
})

$('.show-replies').hide();
