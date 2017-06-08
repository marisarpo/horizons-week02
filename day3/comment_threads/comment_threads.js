"use strict";
$('#posted').on('click', function() {
  var authorName = prompt("author");
  var comm = prompt("comment");
  var newElement = $(`<div class="comment">
  <div class="author">${authorName} says:</div>
  <div class="message">${comm}</div>
  <div class="controls">
  <button class="hide-replies btn btn-default">Hide Replies</button>
  <button class="show-replies btn btn-default">Show Replies</button>
  <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
  </div>`)
  $('.comments').append(newElement);
})

$('.comments').on('click', '.reply', function () {
  var authorName = prompt("author");
  var comment = prompt("comment");
  var newElement = $(`<div class="comment">
  <div class="author">${authorName} says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
  <button class="hide-replies btn btn-default">Hide Replies</button>
  <button class="show-replies btn btn-default">Show Replies</button>
  <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
  </div>`)
  // `this` points to the current `.reply` button that was clicked
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newElement);
})

$('.comments').on('click', '.hide-replies', function () {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
})

$('.comments').on('click', '.show-replies', function () {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
})
