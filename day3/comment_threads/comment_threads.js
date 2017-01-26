"use strict";

// This file contains JavaScript that will run on your page.
// Post
$('.post').on('click', function(){
  var name = prompt('Enter your name')
  var comment = prompt('Enter a comment');
  if(name && comment){
    $('.comments').append(makeComment(name, comment));
  }
})

function makeComment(name, comment){
  var newComment = $('<div class="comment">');
  newComment.append($('<div class="author">').text("'" + name + " says '"));
  newComment.append($('<div class="message">').text(comment));
  var ctrls = $('<div class = "controls">');
  ctrls.append($('<button class="hide-replies btn btn-default">').text('Hide Replies'));
  ctrls.append($('<button class="show-replies btn btn-default">').text('Show Replies'));
  ctrls.append($('<button class="reply btn btn-default">').text('Reply'));
  newComment.append(ctrls);
  newComment.append($('<div class="replies">'));
  return newComment;
}

//Reply
$('.comments').on('click', '.reply', function(){
  var name = prompt('Enter your name')
  var comment = prompt('Enter a comment');
  if(name && comment){
    var $this = $(this);
    var commentDiv = $this.closest('.comment')
    var repliesDiv = commentDiv.children('.replies');
    repliesDiv.append(makeComment(name, comment));
  }
})

$('.comments').on('click', '.hide-replies', function(){
  $(this).closest('.comment').find('.replies').hide();
  
})

$('.comments').on('click', '.show-replies', function(){
  $(this).closest('.comment').find('.replies').show();
})

$(document).ready(function(){
  $('.replies').hide();
});
