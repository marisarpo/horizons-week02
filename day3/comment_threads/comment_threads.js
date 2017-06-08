"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$('.show-replies').hide()

$('.post').on('click', function() {
  var author = prompt('Enter an author name') || 'anonymous';
  var comment = prompt('Enter your comment') || 'pigs are friends, not food';
  var postComment = $(`<div class="comment"> <div class="author"> ${author} says:</div> <div class="message"> ${comment} </div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button> <button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button> </div> <div class="replies"></div> </div>`);
  $('.container .col-xs-10 .comments').append(postComment);
})
//not sure why .comments work but .comment does not work -- ask question
$('.comments').on('click', '.reply', function() {
  var author = prompt('Enter an author name') || 'anonymous';
  var comment = prompt('Enter your comment') || 'pigs are friends, not food';
  var postComment = $(`<div class="comment"> <div class="author"> ${author} says:</div> <div class="message"> ${comment} </div> <div class="controls"> <button class="hide-replies btn btn-default">Hide Replies</button> <button class="show-replies btn btn-default">Show Replies</button> <button class="reply btn btn-default">Reply</button> </div> <div class="replies"></div> </div>`);
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(postComment);
})

$('.comments').on('click', '.hide-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  commentDiv.children('.controls').children('.show-replies').toggle()
  commentDiv.children('.controls').children('.hide-replies').toggle()
  var numReplies = repliesDiv.find('.comment').length;
  commentDiv.append(`<h1 class="numReplies">${numReplies}</h1>`);
  repliesDiv.hide();
})

$('.comments').on('click', '.show-replies', function() {
  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  commentDiv.children('.controls').children('.show-replies').toggle()
  commentDiv.children('.controls').children('.hide-replies').toggle()
  var numReplies = repliesDiv.find('.comment').length;
  $('.numReplies').hide()
  repliesDiv.show();
})
