"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE


$('.post').click(function() {
  // var author = prompt("Please enter an author")
  // var comment = prompt("Please enter a comment")

  $('.comment').append(promptInfo());
})

function promptInfo() {
  var author = prompt("Please enter an author")
  var comment = prompt("Please enter a comment")
  console.log(author, comment);
  if (author && comment) {
    return commentInfo(author, comment);
  }
}

function commentInfo(author, comment, reply) {
  var comment = $('<div class="comment">');
  comment.append($('<div class="author">').text('"' + author + '" says:'));
  comment.append($('<div class="message">').text(comment));
  var controls = $('<div class="controls">')
  controls.append($('<button class="hide-replies btn btn-default">Hide Replies</button>'));
  controls.append($('<button class="show-replies btn btn-default">Show Replies</button>'));
  controls.append($('<button class="reply btn btn-default">Reply</button>'));
  comment.append(controls);
  comment.append($('<div class="replies">').append(reply));
  return comment;
}

$('.comment').on('click', '.reply', function() {
  // alert('hey')
  var reply = $(this).closest('.comment').children('.replies')
  reply.show();
  reply.append(promptInfo());
})


$('.comment').on('click', '.hide-replies', function() {
  // alert('hey')
  var hidereply = $(this).closest('.comment').children('.replies')
  hidereply.hide();
})


$('.comment').on('click', '.show-replies', function() {
  var showreply = $(this).closest('.comment').children('.replies');
  showreply.show();
  // reply.append(promptInfo());
})
