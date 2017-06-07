"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(".post").on('click', function(){
  var name = prompt("Enter your name", "username")
  var comment = prompt("Enter your comment", "comments")
  // $('.author').val(name);
  // $('.comment').eq(4).append('<div class="author">' + name + '</div>'
  var newComment = `<div class="comment">
    <div class="author">${name} says:</div>
    <div class="message">${comment}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`;


  $('.comments').append(newComment)

})

$('.comments').on('click', '.reply', function(){
  var name = prompt("Enter your name", "username")
  var comment = prompt("Enter your comment", "comments")

  var newComment = `<div class="comment">
    <div class="author">${name} says:</div>
    <div class="message">${comment}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`;

  var $this = $(this);
  var commentDiv = $this.closest('.comment')
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newComment);
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
