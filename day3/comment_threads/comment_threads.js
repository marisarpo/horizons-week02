"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE


$(document).ready( function() {
  $(".show-replies").hide();
});


$("button.post").on("click", function(event) {
  var author = prompt("Enter your name", "Anonymous");
  var comment = prompt("Enter your comment", "");
  $(".comments").append(`<div class="comment">
  <div class="author">${author} says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);
});

$(".comments").on("click", "button.reply", function(event) {
  var author = prompt("Enter your name", "Anonymous");
  var comment = prompt("Enter your comment", "");
  var $this = $(this);
  var commentDiv = $this.closest($this.parent().parent());
  var repliesDiv = commentDiv.children(".replies");
  repliesDiv.append(`<div class="comment">
  <div class="author">"${author}" says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);
});

$(".comments").on("click", "button.hide-replies", function() {
  var commentDiv = $(this).parent().parent();
  var repliesDiv = commentDiv.children(".replies");
  var controls = commentDiv.children(".controls");
  var hide_reply = controls.children(".hide-replies");
  var show_reply = controls.children(".show-replies");
  $(hide_reply).hide();
  $(show_reply).show();
  $(repliesDiv).hide();
});

$(".comments").on("click", "button.show-replies", function() {
  var commentDiv = $(this).parent().parent();
  var repliesDiv = commentDiv.children(".replies");
  var controls = commentDiv.children(".controls");
  var hide_reply = controls.children(".hide-replies");
  var show_reply = controls.children(".show-replies");
  $(hide_reply).show();
  $(show_reply).hide();
  $(repliesDiv).show();
});
