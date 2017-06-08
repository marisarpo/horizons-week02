"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

$(document).ready(function(){
  $(".post").on("click", function(){
    var prompt_author = prompt("whats your name");
    var prompt_message = prompt("what is your quest");

    var template = $('<div class="comment">'
  + '<div class="author">' + prompt_author + ' ' + 'says:</div>' +
  '<div class="message">' + prompt_message + ' ' + '</div>' +
  '<div class="controls">' +
    '<button class="hide-replies btn btn-default">Hide Replies</button>' +
    '<button class="show-replies btn btn-default">Show Replies</button>' +
    '<button class="reply btn btn-default">Reply</button>' +
  '</div>' +
  '<div class="replies"></div>' +
  '</div>')

  console.log(template);

  $('.comments').append(template);
  })

  // reply button


  $(".comments").on("click", ".reply", function() {
    var prompt_author = prompt("whats your name");
    var prompt_message = prompt("what is your quest");

    var template = $('<div class="comment">'
  + '<div class="author">' + prompt_author + ' ' + 'says:</div>' +
  '<div class="message">' + prompt_message + ' ' + '</div>' +
  '<div class="controls">' +
    '<button class="hide-replies btn btn-default">Hide Replies</button>' +
    '<button class="show-replies btn btn-default">Show Replies</button>' +
    '<button class="reply btn btn-default">Reply</button>' +
  '</div>' +
  '<div class="replies"></div>' +
  '</div>')
  // `this` points to the current `.reply` button that was clicked
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(template);
})

$(".comments").on("click", ".hide-replies", function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.hide();

})

$(".comments").on("click", ".show-replies", function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.show();

})
})
