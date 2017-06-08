"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE

function addComment(){
var userAuthor = prompt("Enter your name: ");
var userComment = prompt("Enter your comment: ");

var comment  = $('<div>').addClass('comment');
var author = $('<div>').addClass('author').text(userAuthor+' says:');
var message = $('<div>').addClass('message').text(userComment);
var controls = $('<div>').addClass('controls');

var buttonHide = $('<button>').addClass('hide-replies btn btn-default').text('Hide Replies');
var buttonShow = $('<button>').addClass('show-replies btn btn-default').text('Show Replies');
var reply = $('<button>').addClass('reply btn btn-default').text('Reply');

var replies = $('<div>').addClass('replies');

  controls.append(buttonHide).append(buttonShow).append(reply);
  comment.append(author).append(message).append(controls).append(replies);
  return comment;}


$('.post').on('click',function(){
  var comment = addComment();
  $('.comments').append(comment);
});

$('.comments').on('click','.reply', function(){
  var comment = addComment();
  $(this).parent().siblings('.replies').append(comment);
});

$('.comments').on('click','.hide-replies', function(){
  $(this).parent().siblings('.replies').hide();
});

$('.comments').on('click','.show-replies', function(){
  $(this).parent().siblings('.replies').show();
});
