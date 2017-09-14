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
})

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
  $(this).closest('.comment').children('.replies').children().last().find('.show-replies').hide();
})

$('.comments').on('click', '.hide-replies', function() {
  $(this).closest('.comment').children('.replies').hide();
  $(this).hide();
  $(this).parent().children('.show-replies').show();
  var num = $(this).closest('.comment').find('.comment').length;
  $(this).parent().append(`<p>   ${num} replies hidden</p>`);
})

$('.comments').on('click', '.show-replies', function() {
  $(this).closest('.comment').children('.replies').show();
  $(this).hide();
  $(this).parent().children('.hide-replies').show();
  $(this).parent().children('p').remove();
})

$(document).ready(function() {
  $('.comments').find('.show-replies').hide();
})
