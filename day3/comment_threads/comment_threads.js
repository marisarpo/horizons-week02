"use strict";

// This file contains JavaScript that will run on your page.
$(document).ready(function() {
  $('.show-replies').hide();
})

$('.post').on('click', function(event) {
  var name = prompt('Enter your name');
  var message = prompt('Enter your comment');
  $('.comments').append(`<div class="comment">
  <div class="author">` + name + ` says:</div>
  <div class="message">` + message + `</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);
})

$('.comments').on('click', '.reply', function(event) {
  var name = prompt('Enter your name');
  var message = prompt('Enter your comment');
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(`<div class="comment">
  <div class="author">` + name + ` says:</div>
  <div class="message">` + message + `</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);
});

$('.comments').on('click', '.hide-replies', function(event) {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
  $(commentDiv.find('.show-replies')).show();
  $(commentDiv.find('.hide-replies')).hide();
})

$('.comments').on('click', '.show-replies', function(event) {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
  $(commentDiv.find('.show-replies')).hide();
  $(commentDiv.find('.hide-replies')).show();
})
