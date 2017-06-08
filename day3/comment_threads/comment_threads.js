"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(document).ready(function() {

$('.post').on('click', function() {
  var name = prompt('Enter your name');
  var mssg = prompt('Enter your comment');
  $('.comments').append($(
    `<div class="comment"><div class="author">"`+name+`" says:</div>
      <div class="message">`+mssg+`</div>
      <div class="controls">
        <button class="hide-replies btn btn-default">Hide Replies</button>
        <button class="show-replies btn btn-default">Show Replies</button>
        <button class="reply btn btn-default">Reply</button>
      </div>
      <div class="replies"></div>
    </div>
    `
  ));
});

$('.comments').on('click', '.reply', function() {
  var nameReply = prompt('Enter your name');
  var mssgReply = prompt('Enter your comment');
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(
    `<div class="comment"><div class="author">"`+nameReply+`" says:</div>
      <div class="message">`+mssgReply+`</div>
      <div class="controls">
        <button class="hide-replies btn btn-default">Hide Replies</button>
        <button class="show-replies btn btn-default">Show Replies</button>
        <button class="reply btn btn-default">Reply</button>
      </div>
      <div class="replies"></div>
    </div>
    `
  );
});

$('.comments').on('click', '.hide-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).hide();
});

$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  $(repliesDiv).show();
});


});
