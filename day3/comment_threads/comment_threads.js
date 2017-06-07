"use strict";


$(document).ready(function(){

$("button.post").on("click", function(){
  var author = prompt("Enter your name:");
  var comment = prompt("Comment:");
  var newCommentThread = $('<div class="comment"></div>')
  var newCommentAuthor = $('<div class="author">' + '"' + author + '" ' + 'says:' + '</div>');
  var newComment = $('<div class="message">' + comment + '</div>');
//  $(".comments").append(newCommentThread);
  $(newCommentThread).append(newCommentAuthor);
  $(newCommentThread).append(newComment);
  $(newCommentThread).append('<div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button>'
    +'<button class="show-replies btn btn-default">Show Replies</button>'
    +'<button class="reply btn btn-default">Reply</button></div>');
  $(".comments").append(newCommentThread);
  $(newCommentThread).append('<div class="replies"></div>');
})
// This file contains JavaScript that will run on your page.
// YOUR CODE HERE
$(".comments").on("click", ".reply", function(){
  var author = prompt("Enter your name:");
  var comment = prompt("Comment:");

  var newCommentThread = $('<div class="comment"></div>')
  var newCommentAuthor = $('<div class="author">' + '"' + author + '" ' + 'says:' + '</div>');
  var newComment = $('<div class="message">' + comment + '</div>');

  $(newCommentThread).append(newCommentAuthor);
  $(newCommentThread).append(newComment);
  $(newCommentThread).append('<div class="controls"><button class="hide-replies btn btn-default">Hide Replies</button>'
    +'<button class="show-replies btn btn-default">Show Replies</button>'
    +'<button class="reply btn btn-default">Reply</button></div>');
  $(newCommentThread).append('<div class="replies"></div>');

  var $this = $(this);
  var commentDiv = $this.closest('.comment');
  var repliesDiv = commentDiv.children('.replies');
  repliesDiv.append(newCommentThread);
})

$('.comments').on('click', '.hide-replies', function(){
  //$($this.comment).hide('.replies');
  var curDiv = $(this).closest('.comment');
  curDiv.children('.replies').hide();
})

$('.comments').on('click', '.show-replies', function(){
  //$($this.comment).hide('.replies');
  var curDiv = $(this).closest('.comment');
  curDiv.children('.replies').toggle();
})




})
