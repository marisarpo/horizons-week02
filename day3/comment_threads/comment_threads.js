"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(document).ready(function() {

  $('button.show-replies').hide();

  $(".post").on("click", function(event) {
  //console.log('button pressed');
  var authorResponse = prompt("Enter your name here: ");
  var commentResponse = prompt("Enter your comment here: ");
  var newElem = $(`<div class="comment new">
  <div class="author">"${authorResponse}" says:</div>
  <div class="message">${commentResponse}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);
  $('.comments').append(newElem);
});

$(".container").on("click", ".reply", function(event) {
  var authorResponse = prompt("Enter your name here: ");
  var commentResponse = prompt("Enter your comment here: ");
  var newElem = $(`<div class="comment new">
  <div class="author">"${authorResponse}" says:</div>
  <div class="message">${commentResponse}</div>
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
repliesDiv.append(newElem);
})

$(".comments").on('click', '.hide-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();
  commentDiv.children('.button.hide-replies').hide();
  commentDiv.children('button.show-replies').show();
})

$(".comments").on('click', '.show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();
  commentDiv.children('button.show-replies').hide();
  commentDiv.children('button.hide-replies').show();
})
})
