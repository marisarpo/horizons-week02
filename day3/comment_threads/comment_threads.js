"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
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

$('.comments').on('click', '.reply', function() {
  var authorName = prompt("author");
  var comm = prompt("comment");
  var newEle = $(`<div class="comment">
  <div class="author">${authorName} says:</div>
  <div class="message">${comm}</div>
  <div class="controls">
  <button class="hide-replies btn btn-default">Hide Replies</button>
  <button class="show-replies btn btn-default">Show Replies</button>
  <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
  </div>`);
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies'); //repliesDiv = .replies
  repliesDiv.append(newEle);
})

$('.comments').on('click', '.hide-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
})

$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
})
