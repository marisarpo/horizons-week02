"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.post').on('click', function(event) {
  var author = prompt("Author?");
  var comment = prompt("Comment?");

  var newComment = $('<div class="comment">');

  newComment.append($('<div class="author">').text('""' + author + '""' + 'says:'));
  newComment.append($('<div class="message">').text(comment));

  var newControls = $('<div class ="controls">');
  newControls.append($('<button class="hide-replies btn btn-default">').text("Hide Replies"));
  newControls.append($('<button class="show-replies btn btn-default">').text("Show Replies"));
  newControls.append($('<button class="reply btn btn-default">').text("Reply"));
  newComment.append(newControls);

  var newReplies = $('<div class = "replies">');
  newComment.append(newReplies);

  $('.comments').append(newComment);
})


$('.comments').on('click', '.reply', function(event) {
  var author = prompt("Author?");
  var comment = prompt("Comment?");

  var newComment = $('<div class="comment">');

  newComment.append($('<div class="author">').text('""' + author + '""' + 'says:'));
  newComment.append($('<div class="message">').text(comment));

  var newControls = $('<div class ="controls">');
  newControls.append($('<button class="hide-replies btn btn-default">').text("Hide Replies"));
  newControls.append($('<button class="show-replies btn btn-default">').text("Show Replies"));
  newControls.append($('<button class="reply btn btn-default">').text("Reply"));
  newComment.append(newControls);

  var newReplies = $('<div class = "replies">');
  newComment.append(newReplies);

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newComment);
})

$('.comments').on('click', '.hide-replies', function(event) {
  var $this = $(this);
  $this.closest('.comment').children('.replies').hide();
  $this.hide();
  $this.closest('.controls').find('.show-replies').show();
})

$('.comments').on('click', '.show-replies', function(event) {
  var $this = $(this);
  $this.closest('.comment').children('.replies').show();
  $this.hide();
  $this.closest('.controls').find('.hide-replies').show();
})
