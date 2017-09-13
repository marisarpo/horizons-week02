"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE]
$(document).ready(function(){
  $('.show-replies').hide();
});
$('.post').on('click', function(){
  var addName = prompt("Enter your name");
  var addComment = prompt("Enter your comment");
  var newComment = $(`<div class="comment">
    <div class="author">${addName} says:</div>
    <div class="message">${addComment}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`);
  $('.comments').append(newComment);
});

$('.comments').on('click','.reply', function(){
  var addReplyName = prompt("Enter your name");
  var addReplyComment = prompt("Enter your comment");
  var newReplyComment = $(`<div class="comment">
    <div class="author">${addReplyName} says:</div>
    <div class="message">${addReplyComment}</div>
    <div class="controls">
      <button class="hide-replies btn btn-default">Hide Replies</button>
      <button class="show-replies btn btn-default">Show Replies</button>
      <button class="reply btn btn-default">Reply</button>
    </div>
    <div class="replies"></div>
  </div>`);
  $(this).closest('.comment').children('.replies').append(newReplyComment);
  // var $this = $(this);
  // var commentDiv = $this.closest('.comment');
  // var repliesDiv = commentDiv.children('.replies');
  // repliesDiv.append(newReplyComment);
});
$('.comments').on('click', '.hide-replies',
  function() {
    $('.comment .hide-replies').hide();
    $('.comment .show-replies').show();
    $(this).closest('.comment').children('.replies').hide();
  });
$('.comments').on('click', '.show-replies',
    function() {
      $('.comment .show-replies').hide();
      $('.comment .hide-replies').show();
      $(this).closest('.comment').children('.replies').show();
  });
