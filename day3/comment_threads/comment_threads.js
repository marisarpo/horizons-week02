"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function() {
  var author = prompt("Enter your name");
  var comment = prompt("Enter your comment");
  $('.comments').append(
    `<div class="comment">
      <div class="author">"${author}" says:</div>
      <div class="message">${comment}</div>
      <div class="controls">
        <button class="hide-replies btn btn-default">Hide Replies</button>
        <button class="show-replies btn btn-default">Show Replies</button>
        <button class="reply btn btn-default">Reply</button>
      </div>
      <div class="replies"></div>
    </div>`
  );
  $('.comments').children().last().find('.show-replies').hide();

});

$('.comments').on('click', '.reply', function() {
  var author = prompt("Enter your name");
  var comment = prompt("Enter your comment");
  $(this).closest('.comment').children('.replies').append(
    `<div class="comment">
      <div class="author">"${author}" says:</div>
      <div class="message">${comment}</div>
      <div class="controls">
        <button class="hide-replies btn btn-default">Hide Replies</button>
        <button class="show-replies btn btn-default">Show Replies</button>
        <button class="reply btn btn-default">Reply</button>
      </div>
      <div class="replies"></div>
    </div>`
  );
  $(this).closest('.comment').children('.replies').children('.comment:last-child').find('.show-replies').hide();
});

$('.comments').on('click', '.hide-replies', function() {
  $(this).closest('.comment').children('.replies').hide();
  $(this).hide();
  $(this).parent().children('.show-replies').show();
  var numReplies = $(this).closest('.comment').find('.comment').length;
  $(this).closest('.comment').children('.controls').append(
    `<p class="red">${numReplies} replies hidden</p>`
  );
});

$('.comments').on('click', '.show-replies', function() {
  $(this).closest('.comment').children('.replies').show();
  $(this).hide();
  $(this).parent().children('.hide-replies').show();
  $(this).closest('.comment').children('.controls').children('p').remove();
});

$(document).ready(function(){
  $('.comments').find('.show-replies').hide();
});
