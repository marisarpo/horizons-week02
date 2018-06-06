"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

// Part 1 - post
$(document).ready(function() {
$('.show-replies').hide();

$('.post').on('click', function () {
  $('.comments').append($(`<div class="comment">
  <div class="author">` + prompt('Enter your name') + ` says:</div>
  <div class="message">` + prompt('Enter a message') + `</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`));
});

// Part 2 - reply
$('.comments').on('click', '.reply', function () {
  $(this).closest('.comment').children('.replies').append($(`<div class="comment">
  <div class="author">` + prompt('Enter your name') + ` says:</div>
  <div class="message">` + prompt('Enter a message') + `</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`));
});

// Part 3 - show/hide
$('.comments').on('click', '.hide-replies', function () {
  $(this).closest('.comment').children('.replies').hide('.replies');
  $(this).hide();
  $(this).siblings().show();
});

$('.comments').on('click', '.show-replies', function () {
  $(this).closest('.comment').children('.replies').show('.replies');
  $(this).hide();
  $(this).siblings().show();
});
});
